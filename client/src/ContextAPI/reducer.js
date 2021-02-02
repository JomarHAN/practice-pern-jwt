export const initialState = {
    isAuth: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ISAUTH":
            return {
                ...state,
                isAuth: action.isAuth
            }
    }
}

export default reducer;