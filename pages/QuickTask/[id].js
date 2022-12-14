import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/router';
import {
  fetchEcosystem,
  fetchEcosystemTasks,
  fetchEcosystemMembers,
  fetchTaskHistory,
  fetchAnnouncements,
} from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import AddQuickTask from '../../Components/AddQuickTask';
import EditTask from '../../Components/EditTask';
import CreateMember from '../../Components/CreatePeople.js';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClaimTask from '../../Components/ClaimTask';
import { BiCog, BiMessageDetail } from 'react-icons/bi';
import {BsInfoCircle} from 'react-icons/bs';
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
import CompleteQuickTask from '../../Components/CompleteQuickTask';
import EditDescription from '../../Components/EditDescription';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EcoAnnouncement from '../../Components/EcoAnnouncement';
import Instructions from '../../Components/Instructions';

export default function QuickTaskecosystem() {
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
  } = useSelector((state) => state);

  const unclaimedTasks = singleEcosystemTasks.filter(
    (task) => task.assignedTo === null
  );

  useEffect(() => {
    const unsubscribeEcosystemMembers = dispatch(fetchEcosystemMembers(id));
    const unsubscribeEcosystem = dispatch(fetchEcosystem(id));
    const unsubscribeEcosystemTasks = dispatch(fetchEcosystemTasks(id));
    //const unsubscribeTaskHistory = dispatch(fetchTaskHistory(id));
    //const unsubscribeAnnouncements = dispatch(fetchAnnouncements(id));
    return () => {
      unsubscribeEcosystemMembers();
      unsubscribeEcosystemTasks();
      unsubscribeEcosystem();
      //unsubscribeTaskHistory();
      //unsubscribeAnnouncements();
    };
  }, [id]);

  const deleteBot = async (e, member) => {
    //delete all of the bot user's tasks
    const botTasks = query(
      collection(db, 'Tasks'),
      where('assignedTo', '==', member.userId)
    );
    const botTaskSnap = await getDocs(botTasks);
    await Promise.all(botTaskSnap.docs.map((task) => deleteDoc(task.ref)));
    //delete the bot user
    deleteDoc(doc(db, 'EcosystemMembers', member.id));
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
  const onDragEnd = (result) => {
    const ecomemberIds = ecosystemMembers.map((member) => {
      return member.id;
    });
    if (!result.destination) return;
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    )
      return;
    if (ecomemberIds.includes(result.draggableId)) return;
    const index = result.destination.index;
    const task = unclaimedTasks.find((task) => task.id === result.draggableId);
    const member = ecosystemMembers[index];

    if (result.destination.droppableId === 'claimedTasks' && task) {
      setDoc(
        doc(db, 'Tasks', task.id),
        { assignedTo: member.userId },
        { merge: true }
      );
    } else if (result.destination.droppableId === 'unclaimedTasks') {
      const [reorderedItem] = unclaimedTasks.splice(result.source.index, 1);
      unclaimedTasks.splice(result.destination.index, 0, reorderedItem);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='text-center text-5xl pt-6 font-serif text-blue-500'>
        <div className='flex justify-center'>
          <span>
            <Instructions />
          </span>
          {singleEcosystem.orgName}
        </div>
        <div className='flex justify-center mt-5'>
          <button
            onClick={handleOpen}
            className='flex text-sm items-center hover:bg-blue-400 cursor-pointer m-2 px-2 rounded-2xl text-black font-sans border bg-blue-300'
          >
            Channel Details
            <BsInfoCircle size={25} className='pl-2'/>
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
                  <Tab label='About' {...a11yProps(0)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0} className='p-1'>
                Ecosystem Name: {singleEcosystem.orgName}
              </TabPanel>
              <TabPanel value={value} index={0} className='p-1'>
                Description: {singleEcosystem.description}
              </TabPanel>
              {value === 0 && (
                <EditDescription
                  curDescription={singleEcosystem.description}
                  orgId={singleEcosystem.id}
                  curEcoName={singleEcosystem.orgName}
                />
              )}
            </Box>
            <CloseIcon
              className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
              onClick={handleOpen}
            />
          </Box>
        </Modal>
      </div>
      <div className='bg-white h-screen flex-col min-w-full pt-0 p-10'>
        <div className='flex h-2/3 w-full'>
          <div className='border border-gray-200 rounded-3xl w-full m-4 overflow-auto shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)]'>
            <p className='text-center font-serif text-blue-600 pt-2'>
              Group Members
            </p>
            <CreateMember />
            <Droppable droppableId='claimedTasks'>
              {(provided, snapshot) => (
                <div
                  className='flex flex-wrap justify-center'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {ecosystemMembers.map((member, i) => (
                    <div
                      key={member.id}
                      className={`${
                        snapshot.isDraggingOver
                          ? 'shadow-[0_15px_100px_-15px_rgba(0,0,0,0.3)]'
                          : ''
                      } border border-gray-200 text-center w-3/4 rounded-2xl p-4 m-1 overflow-auto shadow-md`}
                    >
                      {member.userId !== user?.uid && (
                        <div className='flex justify-end '>
                          {' '}
                          <CloseIcon
                            className='top-0 right-0 duration-300 hover:scale-110 hover:font-bold'
                            onClick={(e) => {
                              deleteBot(e, member);
                            }}
                          />
                        </div>
                      )}

                      <p className='text-lg font-bold'>{member.userName}</p>
                      <Draggable draggableId={member.id} index={i}>
                        {(provided) => (
                          <ol
                            className='list-decimal p-3'
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {singleEcosystemTasks.map((task, idx) => {
                              if (
                                task.assignedTo === member.userId &&
                                !task.completed
                              ) {
                                return (
                                  <div className='flex' key={idx}>
                                    <CompleteQuickTask task={task} />

                                    <li
                                      key={idx}
                                      className='text-left p-1 ml-2'
                                    >
                                      {task.name}
                                    </li>
                                  </div>
                                );
                              }
                            })}
                            {provided.placeholder}
                          </ol>
                        )}
                      </Draggable>
                    </div>
                  ))}
                </div>
              )}
            </Droppable>
          </div>

          <Droppable droppableId='unclaimedTasks'>
            {(provided) => (
              <div
                className='border border-gray-200 rounded-3xl justify-center w-full m-4 overflow-auto shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)]'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <p className='text-center font-serif text-blue-600 pt-2'>
                  Unassigned Tasks
                </p>

                <AddQuickTask id={id} />
                <div className='flex flex-wrap justify-center'>
                  {unclaimedTasks.length ? (
                    unclaimedTasks.map((task, i) => (
                      <Draggable key={task.id} draggableId={task.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            className={`${
                              snapshot.draggingOver
                                ? 'shadow-[0_15px_100px_-15px_rgba(0,0,0,0.6)]'
                                : ''
                            } border border-gray-200 text-center w-3/4 rounded-2xl p-2 m-2 shadow-md`}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {task.name} {/* due {task.due} */}
                            <div className='flex justify-around p-3'>
                              {task.owner === user?.uid && (
                                <EditTask task={task} />
                              )}
                              <ClaimTask task={task} user={user} />
                            </div>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <h1 className='mt-10 items-end'>No Tasks To Claim!</h1>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </div>
        {/*      <div className='flex h-1/2 w-full justify-center'>
          <div className='flex border border-gray-200 rounded-3xl justify-center w-auto m-4 shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)] px-20 p-7'>
            <BarGraph ecosystemMembers={ecosystemMembers} title = 'Number of Tasks Completed' className='w-full' />
          </div>
        </div> */}
      </div>
    </DragDropContext>
  );
}
