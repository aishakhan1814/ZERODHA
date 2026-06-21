import React from 'react';


function Education() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 p-3'>
                    <img src='/media/education.svg'/>
                </div>
                <div className='col-6 mt-7 p-1'>
                    <h1 className='mt-10 mb-6 p-7 fs-2'>Free and open market education</h1>
                    <p className='text-muted mt-4'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href='' style={{textDecoration:"none"}}>Varsity<i class="fa-solid fa-arrow-right"></i></a>
                    <p className='text-muted mt-4'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href=''style={{textDecoration:"none"}}>TradingQ&A<i class="fa-solid fa-arrow-right"></i></a>
                </div>

            </div>
        </div>
    );
}

export default Education;