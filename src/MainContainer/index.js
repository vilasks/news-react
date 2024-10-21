import React,{ useState} from 'react'
import Header from '../header';
import NavBar from '../countrynav-bar';
import {Index} from '../news-card/index';
import CategoryBar from '../category-bar';
import Footer from '../footer'
const Home = () => {
    const [country,setCountry] = useState(process.env.REACT_APP_DEFAULT_COUNTRY)
    const [category,setCategory] = useState(process.env.REACT_APP_DEFAULT_CATEGORY)
    const [isLoaded,setIsLoaded] = useState(false);
    const pages = 1;

    const changeCountry = (label) => {
        setCountry(label)
    }

    const isloaded = (statess) => {
      setIsLoaded(statess)
    }
    
    const changeCategory = (newCategory) => {
        setCategory(newCategory);   
    }

  return (
    <div>
        <Header/>
          <hr></hr>
        <NavBar changeCountry={changeCountry} activecountry={country}/>
          <hr></hr>
        <CategoryBar changeCategory={changeCategory} activecategory={category}/>
        <Index country={country} category={category} pages={pages} isloaded={isloaded}/>
        {isLoaded?<Footer/>:""}
    </div>
  );
}



export default Home;