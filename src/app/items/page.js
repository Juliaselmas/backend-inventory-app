
"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";

export default function ItemsPage() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else {
            fetch(`http://localhost:3001/api/items?userId=${user.id}`)
                .then((response) => response.json())
                .then((data) => {
                    setItems(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log("failed to get items", error);
                    setLoading(false);
                });
        }
    }, [user, router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Items</h1>
            <section className="flex flex-col items-center justify-center gap-2">
                {items.length > 0 ? (
                    items.map((item) => (
                        <ItemCard 
                            key={item.id}
                            item={item}
                        />
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </section>
            <ItemForm />
        </main>
    );
}
