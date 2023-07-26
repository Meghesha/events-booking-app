import React from 'react';
import spinnerImage from '../../../assets/images/spinner.gif';

let Spinner = ()=>{
    return(
        <React.Fragment>
            <img src={spinnerImage}  alt="" className='d-block m-auto'/>
        </React.Fragment>
    )
}
export default Spinner;