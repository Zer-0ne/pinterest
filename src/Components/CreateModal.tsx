import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { styles } from '@/utils/styles';
import { Button } from '@mui/material';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
interface CreateModal {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    inputRef: React.RefObject<HTMLDivElement>;
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}
const CreateModal: React.FC<CreateModal> = ({
    setOpen,
    open,
    inputRef,
    handleChange
}) => {

    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <div>
            <input ref={inputRef as React.RefObject<HTMLInputElement>}
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                name='image'
                onChange={handleChange}
            // value={base64Image}
            />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={[styles.modalContainer]}>
                        <Box
                            sx={{
                                position: 'relative',
                                height: 'inherit',
                                flex: 1,
                                width: '100%',
                                // background:'black',
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: { md: 24, xs: 16 }
                                }}
                            >

                                Upload assets to create Pins
                            </Box>
                            <Button
                                sx={[styles.roundedBtn, styles.crossBtn]}
                                onClick={() => setOpen(false)}
                            >X</Button>
                            <Box
                                sx={{
                                    width: '100%',
                                    flex: 1,
                                    height: 'inherit',
                                    display: 'flex',
                                    m: {md:4,xs:2},
                                    // background: 'black',
                                    p: 2,
                                }}
                            >
                                <Box
                                    sx={[
                                        styles.displayFlex,
                                        styles.flex1,
                                        styles.justifyCenter,
                                        styles.alignItemCenter, {
                                            // background:'red',
                                            height: '40vh',
                                            borderRadius: 7,
                                            border: '3px dotted #ffffff1c',
                                            cursor: 'pointer',
                                            fontSize: { md: '20px !important', xs: '14px !important' },
                                            position: 'relative'
                                        },
                                        styles.FlexColumn
                                    ]}
                                    onClick={() => { inputRef.current && inputRef.current?.click() }}
                                >
                                    <BsFillArrowUpCircleFill
                                        style={{
                                            fontSize: 30,
                                            margin: '0 0 20px 0'
                                        }}
                                    />
                                    Click to add images and videos
                                    <Box
                                        sx={[
                                            styles.displayFlex,
                                            // styles.flex1,
                                            styles.justifyCenter,
                                            styles.alignItemCenter, {
                                                position: 'absolute',
                                                bottom: 15,
                                                left: 0,
                                                right: 0,
                                                m: '0 20px',
                                                textAlign: 'center',
                                                fontSize: { md: 20, xs: 16 },

                                            }
                                        ]}
                                    >
                                        We recommend using high-quality .jpg files less than 20MB or .mp4 files less than 100MB
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default CreateModal