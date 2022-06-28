import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';

const SimpleDialog = (props) => {
    const { onClose, selectedValue, open, memberName, memberPosition, memberBio } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{memberPosition}</DialogTitle>
            <List sx={{ pt: 0 }}>



            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    memberPosition: PropTypes.string.isRequired,
    memberBio: PropTypes.string.isRequired,
    memberName: PropTypes.string.isRequired,
};


const MemberList = ({ members }) => {


    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();

    const handleClickOpen = () => {
        console.log("Test");
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <>
            {members.map((member, key) => (
                <Grid item xs={12} m={6} sm={3} key={key} >
                    <Card className="card small" onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
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
                    <SimpleDialog
                        key={member.name}
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                        memberPosition={member.position}
                        memberName={member.name}
                        memberBio={member.bio}
                    />
                </Grid>

            ))}
        </>
    );
}

export default MemberList;