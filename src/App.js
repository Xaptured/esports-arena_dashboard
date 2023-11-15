import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ParticipantHomePage from './pages/ParticipantHomePage';
import OrganizerHomePage from './pages/OrganizerHomePage';
import AdminHomePage from './pages/AdminHomePage';

function App() {

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
