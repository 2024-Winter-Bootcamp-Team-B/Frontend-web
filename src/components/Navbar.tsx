import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = ({ fullpageApi }: { fullpageApi: any }) => {
  const navItems = [
    { label: 'BLOCK', anchor: 'block' },
    { label: 'UNBLOCK', anchor: 'unblock' },
    { label: 'HISTORY', anchor: 'stats' },
  ];
  const { user_name, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className='text-white flex flex-col gap-4 min-h-11 max-h-11'>
      <ul className='flex gap-32 font-cinzel font-bold mx-16'>
        {navItems.map((item) => (
          <li
            key={item.label}
            onClick={() => fullpageApi.moveTo(item.anchor)} // fullpageApi를 통해 섹션 이동
            className=' hover:text-stone-300 cursor-pointer group relative flex items-center overflow-hidden over:underline'
          >
            <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300'></span>
            <span className='relative'>{item.label}</span>
          </li>
        ))}
        <li className='ml-auto'>
          {isLoggedIn ? (
            `WELCOME, ${user_name}`
          ) : (
            <button
              className=' hover:text-stone-300 cursor-pointer group relative flex items-center overflow-hidden over:underline'
              onClick={() => navigate('/login')}
            >
              <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300'></span>
              <span className='relative'>LOGIN</span>
            </button>
          )}
        </li>
      </ul>
      <hr className='border-2' />
    </nav>
  );
};

export default Navbar;
