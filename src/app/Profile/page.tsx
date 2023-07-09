"use client"
import Body from '@/Components/Body'
import Loading from '@/Components/Loading'
import Profile from '@/Components/Profile'
import { singleUser } from '@/utils/FetchFromApi'
import { Data, User } from '@/utils/constant'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const page = () => {
    const { data: session } = useSession() as Data;
    const [Data, setData] = useState<Data[]>([])
    const sessionUser = async () => {
        try {
            if (session && session.user) {
                const sessionUserDetails = await singleUser(session?.user?.id)
                const data: Data = {
                    data: {
                        ...sessionUserDetails,
                    },
                };
                setData(() => [data])
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        sessionUser()
    }, [session])

    return (
        <>
            <Body
                stylesProps={{}}
            >
                <Profile
                    data={Data[0]?.data}
                />
            </Body>
        </>
    )
}

export default page