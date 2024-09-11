"use client";
import React, {useEffect, useState} from "react";
import {User} from "@/types";
import {getAuthors} from "@/helpers/userApi";
import Authors from "@/components/Authors";

type PageParams = {
    id: number;
};

type PageProps = {
    params: PageParams;
};


function Page({params}: PageProps) {
    const categoryId = params.id
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const allUsers = await getAuthors(categoryId)
                console.log(allUsers)
                setUsers(allUsers);
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <Authors users={users} loading={loading}/>
        </>
    );
}


export default Page
