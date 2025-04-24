import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
          capabilities: ["shareApp", "getUserContext", "getMeetingContext"],
        });
        const userContext = await zoomSdk.getUserContext();
        console.log(userContext);
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

  // const handleInstallClick = () => {
  //   window.location.href = "https://servezoommern.onrender.com/auth/install";
  // };
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

            <button onClick={handleInstallClick} className="btn btn-dark my-3">
              Install App
            </button>
          </div>
        )}

        {isZoom && (
          <div className="d-flex justify-content-between gap-3 p-3 text-white flex-wrap">
            <Link
              className="text-white text-decoration-none flex-fill text-center py-2 bg-dark rounded"
              to="/active"
            >
              Active Meeting
            </Link>
            <Link
              className="text-white text-decoration-none flex-fill text-center py-2 bg-dark rounded"
              to="/schedule"
            >
              Schedule Meeting
            </Link>
            <Link
              className="text-white text-decoration-none flex-fill text-center py-2 bg-dark rounded"
              to="/upcoming"
            >
              Upcoming Meetings
            </Link>
            <Link
              className="text-white text-decoration-none flex-fill text-center py-2 bg-dark rounded"
              to="/past"
            >
              Past Meetings
            </Link>
          </div>
        )}

        <Routes>
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
