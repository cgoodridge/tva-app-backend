import React, { useState, useEffect } from 'react';
import threatContent from './threat-content';
import AddCommentForm from '../components/AddCommentForm';
import CommentsList from '../components/CommentsList';
import NotFoundPage from './NotFoundPage';
import ThreatList from '../components/EventList';
import ThreatLevelSection from '../components/ThreatLevelSection';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typical from 'react-typical';
import moment from 'moment';
import '../css/eventDetails.css';


const EventDetailPage = ({ match }) => {


    
    const code = match.params.code;

    const [eventInfo, setEventInfo] = useState({code: '', date: '', pageTitle: '', titleImg: '', introText: '', changedText: '', extraText: '', originalText: '', scenarioText: '', bodyImg: '', notableChange: []});

    useEffect(() => {

        const fetchData = async () => {
            const result = await fetch(`/api/nexus-events/${code}`);
            const body = await result.json();
            setEventInfo(body);
        }
        fetchData();
        
    }, [code]);

    if (!code) return <NotFoundPage />

    return(
        <>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container style={{paddingTop: '32px', paddingBottom: '32px'}}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" component="h6" className="pageHeader" style={{textAlign:'left'}} gutterBottom>
                            {eventInfo.pageTitle}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" component="h2" className="pageHeader" style={{textAlign:'right'}} gutterBottom>
                            {eventInfo.date === null ? '' : moment(eventInfo.date).format('MMM DD, YYYY')}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container style={{paddingTop: '32px', paddingBottom: '32px'}}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" className="pageHeader" style={{textAlign:'left', lineHeight: '2.0'}} gutterBottom>
                            {eventInfo.introText} 
                        </Typography>
                        <Typography variant="body1" component="h2" className="pageHeader" style={{textAlign:'left', lineHeight: '2.0'}} gutterBottom>
                            {eventInfo.scenarioText} <Typical steps={[eventInfo.originalText, 8000, eventInfo.changedText, 3000]} loop={1} wrapper="span"/> 
                            {eventInfo.extraText === "" ? console.log("Extra text is empty") : <Typical steps={["", 15000, eventInfo.extraText, 5000]} loop={1} wrapper="span"/> }
                        </Typography>
                        <Typography variant="body1" component="h2" className="pageHeader" style={{textAlign:'left', lineHeight: '2.0'}} gutterBottom>
                            {eventInfo.bodyText}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="pageImage">
                            <img src={eventInfo.titleImg} alt="Captain Carter" style={{width:'90%'}}></img>
                        </div>
                    </Grid>
                </Grid>

                

                <Grid container style={{paddingTop: '32px', paddingBottom: '32px'}}>
                    <Grid item xs={12} sm={6}>
                        <div className="pageImage" style={{paddingTop: '32px', paddingBottom: '32px'}}>
                            <img src={eventInfo.bodyImg} alt={eventInfo.pageTitle} style={{width:'90%'}}></img>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {eventInfo.notableChange.map((change, key) => (
                            <Typography key={key} variant="body1" component="h2" className="pageHeader" style={{textAlign:'left', lineHeight: '2.0'}} gutterBottom>
                                {change}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>   
                
                <Typography variant="body1" component="h2" className="pageHeader" style={{textAlign:'left', lineHeight: '2.0'}} gutterBottom>
                    Some info taken from Marvel Cinematic Universe Wiki pages
                </Typography>
            </Container>
            
            {/* <ThreatLevelSection threatName={name} threatLevel={threatInfo.threatLevel} setThreatInfo={setThreatInfo}/>
            {threat.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <AddCommentForm threatName={name} setThreatInfo={setThreatInfo} />
            <CommentsList comments={threatInfo.comments} /> */}
        
        </>
    );
    
    
}

export default EventDetailPage;