import { useState, useEffect, useSyncExternalStore } from "react";

// 4 - Custom hook
export const useFetch = (url) => {
    const [data, setData] = useState(null)

    // 5- refatorando post
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)

    const [callFetch, setcallFetch] = useState(null)

    // 6- loading

    const [loading, setLoading] = useState(false)

    // 7 - erros

    const [error, setError] = useState(null)

    const httpConfig = (data, method) => {
        if(method === "POST"){
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            setMethod(method)
        }
    }

    useEffect(() => {
        const fetchData =  async() => {
            try{
                // 6- loading
            setLoading(true)
            const res = await fetch(url)
            const json = await res.json()

            setLoading(false)
            setData(json)
            } catch (error){
                console.log(error.message)

                setError("Houve algum erro ao carregar os dados!")
            }
            setLoading(false)
        }
 
        fetchData()
    }, [url, callFetch])

// 5- refatorando post

useEffect(()=> {
    const httpRequest = async() => {
    let json
    if(method === "POST") {

        // 6- loading
        setLoading(true)
        let fetchOptions = [url, config]

        const res = await fetch(...fetchOptions)

        json = await res.json()
        
    }

    setcallFetch(json)
    }

    httpRequest()
}, [config, method, url])

    return {data, httpConfig, loading, error}

}