'use client'

import { Input } from '@/components/ui/input'
import { InputLabel } from '@/components/ui/input-label'
import { ModeToggle } from '@/components/ui/mode-toogle'
import { SelectUnit } from '@/components/ui/select-unit'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { densityUnits, diameterUnits, massFlowUnits, viscosityUnits, volumeFlowUnits } from '@/lib/units'
import { Card } from './card'
import { useState } from 'react'
import { firstDensityUnits, firstDiameterUnits, firstMassFlowUnits, firstViscosityUnits, firstVolumeFlowUnits } from '@/lib/consts'

export function MainTabs () {
    const [flowType, setFlowType] = useState('mass-flow')
    const [massFlow, setMassFlow] = useState(firstMassFlowUnits)
    const [diameter, setDiameter] = useState(firstDiameterUnits)
    const [volumeFlow, setVolumeFlow] = useState(firstVolumeFlowUnits)
    const [viscosity, setViscosity] = useState(firstViscosityUnits)
    const [density, setDensity] = useState(firstDensityUnits)

    const handleFlowType = (newValue: string) => {
        setFlowType(newValue)
    }
    const handleMassFlow = (newValue: string) => {
        setMassFlow(newValue)
    }
    const handleDiameter = (newValue: string) => {
        setDiameter(newValue)
    }
    const handleVolumeFlow = (newValue: string) => {
        setVolumeFlow(newValue)
    }
    const handleViscosity = (newValue: string) => {
        setViscosity(newValue)
    }
    const handleDensity = (newValue: string) => {
        setDensity(newValue)
    }

    return (
        <Tabs defaultValue="flow-conditions" className="w-fit">
            <TabsList>
                <TabsTrigger className='dark:hover:bg-slate-700 hover:bg-slate-300' value="flow-conditions">Flow Conditions</TabsTrigger>
                <TabsTrigger className='dark:hover:bg-slate-700 hover:bg-slate-300' value="90-elbow">90° Elbow</TabsTrigger>
                <TabsTrigger className='dark:hover:bg-slate-700 hover:bg-slate-300' value="45-elbow">45° Elbow</TabsTrigger>
                <TabsTrigger className='dark:hover:bg-slate-700 hover:bg-slate-300' value="180">180°</TabsTrigger>
                <TabsTrigger className='dark:hover:bg-slate-700 hover:bg-slate-300' value="tee-elbow">Tee used as elbow</TabsTrigger>
                <TabsTrigger className='dark:hover:bg-slate-700 hover:bg-slate-300' value="tee-thorugh">Tee Run Through</TabsTrigger>
                <TabsTrigger className='dark:hover:bg-slate-700 hover:bg-slate-300' value="valves">Valves</TabsTrigger>
                <TabsTrigger className='dark:hover:bg-slate-700 hover:bg-slate-300' value="misc">Misc</TabsTrigger>
                <ModeToggle/>
            </TabsList>
            <TabsContent value="flow-conditions">
                <Card className ='grid grid-fit-3 gap-5 items-center h-72 p-3'>
                    <InputLabel>Flow Type</InputLabel>
                    <SelectUnit value={flowType} onValueChange={handleFlowType} selectOptions={{ 'mass-flow': 'Mass', 'volumetric-flow': 'Volumetric' }}/>
                    <br/>

                    {flowType === 'volumetric-flow' && (
                        <>
                            <InputLabel>Volumetric Flow</InputLabel>
                            <Input required={true} type='number' className='max-w-[10rem] h-7' name='volumetric-flow'/>
                            <SelectUnit onValueChange={handleVolumeFlow} value={volumeFlow} selectOptions={volumeFlowUnits}/>
                        </>
                    )}

                    {flowType === 'mass-flow' && (
                        <>
                            <InputLabel>Mass Flow</InputLabel>
                            <Input type='number' className='max-w-[10rem] h-7' name='mass-flow'/>
                            <SelectUnit onValueChange={handleMassFlow} value={massFlow} selectOptions={massFlowUnits}/>
                        </>
                    )}

                    <InputLabel>Viscosity</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='viscosity'/>
                    <SelectUnit onValueChange={handleViscosity} value={viscosity} selectOptions={viscosityUnits}/>

                    <InputLabel>Inside Diameter</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='inside-diameter'/>
                    <SelectUnit onValueChange={handleDiameter} value={diameter} selectOptions={diameterUnits}/>

                    {flowType === 'volumetric-flow' && (
                        <>
                            <InputLabel>Density</InputLabel>
                            <Input type='number' className='max-w-[10rem] h-7' name='density'/>
                            <SelectUnit onValueChange={handleDensity} value={density} selectOptions={densityUnits}/>
                        </>
                    )}

                </Card>

            </TabsContent>
            <TabsContent value="90-elbow">
                <Card className ='grid grid-fit-4 gap-5 items-center h-72 p-3'>
                    <InputLabel>Threaded, SR (R/D = 1)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C90-threaded'/>

                    <InputLabel className='ml-16'>1 Weld (90° Angle)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C90-w1'/>

                    <InputLabel>Flanged/Welded, SR (R/D = 1)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C90-flanged-welded'/>

                    <InputLabel className='ml-16'>2 Weld (45° Angle)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C90-w2'/>

                    <InputLabel>All Types, LR (R/D = 1.5)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C90-lr'/>

                    <InputLabel className='ml-16'>3 Weld (30° Angle)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C90-w3'/>

                    <div className='col-span-2'/>

                    <InputLabel className='ml-16'>4 Weld (22.5° Angle)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C90-w4'/>

                    <div className='col-span-2'/>

                    <InputLabel className='ml-16'>5 Weld (18° Angle)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C90-w5'/>
                </Card>
            </TabsContent>
            <TabsContent value="45-elbow">
                <Card className ='grid grid-fit-4 gap-5 items-center h-72 p-3'>
                    <InputLabel>All Types, SR (R/D = 1)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C45-sr'/>

                    <InputLabel className='ml-16'>1 Weld (45° Angle)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C45-w1'/>

                    <InputLabel>All Types LR (R/D = 1.5)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C45-lr'/>

                    <InputLabel className='ml-16'>2 Welds (45° Angle)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C45-w2'/>
                </Card>
            </TabsContent>
            <TabsContent value="180">
                <Card className ='grid grid-fit-4 gap-5 items-center h-72 p-3'>
                    <InputLabel>Screwed, SR (R/D = 1)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='C180-screwed'/>

                    <InputLabel className='ml-16'>Flanged/Welded, SR (R/D = 1)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="C180-flanged-welded"/>

                    <InputLabel>All Types, LR (R/D = 1.5)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="C180-lr"/>
                </Card>
            </TabsContent>
            <TabsContent value="tee-elbow">
                <Card className ='grid grid-fit-4 gap-5 items-center h-72 p-3'>
                    <InputLabel>Screwed, SR (R/D = 1)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Tee-el-screwed'/>

                    <InputLabel className='ml-16'>Screwed, LR</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Tee-el-lr"/>

                    <InputLabel>Flanged/Welded, SR (R/D = 1)</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Tee-el-flanged-welded"/>

                    <InputLabel className='ml-16'>Stub-in-tpye Branch</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Tee-el-branch"/>
                </Card>
            </TabsContent>
            <TabsContent value="tee-thorugh">
                <Card className ='grid grid-fit-4 gap-5 items-center h-72 p-3'>
                    <InputLabel>Screwed</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Tee-thr-screwed'/>

                    <InputLabel className='ml-16'>Flanged/Welded</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Tee-thr-flanged-welded"/>

                    <InputLabel>Stub-in-type Branch</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Tee-thr-branch"/>
                </Card>
            </TabsContent>
            <TabsContent value="valves">
                <Card className ='grid grid-fit-4 gap-5 items-center h-72 p-3'>
                    <InputLabel>Full Line Size, &beta; = 1</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Valve-beta1'/>

                    <InputLabel className='ml-16'>Globe, Standard</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-globe-std"/>

                    <InputLabel>Reduced Trim, &beta; = 0.9</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-beta09"/>

                    <InputLabel className='ml-16'>Globe, Angle</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-globe-angle"/>

                    <InputLabel>Reduced Trim, &beta; = 0.8</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-beta08"/>

                    <InputLabel className='ml-16'>Diaphragm, dam type</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-diaphragm"/>

                    <InputLabel>Butterfly</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-butterfly"/>

                    <InputLabel className='ml-16'>Check Lift</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-check-lift"/>

                    <InputLabel>Check Swing</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-check-swing"/>

                    <InputLabel className='ml-16'>Check Tilting-Disk</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name="Valve-check-disk"/>
                </Card>
            </TabsContent>
            <TabsContent value="misc">
                <Card className ='grid grid-fit-4 gap-5 items-center h-72 p-3'>
                    <InputLabel>Square Inlet</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Misc-inlet-sq'/>

                    <InputLabel className='ml-16'>Inward Inlet</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Misc-inlet-inward'/>

                    <InputLabel>Flush Inlet</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Misc-inlet-flush'/>

                    <InputLabel className='ml-16'>Enlargment</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Misc-enlargment'/>

                    <InputLabel>Contraction</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Misc-contraction'/>

                    <InputLabel className='ml-16'>Orifice &beta; = 0.5</InputLabel>
                    <Input type='number' className='max-w-[10rem] h-7' name='Misc-orifice'/>
                </Card>
            </TabsContent>

        </Tabs>
    )
}
