"use client"

import { useState } from "react"

function useFetchHeler() {
    const [isPending, setIsPending]= useState(false);

    const fetchUrl =  async <TReq= unknown>(url: string, type: "GET" | "POST" | "PUT" | "DELETE", payload?: TReq, queryParams?: string) => {
        switch (type) {
            case 'GET':
                return;
            case 'POST':
                const res= fetch(url, { ...getHeader(), body: JSON.stringify(payload)})
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
        fetchUrl
    }
}

export default useFetchHeler;