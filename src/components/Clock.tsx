import { useState, useEffect, FC, ReactElement, ReactChildren } from 'react';
import moment from 'moment';

type ClockProps = {
    className?: string,
};

const Clock = ({ className }: ClockProps): ReactElement => {

    const [time, setTime] = useState('');

    useEffect(() => {

        let timeInterval = null;

        timeInterval = setInterval(() => {

            setTime(moment().format('h:mm:ss A'));

        }, 1000);

        return () => {

            timeInterval = null;
        }

    }, []);

    return (
        <time className={className}>
            {time}
        </time>
    )
}

Clock.defaultProps = {
    className: ''
}

export default Clock;