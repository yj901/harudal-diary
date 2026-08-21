import { useState } from "react";
import styled from "styled-components";
import CalendarArea from "../components/CalendarArea";
import OverwriteModal from "../components/OverwriteModal";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEntryStore } from "../store/useEntryStore";
import { findEntryByDate } from "../data/entryUtils";

const Container = styled.section`
  width: 100%;
`;

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
  const [overwriteOpen, setOverwriteOpen] = useState(false);
  const entries = useEntryStore((state) => state.entries);
  const initWriteDraft = useEntryStore((state) => state.initWriteDraft);

  const editClick = () => {
    const existing = findEntryByDate(entries, new Date());
    if (existing) {
      setOverwriteOpen(true);
      return;
    }
    initWriteDraft();
    navigate("/write");
  };

  return (
    <Container className="inner">
      <CalendarArea />
      <EditBtn onClick={editClick}>
        <Plus size={32} />
      </EditBtn>
      <AnimatePresence>
        {overwriteOpen && (
          <OverwriteModal
            onCancel={() => setOverwriteOpen(false)}
            onConfirm={() => {
              const existing = findEntryByDate(entries, new Date());
              initWriteDraft(new Date(), existing?.id ?? null);
              setOverwriteOpen(false);
              navigate("/write");
            }}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Home;
