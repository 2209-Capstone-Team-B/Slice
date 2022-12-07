import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  alignItems: 'center',
};

export default function AddTask({ id, getTasks }) {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [due, setDue] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    console.log(user.uid);
    e.preventDefault();
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
    getTasks(id);
    handleClose();
  };

  return (
    <div className='flex justify-center'>
      <button
        onClick={handleOpen}
        className='bg-blue-300 hover:bg-blue-400 text-black px-4 py-2 rounded-2xl h-10 m-2 w-1/2'
      >
        Add Task
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            component='div'
            className='text-center'
          >
            Create New Task
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleClose}
            />
          </Typography>
          <form
            onSubmit={handleSubmit}
            className='px-10 border-2 border-black w-3/4 m-auto p-6 mt-6 rounded-md'
          >
            <label className='float-left pt-4 w-12 text-center'>Name</label>
            <input
              className='block borhandleChange my-4 w-5/6 border-2 border-black text-center rounded-xl'
              type='text'
              name='name'
              placeholder='Enter a name for your task...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label className='float-left w-12 text-center'>Due</label>
            <input
              className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
              type='date'
              value={due}
              onChange={(e) => setDue(e.target.value)}
            ></input>
            <button
              type='submit'
              className='bg-slate-300 hover:bg-slate-200 text-black px-4 rounded-md h-1/6 items-center m-auto block'
            >
              Add Task
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
