'use client'

import { useInputStore } from '@/lib/useInputStore'
import { Button, buttonVariants } from './button'
import { Card } from './card'
import { GithubIcon } from './github-icon'
import { Input } from './input'
import { InputLabel } from './input-label'
import { LinkedinIcon } from './linkedin-icon'
import { useTransition } from 'react'
import { caclulate } from '@/lib/actions'
import { useOutputStore } from '@/lib/useOutputStore'
import { useShallow } from 'zustand/react/shallow'
import { validateInputs } from '@/lib/utils'
import { Toaster } from './toaster'
import { useToast } from './use-toast'

export function TabsFooter () {
    // eslint-disable-next-line
    const [isPending, startTransition] = useTransition()
    const inputsData = useInputStore(useShallow(state => state.inputs))
    const flowType = useInputStore(useShallow(state => state.flowType))
    const conditionsData = useInputStore(useShallow(state => state.conditions))
    const miscData = useInputStore(useShallow(state => state.misc))

    const { toast } = useToast()

    const updateTotalK = useOutputStore.use.updateTotalK()
    const totalK = useOutputStore.use.totalK()

    return (
        <>
            <Card className='flex items-center w-full my-2 p-3'>
                <div className='flex mr-auto items-center gap-3'>
                    <InputLabel>Eq. Lenght</InputLabel>
                    <Input className='max-w-[10rem] h-7 dark:bg-slate-900 bg-gray-200 cursor-default focus-visible:ring-transparent' readOnly={true} type='number'/>
                    <InputLabel>&Sigma;k</InputLabel>
                    <Input value={totalK} className='max-w-[10rem] h-7 dark:bg-slate-900 bg-gray-200 cursor-default focus-visible:ring-transparent' readOnly={true} type='number'/>
                    <Button type='submit' onClick={() => {
                        startTransition(() => {
                            const { validation, messageValidation } = validateInputs(conditionsData, flowType)
                            console.log(conditionsData, flowType)
                            if (validation) {
                                caclulate(inputsData, conditionsData, miscData, flowType)
                                    .then(data => {
                                        updateTotalK(data.totalK.toString())
                                        toast({
                                            title: 'Success',
                                            description: data.messageServer
                                        })
                                    })
                                    .catch(e => {
                                        console.log(e)
                                        let toastDescription = 'Internal Server Error'

                                        if (e instanceof Error && e.message === 'Reynolds number is 0, calculation cannot proceed.') {
                                            toastDescription = e.message
                                        }
                                        toast({
                                            title: 'Error',
                                            description: toastDescription,
                                            variant: 'destructive'
                                        })
                                    })
                            } else {
                                toast({
                                    title: 'Error',
                                    description: messageValidation,
                                    variant: 'destructive'
                                })
                            }
                        })
                    } }>Calculate</Button>
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
            <Toaster/>
        </>
    )
}
