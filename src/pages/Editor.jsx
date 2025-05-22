import styled from "styled-components";

const block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  line-height: 1.2;
`;

const box = styled.div`
  padding: 18px;
  border-radius: 14px;
  background: var(--box);
`;

const Editor = () => {
  return <div>Editor</div>;
};

export default Editor;
