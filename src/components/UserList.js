import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Grid} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useNavigate } from "react-router-dom"
import { PagePaper } from "../styles";
import NewUserForm from "./NewUserForm";
import { getUsersAsList } from "../reducers/usersReducer";

const UserList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openForm, setOpenForm] = useState(false)
    const {users} = useSelector(state => state.users)
    let loggedUser = ""
    if (localStorage.getItem('user')) loggedUser = JSON.parse(atob(localStorage.getItem('user')))

    useEffect(() =>{
        dispatch(getUsersAsList())
        if (loggedUser.role !== "admin") {
            navigate("/user/"+loggedUser.user)
        }
    }, [dispatch])

    const handleFormClose = () => setOpenForm(false)
    
    const handleClick = (user) => {
        navigate(`/user/${user.id}`)
    }
    const handleLogout = () => {
        localStorage.removeItem("user")
        window.location.reload()
    }
    
    const renderList = () => {
        if (users === undefined){
            return <></>
        }
        
        return users.map(user => {
            return (
                <TableRow hover onClick={() => handleClick(user)} key={user.id}>
                    <TableCell>
                        {user.username}
                    </TableCell>
                    <TableCell>
                        {user.company}
                    </TableCell>
                    <TableCell align="right">
                        <div>
                            <MailIcon fontSize="small"/>
                            {user.email}
                        </div>
                        <div>
                            <LocalPhoneIcon fontSize="small"/>
                            {user.phone}
                        </div>
                    </TableCell>
                </TableRow>
            )
        })
    }

    const renderPage = () => {
        return (
            <>
            <Grid container justifyContent="space-between">
                <Button onClick={() => setOpenForm(true)}>New User</Button>
                <Button onClick={() => handleLogout()}>Log out</Button>
            </Grid>
            {openForm && <NewUserForm open={openForm} handleClose={handleFormClose}/>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell align="right">Contact</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderList()}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
        )
    }

    return (
        <PagePaper>
            {loggedUser.role === "admin" && renderPage()}
        </PagePaper>
    )
}

export default UserList