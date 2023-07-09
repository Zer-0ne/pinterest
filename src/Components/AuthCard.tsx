import { logIn, signUp } from '@/utils/constant';
import { styles } from '@/utils/styles';
import { Avatar, Backdrop, Box, Button, Fade, Input, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import { signIn, signOut, useSession, } from 'next-auth/react';
export interface FormData {
    [key: string]: string;
}
export interface Auth {
    onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
}
const AuthCard = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState(true);
    const [data, setData] = useState<FormData>({})
    const [otp, setOtp] = useState(false)
    const [otpValid, setOtpValid] = useState(false)
    const inputRef = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        setOpen(true)
    }, [])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            if (!value) {
                setOtp(false)
            }
            else {
                setOtp(true)
            }
        }
        if (name === 'otp') {
            if (!value) {
                setOtpValid(false)
            }
            else {
                setOtpValid(true)
            }
        }
        if (name === 'image') {
            if (!e.target.files) return;
            const file: File | null = e?.target.files[0];
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
    // console.log(data)
    const handleSignUp = async (e: any) => {
        e.preventDefault();
        const {
            name,
            username,
            email,
            otp,
            password,
            adminPassword,
            image
        } = data
        if (!name! || username! || email! || otp! || password! || adminPassword! || image) {
            alert('fill required feilds')
            return
        }
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    otp,
                    password,
                    adminPassword,
                    image
                })
            });
            if (response.ok) {
                const responseData = await response.json()
                console.log(responseData)
            } else {
                console.error('Failed to fetch data')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // handle otp 
    const handleOtp = async () => {
        const {
            email,
        } = data;
        if (!email) {
            alert('fill required feilds')
            return
        }
        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })

            })
            if (response.ok) {
                const responseData = await response.json()
                console.log(responseData)
                // setOtpValid(true)
            } else {
                console.error('Failed to send otp')
                // setOtpValid(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const {
                username,
                password
            } = data
            if (!username || !password) {
                alert('fill required feilds')
                return
            }
            await signIn('credentials', {
                redirect: false,
                username,
                password
            })
            if (session) {
                console.log('User is logged in:', session);
            } else {
                console.log('User is not logged in');
            }
            console.log('success');

        } catch (error: any) {
            console.log(error.message)
        }
        // setOpen(false)
    }
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => { }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={[styles.modalContainer, styles.FlexColumn, {
                        maxHeight: '70vh',
                        overflow: 'auto'
                    }]}>
                        <Button
                            sx={[styles.roundedBtn, styles.crossBtn, {
                                m: 1,
                                right: 0,
                            }]}
                            onClick={() => setOpen(false)}
                        >X</Button>
                        <form
                            onSubmit={
                                (login) ? handleLogin : handleSignUp
                            }
                        >
                            <Box
                                sx={[
                                    styles.displayFlex,
                                    styles.FlexColumn,
                                    styles.justifyCenter,
                                    styles.alignItemCenter,
                                    styles.flex1, {
                                        m: 2,
                                        p: 2,
                                        marginTop: 3
                                    }
                                ]}
                            >
                                <Typography
                                    variant='h5'
                                    component={`div`}
                                    sx={{
                                        marginBottom: 2,
                                        alignSelf: 'start'
                                    }}
                                >
                                    {login ? 'Login' : 'Create an Account'}
                                </Typography>
                                <Avatar
                                    onClick={() => { inputRef.current && inputRef.current?.click() }}
                                    src={data?.image}
                                    sx={{
                                        display: login ? 'none' : 'flex',
                                        width: 100,
                                        height: 100,
                                        position: 'relative',
                                        "::after": {
                                            content: '"+"',
                                            position: 'absolute',
                                            bottom: 15,
                                            right: 18,
                                            color: 'white',
                                            width: '25px',
                                            height: '25px',
                                            borderRadius: '50%',
                                            display: data.image ? 'none' : 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            background: 'green'
                                        },
                                        cursor: 'pointer',
                                        m: 2
                                    }}
                                />
                                <input
                                    ref={inputRef as React.RefObject<HTMLInputElement>}
                                    type='file'
                                    style={{ display: 'none' }}
                                    onChange={handleChange}
                                    // accept="image/*"
                                    name='image'
                                />
                                {
                                    (login ? logIn : signUp).map((item, index) => {
                                        return (
                                            <Input
                                                key={index}
                                                name={item.name}
                                                type={item.type}
                                                placeholder={item.placeholder}
                                                sx={[styles.input, styles.formInput(''), {
                                                    margin: 1,
                                                    display: ['otp'].includes(item.name) ?
                                                        otp ?
                                                            'flex' :
                                                            'none' :
                                                        'flex',
                                                    width: ['otp'].includes(item.name) ? '200px' : '100%',
                                                    alignSelf: ['otp'].includes(item.name) ? 'start' : 'center',
                                                }]}
                                                onChange={handleChange}
                                                value={data[item.name as keyof FormData] || ''}
                                            />
                                        )
                                    })
                                }
                                <Typography
                                    variant='body2'
                                    component={`div`}
                                    sx={{
                                        alignSelf: 'start',
                                        m: '8px 0',
                                        color: '#ffffff8c',
                                        ":hover": {
                                            color: 'white'
                                        },
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => { setLogin((prevState) => !prevState); setData({}) }}
                                >
                                    {
                                        login ?
                                            "Don't have account?" :
                                            'Already have an account?'
                                    }
                                </Typography>
                                <Box
                                    sx={[styles.displayFlex, {
                                        alignSelf: 'start'
                                    }]}
                                >

                                    <Button
                                        sx={[styles.saveBtn, {
                                            position: 'static',
                                            alignSelf: 'start',
                                            borderRadius: 2,
                                            margin: '15px 0 0 0',
                                            display: (login || !otp) ? 'none' : 'flex',
                                            m: '0 10px 0 0'
                                        }]}
                                        onClick={handleOtp}

                                    >{'send otp'}</Button>
                                    <Button
                                        sx={[styles.saveBtn, {
                                            position: 'static',
                                            alignSelf: 'start',
                                            borderRadius: 2,
                                            margin: '15px 0 0 0',
                                            m: '0 10px 0 0',
                                        }]}
                                        disabled={!login ?
                                            !otpValid ?
                                                true :
                                                false :
                                            false}
                                        type='submit'
                                    >{login ? 'login' : 'signup'}</Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Fade >
            </Modal >
        </>
    )
}

export default AuthCard