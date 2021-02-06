export const initialState = {
    isAuth: false,
    user: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ISAUTH":
            return {
                ...state,
                isAuth: action.isAuth
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
    }
}

export default reducer;