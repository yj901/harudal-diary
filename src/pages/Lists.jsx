import React from "react";
import styled from "styled-components";
import EmotionMoon from "../components/EmotionMoon";

const Container = styled.section`
  width: 100%;
  padding-bottom: 40px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 29px;
  padding: 28.5px 0;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleIcon = styled.div`
  width: 32px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $color }) =>
    $color === "happy"
      ? `var(--happy)`
      : $color === "sad"
      ? `var(--sad)`
      : $color === "angry"
      ? `var(--angry)`
      : `var(--calm)`};
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DateText = styled.span`
  font-size: 1.4rem;
  color: var(--light);
  font-weight: 400;
`;

const DayText = styled.span`
  font-size: 1.4rem;
  color: var(--light);
`;

const EntryText = styled.p`
  width: 100%;
  font-size: 1.4rem;
  color: var(--stext);
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  margin: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Lists = () => {
  // 목업 데이터
  const mockEntries = [
    {
      id: 1,
      date: "2025.5.9",
      day: "금요일",
      emotion: "happy",
      intensity: null, // 원형 아이콘
      text: "ui 작업 시작함~~~",
    },
    {
      id: 2,
      date: "2025.5.13",
      day: "화요일",
      emotion: "calm",
      intensity: 1, // 초승달
      text: "오늘은 좀 덜 졸림",
    },
    {
      id: 3,
      date: "2025.5.13",
      day: "화요일",
      emotion: "sad",
      intensity: 2, // 반달
      text: "이것은 목업 일기입니다. 달의 차오르는 모양과 감정의 컬러를 합친 감정일기장을 만들고자 UI작업을 진행하고 있습니다.",
    },
    {
      id: 3,
      date: "2025.5.13",
      day: "화요일",
      emotion: "sad",
      intensity: 2, // 반달
      text: "이것은 목업 일기입니다. 달의 차오르는 모양과 감정의 컬러를 합친 감정일기장을 만들고자 UI작업을 진행하고 있습니다.",
    },
    {
      id: 3,
      date: "2025.5.13",
      day: "화요일",
      emotion: "sad",
      intensity: 2, // 반달
      text: "이것은 목업 일기입니다. 달의 차오르는 모양과 감정의 컬러를 합친 감정일기장을 만들고자 UI작업을 진행하고 있습니다.",
    },
    {
      id: 3,
      date: "2025.5.13",
      day: "화요일",
      emotion: "sad",
      intensity: 2, // 반달
      text: "이것은 목업 일기입니다. 달의 차오르는 모양과 감정의 컬러를 합친 감정일기장을 만들고자 UI작업을 진행하고 있습니다.",
    },
    {
      id: 3,
      date: "2025.5.13",
      day: "화요일",
      emotion: "sad",
      intensity: 2, // 반달
      text: "이것은 목업 일기입니다. 달의 차오르는 모양과 감정의 컬러를 합친 감정일기장을 만들고자 UI작업을 진행하고 있습니다.",
    },
    {
      id: 3,
      date: "2025.5.13",
      day: "화요일",
      emotion: "sad",
      intensity: 2, // 반달
      text: "이것은 목업 일기입니다. 달의 차오르는 모양과 감정의 컬러를 합친 감정일기장을 만들고자 UI작업을 진행하고 있습니다.",
    },
    {
      id: 3,
      date: "2025.5.13",
      day: "화요일",
      emotion: "sad",
      intensity: 2, // 반달
      text: "이것은 목업 일기입니다. 달의 차오르는 모양과 감정의 컬러를 합친 감정일기장을 만들고자 UI작업을 진행하고 있습니다.",
    },
    {
      id: 3,
      date: "2025.5.13",
      day: "화요일",
      emotion: "sad",
      intensity: 2, // 반달
      text: "이것은 목업 일기입니다. 달의 차오르는 모양과 감정의 컬러를 합친 감정일기장을 만들고자 UI작업을 진행하고 있습니다.",
    },
  ];

  return (
    <Container className="inner">
      <List>
        {mockEntries.map((entry) => (
          <ListItem key={entry.id}>
            <TopRow>
              <IconWrapper>
                {entry.intensity === null ? (
                  <CircleIcon $color={entry.emotion} />
                ) : (
                  <EmotionMoon
                    emotion={entry.emotion}
                    intensity={entry.intensity}
                    width={32}
                  />
                )}
              </IconWrapper>
              <DateInfo>
                <DateText>{entry.date}</DateText>
                <DayText>{entry.day}</DayText>
              </DateInfo>
            </TopRow>
            <EntryText>{entry.text}</EntryText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Lists;
