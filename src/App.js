import React, {useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Modal from './Components/Modal';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Pages/Main';
// import HelpArmy from './Pages/HelpArmy';
// import HelpChildren from './Pages/HelpChildren';
// import Aero from './Pages/Aero';
import About from './Pages/About';
function App() {
//Отслеживаем размер вьюпорта, и передаем компонентам как пропс.
  const [viewPort, setViewPort] = useState(window.visualViewport.width);
  const resizeHandler = () => setViewPort(window.visualViewport.width);
  window.addEventListener('resize', resizeHandler);
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  
  const [modalStatus, setModalStatus] = useState('off');

  function switchModal(value) {
    return setModalStatus(value);
  }

  return (
    <>
      <BrowserRouter>
        {modalStatus === 'off' ? (
          <>
            <Header modalSwitch={switchModal} viewPort={viewPort} />
            <main>
              <Routes>
                <Route path="/" element={<Main />} />
                {/* <Route path='chronology' element={<Chronology/> }/> */}
                <Route
                  path="/helpArmy"
                  element={<About picturePosition={[0, 'after']} />}
                />
                <Route
                  path="/helpChildren"
                  element={
                    <About picturePosition={[0, 'after']} viewPort={viewPort} />
                  }
                />
                <Route
                  path="/aero"
                  element={<About picturePosition={[0, 'after']} />}
                />
                <Route
                  path="/about"
                  element={<About picturePosition={[0, 'before']} />}
                />

                <Route path="/news" element={<About />} />
                {/* <Route path='article' element={<Article/> }/>
        </Route>

          <Route path='reports' element={<Reports/>}>
            <Route path='documents' element={<Documents />} />
            <Route path='photos' element={<Photos/>}/>
        </Route>
        <Route path='donate' element={<Donate />} />
        <Route path='quick_donation' element={<QuickDonation />} />
        <Route path='regular_donation' element={<RegularDonation/> }/> */}
              </Routes>
            </main>
            <Footer />
          </>
        ) : (
          <Modal modalStatus={modalStatus} modalSwitch={switchModal} />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
