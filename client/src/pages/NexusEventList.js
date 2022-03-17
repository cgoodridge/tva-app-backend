
import React, { useState, useEffect, useRef } from 'react';
import threatContent from './threat-content';
import EventList from '../components/EventList';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Box, Typography } from '@material-ui/core';

const NexusEventListPage = () => {

    const [nexusEvents, setNexusEventList] = useState([]);
    const canvas = useRef();
    let ctx = null;

    // initialize the canvas context
    useEffect(() => {
        // dynamically assign the width and height to canvas
        // const canvasEle = canvas.current;
        // canvasEle.width = canvasEle.clientWidth;
        // canvasEle.height = canvasEle.clientHeight;

        // get context of the canvas
        // ctx = canvasEle.getContext("2d");
    }, []);

    useEffect(() => {

        // const r2Info = { x: 100, y: 100, w: 80, h: 150 };
        // drawRect(r2Info);

    }, []);

    // draw rectangle
    // const drawRect = (info, style = {}) => {
    //     const { x, y, w, h } = info;
    //     const { borderColor = 'black', borderWidth = 1 } = style;

    //     ctx.beginPath();
    //     ctx.strokeStyle = borderColor;
    //     ctx.lineWidth = borderWidth;
    //     ctx.rect(x, y, w, h);
    //     ctx.stroke();
    // }

    useEffect(() => {


        const fetchData = async () => {
            const result = await fetch(`/api/nexus-events`);
            const body = await result.json();
            setNexusEventList(body);
            console.log(body);
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
            
                <Typography variant="h5" className="errorMessage">
                    Howdy y'all, the sacred timeline suffered some nasty damage, but our minutemen are working their very hardest to get it back up and running!
                </Typography>
            


            <Container>
                <EventList nexusEvents={nexusEvents} />
            </Container>
        </>
    )


}

export default NexusEventListPage;