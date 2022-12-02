import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

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
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [due, setDue] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    if (e.target.name === due) {
      setDue(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/Ecosystem/${id}`, {
      name,
      due,
      ecosystemId: id,
      completed: false,
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
        className='bg-amber-300 hover:bg-amber-200 text-black px-4 py-2 rounded-2xl h-1/6 m-2 w-1/2'
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
          </Typography>

          <form
            onSubmit={handleSubmit}
            className='px-10 border-2 border-black w-3/4 m-auto p-6 mt-6 rounded-md'
          >
            <label className='float-left pt-4 w-12 text-center'>Name</label>
            <input
              className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
              type='text'
              name='name'
              placeholder='Enter a name for your task...'
              value={name}
              onChange={handleChange}
            ></input>
            <label className='float-left w-12 text-center'>Due</label>
            <input
              className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
              type='date'
              value={due}
              onChange={handleChange}
            ></input>
            <button
              type='submit'
              className='bg-amber-300 hover:bg-amber-200 text-black px-4 rounded-md h-1/6 items-center m-auto block'
            >
              Add Task
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
