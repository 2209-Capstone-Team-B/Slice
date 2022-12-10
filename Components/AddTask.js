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

export default function AddTask({ id }) {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [due, setDue] = React.useState('');
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
    if (name.length > 0) {
      await axios.post(`/api/Ecosystem/${id}`, {
        name,
        due,
        ecosystemId: id,
        assignedTo: null,
        owner: user.uid,
        completed: false,
        completedAt: null,
      });
      setName('');
      setDue('');
      setAdded(true);
      setError(false);
      setTimeout(() => {
        handleClose();
      }, 1000);
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
        Add Task
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Create New Task
          <CloseIcon
            className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='w-screen'>Task Name</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Enter a name for your task...'
            type='email'
            fullWidth
            variant='standard'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-screen'
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText className='w-screen'>Due</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            type='date'
            fullWidth
            variant='standard'
            name='name'
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className='w-screen'
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={added} onClick={handleSubmit}>
            {added ? <Alert severity='success'>Added</Alert> : 'Add Task'}
          </Button>
          {error && <Alert severity='error'>Enter task</Alert>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
