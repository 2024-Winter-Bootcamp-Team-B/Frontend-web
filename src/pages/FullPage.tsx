import React, { useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import MainPage from './MainPage';
import ExplainPage from './ExplainPage';
import BlockPage from './BlockPage';
import UnblockPage from './UnblockPage';
import StatsPage from './StatsPage';

type FullPageProps = {};

const FullPage: React.FC<FullPageProps> = () => {
  const [showHourglass, setShowHourglass] = useState<boolean>(true); // hourglass 가시성 상태
  const [opacity, setOpacity] = useState<number>(1); // hourglass 오퍼시티 상태

  const handlePageChange = (destinationIndex: number): void => {
    if (destinationIndex < 2) {
      // 0, 1 페이지로 이동 시 hourglass를 천천히 표시
      setShowHourglass(true);
      setTimeout(() => setOpacity(1), 0); // 오퍼시티를 100으로 설정
    } else {
      // 2, 3, 4 페이지로 이동 시 hourglass를 천천히 숨김
      setOpacity(0); // 오퍼시티를 0으로 설정
      setTimeout(() => setShowHourglass(false), 500); // 0.5초 후 완전히 숨김
    }
  };

  useEffect(() => {
    if (!showHourglass) {
      setOpacity(0); // 숨겨진 상태에서는 항상 오퍼시티 0
    }
  }, [showHourglass]);

  return (
    <div className='relative w-full h-full'>
      {/*배경 고정*/}
      <div
        className='fixed top-0 left-0 w-full h-full bg-cover bg-center z-0'
        style={{
          backgroundImage: "url('/src/assets/background.png')",
        }}
      ></div>
      {/* hourglass 배경 */}
      {showHourglass && (
        <div
          className='fixed top-0 right-0 object-contain w-[1500px] h-full bg-cover bg-center z-0 transition-opacity duration-1000'
          style={{
            backgroundImage: "url('/src/assets/hourglass.svg')",
            opacity: opacity,
            transition: 'opacity 0.5s ease-in-out',
          }}
        ></div>
      )}
      <ReactFullpage
        credits={{ enabled: false }}
        navigation={true} // 내비게이션 도트 표시
        anchors={['main', 'explain', 'block', 'unblock', 'stats']} // URL 반영
        verticalCentered={false} // 중앙 정렬 끄기
        onLeave={(origin, destination, direction) => {
          handlePageChange(destination.index); // 페이지 전환 시 상태 변경
        }}
        render={({ fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <MainPage fullpageApi={fullpageApi} />
              <ExplainPage fullpageApi={fullpageApi} />
              <BlockPage fullpageApi={fullpageApi} />
              <UnblockPage fullpageApi={fullpageApi} />
              <StatsPage fullpageApi={fullpageApi} />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default FullPage;
