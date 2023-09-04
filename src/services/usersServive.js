import axios from "axios"
import {config} from "../utils/config"
import {getUsersSessionStorage, getUserSessionStorage, createNewUserSessionStorage, removeUserSessionStorage } from "../wannabeBackend/userController"

export const getUsers = async () => {
    try {
        //const response = await axios.get(config.url)
        //return response.data
        return getUsersSessionStorage()
    } catch (error) {
        throw error
    }
}

export const getUser = async (id) => {
    try {
        //const response = await axios.get(config.url+'/'+id)
        //return response.data
        const response = getUserSessionStorage(parseInt(id))
        return response
    } catch (error) { 
        throw error
    }
}

export const postUser = async (data) => {
    try {
        //const response = await axios.post(config.url, data)
        //return response.data
        return createNewUserSessionStorage(data)
    } catch (error) {
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
        //await axios.delete(config.url+'/'+id)
        removeUserSessionStorage(parseInt(id))
    } catch (error) {
        throw error
    }
}