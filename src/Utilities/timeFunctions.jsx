export function formatDateForInput(input) {
    const date = new Date(input)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function stringToMs(string) {
    const date = new Date(string);
    return date.getTime();
}

export function msToString(ms) {
    const date = new Date(ms);
    const fullString = `${String(date.getMonth() + 1).padStart(2, '0')
        }-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')
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