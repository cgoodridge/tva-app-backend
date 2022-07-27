import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SacredTimeline from '../components/SacredTimeline';
import { database } from '../firebase/auth';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const NexusEventListPage = () => {

    const [nexusEvents, setNexusEventList] = useState([]);




    useEffect(() => {
        return database.collection('events').onSnapshot((snapshot) => {
            const eventData = [];
            snapshot.forEach(doc => eventData.push({ ...doc.data(), id: doc.id, firstName: doc.data().firstName, lastName: doc.data().lastName, role: doc.data().role, email: doc.data().email, bio: doc.data().bio }));
            setNexusEventList(eventData);
        });
    }, []);

    return (
        <>
            <Container>
                <Grid container >
                    <Grid item xs={12} sm={6}>
                        <h1 className="pageHeader">Sacred Timeline</h1>
                    </Grid>
                    <Grid item xs={12} sm={6} container>
                        <Grid item xs={12} sm={7}>
                            {/* <h2 className="pageHeader">Multiple Nexus Events Detected!</h2> */}
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            {/* <div className="redLight"></div> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            {/* <div className="sacredTimeline">
            <video autoPlay loop muted>
                <source src="./video/sacred_timeline.mp4" type="video/mp4"></source>
            </video>
        </div> */}

            {/* <canvas ref={canvas}></canvas> */}

            <SacredTimeline nexusEvents={nexusEvents} />

            <EventTabs nexusEvents={nexusEvents} />
        </>
    )


}

const EventTabs = ({ nexusEvents }) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '80%', margin: '0 auto' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Nexus Events" {...a11yProps(0)} sx={{ color: 'white' }} />
                    <Tab label="Timeline Events" {...a11yProps(1)} sx={{ color: 'white' }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <EventList nexusEvents={nexusEvents} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>

        </Box>

    );
}

export default NexusEventListPage;