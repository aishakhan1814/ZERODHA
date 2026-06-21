import React from 'react';

function Footer() {
    return (
        <footer>

        <div className='container border-top mt-5'>
            <div className='row mt-5'>
                <div className='col'>
                    <img src='/media/logo.svg' alt='img' style={{ width: "20%" }} />
                    <p>© 2010 - 2026, Zerodha Broking Ltd.

                        All rights reserved.</p>
                        <div className='mt-4 mb-3 '><i class="fa-brands fa-x-twitter"></i>
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-linkedin"></i>
                        </div>
                        <div className='mt-4 mb-3'>
                            <i class="fa-brands fa-youtube"></i>
                            <i class="fa-brands fa-whatsapp"></i>
                            <i class="fa-brands fa-telegram"></i>
                        </div>
                        <div className='mt-4 mb-3'>
                            <img src='/media/googlePlayBadge.svg' alt='img'/>
                            <img src='/media/appStoreBadge.svg' alt='img'/>

                        </div>

                </div>
                <div className='col'>
                    <p>Company</p>
                    <a href=''>About</a><br/>

                    <a href=''>Philosophy</a><br/>
                    <a href=''>Press & media</a><br/>
                    <a href=''>Careers</a><br/>
                    <a href=''>Zerodha Cares (CSR)</a><br/>
                    <a href=''>Zerodha.tech</a><br/>
                    <a href=''>Open source</a><br/>
                    <a href=''>Referral program</a><br/>
                </div>
                <div className='col'>
                    <p>Support</p>
                    <a href=''>Contact us</a><br/>
                    <a href=''>Support portal</a><br/>
                    <a href=''>How to file a complaint?</a><br/>
                    <a href=''>Status of your complaints</a><br/>
                    <a href=''>Bulletin</a><br/>
                    <a href=''>Circular</a><br/>
                    <a href=''>Z-Connect blog</a><br/>
                    <a href=''>Downloads</a><br/>

                </div>
                <div className='col'>
                    <p>Account</p>
                    <a href=''>Open demat account</a><br/>
                    <a href=''>Minor demat account</a><br/>
                    <a href=''>NRI demat account</a><br/>
                    <a href=''>HUF demat account</a><br/>
                    <a href=''>Commodity</a><br/>
                    <a href=''>Dematerialisation</a><br/>
                    <a href=''>Fund transfer</a><br/>
                    <a href=''>MTF</a><br/>

                </div>
                <div className='mt-5'>
                <p className='text-muted' style={{ fontSize: "12px" }}>Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF</p>
                <p className='text-primary ' style={{ fontSize: "12px" }}>Smart Online Dispute Resolution | Grievances Redressal Mechanism</p>
                <p className='text-muted' style={{ fontSize: "12px" }}>Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>
                <p className='text-muted ' style={{ fontSize: "12px" }}>India's largest broker based on networth as per NSE. NSE broker factsheet</p>
                <p className='text-muted ' style={{ fontSize: "12px" }}>"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers/depository participants. Receive information of your transactions directly from Exchange/Depositories on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.</p>

                </div>
            </div>
        </div>
        </footer>
    );
}

export default Footer;