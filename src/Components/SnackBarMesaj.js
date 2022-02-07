import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarMesaj(props) {
    const [snackbar, setSnackbar] = React.useState(true);

    const message = props.message;
    const severity = props.severity;

    const handleClick = () => {
        setSnackbar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };

    return (
        <>
            {handleClick}
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="outlined" onClick={handleClick}>
                    Open success snackbar
                </Button>
                <Snackbar open={snackbar} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}
