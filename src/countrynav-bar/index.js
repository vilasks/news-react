import React from 'react';
import {countryList} from '../data'
import CountryCard from './country-card';

import "./index.css"

const Index = ({changeCountry,activecountry}) => {
    return(
        <div>

            <div className="vilas-nav">
                {countryList.map((singleCountry) => {
                if(singleCountry.label===activecountry){
                    return(
                        <CountryCard key={singleCountry.label} active={true} singleCountry={singleCountry} changeCountry={changeCountry}/>
                    )
                }else{
                    return(
                        <CountryCard key={singleCountry.label} active={false} singleCountry={singleCountry} changeCountry={changeCountry}/>
                    )
                }
            })}
            </div>
        </div>
    )
}

export default Index