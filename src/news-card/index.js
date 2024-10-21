import React from 'react';
import { useState,useEffect } from 'react';
import {api} from '../data'
import Card from './card';
import './card.css'


export const Index = ({country,category,pages,isloaded}) => {
    const url = "https://newsapi.org/v2/top-headlines?";
    const backend_url = process.env.REACT_APP_BACKEND_URL
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [endLoader,setEndLoader] = useState(false);
    const [hasMore,setHasMore] = useState(true)
    const [totalArticles,setTotalArticles] = useState(0)
   

    const loadMore = () => {
        if(hasMore){
            setEndLoader(true)
            const toUrl = `${backend_url}?url=${url}country=${country}&category=${category}&page=${page}`;
            const encodedUrl = toUrl;
            fetch(encodedUrl)
            .then((response) => {
                if(response.status >= 200 && response.status <= 299){
                    return response.json();
                }else{
                    setIsLoading(false)
                    setIsError(true)
                    console.log(response)}})
            .then((response) => {
                const {articles} = response;
                setData([...data,...articles])
                setEndLoader(false)
                setPage(prev => {
                    return prev+1
                })
                
                setIsError(false)})
            .catch((err) => {
                console.log(err)
                setIsError(true);
                setIsLoading(false)})
        }

        if(totalArticles === data.length){
            setHasMore(false)
        }
    }

    

    useEffect(() => {
        
        setIsLoading(true);
        setHasMore(true);
        const toUrl = `${backend_url}?url=${url}country=${country}&category=${category}&page=${page}`;
        const encodedUrl = toUrl;
        fetch(encodedUrl)
        .then((response) => {
            if(response.status >= 200 && response.status <= 299){
                return response.json();
            }else{
                setIsLoading(false)
                setIsError(true)
                console.log(response)}})
        .then((response) => {
            const {articles,totalResults} = response;
            setTotalArticles(totalResults);
            setData(articles)
            sessionStorage.setItem("homedata",JSON.stringify(articles));
            setPage(2)
            setIsLoading(false)
            setIsError(false)})
        .catch((err) => {
            console.log(err)
            setIsError(true);
            setIsLoading(false)})

    },[country,category])



    if(isLoading){
        isloaded(false)
        return(
            <div className="container  spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )}

    if(isError){
        return(
            <div>
                <h1>Error Occured</h1>
            </div>
        )}

    if(!isLoading){
        isloaded(true);
        
        return(
            <div className="container main-container">
                <div className="container d-flex flex-column">
                    <div className="card-container" >
                    {data.map((article,i) => {
                    return(
                        <div>
                            <Card key={new Date().toString()+i.toString()} article={article}/>
                        </div>
                    )
                })}
                    </div>
                
                </div>
                
                <div className="loadmore">
                    {hasMore?endLoader?<div className="container  spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:<div>
                    <button className="btn btn-outline-primary btn-sm" onClick={loadMore}>LoadMore</button>
                </div>:"That's all for now"}
                </div>
                <div className="lastone">

                </div>
                
            </div>
        )
    }

    return(
        <div className="container">
            <h1>Somethin wrong happened</h1>
        </div>
    )

}


