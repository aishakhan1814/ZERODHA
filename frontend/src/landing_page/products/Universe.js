import React from 'react';
function Universe() {
    return (
        <div className='container'>
            <div className='row text-center '>
                <div className='mt-5'>
                <h4 className='mt-5 mb-5'>Want to know more about our technology stack? Check out the <i style={{color:"blue"}}>Zerodha.tech</i> blog.</h4>
                <h2 className='mt-5 p-3 mb-3'>The Zerodha Universe</h2>
                <h5 className='mt-3 mb-3'>Extend your trading and investment experience even further with our partner platforms</h5>
                </div>
                <div className='row mt-5 p-3 mb-3 ' style={{fontSize:"12px"}}>
                    <div className='col-4 text-muted'>
                        <img src='/media/zerodhaFundhouse.png' style={{ width: "200px", height: "50px" }} />
                        <p>Our asset management venture
                            that is creating simple and transparent index
                            funds to help you save for your goals.
                        </p>
                    </div>
                    <div className='col-4 text-muted'>
                        <img src='/media/sensibullLogo.svg' style={{ width: "200px", height: "50px" }} />
                        <p>Options trading platform that lets you
                            create strategies, analyze positions, and examine
                            data points like open interest, FII/DII, and more.
                        </p>
                    </div>
                    <div className='col-4 text-muted'>
                        <img src='/media/tijori.svg' style={{ width: "200px", height: "50px" }} />
                        <p>Investment research platform
                            that offers detailed insights on stocks,
                            sectors, supply chains, and more.
                        </p>
                    </div>

                </div>
                <div className='row mt-5 p-3 mb-3 ' style={{fontSize:"12px"}}>
                    <div className='col-4 text-muted'>
                        <img src='/media/streakLogo.png' style={{ width: "200px", height: "50px" }}/>
                        <p>Systematic trading platform
                            that allows you to create and backtest
                            strategies without coding.</p>
                    </div>
                    <div className='col-4 text-muted'>
                        <img src='/media/smallcaseLogo.png' style={{ width: "200px", height: "50px" }}/>
                        <p>Thematic investing platform
                            that helps you invest in diversified
                            baskets of stocks on ETFs.</p>
                    </div>
                    <div className='col-4 text-muted'>
                        <img src='/media/dittoLogo.png'style={{ width: "200px", height: "50px" }} />
                        <p>Personalized advice on life
                            and health insurance. No spam
                            and no mis-selling.
                        </p>
                    </div>

                </div>
                                <button className="p-3 btn btn-primary fs-5" style={{width:"30%",margin:"0 auto"}}>Sign up for free</button>

            </div>
        </div>
    );
}

export default Universe;