import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../firebase';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pt: 0,
  borderRadius: 5,
  alignItems: 'center',
};

// Child modal to edit a task

function EditModal({ close, userObject }) {
  console.log('USER OBJECT >>>', userObject);
  const [firstName, setFirstName] = React.useState(userObject.firstName);
  const [lastName, setLastName] = React.useState(userObject.lastName);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (e, closing) => {
    if (closing) {
      setOpen(false);
      return;
    }
  };
  return (
    <React.Fragment>
      <button
        className='text-blue-600 border border-blue-600 rounded-3xl p-2 hover:bg-blue-600 hover:text-white'
        onClick={handleOpen}
      >
        Edit Info
      </button>
      <Modal
        hideBackdrop
        open={open}
        onClose={(e) => handleClose(e, true)}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 450, height: 350 }}>
          <div className='flex flex-col justify-around h-full'>
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={(e) => handleClose(e, true)}
            />
            <h2
              id='child-modal-title'
              className='flex items-center justify-center'
            >
              Editing Info
            </h2>
            <div className='flex'>
              <div className='flex flex-col justify-around w-1/4'>
                <p className='text-right pt-2'>First Name</p>
                <p className='text-right'>Last Name</p>
              </div>
              <form className='w-3/4'>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
                ></input>
                <input
                  value={lastName}
                  type='string'
                  onChange={(e) => setLastName(e.target.value)}
                  className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
                ></input>
              </form>
            </div>
            <div className='flex justify-center w-full'>
              <button
                className='text-blue-600 border border-blue-600 w-3/4 rounded-3xl p-2 hover:bg-blue-600 hover:text-white'
                onClick={() => {
                  handleClose();
                  close();
                }}
              >
                Confirm Edits
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

//Parent modal for deciding what type of edit you would like to make -- Update or Delete

export default function EditProfile({ userObject }) {
  console.log('EDIT TASK USER OBJECT >>>', userObject);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='flex justify-around'>
        <EditModal userObject={userObject} close={handleClose} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className='flex flex-col items-center p-4'>
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleClose}
            />
            <p>First Name: {userObject.firstName}</p>
            <p>Last Name: {userObject.lastName}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
