import React from 'react'
import {Link} from 'react-router-dom'
const InvalidRoute = () => {
    return(
        <div className="container">
            <h1>Invalid Route Go back to home</h1>
            <Link to="/"><button className="btn btn-danger">Go Home</button></Link>
        </div>
    )
}  

export default InvalidRoute;