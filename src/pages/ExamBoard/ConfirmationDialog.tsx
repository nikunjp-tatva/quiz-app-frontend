import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

type ConfirmationDialogType = {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

export default function ConfirmationDialog({ open, handleClose, handleConfirm }: Readonly<ConfirmationDialogType>) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Your progress will be lost if you go back. Are you sure you want to go back?
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