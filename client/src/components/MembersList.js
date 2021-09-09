import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const MemberList = ({ members }) => (
    <>
    {members.map((member, key) => (
        <Grid item xs={12} m={6} sm={3} key={key}>
            <Card className="card small">
                <CardMedia
                component="img"
                height="450"
                image={member.imgURL}
                title="Hunter B-15"
                />
                <Typography variant="h5" component="h2" className="cardText">
                    {member.position}
                </Typography>
                <div className="textPanel"></div>
            </Card>
        </Grid>
        
    ))}
    </>
);

export default MemberList;