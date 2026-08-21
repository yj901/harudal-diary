import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EmotionMoon from "../components/EmotionMoon";
import { useEntryStore } from "../store/useEntryStore";
import { sortEntriesNewest } from "../data/entryUtils";

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

const EmptyText = styled.p`
  margin-top: 80px;
  text-align: center;
  font-size: 1.4rem;
  color: var(--stext);
  opacity: 0.6;
`;

const Lists = () => {
  const navigate = useNavigate();
  const entries = useEntryStore((state) => state.entries);
  const list = sortEntriesNewest(entries);

  return (
    <Container className="inner">
      {list.length === 0 ? (
        <EmptyText>아직 작성한 일기가 없습니다.</EmptyText>
      ) : (
        <List>
          {list.map((entry) => (
            <ListItem
              key={entry.id}
              onClick={() => navigate(`/view/${entry.id}`)}
            >
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
      )}
    </Container>
  );
};

export default Lists;
