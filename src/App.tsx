import { Route, Routes } from 'react-router-dom';
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
  return (
    <>
      {/* Navbar를 최상단에 추가 */}
      <Navbar />
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
