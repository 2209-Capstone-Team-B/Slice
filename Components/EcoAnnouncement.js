import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { serverTimestamp, toDate } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
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
import { GrAnnounce } from 'react-icons/gr';
import { BsFillCircleFill, BsKeyboard } from 'react-icons/bs';

const EcoAnnouncement = () => {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const [error, setError] = useState(false);
  const { singleEcosystem, ecosystemMembers, announcements } = useSelector(
    (state) => state
  );

  const handleOpen = () => {
    setOpen(true);
    setSent(false);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
    {
      error && setError(false);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const { userName, color, userId } = ecosystemMembers.find(
    (member) => member.userId === user.uid
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await serverTimestamp();
    if (message === '') {
      setError(true);
    } else {
      await addDoc(collection(db, 'Messages'), {
        sentTo: singleEcosystem.id,
        orgName: singleEcosystem.orgName,
        sentBy: user.uid,
        userName,
        message,
        created,
        color,
        seenBy: { [user.uid]: true },
      });
      setSent(true);
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  };

  return (
    <div className='flex flex-col items-end justify-center'>
      <>
        <button
          className='flex text-md items-center justify-around hover:bg-blue-400 cursor-pointer m-2 px-2 rounded-2xl text-black font-sans border bg-blue-300 w-1/4'
          onClick={handleOpen}
        >
          New Message
          <BsKeyboard size={20} />
        </button>
        {announcements.length ? (
          announcements.map((message, i) => {
            return (
              <div
                key={i}
                className={
                  message.sentBy === userId
                    ? 'w-full flex justify-end'
                    : 'w-full flex justify-start'
                }
              >
                <div className='p-2 m-2 flex flex-col shadow-md rounded-2xl w-1/2'>
                  <div className='flex flex-col'>
                    <BsFillCircleFill color={message.color} className='mr-2' />
                    <p className={`pr-2 text-[${color}]`}>
                      {message.userName}:{' '}
                    </p>
                    {message.sentBy === userId ? (
                      <p className='bg-blue-500 w-fit text-white rounded-xl px-3 border border-gray-200 shadow-sm'>
                        {message.message}
                      </p>
                    ) : (
                      <p className='bg-gray-500 w-fit text-white rounded-xl px-3 border border-gray-200 shadow-sm'>
                        {message.message}
                      </p>
                    )}
                  </div>
                  <p className='text-xs'>
                    {message.created?.toDate().toUTCString()}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Messages...</p>
        )}
      </>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New Message
          <CloseIcon
            className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='w-[32rem]'>
            Enter your Message:{' '}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Message'
            type='text'
            fullWidth
            variant='standard'
            name='message'
            onChange={handleChange}
            className='w-screen'
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={sent} onClick={handleSubmit}>
            {sent ? <Alert severity='success'>Done</Alert> : 'Post'}
          </Button>
          {error && <Alert severity='error'>User not found</Alert>}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EcoAnnouncement;
