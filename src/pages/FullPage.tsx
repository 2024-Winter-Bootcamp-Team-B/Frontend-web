import ReactFullpage from '@fullpage/react-fullpage';
import MainPage from './MainPage';
import BlockPage from './BlockPage';
import UnblockPage from './UnblockPage';
import StatsPage from './StatsPage';

const FullPage = () => {
  return (
    <ReactFullpage
      credits={{ enabled: false }}
      navigation={true} // 내비게이션 도트 표시
      anchors={['1', '2', '3', '4']} // URL 반영
      render={() => {
        return (
          <ReactFullpage.Wrapper>
            <MainPage />
            <BlockPage />
            <UnblockPage />
            <StatsPage />
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default FullPage;
