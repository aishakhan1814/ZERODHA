import React from 'react';
import { Link } from "react-router-dom";
function Navbar() {
    return (
        
            <nav class="navbar navbar-expand-lg p-2 navbar-light border-bottom" style={{backgroundColor:"#fff"}}>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <Link class="navbar-brand" to="/">
                    <img class='p-3' src='/media/logo.svg' alt='img' style={{width:"25%"}}/>
                </Link>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/signUp">Signup</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/about">About</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/product" >Products</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link " to="/pricing" >Pricing</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link " to="/support" >Support</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link " to="/" ><i class="fa-solid fa-bars"></i></Link>
                        </li>
                    </ul>
                   
                </div>
            </nav>
        
    );
}

export default Navbar;