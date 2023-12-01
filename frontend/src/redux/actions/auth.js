export const Logout = () => {
    return {
        type: "LOGOUT",
        payload: {}
    }
}

export const UpdateUser = (payload) => {
    console.log('Dispatching UpdateUser action:', payload);
    return {
        type: "UPDATE_USER",
        payload
    }
}