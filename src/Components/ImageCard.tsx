import { Data, Post, SessionsProps, User, moreOptionsBtn } from '@/utils/constant';
import { styles } from '@/utils/styles';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ModalStructure from './Modal';
import EditForm from './EditForm';
import { deletePin, savePost, singleUser } from '@/utils/FetchFromApi';

const ImageCard = (
    {
        item,
        fetchData,
        session,
        loginedData,
        SessionUser
    }: {
        item: Post,
        fetchData: () => Promise<void>,
        session: {
            user?: User;
        },
        loginedData?: SessionsProps | undefined,
        SessionUser: () => Promise<void>
    }
) => {
    const [isHovered, setIsHovered] = React.useState<Boolean>(false);
    const [open, setOpen] = React.useState(false)
    const [FormData, setFormData] = React.useState<Post[]>()
    // console.log(item)



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
                    opacity: { md: isHovered ? 1 : 0, xs: 1 },
                    position: { md: 'absolute', xs: 'relative' },
                    right: 10,
                    bottom: 10,
                    transition: 'all .3s ease-in-out'
                    , display: 'flex'
                    , justifyContent: "end"
                    , m: '20px 0 7px 0'
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
                                opacity: { md: isHovered ? 1 : 0, xs: .2 },
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