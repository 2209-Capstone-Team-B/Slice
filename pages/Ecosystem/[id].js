import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useRouter } from "next/router";
import {
  fetchEcosystem,
  fetchEcosystemTasks,
  fetchEcosystemMembers,
} from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "../../Components/AddTask";
import EditTask from "../../Components/EditTask";
import InvitePeople from "../../Components/InvitePeople";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ClaimTask from "../../Components/ClaimTask";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";

export default function ecosystem() {
  const [addTask, setAddTasK] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { singleEcosystem, singleEcosystemTasks, ecosystemMembers } =
    useSelector((state) => state);

  const getTasks = async (id) => await dispatch(fetchEcosystemTasks(id));

  useEffect(() => {
    const unsubscribeEcosystemMembers = dispatch(fetchEcosystemMembers(id));
    const unsubscribeEcosystem = dispatch(fetchEcosystem(id));
    const unsubscribeEcosystemTasks = dispatch(fetchEcosystemTasks(id));
    return () => {
      unsubscribeEcosystemMembers();
      unsubscribeEcosystemTasks();
      unsubscribeEcosystem();
    };
  }, [id]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
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
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <div className="text-center text-3xl pt-6">
        {singleEcosystem.orgName}
        <h1
          className="text-sm duration-300 hover:scale-110 cursor-pointer"
          onClick={handleOpen}
        >
          Channel Details {/* ({ecosystemMembers.length}) */}
        </h1>
        <Modal
          open={open}
          onClose={handleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                  TabIndicatorProps={{style: {background:"#FEF3C7"}}}
                  textColor="inherit"
                >
                  <Tab label="About" {...a11yProps(0)} />
                  <Tab
                    label={`Members (${ecosystemMembers.length})`}
                    {...a11yProps(1)}
                  />
                  {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {singleEcosystem.description}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Typography
                  id="modal-modal-title"
                  component="div"
                  className="text-center underline text-lg"
                >
                  {singleEcosystem.orgName} Members
                </Typography>
                {ecosystemMembers.map((member) => (
                  <div key={member.id} className="flex justify-between">
                    {member.userName}
                  </div>
                ))}
              </TabPanel>
              {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
            </Box>
            <CloseIcon
              className="absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold"
              onClick={handleOpen}
            />
          </Box>
        </Modal>
      </div>
      <div className="bg-white h-screen flex-col min-w-full pt-0 p-10">
        <div className="flex h-1/2 w-full">
          <div className="border border-black rounded-3xl grid grid-rows-[1rem, 3rem] w-full m-4">
            <InvitePeople />
            <div className="flex flex-wrap justify-center">
              {ecosystemMembers.map((member, i) => (
                <div
                  key={i}
                  className="border border-black text-center w-3/4 rounded-2xl p-2 m-2"
                >
                  {member.userName}
                </div>
              ))}
            </div>
          </div>
          <div className="border border-black rounded-3xl justify-center w-full m-4 overflow-auto">
            <AddTask id={id} getTasks={getTasks} />
            <div className="flex flex-wrap justify-center">
              {singleEcosystemTasks.map((task, i) => (
                <div
                  key={i}
                  className="border border-black text-center w-3/4 rounded-2xl p-2 m-2"
                >
                  {task.name} due {task.due}
                  <div className="flex justify-around p-3">
                    {task.owner === user.uid && <EditTask task={task} />}
                    <ClaimTask task={task} user={user} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-1/2 w-full">
          <div className="flex border border-black rounded-3xl justify-center w-full m-4">
            <Chart className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ["Scott", "Mike", "Cadre", "Tasdid", "Allan", "Sarah", "Emily"],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 50,
        maxBarThickness: 800,
        minBarLength: 2,
        data: [1, 6, 7, 4, 5, 2, 3],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(170, 239, 139)",
          "rgb(137, 167, 178)",
          "rgb(107, 32, 173)",
          "rgb(244, 175, 24)",
          "rgb(204, 38, 26)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Bar data={data} />;
};
