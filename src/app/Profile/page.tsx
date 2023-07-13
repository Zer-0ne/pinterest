"use client"
import AuthCard from '@/Components/AuthCard'
import Body from '@/Components/Body'
import Loading from '@/Components/Loading'
import Profile from '@/Components/Profile'
import { singleUser } from '@/utils/FetchFromApi'
import { Data, User } from '@/utils/constant'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const page = () => {
    const { data: session, status: sessionStatus } = useSession() as Data;
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
    if (sessionStatus === 'loading') {
        return <Loading />;
    }
    if (sessionStatus != 'authenticated') {
        return <AuthCard />;
        // User is not authenticated, show login/signup component
    }
    return (
        <>
            <Body
                stylesProps={{}}
            >
                <Profile
                    data={Data[0]?.data}
                    fetchUserData={sessionUser}
                />
            </Body>
        </>
    )
}

export default page