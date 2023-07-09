import { styles } from '@/utils/styles';
import { Box, Button, Input } from '@mui/material';
import React, { useState } from 'react';
import { Data, Post, inputForm } from '../utils/constant';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { editPin } from '@/utils/FetchFromApi';
type ChangedValues = {
    [key: string]: string;
};
const EditForm = (
    {
        Data,
        setOpen
    }: {
        Data: Post,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    }
) => {
    const { data: session } = useSession() as Data
    const inputRef = React.useRef<HTMLDivElement>(null)
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'image') {
            if (!event.target.files) return;
            const file: File = event?.target.files[0];
            const reader = new FileReader();
            console.log('hi')
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    const dataURL = e.target.result.toString();
                    setInputValues((prevData) => ({
                        ...prevData,
                        image: dataURL
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
        else {
            setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
        }
    };

    React.useEffect(() => {
        setInputValues((prevValues: any) => ({ ...prevValues, ...Data }));
    }, [Data]);

    // handle submit 
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const changedValues = Object.entries(inputValues)
                .filter(([key, value]) => value !== Data[key])
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {} as ChangedValues);
            console.log(changedValues)
            if (session?.user?.id === Data.authorId || session?.user?.isAdmin) {
                const response = await editPin(Data._id, changedValues);
                console.log(response)
                return response;
            }
            throw new Error('You are not authorized to perform this action');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={[styles.displayFlex, styles.flexWrap, styles.justifyCenter, styles.alignItemCenter, styles.flex1, { p: 2,
                        maxHeight:'80vh',
                        overflow:'auto'
                    }]}
                >

                    <input ref={inputRef as React.RefObject<HTMLInputElement>}
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        name='image'
                        onChange={handleChange}
                    // value={base64Image}
                    />
                    <Box
                        sx={[
                            styles.displayFlex,
                            styles.justifyCenter,
                            styles.FlexColumn,
                            styles.alignItemCenter,
                            styles.flex1,
                            {
                                cursor: 'pointer',
                                borderRadius: '10px',
                                // border: '1px dotted gray',
                                width: '100%',
                                minHeight: 150,
                                m: 3,
                                flex: '1 0 50%',
                            },
                        ]}
                        onClick={() => { inputRef.current && inputRef.current?.click() }}
                    >
                        {
                            !Data?.image ?
                                'Add image' :
                                <Image
                                    src={inputValues.image}
                                    alt={inputValues.title}
                                    width={200}
                                    height={200}
                                    style={{
                                        borderRadius: '10px',
                                        width: 'auto',
                                        height: 'auto'
                                    }}
                                />
                        }
                    </Box>
                    <Box sx={[styles.displayFlex, styles.FlexColumn, { flex: '1 0 35%' }]}>
                        {inputForm.map((item, index) => (
                            <Input
                                sx={[
                                    styles.input,
                                    styles.formInput(item.title),
                                    {
                                        width: '100%',
                                        minHeight: ['Description'].includes(item.name) ? '7em' : '', // Set the desired height here
                                        resize: ['Description'].includes(item.name) ? 'vertical' : '', // Allow vertical resizing of the input field
                                        alignItems: ['Description'].includes(item.name) ? 'start' : '',
                                    },
                                ]}
                                key={index}
                                name={item.name}
                                placeholder={item.placeholder}
                                value={inputValues[item.name] || ''} // Set the value based on inputValues state
                                onChange={handleChange} // Call handleChange function on input change
                            />
                        ))}
                        <Box
                            sx={[styles.displayFlex, styles.justifyCenter,
                            styles.alignItemCenter, {
                                alignSelf: 'flex-end'
                            }
                            ]}
                        >

                            <Button
                                sx={[styles.roundedBtn, {
                                    m: '0 0 0 2rem ',
                                    position: 'static',
                                    borderRadius: 4,
                                }]}
                                onClick={() => setOpen(false)}
                            >cancel</Button>
                            <Button
                                sx={[styles.saveBtn, {
                                    m: '0 0 0 2rem ',
                                    position: 'static',
                                    borderRadius: 4
                                }]}
                                type="submit"
                            >Edit Pins</Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </>
    );
};

export default EditForm;
