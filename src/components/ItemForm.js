"use client";

import { useAuth  } from "@/context/auth";

function ItemForm() {
    const auth = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()


        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                title: "Dune 4",
                author: "Frank Herbert",
                genre: "Sci-fi"
            })
        })

        if(response.ok) {
            const data = await response.json()

            console.log(data)
            return 
        }

        //TODO: error handling

    }

    if(!auth.token){
        return (
            <div>
                You have to be logged in to create a item. :)
            </div>
        )
    }

    return (<div>

        Create new item
        <form onSubmit={handleSubmit}>
            <button>
                Add static item
            </button>
        </form>
        </div>)
}

export default ItemForm