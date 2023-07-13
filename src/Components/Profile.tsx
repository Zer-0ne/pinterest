import { styles } from '@/utils/styles'
import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import MasonryList from './MasonaryList'
import { signOut, useSession } from 'next-auth/react'
import AuthCard from './AuthCard'
import { follow, singlePin, singleUser } from '@/utils/FetchFromApi'
import { Data, Post, SessionsProps, saveCreateBtn } from '@/utils/constant'
import { MdVerified, MdVerifiedUser } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import Loading from './Loading'
import { toast } from 'react-toastify'
import ModalStructure from './Modal'
import FollowersAccount from './FollowersAccount'
const Profile: React.FC<Data> = ({ data }) => {
    const { data: session, status: sessionStatus } = useSession() as Data;
    // if (sessionStatus === 'loading') {
    //     return <Loading />;
    // }
    const [isCreate, setIsCreate] = useState('create')
    const [open, setOpen] = useState<boolean>(false)
    const [Data, setData] = useState<Post[]>([])
    const [isEmpty, setIsEmpty] = useState<Boolean>(false)
    const fetchData = async () => {
        try {
            if (data && data.user) {
                const response = await fetch(`/api/pins/user/${data.user.id}`, {
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
                    if (!Data.length) {
                        setIsEmpty(true)
                    }
                } else {
                    console.error('Failed to fetch data');
                }
            }
        } catch (error) {
            console.error(error);

        }
    }
    React.useEffect(() => {
        // if (sessionStatus === 'authenticated') {
        fetchData();
        // }
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


    if (!Data) {
        return <Loading />;

    }
    if (Data) {
        if (!isEmpty) {
            return <Loading />
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
                            style={{
                                color: '#d5d5d57d',
                                position: 'absolute',
                                top: 100,
                                right: 60,
                                cursor: "pointer",
                                zIndex: 10
                            }}
                            onClick={() => (<AuthCard />)}
                        /> :
                        <FiLogOut
                            style={{
                                color: '#d5d5d57d',
                                position: 'absolute',
                                top: 100,
                                right: 60,
                                cursor: "pointer",
                                zIndex: 10
                            }}
                            onClick={async () => {
                                const id = toast.loading("logging out...")
                                await signOut();
                                toast.update(id, {
                                    render: 'logout successfully', type: "success", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                            }}
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
                component={`button`}
                sx={{
                    color: '#ffffff6b',
                }}
                onClick={() => setOpen(true)}
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
                            position: 'relative',
                            marginRight: 2,
                            padding: '6px 15px',
                            backgroundColor: '#201c1ca1 !important',

                        }
                    ]}
                >Share</Button>
                <Button
                    sx={[
                        styles.saveBtn, {
                            position: 'relative',
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
                        there is no post yet!
                    </Box> :
                    <MasonryList
                        size={2}
                        data={Data}
                        fetchData={fetchData}
                    />
            }
            <ModalStructure
                setOpen={setOpen}
                open={open}
            >
                <Box
                    sx={[
                        styles.displayFlex,
                        styles.FlexColumn,
                        styles.justifyCenter
                    ]}
                >
                    Followers
                    {/* </Typography> */}
                    {
                        data?.user?.followers?.map((item, index) => (
                            <FollowersAccount
                                key={index}
                                item={item}
                                session={session as SessionsProps}
                            />
                        ))
                    }
                </Box>
            </ModalStructure>

        </Box>
    )
}

export default Profile
