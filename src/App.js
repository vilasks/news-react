import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import BottomNav from './bottom-nav'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './MainContainer'
import Search from './search'
import SavedList from './savedlist'
import InvalidRoute from './invalidroute';


function  App() {
  // const [country,setCountry] = useState("in")
  // const [category,setCategory] = useState("general")
  // const pages = 1
  // const changeCountry = (label) => {
  //   setCountry(label);
    
  // }

  // const changeCategory = (newCategory) => {
  //   setCategory(newCategory);
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/savedlist" element={<SavedList/>}/>
          <Route path="*" element={<InvalidRoute/>}/>
        </Routes>
      
      <BottomNav/>
      </BrowserRouter>
        
      </div>
  );
}

export default App;
