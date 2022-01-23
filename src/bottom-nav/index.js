import React, { useEffect, useState } from 'react'
import "./index.css"
import {Home,ActiveHome,Search,ActiveSearch,SavedList,ActiveSavedList} from './home'
import {Link,useLocation} from 'react-router-dom'
const Index = () => {

    const location = useLocation()
    const [currentPage,setCurrentPage] = useState("/home")
    
    useEffect(() => {
        setCurrentPage(location.pathname)
    },[location.pathname])

    return(
        <div className="bottom-nav">
        <div className="bn-tab" onClick={() => setCurrentPage("/home")}>
            <Link style={{color:"black"}} to="/">{currentPage === "/"?<ActiveHome/>:<Home/>}</Link>
        </div>
        <div className="bt-tab" onClick={() => setCurrentPage("/search")}>
            <Link style={{color:"black"}} to="/search">{currentPage === "/search"?<ActiveSearch/>:<Search/>}</Link>
        </div>
        <div className="bn-tab" onClick={() => setCurrentPage("/savedlist")}>
            <Link style={{color:"black"}} to="/savedlist">{currentPage === "/savedlist"?<ActiveSavedList/>:<SavedList/>}</Link>
        </div>
        </div>
    )
}

export default Index