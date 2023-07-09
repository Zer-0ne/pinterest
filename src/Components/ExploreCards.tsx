import { styles } from '@/utils/styles'
import { Box, Card } from '@mui/material'
import React from 'react'
import { Image } from '@/utils/constant'

interface ExploreCardsProps {
    src: string; 
}
const ExploreCards: React.FC<ExploreCardsProps> = ({ src }) => {
    return (
        <>
            <Card
                sx={[
                    styles.exploreCard(src),
                    styles.displayFlex,
                    styles.justifyCenter,

                ]}
            >
                <Box
                    sx={[
                        styles.displayFlex,
                        styles.alignItemCenter,
                        styles.justifyCenter,
                        styles.FlexColumn,
                        styles.flex1, {
                            margin: 1
                        }
                    ]}
                >
                    hi
                </Box>
            </Card>
        </>
    )
}

export default ExploreCards