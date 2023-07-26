import { follow, singleUser } from "@/utils/FetchFromApi"
import { Data, SessionsProps, User } from "@/utils/constant"
import { styles } from "@/utils/styles"
import { Avatar, Box, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link"
import React from "react"

const FollowersAccount = (
    {
        item,
        session,
        fetchdata
    }: {
        item: {
            userId: string,
            _id: string
        },
        session: any,
        fetchdata: () => Promise<void>
    }
) => {
    // const { data: session } = useSession() as Data
    const [data, setData] = React.useState<User>()
    const fetchData = async () => {
        try {
            const response = await singleUser(item.userId)
            if (session && session.user) {
                await singleUser(session?.user?.id)
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
    const handleFollow = async () => {
        try {
            if (item) {

                await follow(item.userId)
                await fetchdata()
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Box
                sx={[
                    styles.displayFlex,
                    styles.alignItemCenter,
                    {
                        justifyContent: 'space-between',
                        m: '0 10px'
                    }
                ]}
            >

                <Link
                    href={`/Profile/${data?.id}`}
                >
                    <Box
                        sx={[
                            styles.displayFlex,
                            styles.alignItemCenter, {
                                m: '10px 0 '
                            }
                        ]}
                    >
                        {
                            (data && data.image) ?
                                <Avatar
                                    src={data.image}
                                    sx={{
                                        width: 35,
                                        height: 35,
                                        m: '0 10px '
                                    }}
                                /> : <Avatar
                                    sx={{
                                        width: 35,
                                        height: 35,
                                        m: '0 10px '
                                    }}
                                />
                        }
                        <Typography
                            variant='body2'
                            component={`div`}
                            sx={{
                                // fontWeight:'600',
                                fontSize: 18
                            }}
                        >{data?.name}</Typography>
                    </Box >
                </Link>
                <BsPersonFillAdd
                    style={{
                        color: 'white'
                        , margin: 12
                        , fontWeight: 'bold'
                        , fontSize: 20
                        , cursor: 'pointer'
                        , opacity: (data?.followers?.some((follow: any) => follow.userId === session?.user?.id)) ? 1 : .2
                        , display:(session?.user?.id===data?.id)?'none':'flex'
                    }}
                    onClick={handleFollow}
                />
            </Box>
        </>
    )
}
export default FollowersAccount