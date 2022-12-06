import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {
  updatePassword,
  getAuth,
  reauthenticateWithCredential,
} from 'firebase/auth';

const auth = getAuth();
const userPass = auth.currentUser;

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

function promptForCredentials() {
  let signIn = prompt('Enter old password');
}

function EditModal({ close, passUser }) {
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    // TODO(you): prompt the user to re-provide their sign-in credentials
    const credential = promptForCredentials();

    reauthenticateWithCredential(passUser, credential)
      .then(() => {
        // User re-authenticated.
        setOpen(!open);
      })
      .catch((error) => {
        // An error ocurred
        // ...
        alert('Incorrect Password!');
      });
  };
  const handleClose = async (e, closing) => {
    if (closing) {
      setOpen(!open);
      // return;
    }

    updatePassword(passUser, password);
  };
  return (
    <React.Fragment>
      <button
        className='text-blue-600 border border-blue-600 rounded-3xl p-2 hover:bg-blue-600 hover:text-white'
        onClick={handleOpen}
      >
        Edit Password
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
              Editing Password
            </h2>
            <div className='flex'>
              <div className='flex flex-col justify-around w-1/4'>
                <p className='text-right pt-2'>Password</p>
              </div>
              <form className='w-3/4'>
                <input
                  value={password}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
                ></input>
              </form>
            </div>
            <div className='flex justify-center w-full'>
              <button
                className='text-blue-600 border border-blue-600 w-3/4 rounded-3xl p-2 hover:bg-blue-600 hover:text-white'
                onClick={(e) => {
                  setConfirm(true);
                  handleClose(e, true);
                  close();
                }}
              >
                Confirm Edit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

//Parent modal for deciding what type of edit you would like to make -- Update or Delete

export default function EditPassword({ passUser }) {
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
        <EditModal passUser={passUser} close={handleClose} />
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
            <p>Password: </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}