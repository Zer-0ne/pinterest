"use client";
import Body from '@/Components/Body';
import MasonryList from '@/Components/MasonaryList';
import PostCard from '@/Components/PostCard';
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { PostCardProps } from '@/utils/constant';
const page = () => {
    const { id } = useParams()
    const [data, setData] = useState<PostCardProps[]>([])
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/pins/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                const responseData = await response.json()
                setData((prevData) => ([
                    // ...prevData,
                    responseData
                ]));
            }
            console.error('Failed to fetch data')
        } catch (error) {
            console.error(error)
        }
    }
    React.useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, [])
    // const filteredPins = data[0]?.Pin?.filter(pin => pin.tag === '#parrot') || [];
    // console.log(data);
    // console.log(filteredPins);

    return (
        <>
            <Body
                stylesProps={{

                }}
            >
                <PostCard
                    data={data}
                    fetchdata={fetchData}
                />
                <MasonryList
                    data={[]}
                    fetchData={fetchData}
                />
            </Body >
        </>
    )
}

export default page