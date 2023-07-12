import { deletePin, follow, newComment, savePost, singleUser, } from '@/utils/FetchFromApi';
import { styles } from '@/utils/styles'
import { Avatar, Box, Button, Input, Typography } from '@mui/material'
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { BiLink } from 'react-icons/bi';
import { RiEditBoxFill } from 'react-icons/ri';
import Comment from './Comment';
import { IoIosSend } from "react-icons/io";
import { CommentProps, Data, Post, PostCardProps, SessionsProps, User, } from '@/utils/constant';
import Loading from './Loading';
import { MdVerified, MdVerifiedUser, MdOutlineDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import AuthCard from './AuthCard';
import ModalStructure from './Modal';
import EditForm from './EditForm';
export interface card {
    data: PostCardProps[];
    src?: string | undefined | null;
    fetchdata: () => Promise<void>
}
const PostCard: React.FC<card> = ({ data, fetchdata }) => {
    const [loginedData, setLoginedData] = React.useState<SessionsProps>()
    const router = useRouter();
    const [open, setOpen] = React.useState(false)
    const { data: session, status: sessionStatus } = useSession() as Data;
    const cardContainerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [commentData, setCommentData] = React.useState<{ [key: string]: string }>({})
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardContainerRef.current &&
                cardContainerRef.current.contains(event.target as Node) &&
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)) {
                router.back(); // Navigate back to the previous page
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [router]);


    // handle copy post link
    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
    }


    // handle follow and unfollow
    const fetch = async () => {
        try {
            if (data && data[0].user) {
                await follow(data[0].user.id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // handle save post 
    const handleSave = async () => {
        try {
            if (data && data[0].Pin) {
                await savePost(data[0].Pin._id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // handle comments
    const handleComment = async (e: any) => {
        e.preventDefault()
        try {
            if (!session) {
                return { message: 'login please' }
            }
            const response = await newComment({
                ...commentData,
                userId: session?.user?.id,
                pinId: data[0]?.Pin._id
            })
            console.log(response)
            await fetchdata()
        } catch (error) {
            console.log(error)
        }
    }

    // handle change 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setCommentData((prevValues) => ({ ...prevValues, [name]: value }))
    }

    // handle Delete
    const handleDelete = async () => {
        const id = toast.loading("Please wait...")
        if (session && session.user) {
            const loginUser = await singleUser(session.user.id)
            setLoginedData(loginUser)
            if (session?.user?.id === data[0].Pin.authorId || loginUser.user.isAdmin) {
                await deletePin(data[0].Pin._id)
            }
        }
        if (sessionStatus != 'authenticated') {
            toast.update(id, {
                render: "Please login first", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return <AuthCard />
        }
        toast.update(id, {
            render: "You are Not Authorized", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        return
    }

    const SessionUser = async () => {
        if (session && session.user) {
            const loginUser = await singleUser(session.user.id)
            setLoginedData(loginUser)
        }
    }

    useEffect(() => {
        SessionUser()
    }, [session])
    // handle edit 
    const handleEdit = async () => {
        const id = toast.loading("Please wait...")
        // if (session && session.user && loginedData) {

        if (session?.user?.id === data[0].Pin.authorId || loginedData?.user.isAdmin) {
            toast.update(id, {
                render: "please edit your pins", type: "info", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setOpen(true)
            return
        }
        // }
        if (sessionStatus != 'authenticated') {
            const id = toast.loading("Please wait...")
            toast.update(id, {
                render: "Please login first", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return <AuthCard />
        }
        toast.update(id, {
            render: "You are Not Authorized", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        return

    }

    if (sessionStatus === 'loading') {
        return <Loading />;
    }
    if (!data[0]) {
        return <Loading />;
    }
    return (
        <>

            <Box
                ref={cardContainerRef}
                sx={[
                    styles.displayFlex,
                    styles.flex1,
                    styles.alignItemCenter,
                    styles.justifyCenter, {
                        m: 2,
                        width: '90%',
                        // background:'white'
                    }
                ]}
            >
                <Box
                    ref={cardRef}
                    sx={[
                        styles.displayFlex,
                        styles.justifyCenter, {
                            minWidth: '60vw',
                            margin: { md: 2, xs: 0 },
                            borderRadius: 8,
                            overflow: 'hidden',
                            p: 2
                        },
                        styles.cardBg,
                        styles.flexWrap
                    ]}
                >
                    <Box
                        sx={[
                            styles.flex1, {
                                flexBasis: '45%',
                                minWidth: 300
                            }
                        ]}
                    >
                        {data[0]?.Pin?.image && (
                            <Image
                                src={data[0]?.Pin?.image}
                                alt={`image`}
                                width={160}
                                height={160}
                                style={{
                                    width: '100%',
                                    borderRadius: 16
                                }}
                            />
                        )}
                    </Box>

                    <Box
                        sx={[
                            styles.flex1,
                            styles.displayFlex,
                            styles.FlexColumn, {
                                flexBasis: '45%',
                                minWidth: 300
                            }
                        ]}
                    >
                        <Box
                            sx={[
                                styles.flex1,
                                styles.displayFlex,
                                styles.alignItemCenter,
                                styles.FlexColumn, {
                                    p: 2,
                                }
                            ]}
                        >
                            <Box
                                sx={[
                                    styles.displayFlex,
                                    styles.flex1, {
                                        justifyContent: 'space-between',
                                        width: '97%',
                                    },
                                    styles.alignItemCenter
                                ]}
                            >
                                <Box
                                    sx={[styles.displayFlex, {
                                        justifyContent: 'space-evenly',
                                        maxWidth: '35%'
                                    }]}
                                >

                                    <BiLink
                                        style={{
                                            cursor: 'pointer',
                                            padding: 3,
                                            fontSize: 28,
                                        }}
                                        onClick={handleCopy}
                                    />
                                    {
                                        (session?.user?.id === data[0].Pin.authorId || loginedData?.user?.isAdmin) ?
                                            <>
                                                <MdOutlineDelete
                                                    style={{
                                                        cursor: 'pointer',
                                                        padding: 3,
                                                        fontSize: 28,
                                                    }}
                                                    onClick={handleDelete}
                                                />
                                                <RiEditBoxFill
                                                    style={{
                                                        cursor: 'pointer',
                                                        padding: 3,
                                                        fontSize: 28,
                                                    }}
                                                    onClick={handleEdit}
                                                />

                                            </> : <></>
                                    }
                                </Box>
                                <Button
                                    sx={[styles.saveBtn, {
                                        position: 'static',
                                        zIndex: 10
                                    }]}
                                    onClick={handleSave}
                                >
                                    {

                                        data[0]?.user?.saved?.find((save) => save === session?.user?.saved) ?
                                            'Saved' :
                                            'save'

                                    }
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={[
                                styles.displayFlex,
                                styles.FlexColumn,
                                styles.justifyCenter,
                                styles.flex1, {
                                    p: 2,
                                    flex: 10
                                }
                            ]}
                        >
                            <Box
                                sx={[
                                    styles.displayFlex,
                                ]}
                            >

                                Uploaded by <Typography
                                    component={`span`}
                                    sx={{
                                        fontWeight: '700',
                                        marginLeft: 1.5
                                    }}
                                >{data[0]?.user?.name}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    m: '2rem 0 0 0 '
                                }}
                            >
                                <Typography
                                    variant='h4'
                                    component={`div`}
                                    sx={{
                                        fontWeight:'bold'
                                    }}
                                >{data[0]?.Pin?.title}</Typography>
                                <Typography
                                    variant='body1'
                                    component={`div`}
                                    sx={{
                                        m:'10px 0 0 0 '
                                    }}
                                >{data[0]?.Pin?.Description}</Typography>
                            </Box>
                            <Box
                                sx={[
                                    styles.displayFlex,
                                    styles.flex1,
                                    styles.alignItemCenter, {
                                        marginTop: 1.5,
                                        justifyContent: 'space-between'
                                    }
                                ]}
                            >
                                <Box
                                    sx={[
                                        styles.displayFlex,
                                        styles.flex1,
                                        styles.alignItemCenter,
                                    ]}
                                >

                                    {data[0]?.user?.image && (
                                        <Avatar
                                            src={data[0]?.user?.image}
                                            sx={{ marginRight: 2 }}
                                        />
                                    )}
                                    <Box>

                                        <Typography
                                            variant='body2'
                                            component={`div`}
                                        >
                                            <Link
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                                href={`/Profile/${data[0]?.user?.id}`}
                                            >
                                                {data[0]?.user?.name}
                                                {
                                                    (data[0]?.user?.isAdmin) ?
                                                        <>
                                                            <MdVerifiedUser
                                                                style={{
                                                                    color: 'rgb(0, 149, 246)',
                                                                    fill: 'rgb(0, 149, 246)',
                                                                    margin: '0 1px',
                                                                    fontSize: '18px'
                                                                }}
                                                            />
                                                            <MdVerified
                                                                style={{
                                                                    color: 'rgb(0, 149, 246)',
                                                                    fill: 'rgb(0, 149, 246)',
                                                                    margin: '0 1px',
                                                                    fontSize: '18px'
                                                                }}
                                                            />
                                                        </> : ''

                                                }
                                            </Link>
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            sx={{ color: '#ffffff75' }}
                                            component={`div`}
                                        >{data[0]?.user?.username}</Typography>
                                    </Box>
                                </Box>
                                <Button
                                    sx={[styles.saveBtn, {
                                        alignSelf: 'center',
                                        backgroundColor: 'gray !important',
                                        position: 'static',
                                        fontSize: 12,
                                        display: (data[0]?.user.id === session?.user?.id) ? 'none' : 'block'
                                    }]}
                                    onClick={fetch}
                                >
                                    {
                                        (data[0]?.user?.followers?.some((follow: any) => follow.userId === session?.user?.id)) ?
                                            'unfollow' :
                                            'follow'
                                    }
                                </Button>
                            </Box>


                            <Box
                                sx={[
                                    styles.displayFlex,
                                    styles.flex1,
                                    styles.FlexColumn, {
                                        minHeight: 160,
                                        flex: 10,
                                        // background:'red',
                                        p: '16px 8px',
                                        overflow: 'auto',
                                    }
                                ]}
                            >
                                Comments
                                {
                                    data[0]?.Pin?.comments?.map((item: CommentProps, index) => {
                                        return (
                                            <Comment
                                                key={index}
                                                item={item}
                                                authorId={data[0].Pin.authorId === data[0].user.id}
                                                fetchdata={fetchdata}
                                            />
                                        )
                                    })
                                }
                                {/* TODO: comment container */}

                            </Box>
                            <form
                                onSubmit={handleComment}
                            >

                                <Box
                                    sx={[
                                        styles.displayFlex,
                                        styles.flex1,
                                        styles.justifyCenter,
                                        styles.alignItemCenter, {
                                        }
                                    ]}
                                >
                                    {session?.user?.image && (
                                        <Avatar
                                            src={session?.user?.image}
                                        />
                                    )}

                                    <Input
                                        sx={[styles.input,
                                        styles.formInput(''), {
                                            margin: '0 0 0 12px !important',
                                            borderRadius: 15,
                                        },]}
                                        name='comment'
                                        placeholder='comment'
                                        onChange={handleChange}
                                    />
                                    <Button
                                        sx={[styles.crossBtn, {
                                            position: 'static'
                                        }]}
                                        type='submit'
                                    >
                                        <IoIosSend />
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ModalStructure
                setOpen={setOpen}
                open={open}
            >
                <EditForm
                    Data={data[0].Pin as Post}
                    setOpen={setOpen}
                    fetchData={fetchdata}
                />
                {/* <Form
                    img={item.image}
                /> */}
            </ModalStructure>
        </>
    )
}

export default PostCard