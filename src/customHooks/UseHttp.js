import {useState, useEffect  } from 'react'
const spotifyClientId = '0606e74d878c4ad99c8c38745adc9f90'


export const FetchData = ({ url }) => {
    const [data, setData] = useState('');


    useEffect(() => {
       let mounted = true;
       fetch(url)
       .then(data => JSON.parse(data))
       .then(jsonData => {
           if(mounted) {
               setData(jsonData)
           }
       }) 

       return () => {
           mounted = false
       }
    }, [url])

    return data

}