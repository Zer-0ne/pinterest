import { deleteComment, singleUser } from '@/utils/FetchFromApi';
import { CommentProps, Data, SessionsProps } from '@/utils/constant';
import { styles } from '@/utils/styles'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { toast } from 'react-toastify';
const Comment = (
    {
        item,
        authorId,
        fetchdata
    }: {
        item: CommentProps,
        authorId: string,
        fetchdata: () => Promise<void>
    }
) => {
    // post author
    // admin
    // comment userId
    const { data: session } = useSession() as Data
    const [data, setData] = React.useState<User>()
    const [SessionUser, setSessionUser] = React.useState<SessionsProps>()
    const fetchData = async () => {
        try {
            const response = await singleUser(item.userId)
            if (session && session.user) {
                const sessionUserResponse = await singleUser(session?.user?.id)
                setSessionUser(sessionUserResponse)
            }
            const user = await response?.user || {}
            setData(user)
        } catch (error) {
            console.error(error)
        }
    }
    React.useEffect(() => {
        fetchData()
    }, [item])
    const handleDelete = async () => {
        try {
            if (SessionUser) {

                await deleteComment(item._id, authorId, item.userId, SessionUser);
                await fetchdata()
                return
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box
                sx={[
                    styles.displayFlex,
                    {
                        wordWrap: 'break-word',
                        m: '8px 0',
                        alignItems: 'flex-start'
                    }
                ]}
            >
                <Link
                    href={`/Profile/${item.userId}`}
                >
                    <Box
                        sx={[
                            styles.displayFlex,
                            styles.alignItemCenter
                        ]}
                    >


                        {
                            (!data?.image) ?
                                <Avatar
                                    sx={{
                                        m: '0 4px',
                                        width: 30,
                                        height: 30,
                                    }}
                                /> :
                                <Avatar
                                    sx={{
                                        m: '0 4px',
                                        width: 30,
                                        height: 30,
                                    }}
                                    src={data?.image}
                                />
                        }
                        <Typography
                            variant='h4'
                            component={`h4`}
                            sx={{
                                fontSize: 15,
                                m: '0 3px',
                                fontWeight: 'bold',
                            }}
                        >
                            {data?.name}
                        </Typography>
                    </Box>
                </Link>
                <Typography
                    variant='caption'
                    component={`div`}
                    sx={{
                        fontSize: 14,
                        m: '0 3px',
                        flex: 2,
                        alignSelf: 'center'
                    }}
                >
                    {item.comment}
                </Typography>
                {
                    (authorId === session?.user?.id || item.userId === session?.user?.id || SessionUser?.user?.isAdmin) ?
                        // <Button >
                        <MdOutlineDelete
                            style={{
                                justifySelf: 'self-end',
                                cursor: 'pointer',
                                alignSelf: 'center'
                            }}
                            onClick={handleDelete}
                        />
                        :
                        <></>
                }
            </Box>
        </>
    )
}

export default Comment