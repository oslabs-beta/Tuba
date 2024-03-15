import React from 'react'

export function stringToMs(string) {
    const date = new Date(string);
    return date.getTime();

    // "2024-03-14 12:30:45.678"

}

export function msToString(ms) {
    const date = new Date(ms);

    const fullString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')
        }-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')
        }:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')
        }.${String(date.getMilliseconds()).padStart(3, '0')}`;

    const day = fullString.slice(0, 10);
    const time = fullString.slice(10);
    const output = {
        full: fullString,
        date: day,
        time: time
    }

    return output


}


