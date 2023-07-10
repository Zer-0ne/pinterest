import { Data, Post, SessionsProps, moreOptionsBtn } from '@/utils/constant';
import { styles } from '@/utils/styles';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ModalStructure from './Modal';
import EditForm from './EditForm';
import { deletePin, savePost, singleUser } from '@/utils/FetchFromApi';
import { useSession } from 'next-auth/react';

const ImageCard = (
    {
        item,
        fetchData
    }: {
        item: Post,
        fetchData?: () => Promise<void>
    }
) => {
    const { data: session } = useSession() as Data
    const [isHovered, setIsHovered] = React.useState<Boolean>(false);
    const [open, setOpen] = React.useState(false)
    const [loginedData, setLoginedData] = React.useState<SessionsProps>()
    const [FormData, setFormData] = React.useState<Post[]>()
    // console.log(item)

    const SessionUser = async () => {
        if (session && session.user) {
            const loginUser = await singleUser(session.user.id)
            setLoginedData(loginUser)
        }
    }

    React.useEffect(() => {
        SessionUser()
    }, [session])

    // handle save post 
    const handleSave = async () => {
        try {
            if (item && item._id) {
                await savePost(item._id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // handle download
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = item.image;
        link.download = 'filename'; // Specify the desired filename
        link.target = '_blank'; // Open the link in a new tab
        link.click();
    };
    const handleEdit = async () => {
        await setFormData(() => [item])
        setOpen(true)
        console.log(FormData)
    }
    const handleDelete = async () => {
        await deletePin(item._id)
        if (fetchData) {
            await fetchData()
        }
    }
    return (
        <Box sx={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <Link href={`/pin/${item._id}`} style={{
                position: 'relative',

            }} >
                <Image
                    src={item.image}
                    alt={item.title}
                    width={162}
                    height={162}
                    placeholder='blur'
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8CgHgAHjwLyJwNXAAAAABJRU5ErkJggg=="
                    style={{
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        display: 'block',
                        width: '100%',
                        borderRadius: 20,
                        position: 'relative'

                    }}

                />

            </Link>
            <Button
                sx={[styles.saveBtn, {
                    opacity: isHovered ? 1 : 0,
                    transition: 'all .3s ease-in-out',
                    top: 10,
                    right: 10
                }]}
                onClick={handleSave}
            >Save</Button>
            <Box
                sx={{
                    opacity: isHovered ? 1 : 0,
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                    transition: 'all .3s ease-in-out'
                }}
            >

                {
                    moreOptionsBtn.map((btn, id) => (
                        <Button
                            onClick={() => {
                                if (btn.name === 'Download') {
                                    handleDownload();
                                } else if (btn.name === 'Edit') {
                                    handleEdit();
                                } else if (btn.name === 'Delete') {
                                    handleDelete();
                                }
                            }}
                            key={id}
                            sx={[styles.roundedBtn, {
                                opacity: isHovered ? 1 : 0,
                                transition: 'all .3s ease-in-out',
                                m: '0px 8px',
                                fontWeight: 'bold',
                                display: (['Edit', 'Delete'].includes(btn.name)) ? (session?.user?.id === item.authorId || loginedData?.user?.isAdmin) ? 'inline' : 'none' : 'inline',
                            }]}
                        >
                            {btn.icon}
                        </Button>
                    ))
                }
            </Box>

            <ModalStructure
                setOpen={setOpen}
                open={open}
            >
                <EditForm
                    Data={item}
                    setOpen={setOpen}
                    fetchData={fetchData}
                />
                {/* <Form
                    img={item.image}
                /> */}
            </ModalStructure>
        </Box>
    )
}

export default ImageCard