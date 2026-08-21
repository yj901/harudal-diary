import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EmotionMoon from "../components/EmotionMoon";
import { useEntryStore } from "../store/useEntryStore";

const Container = styled.section`
  width: 100%;
  padding-bottom: 40px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateText = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--light);
  line-height: 1;
`;

const DayText = styled.p`
  margin-top: 9px;
  font-size: 1.4rem;
  color: var(--stext);
  line-height: 1;
`;

const IconWrapper = styled.div`
  margin-top: 26px;
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CircleIcon = styled.div`
  width: 62px;
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

const EmotionLabel = styled.p`
  margin-top: 18px;
  font-size: 1.3rem;
  color: var(--stext);
  line-height: 1;
`;

const BodyText = styled.p`
  margin-top: 28px;
  width: 100%;
  font-size: 1.5rem;
  color: var(--stext);
  line-height: 2.4rem;
  word-break: break-word;
`;

const EmptyText = styled.p`
  margin-top: 80px;
  text-align: center;
  font-size: 1.4rem;
  color: var(--stext);
  opacity: 0.6;
`;

const EMOTION_LABELS = {
  happy: "기쁨",
  sad: "슬픔",
  angry: "화남",
  calm: "평온",
};

const INTENSITY_LABELS = ["스침", "번짐", "담김", "가득", "꽉참"];

const VeiwPost = () => {
  const { id } = useParams();
  const isHydrated = useEntryStore((state) => state.isHydrated);
  const entry = useEntryStore((state) =>
    state.entries.find((item) => String(item.id) === String(id)),
  );

  if (!isHydrated) {
    return null;
  }

  if (!entry) {
    return (
      <Container className="inner">
        <EmptyText>글을 찾을 수 없습니다.</EmptyText>
      </Container>
    );
  }

  const intensityLabel =
    entry.intensity === null
      ? INTENSITY_LABELS[4]
      : INTENSITY_LABELS[entry.intensity];

  return (
    <Container className="inner">
      <Meta>
        <DateText>{entry.date}</DateText>
        <DayText>{entry.day}</DayText>
        <IconWrapper>
          {entry.intensity === null ? (
            <CircleIcon $color={entry.emotion} />
          ) : (
            <EmotionMoon
              emotion={entry.emotion}
              intensity={entry.intensity}
              width={62}
            />
          )}
        </IconWrapper>
        <EmotionLabel>
          {EMOTION_LABELS[entry.emotion]} / {intensityLabel}
        </EmotionLabel>
      </Meta>
      <BodyText>{entry.text}</BodyText>
    </Container>
  );
};

export default VeiwPost;
