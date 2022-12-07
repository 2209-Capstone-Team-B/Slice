import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  alignItems: "center",
};

const InvitePeople = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [saved, setSave] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { singleEcosystem, singleEcosystemTasks, ecosystemMembers } =
    useSelector((state) => state);

  const handleOpen = () => {
    setOpen(true);
    // setError(!error);
  };

  const handleClose = () => {
    setOpen(false);
    {
      error && setError(!error);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // find the invitee to see if they exist in Users
    const q = query(collection(db, "Users"), where("email", "==", email));
    console.log(">>>", q);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 1) {
      // check if invitee is already invited
      const x = query(
        collection(db, "Invites"),
        where("userId", "==", querySnapshot.docs[0].id),
        where("ecosystemId", "==", singleEcosystem.id)
      );
      const inviteSnapshot = await getDocs(x);
      //check if invitee is already in the group
      let alreadyHere = ecosystemMembers.find(
        (member) => member.userId === querySnapshot.docs[0].id
      );

      if (!alreadyHere && inviteSnapshot.size === 0) {
        await addDoc(collection(db, "Invites"), {
          ecosystemId: singleEcosystem.id,
          orgName: singleEcosystem.orgName,
          userId: querySnapshot.docs[0].id,
          pending: true,
        });
        setSave(!saved);
      }
    } else {
      setError(!error);
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
    <div className="flex justify-center">
      <button
        className="bg-blue-300 hover:bg-blue-400 text-black px-4 py-2 rounded-2xl h-10 m-2 w-1/2"
        onClick={handleOpen}
      >
        Invite
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Invite Someone
          <CloseIcon
            className="absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="w-screen">
            Enter Email Address:{" "}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            onChange={handleChange}
            className="w-screen"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>
            {saved ? <Alert severity="success">Invited</Alert> : "Invite"}
          </Button>
          {error && <Alert severity="error">User not found</Alert>}
        </DialogActions>
      </Dialog>
      {/* <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            component='div'
            className='text-center'
          >
            Invite Someone
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleOpen}
            />
          </Typography>
          <form className='px-10 border-2 border-black w-3/4 m-auto p-6 mt-6 rounded-md'>
            <label className='float-left pt-4 w-12 text-center'>Name</label>
            <input
              className='block border-2 m-auto my-4 w-5/6 border-black text-center rounded-xl'
              type='text'
              name='email'
              placeholder='Search by email...'
              onChange={handleChange}
            ></input>
            <button
              type='submit'
              className='bg-slate-300 hover:bg-slate-200 text-black px-4 rounded-md h-1/6 items-center m-auto block'
              onClick={handleSubmit}
            >
              {saved ? (
                <Alert severity='success'>Invited</Alert>
              ) : (
                'Invite Person'
              )}
            </button>
          </form>
        </Box>
      </Modal> */}
    </div>
  );
};

export default InvitePeople;
