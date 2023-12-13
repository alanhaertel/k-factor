'use client'

import { Button, buttonVariants } from './ui/button'
import { Card } from './ui/card'
import { GithubIcon } from './ui/github-icon'
import { Input } from './ui/input'
import { InputLabel } from './ui/input-label'
import { LinkedinIcon } from './ui/linkedin-icon'
import { useCalculate } from '@/hooks/useCalculate'

export function TabsFooter () {
    const { loading, totalK, leq, calculateK } = useCalculate()
    return (
        <>
            <Card className='flex flex-wrap items-center justify-center w-full my-2 p-3'>
                <div className='flex mr-auto items-center gap-3'>
                    <InputLabel>Eq. Lenght [m]</InputLabel>
                    <Input value={leq} className='max-w-[10rem] h-7 dark:bg-slate-900 bg-gray-200 cursor-default focus-visible:ring-transparent' readOnly={true} type='number'/>
                    <InputLabel>&Sigma;k</InputLabel>
                    <Input value={totalK} className='max-w-[10rem] h-7 dark:bg-slate-900 bg-gray-200 cursor-default focus-visible:ring-transparent' readOnly={true} type='number'/>
                    <Button type='submit' onClick={calculateK}> {loading ? 'Calculating...' : 'Calculate'}</Button>
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
