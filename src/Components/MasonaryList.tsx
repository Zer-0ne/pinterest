import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { styles } from '@/utils/styles';
import { Data, Post, SessionsProps } from '@/utils/constant';
import ImageCard from './ImageCard';
import { useSession } from 'next-auth/react';
import { singleUser } from '@/utils/FetchFromApi';


export interface MasonryListProps {
    size?: any;
    data: Post[];
    fetchData: () => Promise<void>
    // Data:Post[];
}

const MasonryList: React.FC<MasonryListProps> = ({ size, data,fetchData }) => {
    const { data: session } = useSession() as Data
    const [loginedData, setLoginedData] = React.useState<SessionsProps>()
    const SessionUser = async () => {
        if (session && session.user) {
            const loginUser = await singleUser(session.user.id)
            setLoginedData(loginUser)
        }
    }

    React.useEffect(() => {
        SessionUser()
    }, [session])
    return (
        <Box sx={[
            styles.displayFlex,
            styles.justifyCenter,
            { width: '100%', minHeight: 829, padding: 2, flexWrap: 'wrap' }
        ]}>
            <Masonry columns={!size ? { xs: 2, md: 5, xl: 7 } : size} spacing={3}>
                {data?.map((item, index) => (
                    <ImageCard
                        item={item}
                        key={index}
                        fetchData={fetchData}
                        session={session}
                        loginedData={loginedData}
                        SessionUser={SessionUser}
                    />
                ))}
            </Masonry >
        </Box >
    );
}
export default MasonryList;
