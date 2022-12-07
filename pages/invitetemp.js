import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

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

const InvitePeople = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { singleEcosystem, singleEcosystemTasks } = useSelector(
    (state) => state
  );

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let emailFound = '';
    const q = query(collection(db, 'Users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs[0].exists()) {
      await addDoc(collection(db, 'Invites'), {
        ecosystemId: singleEcosystem.id,
        userId: querySnapshot.docs[0].id,
        pending: true,
      });
    }
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   emailFound = doc.data();
    // });
    // if (emailFound) {
    //   console.log('User was found!', emailFound);
    // }
  };

  return (
    <div className='text-center flex justify-center'>
      <button
        className='bg-slate-300 hover:bg-slate-200 rounded-2xl mx-8-0 p-2 h-11 m-2 w-1/2'
        onClick={handleOpen}
      >
        Invite
      </button>

      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            component='div'
            className='text-center'
          >
            Invite Someone
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleOpen}
            />
          </Typography>
          <form className='px-10 border-2 border-black w-3/4 m-auto p-6 mt-6 rounded-md'>
            <label className='float-left pt-4 w-12 text-center'>Name</label>
            <input
              className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
              type='text'
              name='email'
              placeholder='Search by email...'
              onChange={handleChange}
            ></input>
            <button
              type='submit'
              className='bg-slate-300 hover:bg-slate-200 text-black px-4 rounded-md h-1/6 items-center m-auto block'
              onClick={handleSubmit}
            >
              Add Person
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default InvitePeople;
