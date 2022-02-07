import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import AlertDialog from '../Components/AlertDialog';
import { Alert } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const postId = props.postId;
    const postTitle = props.postTitle;
    const postSefLink = props.postSefLink;
    const postContent = props.postContent;
    const postCreateTime = props.postCreateTime;



    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }

                    title={
                        <NavLink to={`/soru/${postSefLink}/${postId}`}>
                            {postTitle}
                        </NavLink>
                    }
                    subheader={postCreateTime}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {postContent}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <AlertDialog id={postId} name="Delete" title="Silme İşlemi" message="Bu soruyu silmek istiyor musunuz? (Bu işlem geri Alınamaz)" field="post" />
                </CardActions>
            </Card>
            <br />
        </>
    );
}