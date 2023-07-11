import { deleteComment, singleUser } from '@/utils/FetchFromApi';
import { CommentProps, Data } from '@/utils/constant';
import { styles } from '@/utils/styles'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
const Comment = (
    {
        item,
        authorId,
        fetchdata
    }: {
        item: CommentProps,
        authorId: Boolean,
        fetchdata:() => Promise<void>
    }
) => {
    // post author
    // admin
    // comment userId
    const { data: session } = useSession() as Data
    const [data, setData] = React.useState<User>()
    const [SessionUser, setSessionUser] = React.useState<Data>()
    const fetchData = async () => {
        try {
            const response = await singleUser(item.userId)
            if(session && session.user){
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
            console.log(authorId, item.userId, SessionUser)
            if (authorId || item.userId === session?.user?.id || session?.user?.isAdmin) {
                await deleteComment(item._id);
                await fetchdata()
            }
            return
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box
                sx={[
                    styles.displayFlex,
                    styles.alignItemCenter,
                    {
                        wordWrap: 'break-word',
                        m: '8px 0'
                    }
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
                <Typography
                    variant='caption'
                    component={`div`}
                    sx={{
                        fontSize: 14,
                        m: '0 3px',
                        flex: 2
                    }}
                >
                    {item.comment}
                </Typography>
                {
                    (authorId || item.userId === session?.user?.id || session?.user?.isAdmin) ?
                        // <Button >
                            <MdOutlineDelete
                                style={{
                                    justifySelf: 'self-end',
                                    cursor: 'pointer'
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