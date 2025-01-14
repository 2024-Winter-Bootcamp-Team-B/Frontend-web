import Logo from '../components/Logo';

const BlockedURLPage = () => {
  return (
    <div className='w-full flex flex-col items-center px-16 py-8'>
      <Logo />
      <div className='flex flex-col gap-12 py-8 h-full'>
        <div className='flex flex-col justify-center h-full gap-8'>
          <p className='font-abril text-8xl'>This site is blocked</p>
          <div className='font-light text-2xl'>
            <p>이 사이트는 차단되었습니다.</p>
            <p>하단의 뒤로가기 버튼을 누르세요.</p>
          </div>
        </div>
        <button
          className='bg-white rounded-3xl w-24 h-12 self-center mt-auto'
          style={{
            boxShadow:
              '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default BlockedURLPage;
