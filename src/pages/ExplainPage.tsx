import Navbar from '../components/Navbar';

const ExplainPage = () => {
  return (
    <div className='section h-full bg-[url("/src/assets/sandglassBackground.png")] bg-center bg-cover'>
      <Navbar></Navbar>
      <div className='flex flex-col justify-center items-center w-1/2 h-[calc(100%-2.75rem)] text-xl font-light'>
        <p>원하는 URL을 입력하고 차단 시간을 설정하세요.</p>
        <p>
          설정한 시간 동안 해당 사이트에 접근할 수 없으며, 필요시 언제든 차단을
          해제할 수 있습니다.
        </p>
        <p>목표 달성률 통계 기능으로 성취감을 높여보세요.</p>
      </div>
    </div>
  );
};

export default ExplainPage;
