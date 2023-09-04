import { loginUser, newPassword } from "../wannabeBackend/authController";

export const login = (data) => {
    try {
        const response = loginUser(data)
        return response
    } catch (error) {
        return ({'error': "Username or password incorrect"})
    }
}

export const createNewPassword = (data) => {
    try {
        const response = newPassword(data)
        return response
    } catch (error) {
        return ({'error': "Unable to update password"})
    }
}