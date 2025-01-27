const MainPage = () => {
  return (
    <div className='section h-full'>
      <div className='flex flex-col gap-7 justify-center w-2/5 h-[calc(100%-2.75rem)] mt-11'>
        <p
          className='font-cinzel font-bold text-8xl self-center text-focus-color'
          style={{
            textShadow: '15px 0.4px 9px rgba(0, 0, 0, 0.25)',
          }}
        >
          FOCUS
        </p>
        <div className='flex flex-col items-end text-2xl mr-[10%]'>
          <p className='mr-[15%]'>Filter Out Chaos,</p>
          <p>Unlock Success!</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
