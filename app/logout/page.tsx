"use client"
import {useEffect} from "react";
import {cookies} from "next/headers";
import {useRouter} from "next/navigation";

export const page = () => {
    const router = useRouter();

    useEffect(() =>{
        router.push("/login");
    }, []);
    return (
        <div></div>
    )
}