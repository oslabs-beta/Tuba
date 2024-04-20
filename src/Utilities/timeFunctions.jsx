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


// import React from 'react'

// export function stringToMs(string) {
//     const date = new Date(string);
//     return date.getTime();

//     // "2024-03-14 12:30:45.678"

// }

// export function msToString(ms) {
//     const date = new Date(ms);

//     let month0 = String(date.getMonth() + 1).padStart(2, '0')
//     if (month0[0] === '0') month0 = month0.slice(1)

//     let day0 = String(date.getDate()).padStart(2, '0');
//     if (day0[0] === '0') day0 = day0.slice(1)



//     // date.getFullYear()
//     // String(date.getMonth() + 1).padStart(2, '0')
//     // String(date.getDate()).padStart(2, '0')

//     const day = `${month0}/${day0}/${date.getFullYear()}`

//     const time = `${String(date.getHours()).padStart(2, '0')
//         }:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')
//         } ${String(date.getMilliseconds()).padStart(3, '0')}`;

//     // const fullString = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')
//     //     }/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')
//     //     }:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')
//     //     }.${String(date.getMilliseconds()).padStart(3, '0')}`;


//     const output = {
//         full: day + ' ' + time,
//         date: day,
//         time: time
//     }
//     import React from 'react'
//     export function stringToMs(string) {
//         const date = new Date(string);
//         return date.getTime();
//         // “2024-03-14 12:30:45.678”
//     }
//     export function msToString(ms) {
//         const date = new Date(ms);
//         const fullString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, ‘0’)
//             }-${String(date.getDate()).padStart(2, ‘0’)} ${String(date.getHours()).padStart(2, ‘0’)
//             }:${String(date.getMinutes()).padStart(2, ‘0’)}:${String(date.getSeconds()).padStart(2, ‘0’)
//             }.${String(date.getMilliseconds()).padStart(3, ‘0’)}`;
//         const day = fullString.slice(0, 10);
//         const time = fullString.slice(10);
//         const output = {
//             full: fullString,
//             date: day,
//             time: time
//         }
//         return output
//     }








//     return output


// }


