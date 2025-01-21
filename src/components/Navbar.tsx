import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const navItems = ['BLOCK', 'UNBLOCK', 'HISTORY'];
  const { user_name, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className='text-white flex flex-col gap-4 min-h-11 max-h-11'>
      <ul className='flex gap-32 font-cinzel font-bold mx-16'>
        {navItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
        <li className='ml-auto'>
          {isLoggedIn ? (
            `WELCOME, ${user_name}`
          ) : (
            <button onClick={() => navigate('/login')}>LOGIN</button>
          )}
        </li>
      </ul>
      <hr className='border-2' />
    </nav>
  );
};

export default Navbar;
