import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {api} from '../data'
import Card from '../news-card/card'
import './index.css'
const Index = () => {
    const [inputText,setInputText] = useState("");
    const api_key = 'd1e2d12e8f7c4323af2f5468e0053752';
    const [searchResults,setSearchResults] = useState([])
    const [error,setError] = useState(false)
    const [testapiresult,setTestApiResults] = useState({});
    const search = (e) => {
        sessionStorage.setItem("searchKey",inputText);
        e.preventDefault()
        if(!inputText)return
        let cancel
        const url = `https://newsapi.org/v2/everything?q=${inputText}&sortBy=relevancy&pageSize=30&apiKey=${api_key}`;
        const encodedUrl = url
        axios({
            method:"GET",
            url: encodedUrl,
            cancelToken:new axios.CancelToken(c => cancel = c)
        }).then(res => {
            const {articles} = res.data
            setSearchResults(articles)
            let sesssionData = JSON.stringify(articles)
            sessionStorage.setItem("searchArticles",sesssionData)
        }).catch(e =>{
            if(axios.isCancel(e))return
            setError(true)
        })
        return () => {
            cancel()
        }
    }


    // const checkApi = () => {
    //     const url = `https://newsapi.org/v2/everything?q=${inputText}&sortBy=relevancy&pageSize=30`
    //     const encodedUrl = encodeURIComponent(url)
    //     fetch(`http://localhost:9000/test?url=${encodedUrl}`)
    //     .then(res => {
    //         return res.json()
    //     }).then(res => {
    //         const {articles} = res
    //         setSearchResults(articles)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    useEffect(() => {
        if(!sessionStorage.getItem("searchKey")) return
        let inputQuery = sessionStorage.getItem("searchKey")
        let queryResults = sessionStorage.getItem("searchArticles")
        let parseArticles = JSON.parse(queryResults)
        setInputText(inputQuery);
        setSearchResults(parseArticles);
    },[]);

   if(!error){
        return(
        <div>
            <div className="card-header fw-bold">
                Search
            </div>
            <form className="d-flex mt-2">
                <input className="form-control me-2" onChange={(e) => setInputText(e.target.value)} value={inputText} type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success " type="submit" onClick={(e) => search(e)}>Search</button>
            </form>
           <div className="container main-container">
                <div className="container d-flex flex-column">
                    <div className="card-container" >
                    {searchResults.map((article,i) => {
                    return(
                        <div>
                            <Card key={new Date().toString()+i.toString()} article={article}/>
                        </div>
                    )})}
                    </div>
                
                </div>
            </div>
            
            
        </div>
    )
   }

   if(error){
       return(
           <div>Error Occured</div>
       )
   }
}

export default Index;