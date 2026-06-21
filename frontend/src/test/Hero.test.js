import React from 'react';

import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Hero from '../landing_page/home/Hero';

describe('Hero Component',()=>{
    test("renders home image",()=>{
        render(<Hero/>);
        const heroImage=screen.getByAltText('hero img');
        expect(heroImage).toBeInTheDocument();
expect(heroImage).toHaveAttribute("src", "media/homeHero.png");    })
})