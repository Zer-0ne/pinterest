"use client"
import Body from '@/Components/Body'
import CreateModal from '@/Components/CreateModal'
import Form from '@/Components/Form'
import { styles } from '@/utils/styles'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
interface Data {
    [key: string]: any;
}
const page = () => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()
    const [data, setData] = useState<Data>({});
    const [img, setImg] = useState<File | null>(null);
    const inputRef = React.useRef<HTMLDivElement>(null)
    const formData = new FormData();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'image') {
            if (!e.target.files) return;
            const file: File = e?.target.files[0];
            setImg(file)
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const dataURL = event.target.result.toString();
                    setData((prevData) => ({
                        ...prevData,
                        image: dataURL
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
        setData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        Object.entries(data).forEach(([key, value]) => {
            // if(!value){
                
            // }
            formData.append(key, value)
        });
        
        try {
            if(img){
                formData.append('image', img)
            }
            const response = await fetch('/api/pins', {
                method: "POST",
                body: JSON.stringify({ ...data }),
                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },
            })
            if (response.ok) {
                router.refresh()
                const responseData = await response.json()
                setOpen(false)
                // console.log(responseData)
            } else {
                console.error('Failed to fetch data')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Body
                stylesProps={{
                    // background:'blue',
                    minHeight: '80vh',
                }}
            >
                <Box
                    sx={[
                        styles.displayFlex,
                        styles.FlexColumn,
                        styles.flex1,
                        styles.justifyCenter,
                        styles.alignItemCenter, {
                            width: '100%'
                        }
                    ]}
                >
                    {
                        !img ?
                            <>
                                <Typography
                                    component={`h5`}
                                    variant='h4'
                                >

                                    Start creating Pins
                                </Typography>
                                <Button
                                    sx={[styles.saveBtn, {
                                        position: 'static',
                                        p: '8px 16px',
                                        m: '15px 0 0 0 '
                                    }]}
                                    onClick={() => setOpen(true)}
                                >
                                    Create new
                                </Button>
                                <CreateModal
                                    setOpen={setOpen}
                                    open={open}
                                    inputRef={inputRef}
                                    handleChange={handleChange}
                                />
                            </> :

                            <Form
                                img={img}
                                setImg={setImg}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                    }
                </Box>
            </Body>
        </>
    )
}

export default page