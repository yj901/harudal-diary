import { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Container = styled.div`
  margin-top: 20px;
  .calendarWrap {
    margin-top: 60px;
    padding: 0 15px;
  }
  .react-calendar {
    background: none;
    font-family: "RIDIBatang";
    border: none;
    width: 100%;
  }

  .react-calendar__month-view__weekdays {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--day);
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
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
    h2 {
      font-size: 4rem;
      line-height: 1.2;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    svg {
      cursor: pointer;
      width: 24px;
    }
  }
`;

const CalendarArea = () => {
  const [value, onChange] = useState(new Date());
  const [afterMonth, setAfterMonth] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = () => {
    onChange((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
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
          <h2>{value.getMonth() + 1}</h2>
          {afterMonth && (
            <ChevronRight color="white" onClick={handleNextMonth} />
          )}
        </div>
      </TopArea>
      <div className="calendarWrap">
        <Calendar
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => date.getDate()}
          showNavigation={false}
          calendarType="gregory"
          locale="ko-KR"
          formatShortWeekday={(locale, date) =>
            ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
          }
          tileClassName={({ date, view }) => {
            if (view !== "month") return "";

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const thisDate = new Date(date);
            thisDate.setHours(0, 0, 0, 0);

            const isSameMonth =
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();
            const isFuture = thisDate > today;

            return isSameMonth && isFuture ? "future-tile" : "";
          }}
        />
      </div>
    </Container>
  );
};

export default CalendarArea;
