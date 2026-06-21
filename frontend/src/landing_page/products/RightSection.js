import React from 'react';

function RightSection({
     imageURL, productName, productDesc, learnMore
}) {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6 p-5 mt-5'>
                    <h2>{productName}</h2>
                    <p className='text-muted' style={{ lineHeight: "1.8" }}>{productDesc}</p>
                    <div >
                        <a href={learnMore} style={{ textDecoration: "none" }}>Try Demo<i class="fa-solid fa-arrow-right"></i></a>

                    </div>
                </div>

                <div className='col-1'></div>
                <div className='col-5'>
                    <img src={imageURL} className="img-fluid" alt='img' />
                </div>


            </div>
        </div >
    );
}

export default RightSection;