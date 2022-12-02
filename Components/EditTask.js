import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function EditModal() {
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
        <Box sx={{ ...style, width: 200 }}>
          <h2 id='child-modal-title'>Text in a child modal</h2>
          <p id='child-modal-description'></p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function DeleteModal() {
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
        <Box sx={{ ...style, width: 200 }}>
          <h2 id='child-modal-title'>Text in a child modal</h2>
          <p id='child-modal-description'></p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

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
      <Button onClick={handleOpen}>Edit Task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className='flex flex-col items-center p-4'>
            <h2 id='parent-modal-title'>{task.name}</h2>
            <p>{`${task.completed}`}</p>
            <p>Due: {task.due}</p>
          </div>
          <div className='flex justify-around'>
            <EditModal />
            <DeleteModal />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
