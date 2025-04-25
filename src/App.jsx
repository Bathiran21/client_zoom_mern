import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import ZoomAppsSdk from "@zoom/appssdk";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import UpcomingMeetings from "./pages/UpcomingMeetings";
import PastMeetings from "./pages/PastMeetings";
import ActiveMeeting from "./pages/ActiveMeeting";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isZoom, setIsZoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function configureApp() {
      try {
        const configResponse = await ZoomAppsSdk.config({
          popoutSize: { width: 480, height: 360 },
          capabilities: ["shareApp"],
        });
        setIsZoom(true);
        setIsLoading(false);
      } catch (error) {
        setIsZoom(false);
        setIsLoading(false);
        console.log("Error in configureApp", error);
      }
    }

    configureApp();
  }, []);

  const handleInstallClick = () => {
    window.location.href = "https://servezoommern.onrender.com/auth/install";
  };

  return (
    <Router>
      <div className="container mt-3 " style={{ height: "90vh" }}>
        {!isZoom && !isLoading && (
          <div>
            <h1 className="mb-4">Zoom App (MERN)</h1>
            <p>
              Running in:{" "}
              {isZoom === null ? "Loading..." : isZoom ? "Zoom" : "Browser"}
            </p>

            <button
              onClick={handleInstallClick}
              className="btn btn-dark my-3"
              type="button"
            >
            Install App
            </button>
          </div>
        )}

        {isZoom && (
          <div className="d-flex justify-content-between gap-3 p-3 flex-wrap">
            <NavLink
              to="/active"
              className={({ isActive }) =>
                `text-decoration-none flex-fill text-center py-2 rounded ${
                  isActive ? "text-dark bg-warning" : "text-white bg-dark"
                }`
              }
            >
              Active Meeting
            </NavLink>
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `text-decoration-none flex-fill text-center py-2 rounded ${
                  isActive ? "text-dark bg-warning" : "text-white bg-dark"
                }`
              }
            >
              Schedule Meeting
            </NavLink>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                `text-decoration-none flex-fill text-center py-2 rounded ${
                  isActive ? "text-dark bg-warning" : "text-white bg-dark"
                }`
              }
            >
              Upcoming Meetings
            </NavLink>
            <NavLink
              to="/past"
              className={({ isActive }) =>
                `text-decoration-none flex-fill text-center py-2 rounded ${
                  isActive ? "text-dark bg-warning" : "text-white bg-dark"
                }`
              }
            >
              Past Meetings
            </NavLink>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/schedule" />} />
          <Route path="/schedule" element={<ScheduleMeeting />} />
          <Route path="/upcoming" element={<UpcomingMeetings />} />
          <Route path="/past" element={<PastMeetings />} />
          <Route path="/active" element={<ActiveMeeting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
