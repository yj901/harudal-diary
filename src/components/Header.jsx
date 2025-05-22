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
import { useNavigate, useLocation, useMatch } from "react-router-dom";

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
  .icons2 {
    display: flex;
    align-items: center;
    gap: 20px;
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEditPage = useMatch("/edit/:id");

  const arrowClick = () => {
    navigate(-1);
  };
  const alignClick = () => {
    navigate("/list");
  };
  const calendarClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <HeaderIcons>
        {pathname === "/" ? (
          <AlignLeft color="white" onClick={alignClick} />
        ) : pathname === "/list" ? (
          <Calendar color="white" onClick={calendarClick} />
        ) : (
          <ArrowLeft color="white" onClick={arrowClick} />
        )}

        {pathname === "/" || pathname === "/list" ? (
          <MoonImg src={moonHaru} alt="icon" className="drag-prevent" />
        ) : isEditPage || pathname === "/write" ? (
          <Check color="white" />
        ) : (
          <div className="icons2">
            <Trash2 color="white" />
            <SquarePen color="white" />
          </div>
        )}
      </HeaderIcons>
      {isEditPage || pathname === "/write" ? (
        <Title>2025.05.09 (금)</Title>
      ) : pathname === "/list" ? (
        <Title>2025</Title>
      ) : null}
    </Container>
  );
};

export default Header;
