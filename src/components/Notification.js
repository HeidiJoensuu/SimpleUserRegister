import { Alert, Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { dismissMessage } from "../reducers/usersReducer";

const Notification = () => {
    const dispatch = useDispatch()
    const {message} = useSelector(state => state.users)

    const handleClose = () => {
        dispatch(dismissMessage())
    }

    return (
        <Snackbar open={message !== ""}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notification