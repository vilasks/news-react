import React, {useEffect } from 'react'

const CountryCard = ({singleCountry,changeCountry,active}) =>{
    
    const {country,label} = singleCountry

    const clickHandler = (e) => {
        
        changeCountry(label);
    }

    useEffect(() => {
        document.querySelector(".active-country").scrollIntoView({behavior:'smooth'});
    },[active])

    if(active){
        return(
        <div className="container m-0 p-0">
            <p className="btn text-nowrap active-country btn-outline-secondary btn-sm switch-country active" onClick={(e) =>clickHandler(e)}>{country.toUpperCase()}</p>
        </div>
    )
    }else{
        return(
        <div className="container m-0 p-0">
            <p className="btn text-nowrap btn-outline-primary btn-sm switch-country" onClick={(e) =>clickHandler(e)}>{country.toUpperCase()}</p>
        </div>
    )
    }
}

export default CountryCard