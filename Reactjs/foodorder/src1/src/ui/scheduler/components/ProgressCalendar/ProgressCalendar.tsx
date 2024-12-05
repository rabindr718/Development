import { useState, useMemo, useEffect, memo } from 'react';
import {
  DayPicker,
  DayButtonProps,
  getDefaultClassNames,
} from 'react-day-picker';
import 'react-day-picker/style.css';
import CircularProgress from '../CircularProgress/CircularProgress';
import styles from './styles/index.module.css';
import { format } from 'date-fns';

type DayWithProgress = {
  date: Date;
  progress: number;
  id: number;
  colorCode?: string; // Added colorCode property
};

type TEvent = {
  id: number;
};

type DayPickerCalendarProps = {
  dayWithProgress?: DayWithProgress[];
  onClick?: ({ date, event }: { date: Date; event: TEvent }) => void;
  dayCellClassName?: string;
  circleSize?: number;
  selectedDate?: Date | undefined;
};

interface ExtendedDayButtonProps extends DayButtonProps {
  dayWithProgress: DayWithProgress[] | undefined;
  selected: Date | undefined;
  onDateSelect?: ({ date, event }: { date: Date; event: TEvent }) => void;
  dayCellClassName?: string;
  circleSize?: number;
}

const getCurrentDayExcludedHoliday = (): Date => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const currentDay = currentDate.getDay();
  return currentDay === 0 || currentDay === 6
    ? new Date(currentDate.setDate(currentDate.getDate() + 1))
    : currentDate;
};

const getNextSevenWeekdays = (): Date[] => {
  const nextSevenWeekdays: Date[] = [];
  let currentDate = getCurrentDayExcludedHoliday();
  while (nextSevenWeekdays.length < 7) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      nextSevenWeekdays.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return nextSevenWeekdays;
};

const DayButton = ({
  day,
  selected,
  dayWithProgress,
  className,
  onDateSelect,
  dayCellClassName,
  circleSize = 50,
  ...buttonProps
}: ExtendedDayButtonProps) => {
  const nextSevenWeekdays = useMemo(getNextSevenWeekdays, []);
  const isNext = nextSevenWeekdays.some(
    (date) => date.getTime() === new Date(day.date).setHours(0, 0, 0, 0)
  );
  
  const findDay = dayWithProgress?.find(
    (date) =>
      date.date.getDate() === day.date.getDate() &&
      date.date.getMonth() === day.date.getMonth() &&
      date.date.getFullYear() === day.date.getFullYear()
  );
  
  const colorProgress = findDay?.progress;
  const getColor = findDay?.colorCode || ''; // Use colorCode instead of calculating
  const isSelected =
    selected?.getTime() === new Date(day.date).setHours(0, 0, 0, 0);

  return (
    <button
      {...buttonProps}
      disabled={!isNext}
      className={`${className} ${!isNext ? styles.disable_day_cell : ''} ${dayCellClassName}`}
      onClick={() =>
        onDateSelect?.({ date: day.date, event: { id: findDay?.id! } })
      }
      style={{ width: dayCellClassName ? undefined : 52 }}
    >
      {isNext ? (
        <CircularProgress
          filledColor={getColor}
          strokeWidth={5.5}
          size={circleSize}
          progress={colorProgress || 0}
        >
          <button
            className={`${styles.day_cell} ${isNext ? (isSelected ? styles.active_selected_cell : styles.active_day_cell) : ''}`}
          >
            {day.date.getDate()}
          </button>
        </CircularProgress>
      ) : (
        day.date.getDate()
      )}
    </button>
  );
};

const DayPickerCalendar = ({
  dayWithProgress,
  onClick,
  dayCellClassName,
  circleSize,
  selectedDate,
}: DayPickerCalendarProps) => {
  const [selected, setSelected] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    setSelected(selectedDate);
  }, [selectedDate]);

  return (
    <div style={{marginLeft:'20px'}}>
      <h5
        style={{ fontWeight: 600, fontSize:'14px', justifyContent:'center', cursor:'default' }}
        className={`mb2 ${defaultClassNames.month_caption} ${!selected ? 'flex justify-center' : 'ml2'}`}
      >
        {format(
          selected || new Date(),
          selected ? 'dd MMMM yyyy' : 'MMMM yyyy'
        )}
      </h5>

      <DayPicker
        className={styles.day_picker}
        mode="single"
        modifiersClassNames={{
          selected: styles.selected_cell,
          caption: styles.caption_label,
        }}
        required
        showOutsideDays
        hideNavigation
        selected={selected}
        classNames={{
          caption_label: styles.caption_label,
          month_caption: 'hidden',
        }}
        components={{
          DayButton: (props) => (
            <DayButton
              {...props}
              circleSize={circleSize}
              selected={selected}
              dayWithProgress={dayWithProgress}
              dayCellClassName={dayCellClassName}
              onDateSelect={(day) => {
                onClick?.(day);
                setSelected(day.date);
              }}
            />
          ),
        }}
      />
    </div>
  );
};

export default memo(DayPickerCalendar);
