"use client";

import { useState, useMemo } from "react";
import styles from "./BookingCalendar.module.css";

interface Props {
  bookedDates: string[];
  startDate: string;
  endDate: string;
  onRangeChange: (start: string, end: string) => void;
  minDate: string;
}

function datesInRange(s: string, e: string): string[] {
  const dates: string[] = [];
  const start = new Date(s);
  const end = new Date(e);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

const MONTH_NAMES = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
];
const DAY_NAMES = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

export default function BookingCalendar({
  bookedDates,
  startDate,
  endDate,
  onRangeChange,
  minDate,
}: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hovered, setHovered] = useState("");

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);

  const selectedRange = useMemo(() => {
    if (!startDate) return new Set<string>();
    const end = endDate || hovered;
    if (!end || end < startDate) return new Set([startDate]);
    return new Set(datesInRange(startDate, end));
  }, [startDate, endDate, hovered]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (dateStr: string) => {
    if (dateStr < minDate) return;
    if (bookedSet.has(dateStr)) return;
    if (!startDate || (startDate && endDate)) {
      // fresh selection
      onRangeChange(dateStr, "");
    } else {
      // complete range
      if (dateStr < startDate) {
        onRangeChange(dateStr, startDate);
      } else {
        onRangeChange(startDate, dateStr);
      }
    }
  };

  const days: (string | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const s = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push(s);
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button type="button" className={styles.navBtn} onClick={prevMonth}>‹</button>
        <span className={styles.monthLabel}>{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button type="button" className={styles.navBtn} onClick={nextMonth}>›</button>
      </div>

      <div className={styles.dayNames}>
        {DAY_NAMES.map(d => <span key={d} className={styles.dayName}>{d}</span>)}
      </div>

      <div className={styles.grid}>
        {days.map((dateStr, i) => {
          if (!dateStr) return <div key={`e-${i}`} />;
          const isPast = dateStr < minDate;
          const isBooked = bookedSet.has(dateStr);
          const isStart = dateStr === startDate;
          const isEnd = dateStr === (endDate || hovered);
          const inRange = selectedRange.has(dateStr);
          const isToday = dateStr === today.toISOString().split("T")[0];

          return (
            <button
              key={dateStr}
              type="button"
              title={isBooked ? "Sudah dipesan" : dateStr}
              className={[
                styles.day,
                isPast ? styles.past : "",
                isBooked ? styles.booked : "",
                inRange && !isPast && !isBooked ? styles.inRange : "",
                (isStart || isEnd) && !isPast && !isBooked ? styles.rangeEnd : "",
                isToday ? styles.today : "",
              ].join(" ")}
              disabled={isPast || isBooked}
              onClick={() => handleDayClick(dateStr)}
              onMouseEnter={() => startDate && !endDate && setHovered(dateStr)}
              onMouseLeave={() => setHovered("")}
            >
              {parseInt(dateStr.split("-")[2])}
            </button>
          );
        })}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotAvail}`} /> Tersedia
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotBooked}`} /> Dipesan
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotRange}`} /> Dipilih
        </span>
      </div>
    </div>
  );
}
