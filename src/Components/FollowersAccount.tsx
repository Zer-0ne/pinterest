import { singleUser } from "@/utils/FetchFromApi"
import { Data, SessionsProps } from "@/utils/constant"
import { styles } from "@/utils/styles"
import { Avatar, Box, Typography } from "@mui/material"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"

const FollowersAccount = (
    {
        item,
        session
    }: {
        item: {
            userId: string,
            _id: string
        },
        session: SessionsProps
    }
) => {
    // const { data: session } = useSession() as Data
    const [data, setData] = React.useState<User>()
    const fetchData = async () => {
        try {
            const response = await singleUser(item.userId)
            if (session && session.user) {
                const sessionUserResponse = await singleUser(session?.user?.id)
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
    return (
        <>
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
        </>
    )
}
export default FollowersAccount