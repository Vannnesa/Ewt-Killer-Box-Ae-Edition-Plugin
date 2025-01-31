// import {SGM_getValue, SGM_setValue} from "@/utils/function";
// import {requestJson} from "@/utils/request";
// import Config from "@/config";
// import {user} from "@/main";
//
// export async function castV1ToV2(uid?:string) {
//     if(SGM_getValue("kewt_ae.sign") != undefined) {
//         if(!uid) return;
//         let c = <string>SGM_getValue("kewt_ae.sign")
//         let req:any = await requestJson("POST",Config.ip + "/auth/castV1toV2", {},{
//             "id": uid,
//             "v1": c
//         })
//         if(req.status == 200) {
//             let s = JSON.parse(req.responseText)
//             SGM_setValue(`kewt_ae.sign.${user.id}.v2`, s["data"]["v2_key"])
//         }
//     }
// }
// import {SGM_getValue} from "@/utils/function";
// import {user} from "@/main";
//
// if(SGM_getValue(`kewt_ae.sign.${user.id}.v2`) == undefined) {
//     await castV1ToV2(user.id?.toString())
// }
