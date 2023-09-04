import { useDispatch } from "react-redux";
import { Button, Grid, TextField, Typography } from "@mui/material"
import { NewUserBox, NewUserModal } from "../styles"
import { useForm } from "react-hook-form";
import { createUser } from "../reducers/usersReducer";

const NewUserForm = ({open, handleClose}) => {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        dispatch(createUser(data))
        handleClose()
    }

    return (
        <NewUserModal open={open}>
            <NewUserBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Typography variant="h2">
                        Personal info
                    </Typography>
                    <Grid container>
                        <Grid item>
                            <TextField required label="Username" {...register("username", {required: true, pattern: /^[A-Za-z]+$/i})}/>
                            <TextField required label="Name" helperText="Firstname Lastname" {...register("name", {required: true})}/>
                        </Grid >
                        <Grid item>
                            <TextField required label="Phone" {...register("phone", {required: true})} />
                            <TextField required label="Email" type={"email"} {...register("email", {required: true})} />
                            <TextField required label="Website" {...register("website", {required: true})} />
                        </Grid >
                    </Grid>
                </div>
                <div>
                <Typography variant="h2">
                    Company
                </Typography>
                <TextField required label="Name" {...register("companyName", {required: true})} />
                <TextField required label="Catch Phrase" {...register("catchPhrase", {required: true})} />
                <TextField required label="bs" {...register("bs", {required: true})} />
                </div>
                <div>
                <Typography variant="h2">
                    Address
                </Typography>
                
                <TextField required label="City" {...register("city", {required: true})} />
                <TextField required label="Zipcode"  {...register("zipcode", {required: true})}/>
                <TextField required label="Street" {...register("street", {required: true})} />
                <TextField required label="Suite" {...register("suite", {required: true})} />
                </div>
                <div>
                <Typography variant="h2">
                    Template password
                </Typography>
                <TextField required label="Password" {...register("password", {required: true})} />
                </div>
                <Grid container justifyContent="space-between">
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button type="submit">Save</Button>
                </Grid>
                </form>
            </NewUserBox>
        </NewUserModal>
    )
}
export default NewUserForm