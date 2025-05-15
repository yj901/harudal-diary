import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.styles";
import Header from "./components/Header";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
`;

const AppContainer = styled.div`
  margin: 0 auto;
  width: 420px;
  min-height: 100vh;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
`;

function Root() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <AppContainer>
          <Header />
          <Outlet />
        </AppContainer>
      </Container>
    </>
  );
}

export default Root;
