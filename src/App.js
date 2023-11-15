import './App.css';
import { useEffect, useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ParticipantHomePage from './pages/ParticipantHomePage';
import OrganizerHomePage from './pages/OrganizerHomePage';
import AdminHomePage from './pages/AdminHomePage';

function App() {

  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState({
    isParticipantLogin: false,
    isAdminLogin: false,
    isOrganizerLogin: false,
  });

  useEffect(() => {
    if (isLoggedIn.isParticipantLogin) {
      navigate("/participant-home");
    } else if (isLoggedIn.isOrganizerLogin) {
      navigate("/organizer-home");
    } else if (isLoggedIn.isAdminLogin) {
      navigate("/admin-home");
    } else {
      navigate("/");
    }
  }, [navigate, isLoggedIn.isAdminLogin, isLoggedIn.isOrganizerLogin, isLoggedIn.isParticipantLogin]);

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage loggedInProp={setisLoggedIn} />} />
        <Route path='/participant-home' element={<ParticipantHomePage />} />
        <Route path='/organizer-home' element={<OrganizerHomePage />} />
        <Route path='/admin-home' element={<AdminHomePage />} />
        {/* may add custom error page for below route - page not found */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
