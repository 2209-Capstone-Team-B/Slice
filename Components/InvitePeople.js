import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Alert from '@mui/material/Alert';

const InvitePeople = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [invited, setInvited] = useState(false);

  const [error, setError] = useState(false);
  const { singleEcosystem, singleEcosystemTasks, ecosystemMembers } =
    useSelector((state) => state);

  const handleOpen = () => {
    setOpen(true);
    setInvited(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail('');
    {
      error && setError(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // find the invitee to see if they exist in Users
    const q = query(collection(db, 'Users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 1) {
      // check if invitee is already invited
      const x = query(
        collection(db, 'Invites'),
        where('userId', '==', querySnapshot.docs[0].id),
        where('ecosystemId', '==', singleEcosystem.id)
      );
      const inviteSnapshot = await getDocs(x);
      //check if invitee is already in the group
      let alreadyHere = ecosystemMembers.find(
        (member) => member.userId === querySnapshot.docs[0].id
      );

      if (!alreadyHere && inviteSnapshot.size === 0) {
        await addDoc(collection(db, 'Invites'), {
          ecosystemId: singleEcosystem.id,
          orgName: singleEcosystem.orgName,
          userId: querySnapshot.docs[0].id,
          pending: true,
        });
        setInvited(true);
        setTimeout(() => {
          handleClose();
        }, 1000);
      }
    } else {
      setError(true);
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
    <div className='flex justify-center'>
      <button
        className='bg-blue-300 hover:bg-blue-400 text-black px-4 py-2 rounded-2xl h-10 m-2 w-1/2'
        onClick={handleOpen}
      >
        Invite
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Invite Someone
          <CloseIcon
            className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='w-screen'>
            Enter Email Address:{' '}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
            name='email'
            onChange={handleChange}
            className='w-screen'
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={invited} onClick={handleSubmit}>
            {invited ? <Alert severity='success'>Invited</Alert> : 'Invite'}
          </Button>
          {error && <Alert severity='error'>User not found</Alert>}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InvitePeople;
