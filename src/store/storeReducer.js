const types = {
    authLogin: 'logged in',
    authLogout: 'logged out'
}

const initialStore = {
    isAuthenticated: false
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                isAuthenticated: true
            }
            case types.authLogout:
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state
    }
}

export {initialStore, types}
export default storeReducer
