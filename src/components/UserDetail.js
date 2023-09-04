import { useEffect, useState } from "react";
import { getCurrentUser, removeUser, setMessage} from "../reducers/usersReducer";
import { PagePaper } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { createNewPassword } from "../services/authService";

const UserDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openWarning, setOpenWarning] = useState(false)
    const [openNewPassword, setOpenNewPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [incorrectPasswords, setIncorrectPasswords] = useState("")
    const {currentUser} = useSelector(state => state.users)
    let loggedUser = null
    if (localStorage.getItem('user')) loggedUser = JSON.parse(atob(localStorage.getItem('user')))

    useEffect(() => {
        dispatch(getCurrentUser(window.location.pathname.split("/")[2]))
        if (loggedUser === null)  navigate("/")
        else if (loggedUser.role !== "admin") {
            navigate("/user/"+loggedUser.user)
        }
        if (loggedUser !== null &&loggedUser.activated === 'false') {
            setOpenNewPassword(true)
        }
    }, [])

    const handleRemove = () => {
        dispatch(removeUser(currentUser.id))
        dispatch(setMessage(`User ${currentUser.name} Removed`))
        navigate("/")
    }
    
    const handleLogout = () => {
        localStorage.removeItem("user")
        window.location.replace("/")
    }
    
    const handlePasswordChange = () =>{
        if (password !== verifyPassword) {
            setIncorrectPasswords("Passwords are not same")
        }
        else if (password === ""  && verifyPassword === "") {
            setIncorrectPasswords("Create new password")
        }
        else if (password !== "" && password === verifyPassword) {
            const answer = createNewPassword({'password': password, "user": loggedUser.username})
            localStorage.setItem("user", answer)
            setOpenNewPassword(false)
        }
    }

    if (Object.keys(currentUser).length === 0) {
        return (
            <PagePaper>
                <Grid container justifyContent={loggedUser.role === "admin" ? "space-between" : "end"}>
                    <Button onClick={() => navigate("/")}>Back</Button>
                    <Button onClick={() => handleLogout()}>Log out</Button>
                </Grid>
            </PagePaper>
        )
    }

    return (
        <>
            {loggedUser.activated === 'false' &&
            <Dialog open={openNewPassword}>
                <Typography variant="h2">New password</Typography>
                <TextField
                    required
                    label="Password"
                    value={password}
                    type="password"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <TextField
                    required
                    label="Verify password"
                    value={verifyPassword}
                    type="password"
                    helperText = {incorrectPasswords !== "" && incorrectPasswords}
                    onChange={(event) => {
                        setVerifyPassword(event.target.value)
                    }}
                />
                <Button onClick={() => handlePasswordChange()}>Save</Button>
            </Dialog>
            }
            <Dialog open = {openWarning} onClose={() => setOpenWarning(false)}>
                <DialogTitle>
                {`Remove user ${currentUser.username}`}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you sure you want to remove user <b>{currentUser.username}</b>?
                </DialogContentText>
                <DialogContentText>
                    <b>Name:</b> {currentUser.name}
                </DialogContentText>
                <DialogContentText>
                    <b>Company:</b> {currentUser.company.name}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpenWarning()}>Cancel</Button>
                <Button onClick={() => handleRemove()}>
                    Remove
                </Button>
                </DialogActions>
            </Dialog>
            <PagePaper>
                <Grid container justifyContent={loggedUser.role === "admin" ? "space-between" : "end"}>
                    {loggedUser.role === "admin" && <Button onClick={() => navigate("/")}>Back</Button>}
                    <Button onClick={() => handleLogout()}>Log out</Button>
                </Grid>
                <Container>
                <Grid container direction="column">
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h2">
                                Personal info
                            </Typography>
                            <Stack direction="row">
                                <Typography variant="body3">
                                    Username:
                                </Typography>
                                <Typography variant="body1">
                                    {currentUser.username}
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography variant="body3">
                                    Name: 
                                </Typography>
                                <Typography variant="body1">
                                    {currentUser.name}
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography variant="body3">
                                    Phone:
                                </Typography>
                                <Typography variant="body1">
                                    {currentUser.phone}
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography variant="body3">
                                    Email:
                                </Typography>
                                <Typography variant="body1">
                                    {currentUser.email}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Link variant="body1">
                                {currentUser.website}
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h2">
                                Company
                            </Typography>
                            <Stack direction="row">
                                <Typography variant="body3">
                                    Name: 
                                </Typography>
                                <Typography variant="body1">
                                    {currentUser.company.name}
                                </Typography>
                            </Stack>
                            <Typography variant="body1">
                                {currentUser.company.bs}
                            </Typography>
                            <Typography variant="body1">
                                {currentUser.company.catchPhrase}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h2">
                                Address
                            </Typography>
                            <Typography variant="body1">
                                {currentUser.address.city}
                            </Typography>
                            <Typography variant="body1">
                                {currentUser.address.zipcode}
                            </Typography>
                            <Typography variant="body1">
                                {currentUser.address.street} {currentUser.address.suite}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </Container>
                {loggedUser.role === "admin" && <Button onClick={() => setOpenWarning(true)}>Remove user</Button>}
            </PagePaper>
        </>
    )
}

export default UserDetail