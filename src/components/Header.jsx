import { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useLocation,
  useMatch,
  useBlocker,
} from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
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
import DeleteModal from "./DeleteModal";
import DoneModal from "./DoneModal";
import UnsavedModal from "./UnsavedModal";
import { useEntryStore } from "../store/useEntryStore";
import { formatHeaderDate, sortEntriesNewest } from "../data/entryUtils";
import {
  downloadBackupJson,
  downloadExportTxt,
  parseBackupJson,
} from "../data/backup";

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
  transform: translateY(${({ $visible }) => ($visible ? "0" : "-12px")});
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: ${({ $visible }) =>
    $visible
      ? "opacity 0.28s ease-out, transform 0.28s ease-out, visibility 0s"
      : "opacity 0.2s ease-in, transform 0.2s ease-in, visibility 0s linear 0.2s"};
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

const DataButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
`;

const DataButton = styled.button`
  flex: 1;
  height: 36px;
  padding: 0 8px;
  border-radius: 100px;
  background: var(--cancel);
  color: var(--light);
  font-size: 1.3rem;
  font-family: "RIDIBatang";
  cursor: pointer;
  white-space: nowrap;
`;

const Title = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Header = () => {
  const [infoClick, setInfoClick] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [doneMessage, setDoneMessage] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEditPage = useMatch("/edit/:id");
  const isViewPage = useMatch("/view/:id");
  const moonWrapRef = useRef(null);
  const fileInputRef = useRef(null);
  const allowLeaveRef = useRef(false);
  const entries = useEntryStore((state) => state.entries);
  const draft = useEntryStore((state) => state.draft);
  const saveDraft = useEntryStore((state) => state.saveDraft);
  const initEditDraft = useEntryStore((state) => state.initEditDraft);
  const deleteEntryById = useEntryStore((state) => state.deleteEntryById);
  const replaceEntries = useEntryStore((state) => state.replaceEntries);
  const editEntry = isEditPage
    ? entries.find((entry) => String(entry.id) === String(isEditPage.params.id))
    : null;

  const isEditorPage = Boolean(isEditPage) || pathname === "/write";
  const isDirty = (() => {
    if (!isEditorPage) return false;
    if (isEditPage) {
      if (!editEntry) {
        return Boolean(draft.emotion || draft.intensity != null || draft.text);
      }
      const origIntensity =
        editEntry.intensity === null ? 4 : editEntry.intensity;
      return (
        draft.emotion !== (editEntry.emotion ?? null) ||
        (draft.intensity ?? 4) !== origIntensity ||
        draft.text !== (editEntry.text ?? "")
      );
    }
    return (
      draft.emotion != null || draft.intensity != null || Boolean(draft.text)
    );
  })();

  useEffect(() => {
    setInfoClick(false);
    if (isEditorPage) {
      allowLeaveRef.current = false;
    }
  }, [isEditorPage, pathname]);

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (allowLeaveRef.current) return false;
    if (currentLocation.pathname === nextLocation.pathname) return false;
    return isEditorPage && isDirty;
  });

  useEffect(() => {
    if (!infoClick) return;

    const handlePointerDown = (event) => {
      if (moonWrapRef.current?.contains(event.target)) return;
      setInfoClick(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [infoClick]);

  const arrowClick = () => {
    navigate(-1);
  };
  const alignClick = () => {
    navigate("/list");
  };
  const calendarClick = () => {
    navigate("/");
  };

  const handleSave = async () => {
    const result = await saveDraft(isEditPage?.params.id);
    if (!result.ok) {
      if (result.reason === "emotion") {
        setDoneMessage("감정을 선택해주세요");
      }
      return;
    }
    allowLeaveRef.current = true;
    navigate(`/view/${result.id}`, { replace: true });
  };

  const handleBackup = () => {
    downloadBackupJson(entries);
    setDoneMessage("백업이 완료되었습니다");
  };

  const handleExport = () => {
    downloadExportTxt(sortEntriesNewest(entries));
    setDoneMessage("내보내기가 완료되었습니다");
  };

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const text = await file.text();
      const nextEntries = parseBackupJson(text);
      await replaceEntries(nextEntries);
      setDoneMessage("불러오기가 완료되었습니다");
    } catch {
      setDoneMessage("불러오기에 실패했습니다");
    }
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
          <MoonInfoWrap ref={moonWrapRef}>
            <MoonImg
              src={moonHaru}
              alt="icon"
              className="drag-prevent"
              $opacity={infoClick}
              onClick={() => setInfoClick((prev) => !prev)}
            />
            <MoonInfoBox $visible={infoClick}>
              <div>
                <h5>감정의 성격</h5>
                <CircleList>
                  <li>
                    <Circle $color={"happy"}></Circle>
                    <p>기쁨</p>
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
              <DataButtonRow>
                <DataButton type="button" onClick={handleBackup}>
                  백업
                </DataButton>
                <DataButton
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  불러오기
                </DataButton>
                <DataButton type="button" onClick={handleExport}>
                  내보내기
                </DataButton>
              </DataButtonRow>
            </MoonInfoBox>
          </MoonInfoWrap>
        ) : isEditPage || pathname === "/write" ? (
          <Check color="white" onClick={handleSave} />
        ) : (
          <div className="icons2">
            <Trash2
              color="white"
              onClick={() => {
                if (isViewPage) {
                  setDeleteOpen(true);
                }
              }}
            />
            <SquarePen
              color="white"
              onClick={() => {
                if (isViewPage) {
                  initEditDraft(isViewPage.params.id);
                  navigate(`/edit/${isViewPage.params.id}`);
                }
              }}
            />
          </div>
        )}
      </HeaderIcons>
      {isEditPage && editEntry ? (
        <Title>{formatHeaderDate(editEntry.date, editEntry.day)}</Title>
      ) : pathname === "/write" ? (
        <Title>{formatHeaderDate(draft.date, draft.day)}</Title>
      ) : pathname === "/list" ? (
        <Title>{new Date().getFullYear()}</Title>
      ) : null}
      <AnimatePresence>
        {deleteOpen && (
          <DeleteModal
            onCancel={() => setDeleteOpen(false)}
            onConfirm={async () => {
              if (isViewPage) {
                await deleteEntryById(isViewPage.params.id);
              }
              setDeleteOpen(false);
              navigate("/");
            }}
          />
        )}
        {doneMessage && (
          <DoneModal message={doneMessage} onClose={() => setDoneMessage("")} />
        )}
        {blocker.state === "blocked" && (
          <UnsavedModal
            onStay={() => blocker.reset()}
            onLeave={() => blocker.proceed()}
          />
        )}
      </AnimatePresence>
      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleImportFile}
      />
    </Container>
  );
};

export default Header;
