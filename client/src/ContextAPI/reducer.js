export const initialState = {
    isAuth: false,
    user: null,
    imageEdit: [],
    isGallery: true
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
        case "SET_IMAGEEDIT":
            return {
                ...state,
                imageEdit: action.imageEdit
            };
        case "SET_ISGALLERY":
            return {
                ...state,
                isGallery: action.isGallery
            }
    }
}

export default reducer;