import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
        loggedInUser: [],
        groupChat: [],
        Upload: []
    },

    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
        },
        setGroupChat: (state, action) => {
            state.groupChat = action.payload;
        },
        setUpload: (state, action) => {
            state.Upload = action.payload;
        },
    },
});

export const { setUserData, setLoggedInUser ,setGroupChat, setUpload} = userSlice.actions;
export default userSlice.reducer;