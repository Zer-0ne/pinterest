import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { styles } from '@/utils/styles';
import { Post } from '@/utils/constant';
import ImageCard from './ImageCard';


export interface MasonryListProps {
    size?: any;
    data: Post[];
    fetchData: () => Promise<void>
    // Data:Post[];
}

const MasonryList: React.FC<MasonryListProps> = ({ size, data,fetchData }) => {
    
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
                    />
                ))}
            </Masonry >
        </Box >
    );
}
export default MasonryList;
