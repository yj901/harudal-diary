import styled from "styled-components";

const Svg = styled.svg`
  position: relative;
`;

const emotionColors = {
  happy: "#FEE184",
  sad: "#83B2FF",
  angry: "#FF8787",
  calm: "#F3F4F6",
};

const moonShadowPaths = [
  "M15 0C8.38509 1.56056 3.4472 7.91925 3.4472 15C3.4472 22.104 8.38509 28.4394 15 30C23.2919 30 30 23.2919 30 15C30 6.70807 23.2919 0 15 0Z", //스침 달그림자
  "M15 0C11.5 2 7.5 7.91925 7.5 15C7.5 22.104 11.5 28 15 30C23.2919 30 30 23.2919 30 15C30 6.70808 23.2919 0 15 0Z", //번짐 달그림자
  "M15 30C23.2919 30 30 23.2919 30 15C30 6.70807 23.2919 0 15 0", // 담김 달그림자
  "M15 -0.00012207C21.6149 1.56044 26.5528 7.91913 26.5528 14.9999C26.5528 22.1039 21.6149 28.4393 15 29.9999C23.2919 29.9999 30 23.2918 30 14.9999C30 6.70795 23.2919 -0.00012207 15 -0.00012207Z", // 가득 달그림자
  null, //꽉참 달그림자 없음
];

const EmotionMoon = ({ emotion, intensity, width }) => {
  const emotionColor = emotionColors[emotion]; // 노랑, 파랑 등
  const shadowPath = moonShadowPaths[intensity]; // 0~4단계 그림자

  return (
    <Svg width={width} height={width} viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="15" fill={emotionColor} />
      {shadowPath && (
        <path
          d={shadowPath}
          fill="rgba(10, 10, 29, 0.80)"
          transform="scale(1.02)"
          transform-origin="center"
        />
      )}
    </Svg>
  );
};

export default EmotionMoon;
