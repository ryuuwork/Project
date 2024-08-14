import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Authentication/Auth";
import Navbar from "./pages/Navbar/Navbar";
import AcceptInvitation from "./pages/Project/AcceptInvitation";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ProjectList from "./pages/ProjectList/ProjectList";
import Subscription from "./pages/Subscription/Subscription";
import UpgradeSuccess from "./pages/Subscription/UpgradeSuccess";
import TaskDetails from "./pages/TaskDetails/TaskDetails";
import { getUser } from "./redux/Auth/Action";
import { fetchProjects } from "./redux/Project/Action";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProjects({}));
  }, [auth.jwt, dispatch]);

  return (
    <>
      {auth.user && <Navbar />}
      {auth.user ? (
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route
            path="/project/:projectId/tasks/:taskId"
            element={<TaskDetails />}
          />
          <Route path="/upgrade" element={<Subscription />} />
          <Route path="/upgrade/success" element={<UpgradeSuccess />} />
          <Route path="/invite/accept" element={<AcceptInvitation />} />
        </Routes>
      ) : (
        <>
          <Auth />
        </>
      )}
    </>
  );
}

export default App;
