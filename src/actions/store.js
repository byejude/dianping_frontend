import *as actionType from '../constants/store'




export function add(item) {
    return{
        type:actionType.STORE_ADD,
        data:item
    }
}

export function rm(item) {
    return{
        type:actionType.STORE_RM,
        data:item
    }
}