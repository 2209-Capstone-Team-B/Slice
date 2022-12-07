import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';

const EditDescription = ({ curDescription, orgId, curEcoName }) => {
  const [open, setOpen] = React.useState(false);
  const [saved, setSave] = React.useState(false);
  const [description, setDescription] = React.useState(curDescription);
  const [ecosystemName, setEcosystemName] = React.useState(curEcoName);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = async (e, closing) => {
    if (closing) {
      setOpen(false);
      setSave(false);
    }
  };

  const updateInfo = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'Ecosystem', orgId);

    await updateDoc(docRef, {
      description,
      orgName: ecosystemName,
    });
    setSave(true);
  };
  console.log(open);
  return (
    <div className='p-1'>
      <button
        className='text-slate-600 border border-slate-600 rounded-3xl p-1 w-1/6 text-sm hover:bg-red-600 hover:text-white'
        onClick={handleOpen}
      >
        Edit
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Edit{' '}
          <CloseIcon
            className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
            onClick={(e) => handleClose(e, true)}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <form className='w-3/4'>
              <label>Ecosystem Name: </label>
              <input
                type='text'
                value={ecosystemName}
                onChange={(e) => setEcosystemName(e.target.value)}
                className='block border-2 m-auto my-4 w-5/6 border-black rounded-xl p-2'
              />
              <label>Description: </label>
              <textarea
                value={description}
                rows='5'
                cols='53'
                onChange={(e) => setDescription(e.target.value)}
                className='block border-2 m-auto my-4 w-5/6 border-black rounded-xl p-2'
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              updateInfo(e);
            }}
          >
            {saved ? <Alert severity='success'>Saved</Alert> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDescription;
