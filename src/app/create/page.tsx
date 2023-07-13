"use client"
import AuthCard from '@/Components/AuthCard'
import Body from '@/Components/Body'
import CreateModal from '@/Components/CreateModal'
import Form from '@/Components/Form'
import Loading from '@/Components/Loading'
import { Data } from '@/utils/constant'
import { styles } from '@/utils/styles'
import { Box, Button, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
interface data {
    [key: string]: any;
}
const page = () => {
    const [open, setOpen] = React.useState(false);
    const { data: session, status: sessionStatus } = useSession() as Data;
    const router = useRouter()
    const [data, setData] = useState<data>({});
    const [img, setImg] = useState<File | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false)
    const inputRef = React.useRef<HTMLDivElement>(null)
    const formData = new FormData();
    if (sessionStatus === 'loading') {
        return <Loading />;
    }
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
    if (!session) {
        return <AuthCard />
    }
    const handleSubmit = async (e: any) => {
        const id = toast.loading("Please wait...")
        e.preventDefault();
        if (sessionStatus != 'authenticated') {
            toast.update(id, {
                autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark", render: 'please login!', type: "error", isLoading: false
            });
            return
        }
        Object.entries(data).forEach(([key, value]) => {
            // if(!value){

            // }
            formData.append(key, value)
        });

        setDisabled(true)
        try {
            if (img) {
                formData.append('image', img)
            }
            const response = await fetch('/api/pins', {
                method: "POST",
                body: JSON.stringify({ ...data }),
            })
            if (response.ok) {
                router.refresh()
                const responseData = await response.json()
                toast.update(id, {
                    autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark", render: responseData.message, type: "success", isLoading: false
                });
                setImg(null)
                setDisabled(false)
                // console.log(responseData)
            } else {
                console.error('Failed to fetch data')
                toast.update(id, {
                    autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark", render: "Something went wrong", type: "error", isLoading: false
                });
                setDisabled(false)
            }
        } catch (error) {
            setDisabled(false)
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
                                disabled={disabled}
                            />
                    }
                </Box>
            </Body>
        </>
    )
}

export default page