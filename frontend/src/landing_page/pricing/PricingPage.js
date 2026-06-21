import React from 'react';
import Brokeage from './Brokeage';
import Hero from './Hero';
import OpenAccount from '../OpenAccount';


function HomePage() {
    return ( 
        <>
        <Hero/>
        <OpenAccount/>
        <Brokeage/>
        </>
     );
}

export default HomePage;