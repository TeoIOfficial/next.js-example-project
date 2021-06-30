import { useState, useEffect, ReactElement, } from 'react';
import moment from 'moment';

type ClockProps = {
    className?: string,
};

const Clock = ({ className }: ClockProps): ReactElement => {

    const [time, setTime] = useState('');

    useEffect(() => {

        let timeInterval = null;

        timeInterval = setInterval(() => {

            setTime(moment().format('HH:mm:ss'));

        }, 1000);

        return () => {

            clearInterval(timeInterval);

        }

    }, []);

    return (
        <b>
            <time className={className}>
                {time}
            </time>
        </b>
    )
}

Clock.defaultProps = {
    className: ''
}

export default Clock;