import Navbar from '../components/Navbar';
import jail from '../assets/jail.svg';
import { UnblockReq, unblockSites } from '../api/unblock';

const UnblockPage = () => {
  
  //차단 해제하기 API
  const unblock: UnblockReq = {
    result: 1,
  };

  unblockSites(unblock)
    .then((response) => {
      if (response) {
        console.log(response);
      }
    })
    .catch((error) => console.error(error));

  return (
    <div className='section h-full'>
      <Navbar />
      <div className='flex flex-col items-center h-[calc(100%-2.75rem)] px-16 py-8 gap-6'>
        <div className='bg-white w-[800px] h-12 rounded-3xl' />
        <button
          className='bg-white rounded-3xl w-24 h-12'
          style={{
            boxShadow:
              '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          차단 해제
        </button>
        <img src={jail} />
      </div>
    </div>
  );
};

export default UnblockPage;
