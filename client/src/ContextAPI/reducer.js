export const initialState = {
    isAuth: false,
    user: null,
    gallery: []
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
            };
        case "SET_GALLERY":
            return {
                ...state,
                gallery: action.gallery
            }
    }
}

export default reducer;