import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = ({ fullpageApi }: { fullpageApi: any }) => {
  // const navItems = ['BLOCK', 'UNBLOCK', 'HISTORY'];
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
            className="cursor-pointer hover:underline" // 마우스 커서 스타일 및 호버 효과 추가
          >
            {item.label}
          </li>
        ))}
        <li className='ml-auto'>
          {isLoggedIn ? (
            `WELCOME, ${user_name}`
          ) : (
            <button 
              onClick={() => navigate('/login')} // 얘는 navigate로 이동하도록 함
              className="hover:underline"
            >
              LOGIN
            </button>
          )}
        </li>
      </ul>
      <hr className='border-2' />
    </nav>
  );
};

export default Navbar;
