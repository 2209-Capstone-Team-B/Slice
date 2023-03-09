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
  boxShadow: 24,
  p: 4,
  pt: 0,
  borderRadius: 5,
  alignItems: 'center',
};

// Child modal to edit a task

function EditModal({ close, task }) {
  const [name, setName] = React.useState(task.name);
  const [due, setDue] = React.useState(task.due);
  const [status, setStatus] = React.useState(task.completed);
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
      { name, due, completed: status },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <React.Fragment>
      <button
        className='bg-blue-300 rounded-3xl px-3  py-1 text-sm hover:bg-blue-400'
        onClick={handleOpen}
      >
        Edit Task
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
              Editing Task
            </h2>
            <div className='flex'>
              <div className='flex flex-col justify-around w-1/4'>
                <p className='text-right pt-2'>Name:</p>
                <p className='text-right'>Due:</p>
                <p className='text-right pb-2'>Status:</p>
              </div>
              <form className='w-3/4'>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
                ></input>
                <input
                  value={due}
                  type='date'
                  onChange={(e) => setDue(e.target.value)}
                  className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
                ></input>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value === 'true' ? true : false)
                  }
                  className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
                >
                  <option value={true}>Complete</option>
                  <option value={false}>Incomplete</option>
                </select>
              </form>
            </div>
            <div className='flex justify-center w-full'>
              <button
                className='bg-emerald-400 rounded-3xl py-1 w-1/2 px-3 hover:bg-emerald-500'
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

// Child modal to delete a task

function DeleteModal({ close, task, uderId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = async (closing) => {
    if (closing) {
      setOpen(false);
      return;
    }
    deleteDoc(doc(db, 'Tasks', task.id));
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        onClick={handleOpen}
        className='bg-red-400 rounded-3xl py-1 px-3 text-sm hover:bg-red-500'
      >
        Delete Task
      </button>
      <Modal
        hideBackdrop
        open={open}
        onClose={(e) => handleClose(e, true)}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box
          sx={{
            ...style,
            width: 300,
            height: 135,
            boxShadow: '2px 5px 30px red',
          }}
        >
          <div className='w-full flex flex-col items-center pt-4'>
            <h2 id='child-modal-title' className='p-2'>
              No going back from here!
              <CloseIcon
                className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
                onClick={(e) => handleClose(e, true)}
              />
            </h2>
            <p id='child-modal-description'></p>
            <button
              onClick={() => {
                handleClose();
                close();
              }}
              className='text-red-600 border border-red-600 rounded-3xl p-2 w-3/4 hover:bg-red-600 hover:text-white'
            >
              Confirm Delete
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

//Parent modal for deciding what type of edit you would like to make -- Update or Delete

export default function EditTask({ task }) {
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
        <button
          onClick={handleOpen}
          className='bg-blue-300 rounded-3xl py-1 px-3 text-sm hover:bg-blue-400'
        >
          Edit Task
        </button>
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
            <h2 id='parent-modal-title'>Task: {task.name}</h2>
            <p>{task.completed ? 'Status: Completed' : 'Status: Incomplete'}</p>
            <p>Due: {task.due}</p>
          </div>
          <div className='flex justify-around'>
            <EditModal task={task} close={handleClose} />
            <DeleteModal task={task} close={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
