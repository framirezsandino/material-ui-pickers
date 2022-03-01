import { useMemo } from "react";
import { DateRange } from "../../DateRangePicker/RangeTypes";
import { useToday, useThisWeek, useThisMonth } from "./useUtils";

export type DateRangeButton = {
    label: string;
    dates: DateRange<Date>;
}

export function useRangeButtons(rangeButtons: DateRangeButton[] | null | undefined): DateRangeButton[] | [] {

    const today = useToday<Date>();
    const thisWeek = useThisWeek<Date>();
    const thisMonth = useThisMonth<Date>();

    const defaultRangeButtons: DateRangeButton[] = useMemo(() => {
        return [
            {
                label: 'Today',
                dates: today,
            },
            {
                label: 'This Week',
                dates: thisWeek,
            },
            {
                label: 'This Month',
                dates: thisMonth,
            },
        ];
    }, []);

    const _rangeButtons: DateRangeButton[] = useMemo(() => {
        if (rangeButtons === undefined) return defaultRangeButtons
        if (rangeButtons === null) return [];
        return rangeButtons;
    }, [rangeButtons]);

    return _rangeButtons;
}
