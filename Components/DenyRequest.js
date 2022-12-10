import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../firebase';
import {
  query,
  collection,
  where,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';

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
  overflow: 'scroll',
};

const denyRequest = async (request) => {
  deleteDoc(doc(db, 'RewardRequests', request.requestId));

  // docSnap.forEach((ecoMem) => console.log(ecoMem.ref));

  //create notification
  /* const currentTaskDoc = await getDoc(doc(db, 'Tasks', id));
  const TaskObj = currentTaskDoc.data();

  if (TaskObj.assignedTo !== TaskObj.owner) {
    await setDoc(doc(db, 'Notifications', id), {
      ...TaskObj,
      orgName: singleEcosystem.orgName,
      userName: currentName,
    });
  } */

  //setOpen(false);
};

//Parent modal for deciding what type of edit you would like to make -- Edit or Delete
export default function DenyRequest({ request }) {
  const [open, setOpen] = React.useState(false);
  const { isAdmin } = useSelector((state) => state);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (e, closing) => {
    if (closing) {
      setOpen(false);
      return;
    }
    //find the ecosystem member using request.userId
    //increase their currencyAmount
    //delete the request
    denyRequest(request);
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className='bg-red-400 rounded-3xl py-1 px-3 text-sm hover:bg-red-500 flex'
      >
        {isAdmin ? 'Deny' : 'Unclaim'}
      </button>

      <Modal
        open={open}
        onClose={(e) => handleClose(e, true)}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 350, height: 200 }}>
          <div className='flex flex-col items-center p-4'>
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={(e) => handleClose(e, true)}
            />
            <h2 id='parent-modal-title'>Task: {request.name}</h2>
            <p>{request.userName}'s request will be removed</p>
            <button
              onClick={(e) => handleClose(e, false)}
              className='bg-red-400 rounded-3xl py-1 m-4 px-3 text-sm hover:bg-red-500'
            >
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
