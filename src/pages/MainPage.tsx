import ReactFullpage from '@fullpage/react-fullpage';
import HomePage from './HomePage';
import BlockPage from './BlockPage';
import UnblockPage from './UnblockPage';
import StatsPage from './StatsPage';

const MainPage = () => {
  return (
    <ReactFullpage
      credits={{ enabled: false }}
      navigation={true} // 내비게이션 도트 표시
      anchors={['1', '2', '3', '4']} // URL 반영
      render={() => {
        return (
          <ReactFullpage.Wrapper>
            <HomePage />
            <BlockPage />
            <UnblockPage />
            <StatsPage />
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default MainPage;
