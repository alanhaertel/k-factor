'use client'

import { useInputStore } from '@/lib/useInputStore'
import { Button, buttonVariants } from './ui/button'
import { Card } from './ui/card'
import { GithubIcon } from './ui/github-icon'
import { Input } from './ui/input'
import { InputLabel } from './ui/input-label'
import { LinkedinIcon } from './ui/linkedin-icon'
import { useOutputStore } from '@/lib/useOutputStore'
import { useShallow } from 'zustand/react/shallow'
import { validateInputs } from '@/lib/utils'
import { useToast } from './ui/use-toast'

export function TabsFooter () {
    const inputsData = useInputStore(useShallow(state => state.inputs))
    const flowType = useInputStore(useShallow(state => state.flowType))
    const conditionsData = useInputStore(useShallow(state => state.conditions))
    const conditionsUnitsData = useInputStore(useShallow(state => state.conditionsUnits))
    const miscData = useInputStore(useShallow(state => state.misc))

    const { toast } = useToast()

    const updateTotalK = useOutputStore.use.updateTotalK()
    const updateLeq = useOutputStore.use.updateLeq()
    const totalK = useOutputStore.use.totalK()
    const leq = useOutputStore.use.leq()

    const updateErrors = useInputStore.use.updateConditionsErrors()
    const calculateK = () => {
        const data = {
            inputs: inputsData,
            conditions: conditionsData,
            conditionsUnits: conditionsUnitsData,
            misc: miscData,
            flowType
        }
        const { validation, errorMessage, errors } = validateInputs(conditionsData, flowType)
        if (validation) {
            fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (!response.ok) {
                        toast({
                            title: 'Error',
                            description: 'Internal server error',
                            variant: 'destructive'
                        })
                    }
                    return await response.json()
                })
                .then(resultData => {
                    updateErrors(errors)
                    updateTotalK(resultData.totalK.toString())
                    updateLeq(resultData.leq.toString())
                    toast({
                        title: 'Success',
                        description: 'Successfully Calculated'
                    })
                })
                .catch(error => {
                    toast({
                        title: 'Error',
                        description: 'Internal server error',
                        variant: 'destructive'
                    })
                    console.log(error)
                })
        } else {
            updateErrors(errors)
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
                className: 'whitespace-pre-wrap'
            })
        }
    }
    return (
        <>
            <Card className='flex flex-wrap items-center justify-center w-full my-2 p-3'>
                <div className='flex mr-auto items-center gap-3'>
                    <InputLabel>Eq. Lenght [m]</InputLabel>
                    <Input value={leq} className='max-w-[10rem] h-7 dark:bg-slate-900 bg-gray-200 cursor-default focus-visible:ring-transparent' readOnly={true} type='number'/>
                    <InputLabel>&Sigma;k</InputLabel>
                    <Input value={totalK} className='max-w-[10rem] h-7 dark:bg-slate-900 bg-gray-200 cursor-default focus-visible:ring-transparent' readOnly={true} type='number'/>
                    <Button type='submit' onClick={calculateK}>Calculate</Button>
                </div>
                <div className='px-2 flex items-center'>
                    <a href={'https://github.com/alanhaertel'} className={buttonVariants({ variant: 'ghost' })} target="_blank" rel="noreferrer">
                        <GithubIcon className='w-7 h-7 dark:fill-foreground fill-foreground hover:fill-slate-600'/>
                    </a>
                    <a href={'https://www.linkedin.com/in/alan-haertel/'} className={buttonVariants({ variant: 'ghost' })} target="_blank" rel="noreferrer">
                        <LinkedinIcon className='w-7 h-7 dark:fill-foreground fill-foreground hover:fill-slate-600'/>
                    </a>
                </div>
            </Card>
        </>
    )
}
