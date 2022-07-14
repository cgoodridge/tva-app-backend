import { Container } from '@material-ui/core';
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useState } from 'react';
import '../css/sacredTimeline.css';

const SacredTimeline = () => {

    useEffect(() => {

        anime({
            targets: '#timeline .curve',
            strokeDashoffset: [anime.setDashoffset, 2],
            easing: 'linear',
            duration: 500000,
            delay: function (el, i) { return i * 250 },
            direction: 'normal',
            loop: false
        });
    })

    const [loops] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return (

        <Container sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <svg id="timeline" height="500px" width="100%" viewBox='-100 -100 100 100'>

                <line x1="-200" y1="-95" x2="100" y2="-95" stroke='red' strokeWidth="1px" />

                {loops.map((key) => (
                    <>
                        <TimelineBranchPoint key={key} />
                        {/* <TimelineBranchPoint key={key} /> */}
                    </>
                ))}
                <path id="sacredTimeline" d="M -200, -52.5   C0,-52.5 0,-52.5   5000,-52.5" stroke='white' fill='none' strokeWidth="1.5px" />
                <line x1="-200" y1="-10" x2="100" y2="-10" stroke='red' strokeWidth="1px" />

            </svg>
        </Container>

    );
}

const TimelineBranchPoint = () => {
    /// Buckle up buttercup this is gonna be complex.

    // Number of branch points on the timeline.
    const [branchPoints] = useState([1, 2, 3, 4, 5]);
    // By default curves have 3 points, lets call them A, B, C.
    const [num, setNum] = useState(0);

    // This is point A-Horizontal, where the curve starts on the X or Horizontal axis. 
    const [timelineHStartLocation, setTimelineHStartLocation] = useState(0);
    // This is point A-Vertical, where the curve starts on the Y or Vertical axis
    const [timelineVStartLocation, setTimelineVStartLocation] = useState(0);

    // This is point B-Horizontal, where the midpoint of the exist on the X or Horizontal axis. This is the bending point for the curve.
    const [arcHorizontalNum, setArcHorizontalNum] = useState(0);
    // This is point B-Vertical, where the midpoint of the exist on the Y or Vertical axis. 
    const [arcVerticalNum, setArcVerticalNum] = useState(0);

    // This is point C-Horizontal, where the curve ends on the X or Horizontal axis.
    const [timelineHEndLocation, setTimelineHEndLocation] = useState(0);
    // This is point C-Vertical, where the curve ends on the Y or Vertical axis.
    const [timelineVEndLocation, setTimelineVEndLocation] = useState(0);

    const randomNumberInRange = (min, max) => {
        // Get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /// Makes sure all variables for the horizonal axis are relative to each other to avoid strange behaviour on the timeline
    const randomNumberChecker = (startPoint, endPoint) => {
        return startPoint >= endPoint;
    }


    useEffect(() => {

        setNum(randomNumberInRange(100, 500));
        setArcVerticalNum(randomNumberInRange(-500, 500));
        setTimelineHStartLocation(randomNumberInRange(-170, 70));
        setTimelineVEndLocation(randomNumberInRange(-100, -950))
        setTimelineHEndLocation(randomNumberInRange(-170, 70));

    }, []);
    console.log("Timeline start value " + timelineHStartLocation);
    console.log("Timeline end value " + timelineHEndLocation);

    return (
        <>
            {/* {branchPoints.map(() => ( */}
            {/* // ))} */}

            <path className="curve" d={`M ${timelineHStartLocation}, -52.5 C100,-52.5 100,${num} ${timelineHEndLocation},${timelineVEndLocation} s100, 100 100, 0`} stroke="orange" strokeWidth="1px" stroke-linecap="round" />

            {/* <path className="curve" d={`M -140, -52.5 C150,${arcVerticalNum} 100,${num} 1000,${timelineVEndLocation} s100, 100 100, 0`} stroke="orange" strokeWidth="1px" stroke-linecap="round" />
            <path className="curve" d={`M -110, -52.5 C150,${arcVerticalNum} 100,${num} 1000,${timelineVEndLocation} s100, 100 100, 0`} stroke="orange" strokeWidth="1px" stroke-linecap="round" />
            <path className="curve" d={`M -90, -52.5 C150,${arcVerticalNum} 100,${num} 1000,${timelineVEndLocation} s100, 100 100, 0`} stroke="orange" strokeWidth="1px" stroke-linecap="round" />
            <path className="curve" d={`M -60, -52.5 C150,${arcVerticalNum} 100,${num} 1000,${timelineVEndLocation} s100, 100 100, 0`} stroke="orange" strokeWidth="1px" stroke-linecap="round" /> */}
        </>
    );

}

export default SacredTimeline;