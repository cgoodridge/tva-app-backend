import Container from '@mui/material/Container';
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useState } from 'react';
import '../css/sacredTimeline.css';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const SacredTimeline = ({ nexusEvents }) => {

    useEffect(() => {

        anime({
            targets: '#timeline .curve',
            strokeDashoffset: [anime.setDashoffset, 2],
            easing: 'linear',
            duration: 50000,
            delay: function (el, i) { return i * 250 },
            direction: 'normal',
            loop: false
        });
    })

    const [loops] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return (

        <Container sx={{ display: 'flex', alignItems: 'center', height: '100%', overflowX: "scroll" }}>
            <svg id="timeline" height="500px" width="100%" viewBox='-100 -100 100 100'>
                <line x1="-200" y1="-95" x2="100" y2="-95" stroke='red' strokeWidth="1px" />
                {nexusEvents.map((eventData, key) => (
                    <>
                        <TimelineBranchPoint eventData={eventData} key={key} />
                        {/* <TimelineBranchPoint key={key} /> */}
                    </>
                ))}
                <path id="sacredTimeline" d="M -200,-52.5   C0,-52.5   0,-52.5   5000,-52.5" stroke='white' fill='none' strokeWidth="1px" />

                <line x1="-200" y1="-10" x2="100" y2="-10" stroke='red' strokeWidth="1px" />
            </svg>
        </Container>

    );
}


const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 500,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const TimelineBranchPoint = ({ eventData }) => {
    /// Buckle up buttercup this is gonna be complex.

    // Number of branch points on the timeline.
    const [branchPoints] = useState([1, 2, 3, 4, 5]);

    // By default curves have 3 points, lets call them A, B, C.
    const [controlVPoint, setVControlPoint] = useState(0);
    const [controlHPoint, setHControlPoint] = useState(100);

    // This is point A-Horizontal, where the curve starts on the X or Horizontal axis. 
    const [timelineHStartLocation, setTimelineHStartLocation] = useState(0);
    // This is point A-Vertical, where the curve starts on the Y or Vertical axis
    const [timelineVStartLocation, setTimelineVStartLocation] = useState(-52.5);

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

        setVControlPoint(randomNumberInRange(100, 200));
        // setArcVerticalNum(randomNumberInRange(-100, 100));
        setTimelineHStartLocation(randomNumberInRange(-170, 70));
        setTimelineVEndLocation(randomNumberInRange(-100, -95))
        setTimelineHEndLocation(randomNumberInRange(-170, 70));

    }, []);

    return (
        <>


            <HtmlTooltip
                title={
                    <>
                        <Typography variant="h6" gutterBottom component="div" color="inherit">{eventData.eventTitle}</Typography>
                        <Typography variant="subtitle1" gutterBottom component="div" color="inherit">{eventData.introText}</Typography>


                    </>
                }
            >
                <g stroke="white" stroke-width="2" fill='white'>
                    <circle id="pointA" className='timelinePoint' cx={timelineHStartLocation} cy={timelineVStartLocation} r="1" />
                </g>
            </HtmlTooltip>
            <path className="curve" d={`M${timelineHStartLocation},${timelineVStartLocation} Q${controlHPoint},${controlVPoint} ${timelineHEndLocation},70`} stroke="orange" strokeWidth="1px" stroke-linecap="round" fill="none" />

        </>
    );

}

export default SacredTimeline;