import * as React from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const deleteComment = () => {
        axios.delete("/comments/deleteComment/" + props.id, {});
    }
    const deletePost = () => {
        axios.delete("/posts/deletePost/" + props.id, {});
    }

    const deleteId = () => {
        if (props.field == "comment") {
            deleteComment();
        } else if (props.field == "post") {
            deletePost();
        }
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button
                style={{ margin: "auto" }}
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={handleClickOpen}
            >
                {props.name}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteId}>Evet</Button>
                    <Button onClick={handleClose}>Hayır</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
