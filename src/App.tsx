import { Route, Routes, useLocation } from 'react-router-dom';
import FullPage from './pages/FullPage';
import Navbar from './components/Navbar'; // Navbar 추가
import BlockedURLPage from './pages/BlockedURLPage';
import PhotoAuthPage from './pages/PhotoAuthPage';
import AuthFailPage from './pages/AuthFailPage';
import MemePage from './pages/MemePage';
import Dragpage from './pages/DragPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const location = useLocation();

  // Navbar를 표시할 경로를 설정합니다.
  const showNavbarPaths = [
    '/',
    '/main',
    '/explain',
    '/block',
    '/unblock',
    '/stats',
  ];
  const showNavbar = showNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* Navbar를 최상단에 추가 */}
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<FullPage />} />
        <Route path='/blockedURL' element={<BlockedURLPage />} />
        <Route path='/photo' element={<PhotoAuthPage />} />
        <Route path='/fail' element={<AuthFailPage />} />
        <Route path='/meme' element={<MemePage />} />
        <Route path='/drag' element={<Dragpage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
