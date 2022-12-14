import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 790,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  alignItems: "center",
};

export default function Instructions({ id, user }) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  return (
    <div className="flex w-full justify-start">
      <Tooltip title="Lost?">
        <IconButton onClick={handleOpen}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h3"
            className="font-style: italic font-bold text-bookmark-blue text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6 flex justify-center"
          >
            <h2 className="underline decoration-indigo-500 underline-offset-4 font-bold text-bookmark-blue text-3xl md:text-4 lg:text-4xl text-center lg:text-left mb-6">
              Slice, The Group Task Management App
            </h2>
            <CloseIcon
              className="absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold"
              onClick={handleClose}
            />
          </Typography>
          <h3 className="underline decoration-indigo-400 underline-offset-4 font-bold text-bookmark-blue text-3xl md:text-4 lg:text-2xl text-center lg:text-left mb-1">
            Basics
          </h3>
          <div className="font-serif border-4 border-indigo-300 p-2">
            <ul>
              <li className="p-0.5">
                Our app is built on ecosystems! They function as a space for all
                group members to complete tasks and chat.
              </li>
              <li className="p-0.5">
                Members can create, delete, claim, unclaim, and complete tasks
                depending on ecosystem type.
              </li>
              <li className="p-0.5">
                There is a chat for messages within every ecosystem except on
                the fly.
              </li>
              <li className="p-0.5">
                There are three types of ecosystems: bulletin, task master, & on
                the fly!
              </li>
              <li className="p-0.5">
                Your dashboard showcases both your complete and incomplete tasks
                along with real-time notifications.
              </li>
              <li className="p-0.5">
                Every ecosystem, except on the fly, has a chart displaying each
                member's completed tasks/ points.
              </li>
              <li className="p-0.5">
                Log out and edit profile options are located within the dropdown
                on the top-right.
              </li>
            </ul>
          </div>
          <h3 className="underline decoration-indigo-400 underline-offset-4 font-bold text-bookmark-blue text-3xl md:text-4 lg:text-2xl text-center lg:text-left mb-1 mt-2">
            Account Info
          </h3>
          <div className="font-serif border-4 border-indigo-300 p-2">
            <ul>
              <li className="p-0.5">
                Each real member must have their own account with an unique
                e-mail.
              </li>
              <li className="p-0.5">
                First name, last name, and password can be changed from the
                "Account" drop-down menu.
              </li>
              <li className="p-0.5">
                You can have a different username for every ecosystem you're a
                part of!
              </li>
            </ul>
          </div>
          <h3 className="underline decoration-indigo-400 underline-offset-4 font-bold text-bookmark-blue text-3xl md:text-4 lg:text-2xl text-center lg:text-left mb-1 mt-2">
            Advanced
          </h3>
          <div className="font-serif border-4 border-indigo-300 p-2">
            <ul>
              <li className="p-0.5">You can assign tasks using Drag N Drop!</li>
              <li className="p-0.5">
                Make sure to verify your email from the "Account" drop-down
                menu.
              </li>
              <li className="p-0.5">
                Logging in with Google makes that e-mail unavailable for new
                user sign-ups.
              </li>
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
