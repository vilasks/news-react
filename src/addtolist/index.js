import React, { useEffect, useState } from 'react';


const Index = ({article}) => {


    const [saved,setSaved] = useState(false)
    
    const clickHandler = () => {
        let previousArticles = localStorage.getItem("savedArticles")
        if(previousArticles){
            let buffer = JSON.parse(previousArticles)
            let newArticles = [...buffer,article]
            localStorage.setItem("savedArticles",JSON.stringify(newArticles))
        }else{
            let newArticles = [article]
            localStorage.setItem("savedArticles",JSON.stringify(newArticles))
        }
        setSaved(true)
    }

    const removeArticle = () => {
        let rawArticles = JSON.parse(localStorage.getItem("savedArticles"))
        let newArtilces = rawArticles.filter(articlee => articlee.title !== article.title);
        localStorage.removeItem("savedArticles");
        localStorage.setItem("savedArticles",JSON.stringify(newArtilces));
        setSaved(false)
    }

    useEffect(() => {
        let rawArticles = JSON.parse(localStorage.getItem("savedArticles"));
        if(!rawArticles) return
        for(let i=0; i<rawArticles.length;i++){
            const {title} = rawArticles[i];
            if(title === article.title){
                setSaved(true);
                break
            }
        }
    },[])

    if(!saved){
        return(
        <div>
           
               <button className="btn btn-light" onClick={clickHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-save2" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                    </svg>
               </button>

        </div>
        
    )
    }else{
        return(
            <div>
            <button className="btn btn-light" onClick={removeArticle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-save2-fill" viewBox="0 0 16 16">
                    <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v6h-2a.5.5 0 0 0-.354.854l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5A.5.5 0 0 0 10.5 7.5h-2v-6z"/>
                </svg>
            </button>
        
        </div>
        )
    }
}






export default Index