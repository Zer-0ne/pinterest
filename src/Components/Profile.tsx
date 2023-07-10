import { styles } from '@/utils/styles'
import { Avatar, Box, Button, Typography } from '@mui/material'
import React from 'react'
import MasonryList from './MasonaryList'
import { signOut, useSession } from 'next-auth/react'
import AuthCard from './AuthCard'
import { follow, singlePin, singleUser } from '@/utils/FetchFromApi'
import { Data, Post, saveCreateBtn } from '@/utils/constant'
import { MdVerified, MdVerifiedUser } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import Loading from './Loading'
const Profile: React.FC<Data> = ({ data }) => {
    const { data: session, status: sessionStatus } = useSession() as Data;
    const [isCreate, setIsCreate] = React.useState('create')
    const [Data, setData] = React.useState<Post[]>([])
    const fetchData = async () => {
        try {
            if (data && data.user) {
                const response = await fetch(`/api/pins/user/${data.user?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    const responseData = await response.json();
                    const sortedData = await responseData.pins?.sort((a: any, b: any) => {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });
                    // setBlogData(sortedData?.reverse())
                    setData((prevData) => ([
                        // ...prevData,
                        // responseData
                        ...sortedData?.reverse()
                    ]));
                } else {
                    console.error('Failed to fetch data');
                }
            }
        } catch (error) {
            console.error(error);

        }
    }
    React.useEffect(() => {
        if (sessionStatus === 'authenticated') {
            fetchData();
        }
        // const interval = setInterval(fetchData, 300000);
        // return () => clearInterval(interval);
    }, [data])

    // handle follow
    // const { id } = useParams()
    const handleFollow = async () => {
        try {
            if (data && data.user) {

                await follow(data.user.id)
            }
        } catch (error) {
            console.error(error)
        }
    }
    // handle profile edit
    const handleProfileEdit = async () => {

    }

    // handle save post 
    const handleSave = async () => {
        try {
            if (data && data.user && session && session.user) {
                setData([])
                if (data.user.id === session?.user?.id) {
                    const SessionData = await singleUser(data.user.id)
                    const savedArray = await SessionData.user.saved;
                    savedArray.map(async (item: any) => {
                        const Pin = await singlePin(item)
                        console.log(Pin)
                        setData((prev) => [
                            ...prev,
                            Pin

                        ])
                    })
                    return
                }
                const savedArray = await data.user.saved;
                savedArray.map(async (item: string) => {
                    const Pin = await singlePin(item)
                    console.log(Pin)
                    setData((prev) => [
                        ...prev,
                        Pin

                    ])
                })
                // setData(data.user.saved)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // const isFollowing = session?.user?.followings?.some((follow: any) => follow.userId.toString() === data?.user?.id);
    // console.log(session?.user?.followings)

    if (sessionStatus === 'loading') {
        // Session is still being fetched, show a loading state or spinner
        if (!data?.user) {
            return <Loading />;
        }
        if (!Data) {
            return <Loading />;
        }
        return <Loading />;
    }

    if (session?.user?.id === data?.user?.id) {
        if (sessionStatus != 'authenticated') {
            return <AuthCard />;
            // User is not authenticated, show login/signup component
        }
    }
    return (
        <Box
            sx={[
                styles.displayFlex,
                styles.FlexColumn,
                // styles.justifyCenter,
                styles.alignItemCenter, {
                    height: '80vh',
                    width: { md: '60vw', xs: '90vw' },
                    paddingTop: 3,
                    paddingBottom: 3
                }
            ]}
        >
            {
                (session?.user?.id === data?.user?.id) ?
                    (sessionStatus != 'authenticated') ?
                        <FiLogIn
                            onClick={() => (<AuthCard />)}
                        /> :
                        <FiLogOut
                            onClick={() => signOut}
                        /> :
                    <></>}

            {
                (data?.user?.image) ?
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            m: 3
                        }}
                        src={data?.user?.image}
                    /> :
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            m: 3
                        }}
                    />
            }
            <Typography
                variant='h4'
                component={`div`}
                sx={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {data?.user?.name}
                {
                    (data?.user?.isAdmin) ?
                        <>
                            <MdVerifiedUser
                                style={styles.verified}
                            />
                            <MdVerified
                                style={styles.verified}
                            />
                        </> : ''

                }
                {/* <span> */}
                {/* </span> */}
            </Typography>
            <Typography
                variant='caption'
                component={`div`}
                sx={{
                    color: '#ffffff6b',
                    fontSize: 14,
                    paddingTop: 1,
                }}
            >
                @{data?.user?.username}
            </Typography>
            <Typography
                variant='subtitle1'
                component={`div`}
                sx={{
                    color: '#ffffff6b',
                }}
            >

                {
                    (data && data.user) ?
                        [0, 1].includes(data.user.followers.length) ?
                            `${data.user.followers.length} Follower` :
                            `${data.user.followers.length} Followers` :
                        ''

                }
            </Typography>
            <Box
                sx={[
                    styles.displayFlex, {
                        margin: '8px 0',
                        justifyContent: 'space-between'
                    }
                ]}
            >
                <Button
                    sx={[
                        styles.saveBtn, {
                            position: 'static !important',
                            marginRight: 2,
                            padding: '6px 15px',
                            backgroundColor: '#201c1ca1 !important',

                        }
                    ]}
                >Share</Button>
                <Button
                    sx={[
                        styles.saveBtn, {
                            position: 'static !important',
                            marginRight: 2,
                            padding: '11px 20px',
                            backgroundColor: '#201c1ca1 !important',
                        }
                    ]}
                    onClick={(session?.user?.id === data?.user?.id) ? handleProfileEdit : handleFollow}
                >
                    {
                        (session?.user?.id === data?.user?.id) ?
                            'edit profile' :
                            (data?.user?.followers?.some((follow: any) => follow.userId === session?.user?.id)) ?
                                'unfollow' :
                                'follow'
                    }
                </Button>
            </Box>

            <Box
                sx={[
                    styles.displayFlex,
                    styles.justifyCenter,
                    styles.alignItemCenter, {
                        // background: 'red',
                        marginTop: 4
                    }
                ]}
            >
                {
                    saveCreateBtn.map((item, index) => (

                        <Button
                            sx={[styles.transparentBtn(isCreate, item), {

                            }]}
                            key={index}
                            onClick={() => {
                                setIsCreate(item.name);
                                if (item.name === 'saved') {
                                    handleSave()
                                } else {
                                    fetchData();
                                }
                            }}
                        >
                            {item.text}
                        </Button>
                    ))
                }
            </Box>
            {
                !Data?.length ?
                    <Box
                        sx={{
                            margin: '2rem',
                            color: 'red',
                            fontVariant: 'all-petite-caps'
                        }}
                    >
                        this is no post yet!
                    </Box> :
                    <MasonryList
                        size={2}
                        data={Data}
                    />
            }

        </Box>
    )
}

export default Profile