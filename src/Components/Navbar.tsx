"use client"
import { Data, NavbarIcons } from '@/utils/constant'
import { styles } from '@/utils/styles'
import { Avatar, Box, Input, NoSsr, Paper, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import logo from '@/image/logo.png'

const Navbar = () => {
    const pathName = usePathname()
    const { data: session } = useSession() as Data
    const isSmallDevice = useMediaQuery('(max-width: 900px)');
    return (
        <NoSsr>

            <Box
                sx={[styles.NavbarContainer, {
                    // padding: '0 20px',
                    maxHeight: { xs: '50px', md: '60px' }
                }]}
            >
                {
                    NavbarIcons.map((item, index) => (
                        <Box key={index}
                            sx={styles.NavbarIcons(item, pathName)}
                        >
                            {
                                ['Logo'].includes(item.name) ?
                                    // <Image
                                    //     src={''}
                                    //     alt='pinterest'
                                    //     width={300}
                                    //     height={300}
                                    // /> 
                                    <></>
                                    :
                                    ['Search'].includes(item.name) ? <Input
                                        sx={styles.input}
                                        placeholder='Search...'
                                    /> : ['Profile'].includes(item.name) ?
                                        <Link
                                            href={`/Profile`}
                                            style={{
                                                flex: 1,
                                                border: 'none',
                                                color: 'transparent',
                                                background: 'transparent',
                                            }}
                                        >
                                            {
                                                (!session?.user?.image) ?
                                                    < Avatar
                                                        sx={{
                                                            cursor: 'pointer',
                                                            width: 25,
                                                            height: 25,
                                                            m: 1,
                                                        }}
                                                    /> :
                                                    < Avatar
                                                        sx={{
                                                            cursor: 'pointer',
                                                            width: 25,
                                                            height: 25
                                                        }}
                                                        src={session?.user?.image}
                                                    />
                                            }
                                        </Link>

                                        :
                                        <Link
                                            href={item.path}
                                            style={{
                                                padding: '2px 1rem'
                                            }}
                                        >

                                            {
                                                ['Notification', 'Messages', 'Profile'].includes(item.name) ?
                                                    item.icon :
                                                    isSmallDevice ?
                                                        item.icon :
                                                        item.name

                                            }
                                        </Link>

                            }
                        </Box>
                    ))
                }
            </Box >
        </NoSsr>
    )
}

export default Navbar