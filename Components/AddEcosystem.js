import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { AiOutlineDashboard, AiOutlinePlus } from 'react-icons/ai';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  alignItems: 'center',
};

export default function AddEcosystem({ id, user }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [userName, setUsername] = React.useState(
    `${user.firstName}-${user.lastName}`
  );
  const [type, setType] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleChange = (e) => {
  //   if (e.target.name === type) {
  //   } else if (e.target.name == name) {
  //     console.log(e.target.value);
  //     setName(e.target.value);
  //   } else {
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/Ecosystem', {
      id,
      name,
      type,
      userName,
    });
    setName('');
    setUsername('');
    setType('Bulletin');
    handleClose();
  };

  return (
    <div className='flex w-full justify-start'>
      <button
        onClick={handleOpen}
        className='text-black rounded-2xl m-1 flex w-full h-full items-center'
      >
        <p className='w-10/12 m-1 text-left pl-1 mr-0'>Add New Ecosystem</p>
        <AiOutlinePlus />
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
            component='h3'
            className='text-center'
          >
            Create a New Ecosystem
          </Typography>

          <form
            onSubmit={handleSubmit}
            className='px-10 border-2 border-black w-5/6 m-auto p-6 mt-6 rounded-md'
          >
            <label className='float-left pt-6 w-12 text-center'>Name</label>
            <input
              className='block border-2 m-auto my-6 w-3/4 border-black text-center rounded-xl'
              type='text'
              name='name'
              placeholder='Enter a name for your ecosystem...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label className='float-left w-16 text-left'>Username</label>
            <input
              className='block border-2 m-auto my-6 w-3/4 border-black text-center rounded-xl'
              type='text'
              name='username'
              placeholder='Create a username...'
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label className='float-left w-12 text-center'>Type</label>
            <select
              className='block border-2 m-auto my-6 w-3/4 border-black text-center rounded-xl'
              type='date'
              name='type'
              onChange={(e) => setType(e.target.value)}
            >
              <option name='Bulletin'>Bulletin</option>
              <option name='Competition'>Competition</option>
              <option name='Event'>Event</option>
            </select>
            <button
              type='submit'
              className='bg-amber-300 hover:bg-amber-200 text-black px-4 rounded-md h-1/6 items-center m-auto block'
            >
              Add Ecosystem
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
