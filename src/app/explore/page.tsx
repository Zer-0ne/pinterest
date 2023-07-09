"use client"
import ExploreCards from '@/Components/ExploreCards'
import { images } from '@/utils/constant'
import { styles } from '@/utils/styles'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Page = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return (
        <>
            <Box
                sx={[
                    styles.explore,
                    styles.alignItemCenter,
                    styles.flex1,
                    styles.displayFlex,
                    styles.justifyCenter,
                    styles.FlexColumn
                ]}
            >
                <Box
                    sx={[
                        styles.flex1,
                        styles.displayFlex,
                        styles.justifyCenter,
                        styles.alignItemCenter,
                        styles.FlexColumn
                    ]}
                >
                    <Typography
                        variant='h5'
                        component={`h5`}
                        sx={[
                            styles.bold,
                            styles.h5
                        ]}
                    >{formattedDate}</Typography>
                    <Typography
                        variant='h4'
                        component={`h5`}
                        sx={[
                            styles.bold,
                            styles.h4
                        ]}
                    >Stay inspired</Typography>
                </Box>
                <Box
                    sx={[
                        styles.displayFlex,
                        styles.flex1,
                        styles.exploreCardsContainer,
                        styles.flexWrap
                    ]}
                >
                    {
                        images.map((item,index)=>(
                            <ExploreCards src={item.src} key={index}/>
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}

export default Page