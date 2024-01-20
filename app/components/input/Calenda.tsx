'use client'
import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}


const Calenda: React.FC<CalendarProps> = ({ value, onChange, disabledDates }) => {
    return (
        <DateRange
        
            rangeColors={['#34977d']}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={true}
            minDate={new Date()}
            disabledDates={disabledDates}


        />
    )
}

export default Calenda