export const loginUser = (data) => {
    const userList = JSON.parse(sessionStorage.getItem("userRegister"))
    const user = userList.find(user => user.username === data.username)
    if (user !== undefined){
        if (user.password === data.password) return user.token
    }
    let e =  new Error ("")
    e.name ="NetworkError"
    throw e
}

export const newPassword = (data) => {
    const userList = JSON.parse(sessionStorage.getItem("userRegister"))
    const index = userList.findIndex(user => user.username === data.user)
    if (index !== -1) {
        userList[index].password = data.password
        userList[index].activated = true
        userList[index].token = btoa(JSON.stringify({
            'user': userList[index].user,
            'role': userList[index].role,
            'username': userList[index].username, 
            "activated":'true'
        }))
        sessionStorage.setItem("userRegister", JSON.stringify(userList))
        return userList[index].token
    }
    let e =  new Error ("Unable to update password")
    e.name ="NetworkError"

    throw e
}