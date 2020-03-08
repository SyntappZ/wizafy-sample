import {useState, useEffect } from 'react'
import queryString from "query-string";


export const useFetch = (url, defaultResponse) => {
    const [data, setData] = useState(defaultResponse);

    const getApiData = async (url) => {
           const parsed = queryString.parse(window.location.search);
           
          
           const accessToken = parsed.access_token;
        try {
            const response = await fetch(url, {
                      headers: {
                        Authorization: "Bearer " + accessToken
                      }
                    }) 
            const data = await response.json();
            setData({
                isLoading: false,
                data
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getApiData(url)
    }, [url])
   return data

}