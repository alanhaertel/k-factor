'use client'

import pipeData from '@/lib/pipeData'
import { InputLabel } from './ui/input-label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useState } from 'react'
import { Button } from './ui/button'
import { useInputStore } from '@/lib/useInputStore'

export function InsideDiameterPopup () {
    const options = pipeData.map((pipe) => ({
        label: pipe.nps,
        value: pipe.nps,
        schedules: pipe.schedules
    }))
    const [selectedNps, setSelectedNps] = useState('1/2 in')
    const [selectedSchedule, setSelectedSchedule] = useState('5/5S')

    const filteredSchedules = (selectedNps: string) => {
        return options.find((option) => option.value === selectedNps)?.schedules ?? [{ name: '5/5S', value: 0.71 }]
    }

    const handleNpsChange = (npsValue: string) => {
        setSelectedNps(npsValue)
        const schedule = filteredSchedules(npsValue)[0].name
        setSelectedSchedule(schedule)
    }
    const schedules = filteredSchedules(selectedNps)

    const updateCondition = useInputStore.use.updateCondition()
    const updateConditionUnit = useInputStore.use.updateConditionUnit()
    const handleClick = () => {
        const selectedScheduleObject = schedules.find(schedule => schedule.name === selectedSchedule)

        if (selectedScheduleObject) {
            const diameterValue = selectedScheduleObject.value.toString()
            updateCondition(diameterValue, 'diameter')
            updateConditionUnit('in', 'diameter')
        }
    }

    return (
        <div className='grid grid-cols-2 gap-4'>
            <InputLabel>NPS</InputLabel>
            <InputLabel>Schedule</InputLabel>

            <Select value={selectedNps} onValueChange={newValue => { handleNpsChange(newValue) }}>
                <SelectTrigger className='w-auto h-7'>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select value={selectedSchedule} onValueChange={newValue => { setSelectedSchedule(newValue) }}>
                <SelectTrigger className='w-auto h-7'>
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {schedules.map((option) => (
                            <SelectItem key={option.name} value={option.name}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button onClick={handleClick} className='col-span-2'>Select</Button>
            <InputLabel className='col-span-2 text-xs'>Selected the desired NPS and Schedule. Then click on the select button in order to paste it into the Inside Diameter input. Values is expressed in inches.</InputLabel>
        </div>
    )
}
