import React from 'react';

function Pricing() {
    return (
        <div className='container mb-5'>
            <div className='row'>
                <div className='col-4'>
                    <h1 className='fs-2'>Unbeatable pricing</h1> 
                    <p className='text-muted'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <div><a href='' style={{textDecoration:"none"}}>See pricing<i class="fa-solid fa-arrow-right"></i></a></div>
                    </div>
                <div className='col-2'> </div>
                <div className='col-6'>
                    <div className='row text-cen'>
                        <div className='col-6 p-3 mt-2  border'>
                        <h1>$4</h1>
                        <p> Free equity Delivery and
                          <br/> direct mutual funds </p>
                        </div>
                        <div className='col-6 mt-2 p-3 border'>
                        <h1>$20</h1>
                        <p>Intraday and F&O </p>
                        </div>
                    </div>
                     </div>

            </div>
        </div>
    );
}

export default Pricing;