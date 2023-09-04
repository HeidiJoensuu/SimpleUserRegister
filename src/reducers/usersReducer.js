import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUser, postUser, deleteUser } from "../services/usersServive";

export const getUsersAsList = createAsyncThunk("users/getUsersAsList", async (arg,{ rejectWithValue }) => {
    try {
        const response = await getUsers()
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getCurrentUser = createAsyncThunk("users/getCurrentUser", async (id, { rejectWithValue }) => {
    try {
        const response = await getUser(id)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
    
})

export const createUser = createAsyncThunk("users/createUser", async (data, { rejectWithValue }) => {
    try {
        const response = await postUser(data)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const removeUser = createAsyncThunk("users/removeUser", async (id, { rejectWithValue }) => {
    try {
        await deleteUser(id)
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        currentUser: {},
        message: ""
    },
    reducers: {
        dismissMessage: (state) => {
            state.message = ""
        },
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsersAsList.fulfilled, (state, action) => {
            state.users = action.payload
            state.message = ""
        })
        builder.addCase(getUsersAsList.rejected, (state, action) => {
            if (action.payload !== undefined) state.message = action.payload.message
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload
            state.message = ""
        })
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            if (action.payload !== undefined) state.message = action.payload.message
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.users = [...state.users, action.payload]
            state.message = "New user created"
        })
        builder.addCase(createUser.rejected, (state, action) => {
            if (action.payload !== undefined) state.message = action.payload.message
        })
        builder.addCase(removeUser.rejected, (state, action) => {
            if (action.payload !== undefined) state.message = action.payload.message
        })
    }
})

export const {dismissMessage, setMessage} = usersSlice.actions
export default usersSlice.reducer