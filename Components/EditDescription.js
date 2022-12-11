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
import { useDispatch } from 'react-redux';
import { _updateEcosystem } from '../Store';
import { BiPencil } from 'react-icons/bi';

const EditDescription = ({ curDescription, orgId, curEcoName }) => {
  const dispatch = useDispatch();
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
    dispatch(
      _updateEcosystem({ description, orgName: ecosystemName, id: orgId })
    );
    setSave(true);
  };

  return (
    <div className='p-1'>
      <button
        className='border flex items-center bg-blue-300 rounded-lg p-1 px-3 hover:bg-blue-400 ml-5'
        onClick={handleOpen}
      >
        Edit
        <BiPencil className='ml-2' />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Edit
          <CloseIcon
            className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
            onClick={(e) => handleClose(e, true)}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContent id='alert-dialog-description'>
            <form className='w-3/4'>
            <DialogContentText id='alert-dialog-description'> <label>Ecosystem Name: </label> </DialogContentText>
              <input
                type='text'
                value={ecosystemName}
                onChange={(e) => setEcosystemName(e.target.value)}
                className='block border border-1 m-auto my-4 w-5/6 border-black rounded-xl p-2'
              />
             <DialogContentText id='alert-dialog-description'>
              <label>Description: </label>
              </DialogContentText>
              <textarea
                value={description}
                rows='5'
                cols='53'
                onChange={(e) => setDescription(e.target.value)}
                className='block border border-1 m-auto my-4 w-5/6 border-black rounded-xl p-2'
              />
            </form>
          </DialogContent>
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
