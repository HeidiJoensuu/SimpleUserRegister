import axios from "axios"
import {config} from "../utils/config"

export const firstRun = async () => {
    try {
        sessionStorage.setItem("userRegister", JSON.stringify([
            {
                'user': 'admin',
                'role': 'admin',
                "username":"admin",
                "password":"admin",
                "activated":'true',
                'token':btoa(JSON.stringify({
                    'user': 'admin',
                    'role': 'admin',
                    'username': 'admin', 
                    "activated":'true'
                }))
            },
            {
                'user': '1',
                'role': 'user',
                "username":"Bret",
                "password":"Bret",
                "activated":'true',
                'token':btoa(JSON.stringify({
                    'user': '1', 
                    'role': 'user',
                    'username': 'Bret',
                    "activated":'true'
                }))
            }
        ]))
        const response = await axios.get(config.url)
        sessionStorage.setItem("users", JSON.stringify(response.data))
    } catch (error) {
        let e =  new Error ("Something went wrong")
        e.name ="NetworkError"
        throw e
    }
    
}

export const getUsersSessionStorage = () => {
    const userList = JSON.parse(sessionStorage.getItem("users"))
    if (userList === null) {
        let e =  new Error ("Unable to get users")
        e.name ="NetworkError"
        throw e
    }
    const users = userList.map(user => {
        return {
            "id": user.id,
            "username": user.username,
            "company": user.company.name,
            "phone": user.phone,
            "email": user.email
        }})

    if (users.length !== 0) return users
    let e =  new Error ("Unable to get users")
    e.name ="NetworkError"
    throw e
}

export const getUserSessionStorage = (id) => {
    let userList = JSON.parse(sessionStorage.getItem("users"))
    const user = userList.find(user => user.id === id)
    if (user !== undefined) {
        return user
    }
    let e =  new Error ("User not found")
    e.name ="NetworkError"
    throw e
    
}

export const createNewUserSessionStorage = (data) => {
    try {
        let userList = JSON.parse(sessionStorage.getItem("users"))
        let userRegisterList = JSON.parse(sessionStorage.getItem("userRegister"))
        const id = userList.at(-1).id+1
        const newUser = {
            id: id,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            website: data.website,
            address: {
                street: data.street,
                suite: data.suite,
                city: data.city,
                zipcode: data.zipcode,
                geo: {
                    lat: "0",
                    lng: "0"
                }
            },
            company: {
                name: data.companyName,
                catchPhrase: data.catchPhrase,
                bs: data.bs,
            }
        }
        userList.push(newUser)
        const newUserRegister = {
            'user': newUser.id,
            'role': 'user',
            "username": newUser.username,
            "password": data.password,
            "activated":'false',
            'token':btoa(JSON.stringify({
                'user': newUser.id,
                'role': 'user',
                'username': newUser.username, 
                "activated":'false'
            }))
        }
        userRegisterList.push(newUserRegister)
        sessionStorage.setItem("users", JSON.stringify(userList))
        sessionStorage.setItem("userRegister", JSON.stringify(userRegisterList))

        return {
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            website: newUser.website,
            company: newUser.company.name
        }
    } catch (error) {
        let e =  new Error ("Unable to create new user")
        e.name ="NetworkError"
        throw e
    }
    
}

export const removeUserSessionStorage = (id) => {
    let userList = JSON.parse(sessionStorage.getItem("users"))
    let userRegisterList = JSON.parse(sessionStorage.getItem("userRegister"))
    const index1 = userList.findIndex(user => user.id === id)
    const index2 = userRegisterList.findIndex(user => user.user === id)
    if (index1 !== -1 && index2 !== -1) {
        userList.splice(index1, 1)
        sessionStorage.setItem("users", JSON.stringify(userList))
        userRegisterList.splice(index2, 1)
        sessionStorage.setItem("userRegister", JSON.stringify(userRegisterList))
    } else {
        let e =  new Error ("Unable to remove user")
        e.name ="NetworkError"
        throw e
    }
    
}
