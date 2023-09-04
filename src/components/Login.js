import { Button, Grid, TextField, Typography } from "@mui/material"
import { LoginBox } from "../styles"
import { useState } from "react"
import { login } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { setMessage } from "../reducers/usersReducer"
import { useDispatch } from "react-redux"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        const answer = login({'username': username, 'password': password})
        if (answer.error !== undefined) {
            dispatch(setMessage(answer.error))
        }else {
            localStorage.setItem("user", answer)
            const user = JSON.parse(atob(answer))
            if (user.role === "admin") {
                window.location.reload()
            }
            else {
                navigate("/user/"+atob(answer).user)
            }
        }
    }

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{height: '100%'}}>
            <LoginBox>
                <Typography variant="h2">
                    Welcome!
                </Typography>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }}
                />
                <TextField
                    label="Password"
                    value={password}
                    type="password"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <Button onClick={() => handleLogin()}>Log in</Button>
            </LoginBox>
        </Grid>
    )
}

export default Login