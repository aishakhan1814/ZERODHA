import React from 'react';

function Brokeage() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h4  className='text-center'style={{color:"blue" }}>Brokeage calculator</h4>
                    <ul className='text-muted' style={{lineHeight:"1.8"}}>
                        <li>Call in, trade in RMS auto square off, additional charges of Rs. 50 plus GST per order. </li>
                        <li>Digital contract notes will be sent via email. </li>
                        <li>Physical copies of contract notes, if required, shall be charged at Rs. 50. </li>
                        <li>For an RA account, non-PIS 0.5% or ₹100 per executed order </li>
                        <li>If the account is in debit balance, any order placed will be charged Rs 40 per executed order. </li>
                    </ul>
                </div>
                <div className='col'>
                    <h4 className='text-center'style={{color:"blue"}}>List Of Charges</h4>
                </div>

            </div>
        </div>
     );
}

export default Brokeage;