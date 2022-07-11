import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import '../css/memberList.css';

const SimpleDialog = (props) => {
    const { onClose, selectedValue, open, memberName, memberPosition, memberBio, memberImgURL } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{memberName}</DialogTitle>
            <DialogContent>

                <Grid container>
                    <Grid item xs={6}>
                        <img className='imageStyle' src={memberImgURL} alt={memberName} width="80%"></img>
                    </Grid>
                    <Grid item xs={6}>
                        <DialogContentText id="alert-dialog-description">
                            {memberBio}
                        </DialogContentText>
                        {/* <DialogContentText id="alert-dialog-description">
                            Locate
                        </DialogContentText> */}
                    </Grid>
                </Grid>


            </DialogContent>
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
    return (
        <>
            {members.map((member, key) => (
                <MemberCard member={member} key={key} />
            ))}
        </>
    );
}

const MemberCard = ({ member }) => {

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
        <Grid item xs={12} m={6} sm={3}>
            <Card className="card small" onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
                <CardMedia
                    component="img"
                    height="450"
                    image={member.imgURL}
                    title={member.memberName}
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
                memberImgURL={member.imgURL}
            />
        </Grid>
    );


}

export default MemberList;