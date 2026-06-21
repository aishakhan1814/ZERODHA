import React from 'react';
function Team() {
    return (
        <div className='container'>
            <div className='row'>
                <h1 className='text-center fs-2 mt-5 mb-5 p-8'>People</h1>

                <div className='p-5 mt-5 row' style={{ lineHeight: "1.5", fontSize: "1.2rem" }}>
                    <div
                        className="col-6 text-muted text-center"
                        style={{ paddingLeft: "100px" }}
                    >
                        <img
                            src="/media/nithinKamath.jpg"
                            alt="img"
                            style={{ width: "70%", borderRadius: "100%" }}
                        />
                        <h5 className="mt-3">Nithin Kamath</h5>
                        <p>Founder, CEO</p>
                    </div>
                    <div className='col-6 text-muted '>
                        <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>
                        <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
                        <p>Playing basketball is his zen.</p>
                        <p>Connect on   <a href='#' style={{ textDecoration: "none" }}>Homepage / TradingQnA / Twitter</a> </p>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default Team;