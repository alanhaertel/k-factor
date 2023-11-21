// export async function POST () {
//     const res = await fetch('http://localhost:3000/api', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//             // 'API-Key': process.env.DATA_API_KEY
//         },
//         body: JSON.stringify({ time: new Date().toISOString() })
//     })

import { NextResponse } from 'next/server'

//     const data = await res.json()

//     return Response.json(data)
// }
export async function POST () {
    return NextResponse.json({
        message: 'works POST'
    })
}
