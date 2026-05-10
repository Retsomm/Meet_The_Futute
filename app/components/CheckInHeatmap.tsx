'use client';

import { useMemo } from 'react';

interface CheckInHeatmapProps {
  checkInsByDate: Record<string, number>;
}

const WEEKS = 53;
const DAYS_IN_WEEK = 7;
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
};

// Colors matching the warm paper design system
const LEVEL_COLORS = [
  'var(--bg-3)',       // 0 — empty
  '#c8dfbc',          // 1 — very light green
  '#9ec48a',          // 2 — light green
  '#6fa85a',          // 3 — medium green
  'var(--positive)',  // 4 — full positive green
];

const LEVEL_LABELS = ['無打卡', '1次', '2次', '3次', '4次以上'];

const toDateString = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const CheckInHeatmap = ({ checkInsByDate }: CheckInHeatmapProps) => {
  const { grid, monthPositions } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sunday of the current week (today if Sunday)
    const currentSunday = new Date(today);
    currentSunday.setDate(today.getDate() - today.getDay());

    // Start: 52 weeks before current Sunday → grid covers 53 weeks, today always in last column
    const startDate = new Date(currentSunday);
    startDate.setDate(currentSunday.getDate() - 52 * 7);

    // Build WEEKS columns × 7 rows
    const columns: { date: string; count: number; level: 0|1|2|3|4; future: boolean }[][] = [];
    const monthPos: { month: number; col: number }[] = [];
    let prevMonth = -1;

    for (let w = 0; w < WEEKS; w++) {
      const col: typeof columns[0] = [];
      for (let d = 0; d < DAYS_IN_WEEK; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + w * 7 + d);
        const dateStr = toDateString(date);
        const future = date > today;
        const count = future ? 0 : (checkInsByDate[dateStr] ?? 0);
        col.push({ date: dateStr, count, level: getLevel(count), future });
      }
      const firstDayMonth = new Date(startDate);
      firstDayMonth.setDate(startDate.getDate() + w * 7);
      const m = firstDayMonth.getMonth();
      if (m !== prevMonth) {
        monthPos.push({ month: m, col: w });
        prevMonth = m;
      }
      columns.push(col);
    }

    return { grid: columns, monthPositions: monthPos };
  }, [checkInsByDate]);

  const totalDays = Object.values(checkInsByDate).reduce((s, v) => s + (v > 0 ? 1 : 0), 0);

  return (
    <div>
      <div className="overflow-x-auto pb-1">
        <div style={{ minWidth: `${WEEKS * 14}px` }}>
          {/* Month labels */}
          <div className="relative h-4 mb-1" style={{ marginLeft: 28 }}>
            {monthPositions
              .filter(({ col }) => col <= WEEKS - 4) // skip labels with < 4 weeks remaining space
              .map(({ month, col }, i) => (
                <span
                  key={i}
                  className="absolute font-mono text-[10px] text-ink-3 leading-none"
                  style={{ left: col * 13 }}
                >
                  {MONTH_LABELS[month]}
                </span>
              ))}
          </div>

          {/* Grid */}
          <div className="flex gap-0.5 relative" style={{ marginTop: 16 }}>
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-1">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="font-mono text-[9px] text-ink-4 leading-none flex items-center"
                  style={{ height: 12, width: 20, textAlign: 'right', justifyContent: 'flex-end' }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map((cell) => (
                  <div
                    key={cell.date}
                    title={cell.future ? '' : `${cell.date}${cell.count > 0 ? ` · ${cell.count} 次打卡` : ''}`}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      backgroundColor: cell.future
                        ? 'transparent'
                        : LEVEL_COLORS[cell.level],
                      border: cell.future ? '1px solid var(--line)' : 'none',
                      opacity: cell.future ? 0.4 : 1,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend + summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        <p className="font-mono text-[11px] text-ink-3">
          過去一年共打卡 <span className="text-positive font-medium">{totalDays}</span> 天
        </p>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-ink-4">少</span>
          {LEVEL_COLORS.map((color, i) => (
            <div
              key={i}
              title={LEVEL_LABELS[i]}
              style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: color }}
            />
          ))}
          <span className="font-mono text-[10px] text-ink-4">多</span>
        </div>
      </div>
    </div>
  );
};

export default CheckInHeatmap;
