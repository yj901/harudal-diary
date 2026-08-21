import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import EmotionMoon from "./EmotionMoon";
import { useEntryStore } from "../store/useEntryStore";
import { findEntryByDate } from "../data/entryUtils";

const Container = styled.div`
  margin-top: 20px;
  .calendarWrap {
    margin-top: 60px;
    padding: 0 15px;
    overflow: hidden;
  }
  .react-calendar {
    background: none;
    font-family: "RIDIBatang";
    border: none;
    width: 100%;
  }

  .react-calendar__month-view__weekdays,
  .react-calendar__month-view__weekdays__weekday {
    display: none !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  .react-calendar__tile {
    font-size: 1.6rem;
    font-weight: 400;
    height: 45px;
    color: var(--light);
    &:hover {
      background: none;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: transparent;
    pointer-events: none;
  }

  .react-calendar__tile--active {
    background: none;
    border-radius: 100px;
    &:hover {
      background: none;
    }
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: none;
  }

  .react-calendar__tile--now {
    background: none;
    position: relative;
    &::before {
      content: "";
      display: block;
      background: var(--todayCircle);
      position: absolute;
      width: 30px;
      aspect-ratio: 1;
      border-radius: 50%;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .future-tile {
    color: rgba(255, 255, 255, 0.4);
  }

  .has-entry {
    position: relative;
    cursor: pointer;
  }

  .writable-tile {
    cursor: pointer;
  }

  .has-entry abbr {
    display: none;
  }

  .entry-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
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

const TopArea = styled.div`
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  h3 {
    font-size: 2rem;
    line-height: 1.2;
  }
  .dataArr {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    overflow: hidden;
    min-height: 48px;
    h2 {
      font-size: 4rem;
      line-height: 1.2;
      white-space: nowrap;
    }
    svg {
      cursor: pointer;
      width: 24px;
    }
  }
`;

const WeekdayRow = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 0 0 16px;
  padding: 0;
  font-size: 1.6rem;
  color: var(--day);
  text-align: center;
`;

const CalendarSlideWrap = styled.div`
  position: relative;
  overflow: hidden;
  height: 270px;
`;

const SlideMonth = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const MonthNumWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  height: 4.8rem;
  width: 8rem;
`;

const SlideMonthNum = styled(motion.h2)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const monthVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
  }),
};

const monthTransition = {
  type: "tween",
  ease: [0.32, 0.72, 0, 1],
  duration: 0.34,
};

const CalendarArea = () => {
  const navigate = useNavigate();
  const entries = useEntryStore((state) => state.entries);
  const initWriteDraft = useEntryStore((state) => state.initWriteDraft);
  const [value, onChange] = useState(new Date());
  const [afterMonth, setAfterMonth] = useState(false);
  const [monthDir, setMonthDir] = useState(1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthKey = `${value.getFullYear()}-${value.getMonth()}`;

  const handlePrevMonth = () => {
    setMonthDir(-1);
    onChange((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setMonthDir(1);
    onChange((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const viewMonth = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const thisFirst = new Date(year, month, 1);
    const firstTime = thisFirst.getTime();

    const thisTime = today.getTime();
    value.setHours(0, 0, 0, 0);
    const calendarTime = value.getTime();

    if (thisTime <= calendarTime || firstTime <= calendarTime) {
      setAfterMonth(false);
    } else {
      setAfterMonth(true);
    }
  };

  useEffect(() => {
    viewMonth();
  }, [value]);

  return (
    <Container>
      <TopArea>
        <h3> {value.getFullYear()}</h3>
        <div className="dataArr">
          <ChevronLeft color="white" onClick={handlePrevMonth} />
          <MonthNumWrap>
            <AnimatePresence initial={false} custom={monthDir}>
              <SlideMonthNum
                key={monthKey}
                custom={monthDir}
                variants={monthVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={monthTransition}
              >
                {value.getMonth() + 1}
              </SlideMonthNum>
            </AnimatePresence>
          </MonthNumWrap>
          {afterMonth && (
            <ChevronRight color="white" onClick={handleNextMonth} />
          )}
        </div>
      </TopArea>
      <div className="calendarWrap">
        <WeekdayRow>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <li key={day}>{day}</li>
          ))}
        </WeekdayRow>
        <CalendarSlideWrap>
          <AnimatePresence initial={false} custom={monthDir}>
            <SlideMonth
              key={monthKey}
              custom={monthDir}
              variants={monthVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={monthTransition}
            >
              <Calendar
                onChange={onChange}
                onClickDay={(date) => {
                  const entry = findEntryByDate(entries, date);
                  if (entry) {
                    navigate(`/view/${entry.id}`);
                    return;
                  }

                  const clicked = new Date(date);
                  clicked.setHours(0, 0, 0, 0);
                  if (clicked > today) return;

                  initWriteDraft(clicked);
                  navigate("/write");
                }}
                value={value}
                activeStartDate={
                  new Date(value.getFullYear(), value.getMonth(), 1)
                }
                formatDay={(locale, date) =>
                  findEntryByDate(entries, date) ? "" : date.getDate()
                }
                showNavigation={false}
                calendarType="gregory"
                locale="ko-KR"
                formatShortWeekday={(locale, date) =>
                  ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
                }
                tileContent={({ date, view, activeStartDate }) => {
                  if (view !== "month") return null;
                  if (
                    date.getMonth() !== activeStartDate.getMonth() ||
                    date.getFullYear() !== activeStartDate.getFullYear()
                  ) {
                    return null;
                  }

                  const entry = findEntryByDate(entries, date);
                  if (!entry) return null;

                  return (
                    <span className="entry-mark">
                      {entry.intensity === null ? (
                        <CircleIcon $color={entry.emotion} />
                      ) : (
                        <EmotionMoon
                          emotion={entry.emotion}
                          intensity={entry.intensity}
                          width={32}
                        />
                      )}
                    </span>
                  );
                }}
                tileClassName={({ date, view, activeStartDate }) => {
                  if (view !== "month") return "";

                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const thisDate = new Date(date);
                  thisDate.setHours(0, 0, 0, 0);

                  const isSameViewMonth =
                    date.getMonth() === activeStartDate.getMonth() &&
                    date.getFullYear() === activeStartDate.getFullYear();
                  const isSameMonth =
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();
                  const isFuture = thisDate > today;
                  const classes = [];

                  if (isSameViewMonth && findEntryByDate(entries, date)) {
                    classes.push("has-entry");
                  } else if (isSameViewMonth && !isFuture) {
                    classes.push("writable-tile");
                  }
                  if (isSameMonth && isFuture) {
                    classes.push("future-tile");
                  }

                  return classes.join(" ");
                }}
              />
            </SlideMonth>
          </AnimatePresence>
        </CalendarSlideWrap>
      </div>
    </Container>
  );
};

export default CalendarArea;
