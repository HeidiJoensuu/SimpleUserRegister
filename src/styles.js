import styled from "@emotion/styled"
import { Box, Modal, Paper, createTheme } from "@mui/material"

export const theme = createTheme(
    {
        typography: {
            h2: {
                fontSize: "20px",
                fontWeight: 'bold'
            },
            body3: {
                fontWeight: 'bold'
            }
        },
        components: {
            MuiStack: {
                defaultProps: {
                    useFlexGap: true,
                    alignItems: "baseline"
                },
            },
        }
    }
)

export const PagePaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(3)
}))

export const NewUserBox = styled(Box)(() => ({
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: "white"
}))

export const NewUserModal = styled(Modal)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

export const LoginBox = styled(Box)(() => ({
    border: "3px ridge blue",
    width: '400px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
}))