import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

type ConfirmationDialogType = {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

export default function ExamStartDialog({ open, handleClose, handleConfirm }: Readonly<ConfirmationDialogType>) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Would you like to give an exam?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}