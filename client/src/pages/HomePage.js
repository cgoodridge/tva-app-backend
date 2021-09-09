import React from 'react';
import Typical from 'react-typical';
import LazyHero from 'react-lazy-hero';

const HomePage = () => (
    <>
    
        {/* <div className="heroSection"> */}
        <LazyHero imageSrc="./images/tva.jpeg" parallaxOffset={50} color="#000" minHeight="70vh">
            <h1 className="heroText">Welcome to the <br/> <span className="heroStyle">T</span><Typical steps={['', 1000, 'ime', 1500]} loop={1} wrapper="span"/> <span className="heroStyle">V</span><Typical steps={['', 1500, 'ariance', 2000]} loop={1} wrapper="span"/> <span className="heroStyle">A</span><Typical steps={['', 2500, 'uthority', 2500]} loop={1} wrapper="span"/></h1>
        </LazyHero>

        {/* </div> */}

        <div className="videoHeading">
            <h2>Orientation Video</h2>
        </div>
        <div className="videoSection">
            <iframe className="responsive-iframe" width="760" height="515" src="https://www.youtube-nocookie.com/embed/5vpCIadly88?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </>
    
)

export default HomePage;