import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { setMember, deleteInvite } from '../Store';
import DialogContentText from '@mui/material/DialogContentText';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  alignItems: 'center',
};

const SeeInvites = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const userEcosystems = useSelector((state) => state.ecosystems);
  const userInvites = useSelector((state) => state.userInvites);
  const userObject = useSelector((state) => state.loggedInUser);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAcceptHandler = (e, userId, ecoId, userName, inviteId) => {
    e.preventDefault();
    //add this user to EcosystemMembers
    dispatch(setMember(userId, ecoId, userName));
    //delete the invite
    dispatch(deleteInvite(inviteId));
  };
  const onDeclineHandler = (e, inviteId) => {
    e.preventDefault();
    dispatch(deleteInvite(inviteId));
  };

  return (
    <div className='text-center flex justify-center'>
      <button
        className='bg-blue-300 hover:bg-blue-400 rounded-2xl mx-8-0 p-2 h-11 m-2 w-1/2'
        onClick={handleOpen}
      >
        Invites ({userInvites.length})
      </button>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <DialogTitle
            id='modal-modal-title'
            component='div'
            className='text-center underline'
          >
            Your Invites
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleClose}
            />
          </DialogTitle>
          {userInvites.length ? (
            userInvites.map((invite) => (
              <div key={invite.id} className='flex justify-between'>
                {invite.orgName}
                <span>
                  <Button
                    className='p-3'
                    onClick={(e) => {
                      onAcceptHandler(
                        e,
                        invite.userId,
                        invite.ecosystemId,
                        `${userObject.firstName}-${userObject.lastName}`,
                        invite.id
                      );
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={(e) => {
                      onDeclineHandler(e, invite.id);
                    }}
                  >
                    Decline
                  </Button>
                </span>
              </div>
            ))
          ) : (
            <DialogContentText className='text-center mt-6'>
              You have no invites...
            </DialogContentText>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default SeeInvites;
