import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.styles";
import Header from "./components/Header";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  @media (max-width: 450px) {
    width: 100%;
  }
`;

const AppContainer = styled.div`
  margin: 0 auto;
  width: 420px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  @media (max-width: 450px) {
    width: 100vw;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;

  // iOS 스크롤 활성화
  -webkit-overflow-scrolling: touch;

  // Webkit 브라우저 (Chrome, Safari, Edge)
  &::-webkit-scrollbar {
    width: 4px;
  }

  // 스크롤바 배경 (트랙)
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  // 스크롤바 핸들 (움직이는 부분)
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
  }

  // 화살표 버튼 제거
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

function Root() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <AppContainer>
          <Header />
          <ContentArea>
            <Outlet />
          </ContentArea>
        </AppContainer>
      </Container>
    </>
  );
}

export default Root;
