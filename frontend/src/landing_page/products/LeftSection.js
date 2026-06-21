import React from 'react';

function LeftSection({
    imageURL, productName, productDesc, tryDemo, learnMore, googlePlay, appStore
}) {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-5 p-6'>
                    <img src={imageURL} alt='img' />
                </div>
                <div className='col-1'></div>

                <div className='col-6 p-5'>
                    <h2>{productName}</h2>
                    <p className='text-muted' style={{lineHeight: "1.8"}}>{productDesc}</p>
                    <div >
                        <a href={tryDemo} style={{ textDecoration: "none" }}>Try Demo<i class="fa-solid fa-arrow-right"></i></a>

                        <a href={learnMore} style={{ textDecoration: "none", marginLeft: "105px" }}>Learn More<i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div className='mt-3'> 
                    <a href={googlePlay} ><img src='/media/googlePlayBadge.svg' alt='img' /></a>
                    <a href={appStore} style={{ marginLeft: "50px" }}><img src='/media/appstoreBadge.svg' alt='img' /></a>

                </div>


            </div>

        </div>
        </div >
    );
}

export default LeftSection;