import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/router';
import {
  fetchEcosystem,
  fetchEcosystemTasks,
  fetchEcosystemMembers,
  fetchTaskHistory,
  fetchRequests,
  fetchAdmin,
  testAdmin,
  fetchRewardHistory,
  fetchAnnouncements,
  fetchAdmins,
} from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import AddCompetitionTask from '../../Components/AddCompetitionTask.js';
import EditCompetitionTask from '../../Components/EditCompetitionTask.js';
import InvitePeople from '../../Components/InvitePeople';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClaimReward from '../../Components/ClaimReward';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { BiCog, BiMessageDetail } from 'react-icons/bi';
import { BsFillCircleFill } from 'react-icons/bs';
import {
  setDoc,
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  toDate,
} from 'firebase/firestore';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import LeaveOrg from '../../Components/LeaveOrg.js';
import BarGraph from '../../Components/BarGraph';
import ApproveRequest from '../../Components/ApproveRequest.js';
import DenyRequest from '../../Components/DenyRequest.js';
import EditDescription from '../../Components/EditDescription';
import EcoAnnouncement from '../../Components/EcoAnnouncement';
import Instructions from '../../Components/Instructions';

export default function ecosystem() {
  const [addTask, setAddTasK] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const {
    singleEcosystem,
    singleEcosystemTasks,
    ecosystemMembers,
    singleTaskHistory,
    singleRewardRequests,
    isAdmin,
    rewardHistory,
    allAdmins,
    announcements,
  } = useSelector((state) => state);

  useEffect(() => {
    const unsubscribeEcosystemMembers = dispatch(fetchEcosystemMembers(id));
    const unsubscribeEcosystem = dispatch(fetchEcosystem(id));
    const unsubscribeEcosystemTasks = dispatch(fetchEcosystemTasks(id));
    const unsubscribeTaskHistory = dispatch(fetchTaskHistory(id));
    const unsubscribeRewardRequests = dispatch(fetchRequests(id));
    const unsubscribeAdmin = dispatch(fetchAdmin(id, user?.uid));
    const unsubscribeAnnouncements = dispatch(fetchAnnouncements(id));
    //dispatch(testAdmin(id, user?.uid))
    const unsubscribeRewardHistory = dispatch(fetchRewardHistory(id));
    const unsubscribeAllAdmins = dispatch(fetchAdmins(id));
    return () => {
      unsubscribeEcosystemMembers();
      unsubscribeEcosystemTasks();
      unsubscribeEcosystem();
      unsubscribeTaskHistory();
      unsubscribeRewardRequests();
      unsubscribeAdmin();
      unsubscribeRewardHistory();
      unsubscribeAnnouncements();
      unsubscribeAllAdmins();
    };
  }, [id]);

  let unseenMessages = announcements.reduce((prev, curr) => {
    if (!curr.seenBy[user?.uid]) {
      return ++prev;
    } else {
      return prev;
    }
  }, 0);
  const setSeen = (e, announcements) => {
    handleOpen();
    announcements.forEach((message) => {
      if (!message.seenBy[user?.uid]) {
        updateDoc(doc(db, 'Messages', message.id), {
          seenBy: { ...message.seenBy, [user.uid]: true },
        });
      }
    });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    alignItems: 'center',
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Container>
            <Box>{children}</Box>
          </Container>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <div className='text-center text-5xl pt-6 font-serif text-blue-500'>
        <div className='flex justify-center'>
          <span>
            <Instructions />
          </span>
          {singleEcosystem.orgName}
        </div>
        <div className='flex justify-center mt-5'>
          <button
            onClick={(e) => {
              setSeen(e, announcements);
            }}
            className={`flex text-sm ml-6 items-center hover:bg-blue-400 cursor-pointer m-2 px-2 rounded-2xl text-black font-sans border bg-blue-300 ${
              unseenMessages > 0 ? 'animate-bounce' : ''
            }`}
          >
            Messages ({unseenMessages})
            <BiMessageDetail size={25} className='pl-2' />
          </button>
          <LeaveOrg
            ecosystemId={singleEcosystem.id}
            type={singleEcosystem.type}
          />
          {/* ({ecosystemMembers.length}) */}
        </div>
        <Modal
          open={open}
          onClose={handleOpen}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box className='overflow-auto' sx={style}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  aria-label='basic tabs example'
                  TabIndicatorProps={{ style: { background: '#FEF3C7' } }}
                  textColor='inherit'
                >
                  <Tab label='Messages' {...a11yProps(0)} />
                  <Tab label='About' {...a11yProps(1)} />
                  <Tab
                    label={`Members (${ecosystemMembers.length})`}
                    {...a11yProps(2)}
                  />
                  <Tab label='Task History' {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Typography
                  id='modal-modal-title'
                  component='div'
                  className='text-center underline text-lg'
                >
                  Messages for '{singleEcosystem.orgName}'
                </Typography>
                <EcoAnnouncement />
              </TabPanel>
              <TabPanel value={value} index={1} className='p-1'>
                Ecosystem Name: {singleEcosystem.orgName}
              </TabPanel>
              <TabPanel value={value} index={1} className='p-1'>
                Description: {singleEcosystem.description}
              </TabPanel>
              {value === 1 && (
                <EditDescription
                  curDescription={singleEcosystem.description}
                  orgId={singleEcosystem.id}
                  curEcoName={singleEcosystem.orgName}
                />
              )}
              <TabPanel value={value} index={2}>
                <Typography
                  id='modal-modal-title'
                  component='div'
                  className='text-center text-lg'
                >
                  {singleEcosystem.orgName} Members
                </Typography>
                {ecosystemMembers.map((member) => (
                  <ol key={member.id} className='flex justify-between'>
                    <li className='flex items-center my-2'>
                      <BsFillCircleFill color={member.color} className='mr-2' />
                      {member.userName}
                    </li>
                  </ol>
                ))}
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Typography
                  id='modal-modal-title'
                  component='div'
                  className='text-center underline text-lg'
                >
                  Completed Task History (Last 30 Days)
                </Typography>
                {rewardHistory.map((task) => (
                  <div key={task.id}>
                    <div>
                      "{task.userName}" completed "{task.name}"
                    </div>
                    <small>{task.created.toDate().toUTCString()}</small>
                    <hr className='my-2' />
                  </div>
                ))}
              </TabPanel>
            </Box>
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleOpen}
            />
          </Box>
        </Modal>
      </div>
      <div className='bg-white h-screen flex-col min-w-full pt-0 p-10'>
        <div className='flex h-[60%] w-full'>
          <div className='flex flex-col border border-gray-200 rounded-3xl w-full m-4 overflow-auto shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)]'>
            <p className='text-center font-serif text-blue-600 pt-2'>
              Group Members
            </p>
            <InvitePeople />
            <div className='flex flex-wrap justify-center'>
              {ecosystemMembers.map((member, i) => (
                <div
                  key={i}
                  className='border border-gray-200 text-center w-3/4 rounded-2xl p-4 m-2 overflow-auto shadow-md'
                >
                  <p className='text-lg font-bold'>
                    {' '}
                    {member.userName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                    {allAdmins.find(
                      (adminObj) => adminObj.userId === member.userId
                    ) && <span className='text-red-600'>Admin</span>}
                  </p>

                  <ol className='list-decimal p-3'>
                    {singleRewardRequests.map((request, idx) => {
                      if (request.userId === member.userId) {
                        return (
                          <div className='flex flex-col' key={idx}>
                            <div className='flex justify-around'>
                              {isAdmin && (
                                <>
                                  <ApproveRequest
                                    request={request}
                                    /*  toggle={toggleCompletedTask} */
                                  />
                                  <DenyRequest request={request} />
                                </>
                              )}

                              {!isAdmin && request.userId === user?.uid && (
                                <DenyRequest request={request} />
                              )}
                            </div>
                            <div className='flex'>
                              <li key={idx} className='text-left p-1 ml-2'>
                                {request.name}
                              </li>
                            </div>
                            <hr className='my-2' />
                          </div>
                        );
                      }
                    })}
                  </ol>
                </div>
              ))}
            </div>
          </div>
          <div className='border border-gray-200 rounded-3xl justify-center w-full m-4 overflow-auto shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)]'>
            <p className='text-center font-serif text-blue-600 pt-2'>Tasks</p>
            {isAdmin && <AddCompetitionTask id={id} />}
            <div className='flex flex-wrap justify-center'>
              {singleEcosystemTasks.length > 0 ? (
                singleEcosystemTasks.map((task, i) => (
                  <div
                    key={i}
                    className='border border-gray-200 text-center w-3/4 rounded-2xl p-2 m-2 shadow-md'
                  >
                    {task.name} : {task.reward} point reward
                    <div className='flex justify-around p-3'>
                      {isAdmin && <EditCompetitionTask task={task} />}
                      <ClaimReward task={task} user={user} />
                    </div>
                  </div>
                ))
              ) : (
                <h1 className='mt-10 items-end'>No Tasks</h1>
              )}
            </div>
          </div>
        </div>
        <div className='flex h-[40%] w-full justify-center'>
          <div className='flex border border-gray-200 rounded-3xl justify-center w-3/4 m-4 shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)] px-20 p-7'>
            <BarGraph
              ecosystemMembers={ecosystemMembers}
              title='Leaderboard'
              className='w-full'
            />
          </div>
        </div>
      </div>
    </>
  );
}
