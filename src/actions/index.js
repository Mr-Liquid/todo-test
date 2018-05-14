export const ADD_CALL = "add_call";
export const REMOVE_CALL = "remove_call";

export function addCall(data = {}, id) {
    return {
        type: ADD_CALL,
        payload: data,
        id: id
    };
}


export function removeCall(id) {
    return {
        type: REMOVE_CALL,
        id: id
    };
}

