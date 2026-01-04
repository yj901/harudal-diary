import { useState } from "react";
import { useNavigate, useLocation, useMatch } from "react-router-dom";
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
import EmotionMoon from "./EmotionMoon";

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

const MoonInfoWrap = styled.div`
  font-size: 0;
`;

const MoonImg = styled.img`
  width: 20px;
  opacity: ${({ $opacity }) => ($opacity ? 0.5 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

const MoonInfoBox = styled.div`
  position: absolute;
  z-index: 100;
  width: calc(100% - 40px);
  right: 20px;
  padding: 30px 28px;
  background: var(--box);
  color: var(--stext);
  box-shadow: var(--shadow);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? `visible` : `hidden`)};
  margin-top: 20px;
  &::before {
    content: "";
    display: block;
    background: var(--box);
    position: absolute;
    top: 0;
    right: 20px;
    transform: translateY(-100%);
    z-index: 1;
    width: 13px;
    height: 15px;
    clip-path: polygon(92% 24%, 0% 100%, 100% 100%);
  }

  h5 {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
`;

const CircleList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  li {
    display: flex;
    align-items: center;
    gap: 6px;
    p {
      font-size: 1.3rem;
    }
  }
`;

const MoonList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    p {
      font-size: 1.3rem;
    }
  }
`;

const Circle = styled.div`
  width: 24px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $color }) =>
    $color === "happy"
      ? `var( --happy)`
      : $color === "sad"
      ? `var(--sad)`
      : $color === "angry"
      ? `var(--angry)`
      : `var(--calm)`};
`;

const Title = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Header = () => {
  const [infoClick, setInfoClick] = useState(false);
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
          <MoonInfoWrap onClick={() => setInfoClick((prev) => !prev)}>
            <MoonImg
              src={moonHaru}
              alt="icon"
              className="drag-prevent"
              $opacity={infoClick}
            />
            <MoonInfoBox $visible={infoClick}>
              <div>
                <h5>감정의 성격</h5>
                <CircleList>
                  <li>
                    <Circle $color={"happy"}></Circle>
                    <p>긍정</p>
                  </li>
                  <li>
                    <Circle $color={"sad"}></Circle>
                    <p>슬픔</p>
                  </li>
                  <li>
                    <Circle $color={"angry"}></Circle>
                    <p>화남</p>
                  </li>
                  <li>
                    <Circle $color={"calm"}></Circle>
                    <p>평온</p>
                  </li>
                </CircleList>
              </div>
              <div>
                <h5>감정의 강도</h5>
                <MoonList>
                  <li>
                    <EmotionMoon emotion={"calm"} intensity={0} width={25} />
                    <p>스침</p>
                  </li>
                  <li>
                    <EmotionMoon emotion={"calm"} intensity={1} width={25} />
                    <p>번짐</p>
                  </li>
                  <li>
                    <EmotionMoon emotion={"calm"} intensity={2} width={25} />
                    <p>담김</p>
                  </li>
                  <li>
                    <EmotionMoon emotion={"calm"} intensity={3} width={25} />
                    <p>가득</p>
                  </li>
                  <li>
                    <EmotionMoon emotion={"calm"} intensity={4} width={25} />
                    <p>꽉참</p>
                  </li>
                </MoonList>
              </div>
            </MoonInfoBox>
          </MoonInfoWrap>
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
