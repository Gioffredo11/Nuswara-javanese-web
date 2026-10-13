import {
  parseDateString,
  parseTimeString,
  resolveEffectiveDate,
  getDayOfWeek,
  DayCutoffMode,
  DayName,
} from './date';
import { getPasaran, PasaranName } from './pasaran';
import { getNeptu, NeptuResult } from './neptu';

export interface CalculateWetonOptions {
  dateStr: string; // YYYY-MM-DD
  timeStr?: string; // HH:mm
  cutoff?: DayCutoffMode; // 'midnight' | 'maghrib'
}

export interface WetonCalculationResult {
  inputDate: string;
  effectiveDate: string;
  dayName: DayName;
  pasaran: PasaranName;
  wetonName: string; // e.g. "Jumat Legi"
  neptu: NeptuResult;
  shiftedByMaghrib: boolean;
}

/**
 * Calculates Javanese Weton from input date and optional birth time.
 * Pure pipeline:
 * parse -> resolveEffectiveDate -> getDayOfWeek -> getPasaran -> getNeptu
 */
export function calculateWeton(options: CalculateWetonOptions): WetonCalculationResult {
  const { dateStr, timeStr, cutoff = 'midnight' } = options;

  const { year, month, day } = parseDateString(dateStr);
  const { hours } = parseTimeString(timeStr);

  const effective = resolveEffectiveDate(year, month, day, hours, cutoff);

  const dayName = getDayOfWeek(effective.year, effective.month, effective.day);
  const pasaran = getPasaran(effective.year, effective.month, effective.day);
  const neptu = getNeptu(dayName, pasaran);

  const effectiveDateStr = `${effective.year}-${String(effective.month).padStart(2, '0')}-${String(
    effective.day
  ).padStart(2, '0')}`;

  return {
    inputDate: dateStr,
    effectiveDate: effectiveDateStr,
    dayName,
    pasaran,
    wetonName: `${dayName} ${pasaran}`,
    neptu,
    shiftedByMaghrib: effective.shiftedByMaghrib,
  };
}
