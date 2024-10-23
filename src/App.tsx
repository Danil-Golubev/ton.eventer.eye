import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { MainPage } from './pages/MainPage/MainPage';
import { ConfigPage } from './pages/ConfigPage/ConfigPage';

function App() {

  return (
    <div className='main'>

 <BrowserRouter>
            <Routes>
              <Route element={<MainPage />} path="/" />
              <Route element={<ConfigPage />} path="/config" />
            </Routes>
            <div className="navBarSpace"></div>
            <NavBar />
          </BrowserRouter>
</div>
  );
}

export default App;
