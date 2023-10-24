import './App.css';
import ConnectUsPage from './components/ConnectUsPage/ConnectUsPage';
import LandingPage from './components/LandingPage/LandingPage';
import PartnersPage from './components/PartnersPage/PartnersPage';
import YourPlacePage from './components/YourPlacePage/YourPlacePage';
import { useRef } from 'react';

function App() {

  const yourPlaceRef = useRef(null);
  const partnersRef = useRef(null);
  const connectUsRef = useRef(null);

  return (
    <>
      <LandingPage yourPlaceRefProp={yourPlaceRef} partnersRefProp={partnersRef} connectUsRefProp={connectUsRef} />
      <section ref={yourPlaceRef}>
        <YourPlacePage />
      </section>
      <section ref={partnersRef}>
        <PartnersPage />
      </section>
      <section ref={connectUsRef}>
        <ConnectUsPage />
      </section>
    </>
  );
}

export default App;
