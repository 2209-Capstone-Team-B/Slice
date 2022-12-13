import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { AiOutlineDashboard, AiOutlinePlus } from 'react-icons/ai';
import { VscQuestion } from 'react-icons/vsc';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { addEcosystem } from '../Store';
import Tooltip from '@mui/material/Tooltip';

const infoItems = [
  'Each ecosystem type has different behavior:',
  '',
  'BULLETIN: the default ecosystem allows any member to add/edit tasks.  Members are other signed in users who are invited by email to the ecosystem. Tasks can be assigned/claimed by anyone. If a task you create is completed by someone else, you will be notified in your dashboard',
  '',
  "TASKMASTER: designed for repetitive tasks/tasks of different weight. The creator of an ecosystem becomes its admin. Only admins can create/edit tasks, which can be given different values, and do not disappear when 'claimed'. Users can submit claims of task completion, which must be admin approved, after which they will receive credit for task completion",
  '',
  'ON THE FLY: designed as a quick scratch pad for divvying up tasks. Unlike other ecosystem types which require every group member to sign up for an account, in this ecosystem, group members are directly created so they can be assigned tasks quickly',
];
const tip = infoItems.join('\n');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 490,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  alignItems: 'center',
};

export default function AddEcosystem({ id, user }) {
  const dispatch = useDispatch();
  const userObject = useSelector((state) => state.loggedInUser);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [userName, setUsername] = React.useState('');
  const [type, setType] = React.useState('Bulletin');
  const [added, setAdded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAdded(false);
    setError(false);
  };

  useEffect(() => {
    setUsername(`${userObject.firstName}-${userObject.lastName}`);
  }, [userObject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0 && description.length > 0) {
      dispatch(
        addEcosystem({
          id,
          name,
          type,
          userName,
          description,
        })
      );
      setName('');
      setType('Bulletin');
      setDescription('');
      setAdded(true);
      setError(false);
      setTimeout(() => {
        handleClose();
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <div className='flex w-full justify-start'>
      <button
        onClick={handleOpen}
        className='text-black rounded-2xl m-1 flex w-full h-full items-center'
      >
        <p className='w-10/12 m-1 text-left pl-1 mr-0'>Add New Ecosystem</p>
        <AiOutlinePlus />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} className='overflow-auto'>
          <Typography
            id='modal-modal-title'
            variant='h5'
            component='h3'
            className='text-center'
          >
            Create a New Ecosystem
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleClose}
            />
          </Typography>

          <form onSubmit={handleSubmit} className='m-auto p-6 mt-6 rounded-md'>
            <label className='float-left pt-6 w-16 text-left'>Name:</label>
            <input
              className='block border border-1 m-auto my-6 w-3/4 border-black text-center rounded-xl'
              type='text'
              name='name'
              placeholder='Enter a name for your ecosystem...'
              value={name}
              maxLength='16'
              onChange={(e) => setName(e.target.value)}
            />
            <label className='float-left w-16 text-left'>Username:</label>
            <input
              className='block border border-1 m-auto my-6 w-3/4 border-black text-center rounded-xl'
              type='text'
              name='username'
              placeholder='Create a username...'
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className='float-left w-16 text-left'>Description:</label>
            <textarea
              className='block border border-1 m-auto my-6 w-3/4 border-black p-1 rounded-xl'
              type='textarea'
              name='description'
              placeholder='Write a description...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className='flex items-end justify-start'>
              <label className='float-left w-16 text-left'>Type:</label>
              <select
                className='block border border-1 m-auto mr-1.5 w-3/4 border-black text-center rounded-xl'
                type='date'
                name='type'
                onChange={(e) => setType(e.target.value)}
              >
                <option name='Bulletin'>Bulletin</option>
                <option name='Competition' value='Competition'>
                  Taskmaster
                </option>
                <option name='QuickTask' value='QuickTask'>
                  On The Fly
                </option>
              </select>{' '}
              <Tooltip
                className='ml-2'
                title={<div style={{ whiteSpace: 'pre-line' }}>{tip}</div>}
              >
                <span>
                  {' '}
                  <VscQuestion />
                </span>
              </Tooltip>
            </div>
            <div className='flex justify-center pt-5'>
              <Button
                disabled={added}
                type='submit'
                className='bg-slate-300 hover:bg-slate-200 text-black px-4 rounded-md h-1/6 items-center m-auto block'
              >
                {added ? (
                  <Alert severity='success'>Added</Alert>
                ) : (
                  'Add Ecosystem'
                )}
              </Button>
              {error && (
                <Alert severity='error'>Please fill out all fields</Alert>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
