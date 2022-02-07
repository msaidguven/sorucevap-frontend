import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbar(props) {

    const severity = props.severity;
    const snackbarMessage = props.snackbarMessage;

    const [openSnackBar, setOpenSnackBar] = React.useState(true);
    //const [severity, setSeverity] = React.useState("");
    //const [snackbarMessage, setSnackBarMessage] = React.useState("");

    const handleClick = () => {
        setOpenSnackBar(true);
    };

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
