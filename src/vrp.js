import {VrpProxy, VrpTunnel} from '@vrpjs/server';

class vRP {

    constructor(vrpInterface) {
        this._vrpInterface = vrpInterface
    }

    getInventoryItemAmount = function (user_id, itemName) {
        return this._vrpInterface.getInventoryItemAmount(user_id, itemName)
    }

    getUserId(source) {
        return this._vrpInterface.getUserId(source)
    }

    playAnim(upper,seq,looping) {
        this._vrpInterface.playAnim(upper,seq,looping)
    }

    tryGetInventoryItem(userId, name, amount) {
        return this._vrpInterface.tryGetInventoryItem(userId, name, amount)
    }

    tryPayment(userId, amount) {
        return this._vrpInterface.tryPayment(userId, amount)
    }
}

const vrpServer = new vRP(VrpProxy.getInterface('vRP'))
const vrpClient = new vRP(VrpTunnel.getInterface('vRP'))

export {vrpServer, vrpClient}
