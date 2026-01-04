import { useState } from "react";
import styled from "styled-components";
import EmotionMoon from "../components/EmotionMoon";

const Container = styled.section`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  line-height: 1.2;
  color: var(--light);
`;

const Box = styled.div`
  padding: 18px;
  border-radius: 14px;
  background: var(--box);

  ul {
    margin: 0;
    padding: 0;
  }
`;

const CircleList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  margin: 0;
  padding: 0;
  @media (max-width: 420px) {
    gap: 3px;
  }
`;

const EmotionItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s ease-in-out;
  background-color: ${({ $isSelected, $emotionId }) =>
    $isSelected
      ? $emotionId === "happy"
        ? "rgba(254, 225, 132, 0.2)"
        : $emotionId === "sad"
        ? "rgba(131, 178, 255, 0.2)"
        : $emotionId === "angry"
        ? "rgba(255, 135, 135, 0.2)"
        : "rgba(243, 244, 246, 0.2)"
      : "transparent"};
  p {
    font-size: 1.3rem;
    color: var(--stext);
  }
`;

const MoonList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

const IntensityItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 10px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  background-color: ${({ $isSelected, $emotionId }) =>
    $isSelected
      ? $emotionId === "happy"
        ? "rgba(254, 225, 132, 0.2)"
        : $emotionId === "sad"
        ? "rgba(131, 178, 255, 0.2)"
        : $emotionId === "angry"
        ? "rgba(255, 135, 135, 0.2)"
        : "rgba(243, 244, 246, 0.2)"
      : "transparent"};
  p {
    font-size: 1.3rem;
    color: var(--stext);
  }
`;

const Circle = styled.div`
  width: 24px;
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

const TextArea = styled.textarea`
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 18px;
  border-radius: 14px;
  background: var(--box);
  border: none;
  color: var(--stext);
  font-size: 1.4rem;
  font-family: "RIDIBatang";
  resize: none;
  outline: none;
  line-height: 1.6;
  overflow-y: auto;

  &::placeholder {
    color: var(--stext);
    opacity: 0.4;
  }
  // iOS 스크롤 활성화
  -webkit-overflow-scrolling: touch;

  // Webkit 브라우저 (Chrome, Safari, Edge)
  &::-webkit-scrollbar {
    width: 4px;
  }

  // 스크롤바 배경 (트랙)
  &::-webkit-scrollbar-track {
    background: transparent; // 투명 배경
    border-radius: 4px;
  }

  // 스크롤바 핸들 (움직이는 부분)
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4); // 여기에 원하는 색상
    border-radius: 4px;
  }

  // 화살표 버튼 제거
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const Editor = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [content, setContent] = useState("");

  const emotions = [
    { id: "happy", label: "긍정", color: "happy" },
    { id: "sad", label: "슬픔", color: "sad" },
    { id: "angry", label: "화남", color: "angry" },
    { id: "calm", label: "평온", color: "calm" },
  ];

  const intensities = [
    { id: 0, label: "스침" },
    { id: 1, label: "번짐" },
    { id: 2, label: "담김" },
    { id: 3, label: "가득" },
    { id: 4, label: "꽉참" },
  ];

  return (
    <Container className="inner">
      <Block>
        <Title>오늘의 감정은 어떠셨나요?</Title>
        <Box>
          <CircleList>
            {emotions.map((emotion) => (
              <EmotionItem
                key={emotion.id}
                onClick={() => setSelectedEmotion(emotion.id)}
                $isSelected={selectedEmotion === emotion.id}
                $emotionId={emotion.id}
              >
                <Circle $color={emotion.color} />
                <p>{emotion.label}</p>
              </EmotionItem>
            ))}
          </CircleList>
        </Box>
      </Block>

      <Block>
        <Title>이 감정의 강도를 표현하자면?</Title>
        <Box>
          <MoonList>
            {intensities.map((intensity) => (
              <IntensityItem
                key={intensity.id}
                onClick={() => setSelectedIntensity(intensity.id)}
                $isSelected={selectedIntensity === intensity.id}
                $emotionId={selectedEmotion || "calm"}
              >
                <EmotionMoon
                  emotion={selectedEmotion || "calm"}
                  intensity={intensity.id}
                  width={25}
                />
                <p>{intensity.label}</p>
              </IntensityItem>
            ))}
          </MoonList>
        </Box>
      </Block>

      <Block
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Title>오늘 하루 기억나는 일을 적어주세요.</Title>
        <TextArea
          placeholder="오늘 하루 있었던 일들을 자유롭게 적어보세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Block>
    </Container>
  );
};

export default Editor;
