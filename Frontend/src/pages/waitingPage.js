import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function BasicExample() {
    return (
        <>
            <div className='spinner'>
                <Spinner animation="border" role="status" className='spinner-fast'>  
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <div className='m-5 h4'>Please Wait...</div>
            </div>
        </>
    );
}

export default BasicExample;
