import { createSlice } from "@reduxjs/toolkit";

export const visitedSlice = createSlice({
    name: 'visited',
    initialState: {value:}
    reducers: {
        visitedDeleted(state, action){
            delete state.entities[action.payload]
        }
    }
})

export const { visitedDeleted } = visitedSlice.actions

export default visitedSlice.reducer