import { createSlice } from "@reduxjs/toolkit";
import { MODE_THEME } from '../constants/index'


const commonSlice = createSlice({
    name: 'common',
    initialState: {
        theme: MODE_THEME.DARK,
        lang: 'en' ? 'en' : 'vi'
    },
    reducers: {
        changeTheme(state, action) {
            const newTheme = action.payload
            state.theme = newTheme
        },
        changeLanguage(state, action) {
            const newLang = action.payload
            state.lang = newLang
        }
    }
})

const { actions, reducer } = commonSlice

export const {
    changeLanguage, changeTheme
} = actions

export default reducer