import { useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { theme } from "./styles"
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import { firstRun } from "./wannabeBackend/userController";
import Login from "./components/Login";
import Notification from "./components/Notification";

const App = () => {
    let loggedUser = null
    
    if (sessionStorage.getItem("userRegister") === null || sessionStorage.getItem("users") === null) firstRun()
    if (localStorage.getItem('user')) loggedUser = localStorage.getItem('user')


    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = () => {
        if (loggedUser !== null) {
            return (<UserList />)
        }
        else {
            return (<Login />)
        }
    }

    return (
    <>
        <ThemeProvider theme={theme}>
            <Notification />
            <Routes>
                <Route path="/" element={checkUser()} />
                <Route path="/user/:id" element={<UserDetail />} />
            </Routes>
        </ThemeProvider>
    </>
    );
}

export default App;
