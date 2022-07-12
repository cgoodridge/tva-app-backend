import { Container } from '@material-ui/core';
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useState } from 'react';
import '../css/sacredTimeline.css';

const SacredTimeline = ({ glow = null }) => {




    useEffect(() => {

        anime({
            targets: '#timeline .curve',
            strokeDashoffset: [anime.setDashoffset, 2],
            easing: 'linear',
            duration: 50000,
            delay: function (el, i) { return i * 250 },
            direction: 'normal',
            loop: true
        });
    })

    const [loops, SetLoop] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const style = {
        // filter: `url(#${glow})`,
        fillOpacity: 0,
        strokeWidth: 2,

    }

    return (

        <Container sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <svg id="timeline" height="500px" width="100%" viewBox='100 100 500 500'>

                <line x1="-4500" y1="150" x2="1000" y2="150" stroke='red' strokeWidth="5px" />

                {loops.map((key) => (
                    <TimelineBranch key={key} />
                ))}
                <path id="sacredTimeline" d="M -1000, 400 C0,100 5000,600 5000,120" stroke='white' fill='none' strokeWidth="8px" />
                <line x1="-1000" y1="500" x2="1500" y2="500" stroke='red' strokeWidth="5px" />




            </svg>
        </Container>

    );
}

const TimelineBranch = () => {
    /// Buckle up buttercup this is gonna be complex

    // By default curves have 3 points, lets call them A, B, C
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
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        setNum(randomNumberInRange(100, 750));
        setArcVerticalNum(randomNumberInRange(-500, 500));
        setTimelineVEndLocation(randomNumberInRange(-310, 310))
    }, []);

    return (
        <path className="curve" d={`M -250, 310 C100,${arcVerticalNum} 100,${num} 1000,${timelineVEndLocation} s100, 100 100, 0`} stroke="orange" strokeWidth="5px" />
    );
}

export default SacredTimeline;