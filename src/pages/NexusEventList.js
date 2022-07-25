
import React, { useState, useEffect} from 'react';
import EventList from '../components/EventList';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SacredTimeline from '../components/SacredTimeline';

const NexusEventListPage = () => {

    const [nexusEvents, setNexusEventList] = useState([]);
    
    useEffect(() => {


        const fetchData = async () => {
            const result = await fetch(`/api/nexus-events`);
            const body = await result.json();
            setNexusEventList(body);
        }
        fetchData();

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
            
                <SacredTimeline />
            
            <Container>
                <EventList nexusEvents={nexusEvents} />
            </Container>
        </>
    )


}

export default NexusEventListPage;