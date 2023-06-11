import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiPhoneNumber from 'material-ui-phone-number-2';

export default function CreateChat({ setOpen, open, setNumbers }) {
  const numbers: string[] = JSON.parse(localStorage.getItem('numbers') || '[]');
  const [number, setNumber] = React.useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  const addNumber = () => {
    if (number === '') return;
    numbers.push(number.substring(1, number.length));
    localStorage.setItem('numbers', JSON.stringify(numbers));
    setOpen(!open);
    setNumbers(numbers);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle style={{ paddingBottom: 40 }} id='alert-dialog-title'>
          {'Enter number to chat'}
        </DialogTitle>
        <DialogContent>
          <MuiPhoneNumber
            defaultCountry={'uz'}
            fullWidth
            onChange={(e: any) => setNumber(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNumber} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
