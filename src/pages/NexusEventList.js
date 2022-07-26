import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SacredTimeline from '../components/SacredTimeline';
import { database } from '../firebase/auth';

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

            <SacredTimeline nexusEvents={nexusEvents}/>

            <Container>
                <EventList nexusEvents={nexusEvents} />
            </Container>
        </>
    )


}

export default NexusEventListPage;