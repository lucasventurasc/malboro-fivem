import '@citizenfx/server'
import {vrpServer as vrp} from './vrp'

import CigarettePack from './models/CigarettePack'

const cigaretteConfig = require('./cigarrete.config.json')
const debug = true

onNet('chatMessage', (src, author, text) => {
    if (src && text.startsWith('/fumar')) {
        let cigaretteName = text.split('/fumar')[1].trim().toLowerCase();
        runSmokeRequest(cigaretteName, src);
    }
})

/**
 * @param name can be empty (first available cigarette, or receive a name)
 * @param src caller
 */
function runSmokeRequest(name, src) {
    let userId = vrp.getUserId(src)

    if(debug) console.log('userid ' + vrp.getUserId(src))

    let cigarettePack
    if (name.length > 0) {
        cigarettePack = new CigarettePack(name, vrp.getInventoryItemAmount(userId, name));
    } else {
        cigarettePack = getNextAvailableCigarette(userId);
    }
    if(debug) console.log('pack ' + JSON.stringify(cigarettePack))

    if (cigarettePack === null) {
        if(debug) console.log('not available')
        displayNotAvailableCigarettesMessage(name, src);
    } else {
        if(debug) console.log('available')
        smokeCigarette(cigarettePack, userId, src)
    }
}

function smokeCigarette(cigarettePack, userId, src) {
    if(debug) console.log('preparing animation')
    let cigaretteAnimation = cigaretteConfig[cigarettePack.name]

    if (vrp.tryGetInventoryItem(userId, cigarettePack.name, 1)) {
        if(debug) console.log('playing animation ' + JSON.stringify(cigaretteAnimation))
        TriggerClientEvent('fumar', parseInt(userId), [cigaretteAnimation.anim, cigaretteAnimation.screenEffect])
    } else {
        console.log('Could not tryGetInventoryItem')
    }
}

function getNextAvailableCigarette(userId) {
    let cigarettes = Object.keys(cigaretteConfig);
    for (let i = 0; i < cigarettes.length; i++) {
        let cigarName = cigarettes[i]
        let amount = vrp.getInventoryItemAmount(userId, cigarName);
        if(debug) console.log('Amount found for ' + cigarName + ' amount ' + amount)
        if (amount >= 1) {
            return new CigarettePack(cigarName, amount);
        }
    }
    return null
}

function displayNotAvailableCigarettesMessage(name, src) {
    if (name.length === 0) {
        TriggerClientEvent('Notify', src, 'aviso', 'Você não tem mais cigarros!')
    } else {
        TriggerClientEvent('Notify', src, 'aviso', 'Você não tem mais cigarros da marca ' + name + '!')

    }
}
