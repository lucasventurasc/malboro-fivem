import '@citizenfx/client'
import {vrpServer} from "./vrp";
import {draw3DTextPermanent} from 'fivem-3d-text'

onNet('fumar', (args, event2) => {
    console.log('fumando ' + args)
    if (!IsPedInAnyVehicle(GetPlayerPed(-1), true)) {
        let anim = args[0]
        let screenEffect = args[1]

        vrpServer.playAnim(false, {task: anim}, true)

        if (screenEffect !== "") {
            let intervalTime = 30000
            let interval = setInterval(function () {
                if (IsPedUsingAnyScenario(GetPlayerPed(-1))) {
                    StartScreenEffect(screenEffect, intervalTime, 1)
                } else {
                    clearInterval(interval)
                    StopScreenEffect(screenEffect)
                }
            }, intervalTime);
        }
    }
})


async function drawMaconhaMalboroMarijuana() {
    const config = {
        x: -1171.1, // at the airport
        y: -1571.23,
        z: 4.67,
        text: 'Pressione ~r~E~w~ para trocar ~b~1 maconha~w~ e ~g~100$~w~ por um maço de ~g~Malboro Marijuana~w~',
        radius: 7,
        scaleMultiplier: 0.15
    }
    draw3DTextPermanent(config);
}

async function main() {
    await drawMaconhaMalboroMarijuana()

    setInterval(function() {
        if (IsControlJustPressed(1, 38)) {
            let x1 = GetEntityCoords(PlayerPedId());
            let distance = GetDistanceBetweenCoords(-1171.1, -1571.23, 4.67, x1[0], x1[1], x1[2], false)
            if (distance <= 2) {
                let userId = vrpServer.getUserId(source);
                if (vrpServer.tryGetInventoryItem(userId, 'maconha-alta', 1)) {
                    if (vrpServer.tryPayment(userId, 100)) {
                        TriggerEvent('Notify', 'aviso', 'Você trocou 1 maconha e 100$ em um maço de Malboro Marijuana', 8000)
                    } else {
                        TriggerEvent('Notify', 'aviso', 'Você não tem $100 na carteira', 8000)
                    }
                } else {
                    TriggerEvent('Notify', 'aviso', 'Você não tem maconha alta o suficiente', 8000)
                }
            }
        }
    }, 10)

}

// }
//
// setTick(function() {
//     if (IsControlJustPressed(1, 38)) {
//         let x1 = GetEntityCoords(PlayerPedId());
//         let distance = GetDistanceBetweenCoords(inicioX,inicioY,inicioZ, x1[0], x1[1], x1[2], false)
//         TriggerEvent('Notify','aviso','Você trocou 1 maconha e 100$ em um maço de Malboro Marijuana', 8000)
//     }
// })
main().then(r => console.log('text loaded'));
