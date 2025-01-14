const AuthFailPage = () => {
  return (
    <div className='section flex flex-col h-full'>
      <div className='flex flex-col bg-slate-500'>
        <div className=''>
          <img
            className='w-24 md:w-auto'
            src='/Users/hannah/Documents/Frontend-web/src/assets/Union.png'
          ></img>
        </div>
        <div>
          <img src='/Users/hannah/Documents/Frontend-web/src/assets/image 77.png'></img>
        </div>
      </div>
      <div className='font-abril text-6xl'>Try Again</div>
      <div>
        <button
          className='bg-white rounded-3xl w-24 h-12 self-center mt-auto'
          style={{
            boxShadow:
              '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          재인증
        </button>
      </div>
    </div>
  );
};

export default AuthFailPage;
