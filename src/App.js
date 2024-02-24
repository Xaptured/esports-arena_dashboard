import './App.css';
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ParticipantHomePage from './pages/ParticipantHomePage';
import OrganizerHomePage from './pages/OrganizerHomePage';
import AdminHomePage from './pages/AdminHomePage';
import { useAtomValue } from 'jotai';
import { USERS, loggedInUserAtom, loggedInUserAtomCopy } from './atoms/loginDataAtom';
import { useCopyValueAtom } from './atoms/loginDataAtom';

function App() {

  const navigate = useNavigate();
  // ESA-058-START
  const useCopyAtom = useAtomValue(useCopyValueAtom);
  let loggedInUserAtomResult;
  if (useCopyAtom) {
    loggedInUserAtomResult = loggedInUserAtomCopy;
  } else {
    loggedInUserAtomResult = loggedInUserAtom;
  }
  // ESA-058-END
  const loginData = useAtomValue(loggedInUserAtomResult);

  useEffect(() => {
    if (loginData.userType === USERS.PARTICIPANT) {
      navigate("/participant-home");
    } else if (loginData.userType === USERS.ORGANIZER) {
      navigate("/organizer-home");
    } else if (loginData.userType === USERS.ADMIN) {
      navigate("/admin-home");
    } else {
      navigate("/");
    }
  }, [navigate, loginData.userType]);

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
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
