import React from 'react';

function Hero() {
    return (
        <div className='container text-center'>
            <h2 className='mt-5'>Charges</h2>
            <p>List of all charges and taxes</p>
            <div className='row ' style={{marginTop:"80px"}}>

                <div className='col-4'>
                    <img src='/media/pricingMF.svg'/>
                    <h3>Free equity delivery</h3>
                    <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage</p>
                </div>
                 <div className='col-4'>
                    <img src='/media/pricingMF.svg'/>
                    <h3>Intraday and F&O trades</h3>
                    <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                 <div className='col-4'>
                    <img src='/media/pricingMF.svg'/>
                    <h3>Free direct MF</h3>
                    <p>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;