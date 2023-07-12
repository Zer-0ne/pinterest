import { styles } from '@/utils/styles'
import { Backdrop, Box, Button, Fade, Modal } from '@mui/material'
import React, { SetStateAction } from 'react'

const ModalStructure = (
    {
        children,
        setOpen,
        open
    }:
        {
            children: React.ReactNode,
            setOpen: React.Dispatch<SetStateAction<boolean>>,
            open: boolean
        }
) => {
    return (
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
            sx={{
                // background:'filter(blur(3px)'
            }}
        >
            <Fade in={open}>
                <Box sx={[styles.modalContainer, styles.FlexColumn]}>
                    <Button
                        sx={[styles.roundedBtn, styles.crossBtn, {
                            m: 1,
                            position:'relative',
                            alignSelf:'start'
                        }]}
                        onClick={() => setOpen(false)}
                    >X</Button>
                    {children}
                </Box>
            </Fade>
        </Modal>
    )
}

export default ModalStructure