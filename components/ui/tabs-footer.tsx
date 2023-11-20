'use client'

import { Button, buttonVariants } from './button'
import { Card } from './card'
import { GithubIcon } from './github-icon'
import { Input } from './input'
import { InputLabel } from './input-label'
import { LinkedinIcon } from './linkedin-icon'
const addon = require('../../backend/index.node')

export function TabsFooter () {
    const handleClick = () => {
        console.log('Factorial')
        console.log(addon.factorial(2))
    }

    return (
        <Card className='flex items-center w-full my-2 p-3'>
            <div className='flex mr-auto items-center gap-3'>
                <InputLabel>Eq. Lenght</InputLabel>
                <Input className='max-w-[10rem] h-7 dark:bg-slate-900 bg-gray-200 cursor-default focus-visible:ring-transparent' readOnly={true} type='number'/>
                <InputLabel>&Sigma;k</InputLabel>
                <Input className='max-w-[10rem] h-7 dark:bg-slate-900 bg-gray-200 cursor-default focus-visible:ring-transparent' readOnly={true} type='number'/>
                <Button onClick={handleClick}>Calculate</Button>
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
    )
}
