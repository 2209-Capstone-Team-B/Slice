import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { createEcosystemMember } from '../Store';

export default function CreateMember() {
  const dispatch = useDispatch();
  const { singleEcosystem } = useSelector((state) => state);
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [added, setAdded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAdded(false);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName.length > 0) {
      dispatch(createEcosystemMember(singleEcosystem.id, userName));
      setUserName('');
      setAdded(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className='flex justify-center'>
      <button
        onClick={handleOpen}
        className='bg-blue-300 hover:bg-blue-400 text-black px-4 py-2 rounded-2xl h-10 m-2 w-1/2'
      >
        Add a Member
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Create New Member
          <CloseIcon
            className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='w-[32rem]'></DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='userName'
            label='Enter a name'
            type='email'
            fullWidth
            variant='standard'
            name='userName'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>
            {added ? <Alert severity='success'>Added</Alert> : 'Confirm'}
          </Button>
          {error && <Alert severity='error'>Enter Name</Alert>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
