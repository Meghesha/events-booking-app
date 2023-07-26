import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadEvents } from '../../../redux/events/events.actions';

let UploadEvents = ()=>{
    let userInfo = JSON.parse(localStorage.getItem('user'));
    let {isAdmin} = userInfo;

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let[event, setEvent] = useState({
        name : '',
        image : '',
        type : '',
        date : '',
        price : '',
        info : ''
    })

    let updateInput = (e)=>{
        setEvent({
            ...event,
            [e.target.name] : e.target.value
        })
    }

    let clickSubmit = (e)=>{
        e.preventDefault();
        dispatch(uploadEvents(event, navigate))
    }
    
    return(
        <React.Fragment>
            {/* <pre>{JSON.stringify(event)}</pre> */}
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className="h3 text-secondary">Upload Events</p>
                        <p className="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim molestias cumque repellendus, inventore illo maiores eum, itaque magni vitae eaque aut et doloremque sed excepturi deserunt voluptas! Tenetur, consectetur corrupti.</p>
                    </div>
                </div>
                {
                    isAdmin ? <React.Fragment>
                         <div className="row">
                    <div className="col m-auto">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                <p className="h4">Upload Here</p>
                            </div>
                            <div className="card-body">
                                <form action="" onSubmit={clickSubmit}>
                                    <div className="form-group">
                                        <input 
                                        name="name"
                                        value={event.name}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder='Name' required/>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        name="image"
                                        value={event.image}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder='Image' required/>
                                    </div>
                                    <div className="form-group">
                                        <select name="type" onChange={updateInput} id="" className="form-control" required>
                                            <option value="">Select Event Type</option>
                                            <option value="FREE">Free Event</option>
                                            <option value="PRO">Pro Event</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        name="price"
                                        value={event.price}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder='Price' required/>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        name="date"
                                        value={event.date}
                                        onChange={updateInput}
                                        type="date" className='form-control'required />
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                        name="info"
                                        value={event.info}
                                        onChange={updateInput}
                                        rows="4" className='form-control' placeholder='Information'required/>
                                    </div>
                                    <div className="">
                                        <input type="submit" className="btn btn-dark btn-sm" value="Upload"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                    </React.Fragment> : <React.Fragment>
                        <div className="row">
                            <div className="col text-center">
                                <p className="h5 text-danger">-----You are not authorized to upload-----</p>
                                <p>If you are an admin, please contact your DBA to get an admin accesss</p>
                            </div>
                        </div>
                    </React.Fragment>
                }    
            </div>
        </React.Fragment>
    )
}
export default UploadEvents;