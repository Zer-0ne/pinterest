import { inputForm } from '@/utils/constant'
import { styles } from '@/utils/styles'
import { Box, Button, Input } from '@mui/material'
import Image from 'next/image'
import React from 'react'
interface Form {
    img: File;
    setImg: React.Dispatch<React.SetStateAction<File | null>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: any) => Promise<void>
    disabled:boolean
}
const Form: React.FC<Form> = ({
    img,
    setImg,
    handleChange,
    handleSubmit,
    disabled
}) => {

    return (
        <>
            <Box
                sx={[
                    styles.displayFlex,
                    styles.flex1,
                    styles.FlexColumn,
                    styles.justifyCenter,
                    styles.alignItemCenter, {
                        // background: 'red',
                        width: '100%',
                    }
                ]}
            >
                <form
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    onSubmit={handleSubmit}>
                    <Box
                        sx={[
                            styles.displayFlex,
                            styles.flex1,
                            styles.justifyCenter, {
                                // background: 'blue',
                                margin: 4,
                                width: { md: '60%', xs: '90%' },
                                alignItems: 'start',
                                flexWrap: 'wrap'
                            }
                        ]}
                    >

                        <Box
                            sx={[
                                styles.displayFlex,
                                styles.flex1, {
                                    margin: '2rem 1rem',
                                    flexBasis: '46%'
                                },
                                styles.justifyCenter
                            ]}
                        >
                            <Image
                                src={URL.createObjectURL(img)}
                                alt={img.name}
                                width={260}
                                height={260}
                                style={{
                                    borderRadius: 20,
                                    width: 'auto'
                                }}
                            />
                        </Box>
                        <Box
                            sx={[
                                styles.displayFlex,
                                styles.FlexColumn,
                                styles.alignItemCenter, {
                                    // background: 'green',
                                    margin: 2,
                                    flex: 3,
                                    flexWrap: 'wrap',
                                    flexBasis: '46%',
                                    alignItems: 'start'
                                }
                            ]}
                        >
                            {
                                inputForm.map((item, index) => (
                                    <Input
                                        sx={[
                                            styles.input,
                                            styles.formInput(item.title),
                                            {
                                                width: '100%',
                                                minHeight: ['Description'].includes(item.name) ? '7em' : '', // Set the desired height here
                                                resize: ['Description'].includes(item.name) ? 'vertical' : '', // Allow vertical resizing of the input field
                                                alignItems: ['Description'].includes(item.name) ? 'start' : ''
                                            }
                                        ]}
                                        key={index}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        onChange={handleChange}

                                    />
                                ))
                            }
                            <Box
                                sx={[
                                    styles.displayFlex,
                                    styles.flex1, {
                                        width: '100%',
                                        alignItems: 'end',
                                        justifyContent: 'end'
                                    }
                                ]}
                            >
                                <Button
                                    sx={[styles.saveBtn, {
                                        m: '0 0 0 2rem ',
                                        position: 'relative',
                                        backgroundColor: 'white !important',
                                        color: 'black',
                                        borderRadius: 4,
                                    }]}
                                    onClick={() => setImg(null)}
                                >Cancel</Button>
                                <Button
                                    sx={[styles.saveBtn, {
                                        m: '0 0 0 2rem ',
                                        position: 'relative',
                                        borderRadius: 4
                                    }]}
                                    disabled={disabled}
                                    type="submit"
                                >Publish</Button>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Form