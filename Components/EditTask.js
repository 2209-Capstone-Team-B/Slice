import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

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

function EditModal({ close }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        className='text-blue-600 border border-blue-600 rounded-3xl p-2 w-1/3 hover:bg-blue-600 hover:text-white'
        onClick={handleOpen}
      >
        Edit Task
      </button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 400, height: 400 }}>
          <div className='flex flex-col justify-between h-full'>
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleClose}
            />
            <h2
              id='child-modal-title'
              className='flex items-center justify-center'
            >
              Editing Task
            </h2>
            <button
              className='text-blue-600 border border-blue-600 rounded-3xl p-2 w-full hover:bg-blue-600 hover:text-white'
              onClick={() => {
                handleClose();
                close();
              }}
            >
              Confirm Edits
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

// Child modal to delete a task

function DeleteModal({ close }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        onClick={handleOpen}
        className='text-red-600 border border-red-600 rounded-3xl p-2 w-1/3 hover:bg-red-600 hover:text-white'
      >
        Delete Task
      </button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
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
                onClick={handleClose}
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
              Comfirm Delete
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
          className='text-blue-600 border border-blue-600 rounded-3xl p-2 hover:bg-blue-600 hover:text-white'
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
            <EditModal close={handleClose} />
            <DeleteModal close={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
