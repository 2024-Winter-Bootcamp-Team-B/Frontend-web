import ReactFullpage from '@fullpage/react-fullpage';
import MainPage from './MainPage';
import ExplainPage from './ExplainPage';
import BlockPage from './BlockPage';
import UnblockPage from './UnblockPage';
import StatsPage from './StatsPage';
import Navbar from '../components/Navbar';


const FullPage = () => {
  return (
    <ReactFullpage
      credits={{ enabled: false }}
      navigation={true} // 내비게이션 도트 표시
      anchors={['main', 'explain', 'block', 'unblock', 'stats']} // URL 반영
      verticalCentered={false} // 중앙 정렬 끄기
      render={({fullpageApi}) => {
        return (  
          <ReactFullpage.Wrapper>
            {/* fullpageApi를 전달 */}
            <Navbar fullpageApi={fullpageApi} />
            <MainPage fullpageApi={fullpageApi} />
            <ExplainPage fullpageApi={fullpageApi} />
            <BlockPage fullpageApi={fullpageApi} />
            <UnblockPage fullpageApi={fullpageApi} />
            <StatsPage fullpageApi={fullpageApi} />
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default FullPage;
