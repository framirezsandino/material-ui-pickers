import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { FunctionComponent, useCallback } from "react";
import { DateRangeButton, useRangeButtons } from '../_shared/hooks/useRangeButton';
import { DateRange } from './RangeTypes';

interface DateRangePickerQuickButtonsProps {
  rangeButtons?: DateRangeButton[] | null;
  clearLabel?: string;
  onDateRangeChange: (dateRange: DateRange<Date>) => void;
}

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
     
    },
    clearButton: {
      display: 'flex',
      flex: '1',
      flexDirection: 'row-reverse'
    }
  }),
  { name: 'DateRangePickerQuickButtons' }
);

const DateRangePickerQuickButtons: FunctionComponent<DateRangePickerQuickButtonsProps> = (props: DateRangePickerQuickButtonsProps) => {

  const classes = useStyles();

  const { rangeButtons, clearLabel = 'Clear', onDateRangeChange } = props;

  const _rangeButtons: DateRangeButton[] = useRangeButtons(rangeButtons);

  const handleRangeButtonClick = useCallback((selected: DateRangeButton) => {
    onDateRangeChange(selected.dates);
  }, []);

  const handleClear = useCallback(() => {
    onDateRangeChange([null, null]);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        {_rangeButtons.map(rb => (
          <Button
            key={`DateRangePickerQuickButtons__button-${rb.label}`}
            onClick={() => handleRangeButtonClick(rb)}
          >{rb.label}
          </Button>
        ))}

        <div className={classes.clearButton}>
          <Button
            key="DateRangePickerQuickButtons__clear"
            onClick={handleClear}
          >{clearLabel}
          </Button>
        </div>

      </div>
    </div>
  );
}

export default DateRangePickerQuickButtons;