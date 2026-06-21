import React from 'react';

function CreateTicket() {
    return (
        <div className='container supportFooter'>
            <h3 className='mb-5 mt-5'> To Create a ticket,select a relevant topic. </h3>
            <footer className='supportFooter'>
                <div className='row mb-5 mt-5'>
                    <div className='col-4'>
                        <h4><i class="fa-solid fa-circle-plus"></i>Account Opening</h4>
                        <ul className='supportFooter' >
                            <li><a href=''>Online account opening </a></li>
                            <li><a href=''>Offline account opening</a></li>
                            <li><a href=''>NRI Account Opening </a></li>
                            <li><a href=''>Charges at Zerodha </a></li>
                            <li><a href=''>Company Partnership and HUF Account Opening </a></li>
                            <li><a href=''>Getting Started </a></li>
                        </ul>
                    </div>
                    <div className='col-4'>
                        <h4><i class="fa-regular fa-circle-user"></i>Your Zerodha account </h4>
                        <ul>
                            <li><a href=''>Login Credence </a></li>
                            <li><a href=''>Account Modification and Segment Addition </a></li>
                            <li><a href=''>DP ID and bank details </a></li>
                            <li><a href=''>Your profile. </a></li>
                            <li><a href=''>Transfer and Conversion of Shares </a></li>
                        </ul>
                    </div>
                    <div className='col-4'>
                        <h4><i class="fa-solid fa-chart-line"></i>Kite</h4>
                        <ul>
                            <li><a href=''>Margin/Leverage Product and Audio Types </a></li>
                            <li><a href=''>Kite Web and Mobile </a></li>
                            <li><a href=''>Trading FAQs </a></li>
                            <li><a href=''>Sentinel. </a></li>
                            <li><a href=''>Kite API</a></li>
                            <li><a href=''>GTT</a></li>
                            <li><a href=''>Stockreports+</a></li>


                        </ul>
                    </div>
                </div>
                 <div className='row mb-5 mt-5'>
                    <div className='col-4'>
                        <h4><i class="fa-solid fa-money-bills"></i>Funds</h4>
                        <ul className='supportFooter' >
                            <li><a href=''> Add money. </a></li>
                            <li><a href=''>Withdraw money. </a></li>
                            <li><a href=''>Add bank accounts</a></li>
                            <li><a href=''>eMandates </a></li>

                        </ul>
                    </div>
                    <div className='col-4'>
                        <h4><i class="fa-solid fa-gamepad"></i>Console </h4>
                        <ul>
                            <li><a href=''>Portfolio </a></li>
                            <li><a href=''>Corporate Action  </a></li>
                            <li><a href=''>Funds statement </a></li>
                            <li><a href=''>Reports </a></li>
                            <li><a href=''>Profile </a></li>
                        </ul>
                    </div>
                    <div className='col-4'>
                        <h4><i class="fa-brands fa-btc"></i>Coin</h4>
                        <ul>
                            <li><a href=''>Margin/Leverage Product and Audio Types </a></li>
                            <li><a href=''>Mutual Funds </a></li>
                            <li><a href=''>National Benson Scheme NPS  </a></li>
                            <li><a href=''>FD </a></li>
                            <li><a href=''>Kite API</a></li>
                            <li><a href=''>Features on Coin</a></li>
                            

                        </ul>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default CreateTicket;