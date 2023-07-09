'use client'
import Body from '@/Components/Body'
import Profile from '@/Components/Profile'
import React from 'react'
import { useParams } from 'next/navigation'
import { Data, User } from '@/utils/constant'
import { singleUser } from '@/utils/FetchFromApi'

const page = () => {
    const { id } = useParams()
    const [data, setData] = React.useState<Data[]>([])
    const fetchData = async () => {
        try {
            const response = await singleUser(id)
            const user = await response?.user || {};
            const data: Data = {
                data: {
                    ...response,
                },
            };
            setData(() => [data])
        } catch (error) {
            console.error(error)
        }
    }
    React.useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, [])
    return (
        <>
            <Body
                stylesProps={{}}
            >
                <Profile
                    data={data[0]?.data}
                />
            </Body>
        </>
    )
}

export default page