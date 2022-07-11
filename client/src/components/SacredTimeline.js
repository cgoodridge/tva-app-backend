import { Container } from '@material-ui/core';
import anime from 'animejs/lib/anime.es.js';
import { useEffect } from 'react';
import '../css/sacredTimeline.css';

const SacredTimeline = () => {

    useEffect(() => {
        anime({
            targets: '#curve path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 5000,
            delay: function (el, i) { return i * 250 },
            direction: 'alternate',
            loop: true
        });
    }, [])

    return (
        // <Container>
        <svg id="timeline" height="300px" width="100%" viewBox='0 0 500 500'>
            <path id="curve" d="M -1200, 200 C100,100 400,150 5000,120" stroke='orange' />
        </svg>
        // </Container>
    );
}

export default SacredTimeline;