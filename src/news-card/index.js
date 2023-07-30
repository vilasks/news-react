import React from 'react';
import { useState,useEffect } from 'react';
import {api} from '../data'
import Card from './card';
import './card.css'


export const Index = ({country,category,pages,isloaded}) => {
    const url = "https://newsapi.org/v2/top-headlines?";
    const api_key = 'd1e2d12e8f7c4323af2f5468e0053752';
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [endLoader,setEndLoader] = useState(false);
    const [hasMore,setHasMore] = useState(true)
    const [totalArticles,setTotalArticles] = useState(0)
    // const observer = useRef(null)
    
    // const atEnd = useCallback((node) => {
    //     if(observer.current)observer.current.disconnect()
    //     observer.current = new IntersectionObserver((entries) => {
    //         if(!entries[0].isIntersecting)return
    //         setEndLoader(true)
    //         loadMore()
    //     },{threshold:1})
    //     if(node)observer.current.observe(node)
        
    // })

    // const observerFunction = useCallback((element) => {
    //         const targetElement = element[0]
    //         if(!targetElement.isIntersecting) return
    //             console.log(targetElement)
    //             const toUrl = `${url}country=${country}&category=${category}&${page}&apiKey=${api}`;
    //             setPage(prev => prev+1)
    //             getData(toUrl)
    //         // if(document.querySelector('.spinner-border')) return
    //         // const textdiv = document.createElement('div');
    //         // const textfordiv = document.createElement('h2');
    //         // textfordiv.textContent = "Loading...";
    //         // textfordiv.classList.add("visually-hidden")
    //         // textdiv.classList.add("spinner-border")
    //         // textdiv.appendChild(textfordiv)
    //         // const cardContainer = document.querySelector('.card-container');
    //         // cardContainer.append(textdiv);
    //         // testCallback()
    // },[])

    // const testCallback = () => {
    //     setTimeout(() => {
    //         document.querySelector(".spinner-border").remove();
    //     },2000)
    // }
   


    const loadMore = () => {
        if(hasMore){
            setEndLoader(true)
            const toUrl = `${url}country=${country}&category=${category}&page=${page}&apiKey=${api_key}`;
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
        const toUrl = `${url}country=${country}&category=${category}&page=${pages}&apiKey=${api_key}`;
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


    

//    useEffect(() => {
//         const cardObserver = new IntersectionObserver(observerFunction,{rootMargin:'30px'})
//         if(loader.current) cardObserver.observe(loader.current)
//         console.log(loader.current)
//     },[observerFunction]) 

//     useEffect(() => {
        
//         const currentObserver = observer.current
//         if(lastElement){
//             console.log("Inside Effect")
//             currentObserver.observe(lastElement)
//         }

        
//     },[lastElement])

//     window.onscroll = () => {
//         if(document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight){
//             setEndLoader(true)
//             loadMore();
//         }
//     }

//     const checkEnd = () => {
//         if(document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight){
//                     setEndLoader(true)
//                     loadMore();
//                 }
//     }


//     document.ontouchmove = () => {
//         if(document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight){
//             setEndLoader(true)
//             loadMore();
//         }
//     }

//     const {status,articles,totalResults} = data



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


