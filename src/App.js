import React, {useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Modal from './Components/Modal';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Pages/Main';
import About from './Pages/About';
import Donate from './Pages/Donate';
import QuickDonation from './Pages/QuickDonation';
import RegularDonation from './Pages/RegularDonation';
import { Context } from './context';
import MarkedList from 'Components/MarkedList';
import TextModules from 'Components/TextModules';
import Gallery from 'Components/Gallery';
function App() {
//Отслеживаем размер вьюпорта, и передаем в контекст-провайдер.
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
      <Context.Provider value={viewPort}>
        <BrowserRouter>
          {modalStatus === 'off' ? (
            <>
              <Header
                modalSwitch={switchModal}
              />
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
                      <About
                        picturePosition={[0, 'after']}
                        viewPort={viewPort}
                      />
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
                  <Route
                    path="/news/:articleId"
                    element={<About picturePosition={[0, 'before']} />}
                  />
                  <Route path="/reports" element={<About />}>
                    <Route
                      path="documents"
                      element={
                        <MarkedList
                          pageName="reports"
                          data={TextModules('reports', 'list')}
                        />
                      }
                    />
                    <Route
                      path="photos"
                      element={<Gallery pageName="reports" section="photos" />}
                    />
                    <Route path="/reports/photos/:articleId" element={null} />
                  </Route>
                  <Route path="/donate/:bankChosen" element={<Donate />} />
                  <Route path="/quick_donation" element={<QuickDonation />} />
                  <Route path='/regular_donation' element={<RegularDonation/> }/>
                </Routes>
              </main>
              <Footer />
            </>
          ) : (
            <Modal
              modalStatus={modalStatus}
              modalSwitch={switchModal}
            />
          )}
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
