import React from 'react';
import "./card.css"
import Index from '../addtolist/index'

const Card = ({article}) => {
        const {url,urlToImage,source,publishedAt,title,content} = article;
        const ms = Date.parse(publishedAt)
        const d = new Date()
        d.setTime(ms)
        return(
            
            <div className="card  vilas-card" >
                <img className="card-img-top" style={{width:'18rem'},{height:'10rem'}} src={urlToImage || "https://static.abcteach.com/free_preview/n/newspaper_gs_p.png"}/>
                <div className="card-body">
                    
                    <p className="card-text h5">{title || content}</p>
                    
                </div>
                <div className="card-footer d-flex justify-content-around">
                    <p className="card-text badge bg-secondary">{source.name}</p>
                    <p className="card-text badge bg-light text-dark"> {d.toLocaleDateString()} <span>{d.toLocaleTimeString()}</span></p>  
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <a href={url} target="_blank" className="btn btn-primary">Read More</a>
                    </div>
                    <div>
                        <Index article={article}/>
                    </div>
                    
                </div>
            </div>
        )
}

export default Card