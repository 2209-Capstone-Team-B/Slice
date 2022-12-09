import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { AiOutlineDashboard, AiOutlinePlus } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { addEcosystem } from "../Store";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 490,
  bgcolor: "background.paper",
  border: "2px solid #000",
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
            className="text-center"
          >
            How does Slick work?
            <CloseIcon
              className="absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold"
              onClick={handleClose}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
