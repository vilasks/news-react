import React, { useEffect, useState } from 'react';
import Card from '../news-card/card'
import './index.css'
const Index = () => {
    const [articles,setArticles] = useState([]);

    useEffect(() => {
        let rawArticles = localStorage.getItem("savedArticles")
        let buffer = JSON.parse(rawArticles)
        setArticles(buffer)
    },[])


    if(articles){
        return(
        <div>
            <div className="card-header fw-bold">
                Saved Articles
            </div>

            <div className="card-container">
            {articles.map((article,i)=>{
                return(
                    <Card key={new Date().toString()+i.toString()} article={article}/>
                )
            })}
            
            </div>
            <div style={{height:"100px"}}>

            </div>
        </div>
    )
    }else{
        return(
            <div className="container">
                <h1>You have no saved Articles</h1>
            </div>
        )
    }
}

export default Index;