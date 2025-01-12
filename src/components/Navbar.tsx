const Navbar = () => {
  return (
    <nav className='text-white flex flex-col gap-4 min-h-11 max-h-11'>
      <ul className='flex gap-32 font-cinzel font-bold px-16'>
        <li className=''>BLOCK</li>
        <li className=''>UNBLOCK</li>
        <li className=''>HISTORY</li>
        <li className='ml-auto'>LOGIN</li>
      </ul>
      <hr className='border-2' />
    </nav>
  );
};

export default Navbar;
