import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '51%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  pt: 0,
  borderRadius: 5,
  alignItems: 'center',
};

//Parent modal for deciding what type of edit you would like to make -- Edit or Delete
export default function EditProfile({ close, userObject }) {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState(userObject.firstName);
  const [lastName, setLastName] = React.useState(userObject.lastName);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseSubmit = async (e, closing) => {
    if (closing) {
      setOpen(!open);
      // return;
    }
    const profileRef = doc(db, 'Users', userObject.id);
    await updateDoc(profileRef, {
      firstName,
      lastName,
    });
  };

  const handleClose = async (e, closing) => {
    if (closing) {
      setOpen(!open);
      // return;
    }
  };

  return (
    <div>
      <div className='flex justify-around'>
        <button
          onClick={handleOpen}
          className='border bg-orange-300 rounded-lg p-1 px-3 hover:bg-orange-400'
        >
          Edit Info
        </button>
      </div>
      <Modal
        open={open}
        onClose={(e) => handleClose(e, true)}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 450, height: 210 }}>
          <div className='flex flex-col items-center p-4 mt-5'>
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={(e) => handleClose(e, true)}
            />
            <div className='flex'>
              <div className='flex flex-col items-start justify-around mr-2 w-1/2'>
                <p>First Name: </p>
                <p>Last Name: </p>
              </div>
              <form className='w-3/4'>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='block border-2 m-auto my-4 border-black text-center rounded-xl'
                ></input>
                <input
                  value={lastName}
                  type='string'
                  onChange={(e) => setLastName(e.target.value)}
                  className='block border-2 m-auto my-4 border-black text-center rounded-xl mt-6'
                ></input>
              </form>
            </div>
            <button
              onClick={(e) => handleCloseSubmit(e, true)}
              className='bg-emerald-400 rounded-3xl px-4 m-6 mt-2 hover:bg-emerald-500'
            >
              Confirm Edit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
