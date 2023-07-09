import { styles } from '@/utils/styles'
import { Box, } from '@mui/material'
import React, { ReactNode } from 'react'
interface BodyProps {
    stylesProps: object;
    children: ReactNode;
}
const Body:React.FC<BodyProps> = ({ stylesProps,children }) => {
    return (
        <>
            <Box
                sx={[
                    styles.explore,
                    styles.alignItemCenter,
                    styles.flex1,
                    styles.displayFlex,
                    styles.justifyCenter,
                    styles.FlexColumn,
                    stylesProps
                ]}
            >
                {children}
            </Box>
        </>
    )
}

export default Body