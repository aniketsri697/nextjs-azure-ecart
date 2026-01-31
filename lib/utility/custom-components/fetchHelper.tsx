"use client"

import { useState } from "react"

function useFetchHelper() {
    const [isPending, setIsPending]= useState(false);
    const [responeData, setResponseData]= useState<any>(null);
    const [error, setError]= useState<any>(null);

    const fetchUrl =  async <TReq= unknown>(url: string, type: "GET" | "POST" | "PUT" | "DELETE", payload?: TReq, queryParams?: string) => {
        setIsPending(true);
        setResponseData(null)
        switch (type) {
            case 'GET':
                return;
            case 'POST':
                fetch(url, { ...getHeader(), body: JSON.stringify(payload)})
                    .then((res) => res.json)
                    .then((res) => {
                        setResponseData(res)
                        setIsPending(false);
                    })
                    .catch((e) => {
                        console.log("Error Occured::: ",e);
                        setError(e)
                    });
                return;
            case 'PUT':
                return;
            case 'DELETE':
                return
        }
    }

    const getHeader = () => {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    }


    return {
        isPending,
        fetchUrl,
        responeData,
        error
    }
}

export default useFetchHelper;