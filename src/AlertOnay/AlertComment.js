import * as React from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import FormUpdateComment from '../Form/FormUpdateComment';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertComment(props) {
    const [open, setOpen] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(false);

    const [isAction, setIsAction] = React.useState("");

    const commentId = props.commentData.id;
    const commentContent = props.commentData.commentContent;
    const expertAnswer = props.commentData.expertAnswer;
    const commentApprovalStatus = props.commentData.commentApprovalStatus;
    const commentCreateTime = props.commentData.commentCreateTime;


    const [severity, setSeverity] = React.useState("success");
    const [title, setTitle] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [snackBarMessage, setSnackBarMessage] = React.useState("");



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
        setOpen(false);
        setAnchorEl(null);
        setAnchorEl(false);
    };

    const handleClickOpen = (clikAction) => {
        setIsAction(clikAction);
        mesajFunction(clikAction);
    };

    const deleteComment = () => {
        axios.delete("/comments/deleteComment/" + commentId, {});
    }

    const mesajFunction = (clikAction) => {
        if (clikAction === "delete") {
            setTitle("Silme İşlemi");
            setMessage("Bu yorumu silmek istiyor musunuz? (Bu işlem geri Alınamaz)");
            setSeverity("error");
            setSnackBarMessage("Cevap Silindi");
            setOpen(true);
        } else if (clikAction === "expertAnswer") {
            if (expertAnswer) {
                setTitle("Dikkat");
                setMessage("Uzman cevabını kaldırmak istiyor musunuz?");
                setSeverity("warning");
                setSnackBarMessage("Uzman cevap kaldırıldı");
                setOpen(true);
            } else {
                setTitle("Dikkat");
                setMessage("Bu cevabı uzman cevap olarak eklenecek");
                setSeverity("success");
                setSnackBarMessage("Uzman cevap eklendi");
                setOpen(true);
            }
        } else if (clikAction === "commentApprovalStatus") {
            if (commentApprovalStatus) {
                setTitle("Dikkat");
                setMessage("Cevap yayından kaldırılacak?");
                setSeverity("warning");
                setSnackBarMessage("Cevap yayından kaldırıldı");
                setOpen(true);
            } else {
                setTitle("Dikkat");
                setMessage("Bu cevabı yayınlamak istiyor musunuz?");
                setSeverity("success");
                setSnackBarMessage("Cevap yayınlandı");
                setOpen(true);
            }
        } else if (clikAction === "editComment") {
        }
    }

    const islem = () => {
        if (isAction == "delete") {
            deleteComment();
        } else if (isAction == "expertAnswer") {
            updateExpertAnswer();
        } else if (isAction == "commentApprovalStatus") {
            updateApproveComment();
        }
        setOpen(false);
        setSnackbar(true);
        setAnchorEl(null);

    }

    const updateExpertAnswer = () => {
        if (expertAnswer) {
            var updateExpertAnswera = 0;
        } else {
            var updateExpertAnswera = 1;
        }
        axios.put('/comments/updateExpertAnswer/' + commentId, {
            "expertAnswer": updateExpertAnswera
        });
        setOpen(false);
        setAnchorEl(null);

    }

    const updateApproveComment = () => {
        if (commentApprovalStatus) {
            var approveComment = 0;
        } else {
            var approveComment = 1;
        }
        axios.put('/comments/updateApprovalStatus/' + commentId, {
            "commentApprovalStatus": approveComment
        });
        setOpen(false);
    }

    if (expertAnswer) {
        var nameExpertAnswer = "Uzman Cevabı Kaldır";
    } else {
        var nameExpertAnswer = "Uzman Cevab Olarak Ekle";
    }


    if (commentApprovalStatus) {
        var nameApprovalStatus = "Yayından Kaldır";
    } else {
        var nameApprovalStatus = "Yayınla";
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    return (
        <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {snackBarMessage}
                    </Alert>
                </Snackbar>
            </Stack>

            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={openMenu ? 'long-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClickOpen("editComment")} disableRipple>
                    <FormUpdateComment commentId={commentId} commentContent={commentContent} />
                </MenuItem>
                <MenuItem onClick={() => handleClickOpen("commentApprovalStatus")} disableRipple>
                    <AssignmentTurnedInIcon />
                    {nameApprovalStatus}
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => handleClickOpen("expertAnswer")} disableRipple>
                    <MilitaryTechIcon />
                    {nameExpertAnswer}
                </MenuItem>
                <MenuItem color="error" onClick={() => handleClickOpen("delete")} disableRipple>
                    <DeleteIcon color="error" />
                    Delete
                </MenuItem>
            </StyledMenu>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => islem(isAction)}>Evet</Button>
                    <Button onClick={handleClose}>Hayır</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}