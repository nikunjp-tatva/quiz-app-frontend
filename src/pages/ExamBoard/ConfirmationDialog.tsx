import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

type ConfirmationDialogType = {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
};

export default function ConfirmationDialog({
    open,
    handleClose,
    handleConfirm,
}: Readonly<ConfirmationDialogType>) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Exam Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>Do you want to submit an exam?</DialogContentText>
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
