const BlockedURLPage = () => {
  return (
    <div className='section overflow-y-hidden'>
      <div className='flex flex-col justify-center items-center min-h-screen gap-20'>
        <div className='w-[1100px] h-[300px] flex flex-col justify-center'>
          <div className='font-abril text-8xl m-2 p-4'>
            This page is blocked
          </div>
          <div className='font-paperlogy font-normal text-2xl m-2 p-4'>
            이 사이트는 차단되었습니다.<br></br>하단의 뒤로가기 버튼을 누르세요.
          </div>
        </div>

        <div className=' w-[1100px] h-[100px] flex flex-col items-center justify-center'>
          <button className='font-paperlogy font-normal text-2xl px-4 py-4 bg-white text-focus-color rounded-lg'>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedURLPage;
