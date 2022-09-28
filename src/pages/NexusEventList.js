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
import TimelineEventList from '../components/TimelineEventList';

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
    const [timelineEvents, setTimelineEvents] = useState([]);

    useEffect(() => {
        return database.collection('events').onSnapshot((snapshot) => {
            const eventData = [];
            snapshot.forEach(doc => eventData.push({ ...doc.data(), id: doc.id, firstName: doc.data().firstName, lastName: doc.data().lastName, role: doc.data().role, email: doc.data().email, bio: doc.data().bio }));
            setNexusEventList(eventData);
        });
    }, []);

    useEffect(() => {
        return database.collection('timelineEvents').onSnapshot((snapshot) => {
            const timelineEventData = [];
            snapshot.forEach(doc => timelineEventData.push({ ...doc.data(), id: doc.id, name: doc.data().name, phase: doc.data().phase, releaseDate: doc.data().releaseDate }));
            setTimelineEvents(timelineEventData);
        });
    }, []);

    return (
        <>
            <Container>
                <Grid container >
                    <Grid item xs={6} sm={6}>
                        <h1 className="pageHeader">Sacred Timeline</h1>
                    </Grid>
                    <Grid item xs={6} sm={6} container>
                        <Grid item xs={6} sm={6}>
                            <h4 className="pageHeader">Multiple Nexus Events Detected!</h4>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <div className="redLight"></div>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <SacredTimeline timelineEvents={timelineEvents} />

            <EventTabs nexusEvents={nexusEvents} timelineEvents={timelineEvents} />
        </>
    )


}

const EventTabs = ({ nexusEvents, timelineEvents }) => {

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
                <TimelineEventList timelineEvents={timelineEvents} nexusEvents={nexusEvents} />
            </TabPanel>

        </Box>

    );
}

export default NexusEventListPage;