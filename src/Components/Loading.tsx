import { styles } from '@/utils/styles';
import { Box, keyframes } from '@mui/material'
import React from 'react'
const rollingAnimation = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Loading = () => {
  return (
    <>
        <Box
            sx={{
                position:'absolute',
                top:0,
                bottom:0,
                left:0,
                right:0,
                display:"flex",
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <Box
                sx={{
                    width:'65px',
                    height:'65px',
                    borderRadius:'50%',
                    background:'#1c1c1d',
                    position:'relative'
                }}
            >
                <Box
                    sx={[
                        styles.displayFlex,
                        styles.justifyCenter,
                        styles.alignItemCenter,
                        {
                        position:'absolute',
                        top:8,
                        bottom:8,
                        right:8,
                        left:8,
                        borderRadius:'50%',
                        animation:`${rollingAnimation} 0.6s linear infinite`
                    }]}
                >
                    <Box
                        sx={{
                            flex:1,
                            borderRadius:'50%',
                            height:'100%',
                            position:'relative'
                        }}
                    >
                        <Box
                            sx={{
                                width:15,
                                height:15,
                                position:'absolute',
                                top:'15%',
                                left:'15%',
                                background:'#7b787899',
                                borderRadius:'50%'
                            }}
                        ></Box>
                        <Box
                            sx={{
                                width:15,
                                height:15,
                                position:'absolute',
                                top:'15%',
                                right:'15%',
                                background:'#7b787899',
                                borderRadius:'50%'
                            }}
                        ></Box>
                        <Box
                            sx={{
                                width:15,
                                height:15,
                                position:'absolute',
                                bottom:'15%',
                                right:'15%',
                                background:'#7b787899',
                                borderRadius:'50%'
                            }}
                        ></Box>
                        <Box
                            sx={{
                                width:15,
                                height:15,
                                position:'absolute',
                                bottom:'15%',
                                left:'15%',
                                background:'#7b787899',
                                borderRadius:'50%'
                            }}
                        ></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default Loading