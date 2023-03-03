import { createSlice } from "@reduxjs/toolkit";
import { Message, User, Verification } from "../../types";

const messages: Message[] = []


const userSlice = createSlice({
    name: "user",
    initialState: {
        messages,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        }
    }
});

export const { setMessages } = userSlice.actions;

export default userSlice.reducer;
