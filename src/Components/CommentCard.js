import React from 'react';
import { } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import AlertComment from '../AlertOnay/AlertComment';
import { Chip } from '@mui/material';
import { Check } from '@mui/icons-material';

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

import TextField from '@mui/material/TextField';

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


export default function CommentCard(props) {
    const commentId = props.commentId;
    const commentContent = props.commentContent;
    const expertAnswer = props.expertAnswer;
    const commentCreateTime = props.commentCreateTime;

    const commentData = [
        { commentId: props.commentId },
        { commentContent: props.commentContent },
        { expertAnswer: props.expertAnswer },
        { commentCreateTime: props.commentCreateTime }
    ];


    const renderElement = () => {
        if (expertAnswer) {
            return (
                <Chip
                    justifyContent="end"
                    color="success"
                    label={
                        <span>
                            Uzman Cevap
                        </span>
                    }
                    icon={<MilitaryTechIcon fontSize="small" />}
                />
            );
        }

    }

    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={<AlertComment commentData={props} />}
                    subheader={commentCreateTime}
                    title="sdsad"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {commentContent}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {renderElement()}
                </CardActions>
            </Card>
            <br />
        </>
    );

}