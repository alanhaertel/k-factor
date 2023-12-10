export type Schedule = {
    name: string
    value: number
}

export type PipeDataItem = {
    nps: string
    schedules: Schedule[]
}
const pipeData: PipeDataItem[] = [
    {
        nps: '1/2 in',
        schedules: [
            { name: '5/5S', value: 0.71 },
            { name: '10/10S', value: 0.67 },
            { name: 'STD 40/40S', value: 0.62 },
            { name: 'XS 80/80S', value: 0.55 },
            { name: '160', value: 0.46 },
            { name: 'XX', value: 0.25 }
        ]
    },
    {
        nps: '3/4 in',
        schedules: [
            { name: '5/5S', value: 0.92 },
            { name: '10/10S', value: 0.88 },
            { name: 'STD/40/40S', value: 0.82 },
            { name: 'XS/80/80S', value: 0.74 },
            { name: '160', value: 0.61 },
            { name: 'XX', value: 0.43 }
        ]
    },
    {
        nps: '1 in',
        schedules: [
            { name: '5/5S', value: 1.19 },
            { name: '10/10S', value: 1.1 },
            { name: 'STD/40/40S', value: 1.05 },
            { name: 'XS/80/80S', value: 0.96 },
            { name: '160', value: 0.82 },
            { name: 'XX', value: 0.6 }
        ]
    },
    {
        nps: '1 1/2 in',
        schedules: [
            { name: '5/5S', value: 1.77 },
            { name: '10/10S', value: 1.68 },
            { name: 'STD/40/40S', value: 1.61 },
            { name: 'XS/80/80S', value: 1.5 },
            { name: '160', value: 1.34 },
            { name: 'XX', value: 1.1 }
        ]
    },
    {
        nps: '2 in',
        schedules: [
            { name: '5/5S', value: 2.25 },
            { name: '10/10S', value: 2.16 },
            { name: 'STD/40/40S', value: 2.07 },
            { name: 'XS/80/80S', value: 1.94 },
            { name: '160', value: 1.69 },
            { name: 'XX', value: 1.5 }
        ]
    },
    {
        nps: '3 in',
        schedules: [
            { name: '5/5S', value: 3.33 },
            { name: '10/10S', value: 3.26 },
            { name: 'STD/40/40S', value: 3.07 },
            { name: 'XS/80/80S', value: 2.9 },
            { name: '160', value: 2.62 },
            { name: 'XX', value: 2.3 }
        ]
    },
    {
        nps: '4 in',
        schedules: [
            { name: '5/5S', value: 4.33 },
            { name: '10/10S', value: 4.26 },
            { name: 'STD 40/40S', value: 4.03 },
            { name: 'XS 80/80S', value: 3.83 },
            { name: '120', value: 3.62 },
            { name: '160', value: 3.44 },
            { name: 'XX', value: 3.15 }
        ]
    },
    {
        nps: '6 in',
        schedules: [
            { name: '5/5S', value: 6.41 },
            { name: '10/10S', value: 6.36 },
            { name: 'STD 40/40S', value: 6.07 },
            { name: 'XS 80/80S', value: 5.76 },
            { name: '120', value: 5.5 },
            { name: '160', value: 5.19 },
            { name: 'XX', value: 4.9 }
        ]
    },
    {
        nps: '8 in',
        schedules: [
            { name: '5S', value: 8.41 },
            { name: '10/10S', value: 8.33 },
            { name: '20', value: 8.13 },
            { name: '30', value: 8.07 },
            { name: 'STD/40/40S', value: 7.98 },
            { name: '60', value: 7.81 },
            { name: 'XS/80/80S', value: 7.63 },
            { name: '100', value: 7.44 },
            { name: '120', value: 7.19 },
            { name: '140', value: 7 },
            { name: 'XX', value: 6.88 },
            { name: '160', value: 6.81 }
        ]
    },
    {
        nps: '10 in',
        schedules: [
            { name: '5S', value: 10.48 },
            { name: '10S', value: 10.42 },
            { name: '20', value: 10.25 },
            { name: '30', value: 10.14 },
            { name: 'STD/40/40S', value: 10.02 },
            { name: 'XS/60/80S', value: 9.75 },
            { name: '80', value: 9.56 },
            { name: '100', value: 9.31 },
            { name: '120', value: 9.06 },
            { name: '140/XX', value: 8.75 },
            { name: '160', value: 8.5 }
        ]
    },
    {
        nps: '12 in',
        schedules: [
            { name: '5S', value: 12.44 },
            { name: '10S', value: 12.39 },
            { name: '20', value: 12.25 },
            { name: '30', value: 12.09 },
            { name: 'STD/40S', value: 12 },
            { name: '40', value: 11.94 },
            { name: 'XS/80S', value: 11.75 },
            { name: '60', value: 11.63 },
            { name: '80', value: 11.37 },
            { name: '100', value: 11.06 },
            { name: '120/XX', value: 10.75 },
            { name: '140', value: 10.5 },
            { name: '160', value: 10.13 }
        ]
    },
    {
        nps: '14 in',
        schedules: [
            { name: '10S', value: 13.62 },
            { name: '10', value: 13.5 },
            { name: '20', value: 13.38 },
            { name: 'STD/30/40S', value: 13.25 },
            { name: '40', value: 13.12 },
            { name: 'XS/80S', value: 13 },
            { name: '60', value: 12.81 },
            { name: '80', value: 12.5 },
            { name: '100', value: 12.12 },
            { name: '120', value: 11.81 },
            { name: '140', value: 11.5 },
            { name: '160', value: 11.19 }
        ]
    },
    {
        nps: '16 in',
        schedules: [
            { name: '10S', value: 15.62 },
            { name: '10', value: 15.5 },
            { name: '20', value: 15.38 },
            { name: 'STD/30/40S', value: 15.25 },
            { name: 'XS/40/80S', value: 15 },
            { name: '60', value: 14.69 },
            { name: '80', value: 14.31 },
            { name: '100', value: 13.94 },
            { name: '120', value: 13.56 },
            { name: '140', value: 13.12 },
            { name: '160', value: 12.81 }
        ]
    },
    {
        nps: '18 in',
        schedules: [
            { name: '10S', value: 17.62 },
            { name: '10', value: 17.5 },
            { name: '20', value: 17.38 },
            { name: 'STD/40S', value: 17.25 },
            { name: '30', value: 17.12 },
            { name: 'XS/80S', value: 17 },
            { name: '40', value: 16.88 },
            { name: '60', value: 16.5 },
            { name: '80', value: 16.12 },
            { name: '100', value: 15.69 },
            { name: '120', value: 15.25 },
            { name: '140', value: 14.88 },
            { name: '160', value: 14.44 }
        ]
    },
    {
        nps: '20 in',
        schedules: [
            { name: '10S', value: 19.56 },
            { name: '10', value: 19.5 },
            { name: 'STD/20/40S', value: 19.25 },
            { name: 'XS/30/80S', value: 19 },
            { name: '40', value: 18.81 },
            { name: '60', value: 18.38 },
            { name: '80', value: 17.94 },
            { name: '100', value: 17.44 },
            { name: '120', value: 17 },
            { name: '140', value: 16.5 },
            { name: '160', value: 16.06 }
        ]
    },
    {
        nps: '24 in',
        schedules: [
            { name: 'STD/20/40S', value: 23.25 },
            { name: 'XS/80S', value: 23 },
            { name: '30', value: 22.88 },
            { name: '40', value: 22.62 },
            { name: '60', value: 22.06 },
            { name: '80', value: 21.56 },
            { name: '100', value: 20.94 },
            { name: '120', value: 20.38 },
            { name: '140', value: 19.88 },
            { name: '160', value: 19.31 }
        ]
    },
    {
        nps: '30 in',
        schedules: [
            { name: '10', value: 29.38 },
            { name: '30', value: 28.75 },
            { name: 'STD/40S', value: 29.25 },
            { name: 'XS/20/80S', value: 29 }
        ]
    },
    {
        nps: '36 in',
        schedules: [
            { name: '10', value: 35.38 },
            { name: 'STD/40S', value: 35.25 },
            { name: 'XS/80S', value: 35 }
        ]
    }
]

export default pipeData
