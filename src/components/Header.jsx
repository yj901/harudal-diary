import styled from "styled-components";
import {
  AlignLeft,
  Calendar,
  ArrowLeft,
  Check,
  SquarePen,
  Trash2,
} from "lucide-react";
import moonHaru from "../assets/moonHaruIcon.svg";

const Container = styled.header`
  padding: 20px;
  position: relative;
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    cursor: pointer;
  }
`;

const MoonImg = styled.img`
  width: 20px;
`;

const Title = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Header = () => {
  return (
    <Container>
      <HeaderIcons>
        <AlignLeft color="white" />
        <MoonImg src={moonHaru} alt="icon" />
      </HeaderIcons>
      <Title>2025.05.09 (금)</Title>
    </Container>
  );
};

export default Header;
