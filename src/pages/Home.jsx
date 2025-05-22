import styled from "styled-components";
import CalendarArea from "../components/CalendarArea";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Container = styled.section``;

const EditBtn = styled.div`
  width: 54px;
  aspect-ratio: 1;
  background: var(--light);
  border-radius: 50%;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    path {
      stroke: var(--bg);
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const editClick = () => {
    navigate("/write");
  };
  return (
    <Container className="inner">
      <CalendarArea />
      <EditBtn onClick={editClick}>
        <Plus size={32} />
      </EditBtn>
    </Container>
  );
};

export default Home;
