import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '40%',
  left: '78%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  pt: 0,
  borderRadius: 5,
  alignItems: 'center',
  overflow: 'scroll',
  paddingTop: 5,
};

//Parent modal for deciding what type of edit you would like to make -- Edit or Delete
export default function ClaimTask({ task, user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (e, closing) => {
    if (closing) {
      setOpen(false);
      return;
    }
    setDoc(
      doc(db, 'Tasks', task.id),
      { assignedTo: user.uid },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <div>
      <div className='flex justify-around'>
        <button
          onClick={handleOpen}
          className='bg-emerald-400 rounded-3xl py-1 px-3 text-sm hover:bg-emerald-500'
        >
          Claim Task
        </button>
      </div>
      <Modal
        open={open}
        onClose={(e) => handleClose(e, true)}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 450, height: 250 }}>
          <div className='flex flex-col items-left p-4'>
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={(e) => handleClose(e, true)}
            />
            <h2 id='parent-modal-title'>
              <span className='font-semibold'>Task:</span> {task.name}
            </h2>
            <hr className='m-1' />
            <p>
              <span className='font-semibold'>Status: </span>{' '}
              {task.completed ? 'Completed' : 'Incomplete'}
            </p>
            <hr className='m-1' />
            <p>
              <span className='font-semibold'>Due:</span> {task.due}
            </p>
            <hr className='m-1' />
            <div className='flex justify-center items-end'>
              <button
                onClick={(e) => handleClose(e, false)}
                className='bg-emerald-500 rounded-3xl w-1/3 mt-6 hover:bg-emerald-600'
              >
                Confirm
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
