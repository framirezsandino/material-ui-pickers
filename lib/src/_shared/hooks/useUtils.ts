import * as React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { MuiPickersAdapterContext } from '../../LocalizationProvider';
import { DateRange } from '../../DateRangePicker/RangeTypes';

export type MuiPickersAdapter<TDate = unknown> = IUtils<TDate>;

// TODO uncomment when syntax will be allowed by next babel
function checkUtils(utils: MuiPickersAdapter | null) /* :asserts utils is MuiPickersAdapter */ {
  if (!utils) {
    throw new Error(
      'Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.'
    );
  }
}

export function useUtils<T = unknown>() {
  const utils = React.useContext(MuiPickersAdapterContext);
  checkUtils(utils);

  return utils as MuiPickersAdapter<T>;
}

export function useNow<TDate = unknown>(): TDate {
  const utils = useUtils<TDate>();
  const now = React.useRef(utils.date());

  return now.current!;
}

export function useToday<TDate>(): DateRange<TDate> {
  const utils = useUtils<TDate>();
  const now = React.useRef(utils.date());

  const sod = React.useRef(utils.startOfDay(now.current!));
  const eod = React.useRef(utils.endOfDay(now.current!));

  return [sod.current, eod.current];
}

export function useThisWeek<TDate>(): DateRange<TDate> {
  const utils = useUtils<TDate>();
  const now = React.useRef(utils.date());

  const sow = React.useRef(utils.startOfWeek(now.current!));
  const eow = React.useRef(utils.endOfWeek(now.current!));

  return [sow.current, eow.current];
}

export function useThisMonth<TDate>(): DateRange<TDate> {
  const utils = useUtils<TDate>();
  const now = React.useRef(utils.date());

  const sow = React.useRef(utils.startOfMonth(now.current!));
  const eow = React.useRef(utils.endOfMonth(now.current!));

  return [sow.current, eow.current];
}

