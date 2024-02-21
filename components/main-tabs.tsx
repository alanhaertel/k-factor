'use client'

import { Input } from '@/components/ui/input'
import { InputLabel } from '@/components/ui/input-label'
import { ModeToggle } from '@/components/ui/mode-toogle'
import { SelectUnit } from '@/components/ui/select-unit'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { densityUnits, diameterUnits, massFlowUnits, viscosityUnits, volumeFlowUnits } from '@/lib/units'
import { Card } from './ui/card'
import { conditionsKeys, inputsKeys, miscKeys } from '@/lib/consts'
import { useInputStore } from '@/lib/useInputStore'
import { useShallow } from 'zustand/react/shallow'
import { useDebouncedCallback } from 'use-debounce'
import { useConditions } from '@/hooks/useConditions'
import { useInputs } from '@/hooks/useInputs'
import { useMisc } from '@/hooks/useMisc'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { RoughnessPopup } from './roughness-popup'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { InsideDiameterPopup } from './inside-diameter-popup'
import { useState } from 'react'

export function MainTabs () {
    const [roughnessValue, setRoughnessValue] = useState('')
    const [diameterValue, setDiameterValue] = useState('')

    const flowType = useInputStore.use.flowType()
    const updateFlowType = useInputStore(useShallow(state => state.updateFlowType))

    const conditionsValues = useConditions(conditionsKeys)
    const updateCondition = useDebouncedCallback(useInputStore(useShallow(state => state.updateCondition)), 300)

    const conditionsUnitsValues = useInputStore.use.conditionsUnits()
    const updateConditionUnits = useInputStore(useShallow(state => state.updateConditionUnit))

    const inputsValues = useInputs(inputsKeys)
    const updateInput = useDebouncedCallback(useInputStore(useShallow(state => state.updateInput)), 300)

    const miscValues = useMisc(miscKeys)
    const updateMisc = useDebouncedCallback(useInputStore(useShallow(state => state.updateMisc)), 300)

    const conditionError = useInputStore.use.conditionsErrors()
    // handlea el click en el popup del roughness
    const handleRoughnessChange = (newValue: string) => {
        setRoughnessValue(newValue)
        updateCondition(newValue, 'roughness')
        updateConditionUnits('mm', 'roughness')
        updateCondition.flush()
    }
    // handlea el value del store con instaflush, porque roughness esta controlado con el value
    const handleRoughnessInput = (newValue: string) => {
        setRoughnessValue(newValue)
        updateCondition(newValue, 'roughness')
        updateCondition.flush()
    }
    // handlea el value del store con instaflush, porque diameter esta controlado con el value
    const handleDiameterInput = (newValue: string) => {
        setDiameterValue(newValue)
        updateCondition(newValue, 'diameter')
        updateCondition.flush()
    }

    return (
        <Tabs defaultValue="flow-conditions">
            <TabsList className='flex flex-wrap h-auto'>
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
                <Card className ='grid grid-fit-3 gap-5 items-center h-auto min-h-[19rem] p-3'>
                    <InputLabel>Flow Type</InputLabel>
                    <SelectUnit onValueChange={newValue => { updateFlowType(newValue) }} value={flowType} selectOptions={{ 'mass-flow': 'Mass', 'volumetric-flow': 'Volumetric' }}/>
                    <br/>

                    {flowType === 'volumetric-flow' && (
                        <>
                            <InputLabel>Volumetric Flow</InputLabel>
                            <Input inputMode='decimal' conditionError={conditionError.volumetricFlow} onBlur={() => { updateCondition.flush() }} defaultValue={conditionsValues.volumetricFlow} onChange={e => { updateCondition(e.target.value, 'volumetricFlow') }} required={true} type='text' className='max-w-[10rem] h-7' name='volumetric-flow'/>
                            <SelectUnit onValueChange={newValue => { updateConditionUnits(newValue, 'volumetricFlow') }} value={conditionsUnitsValues.volumetricFlow} selectOptions={volumeFlowUnits}/>
                        </>
                    )}

                    {flowType === 'mass-flow' && (
                        <>
                            <InputLabel>Mass Flow</InputLabel>
                            <Input inputMode='decimal' conditionError={conditionError.massFlow} onBlur={() => { updateCondition.flush() }} defaultValue={conditionsValues.massFlow} onChange={e => { updateCondition(e.target.value, 'massFlow') }} type='text' className='max-w-[10rem] h-7' name='mass-flow'/>
                            <SelectUnit onValueChange={newValue => { updateConditionUnits(newValue, 'massFlow') }} value={conditionsUnitsValues.massFlow} selectOptions={massFlowUnits}/>
                        </>
                    )}

                    <InputLabel>Viscosity</InputLabel>
                    <Input inputMode='decimal' conditionError={conditionError.viscosity} onBlur={() => { updateCondition.flush() }} defaultValue={conditionsValues.viscosity} onChange={e => { updateCondition(e.target.value, 'viscosity') }} type='text' className='max-w-[10rem] h-7' name='viscosity'/>
                    <SelectUnit onValueChange={newValue => { updateConditionUnits(newValue, 'viscosity') }} value={conditionsUnitsValues.viscosity} selectOptions={viscosityUnits}/>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className='text-sm align-middle text-left p-0 m-0 h-full w-fit whitespace-normal' variant='ghost'>Inside Diameter&nbsp;<ChevronDown size='18px'/></Button>
                        </PopoverTrigger>
                        <PopoverContent onFocusOutside={(event) => { event.preventDefault() }}>
                            <InsideDiameterPopup setDiameterValue={setDiameterValue}/>
                        </PopoverContent>
                    </Popover>
                    <Input inputMode='decimal' conditionError={conditionError.diameter} onBlur={() => { updateCondition.flush() }} value={diameterValue} onChange={e => { handleDiameterInput(e.target.value) }} type='text' className='max-w-[10rem] h-7' name='inside-diameter'/>
                    <SelectUnit onValueChange={newValue => { updateConditionUnits(newValue, 'diameter') }} value={conditionsUnitsValues.diameter} selectOptions={diameterUnits}/>

                    {flowType === 'volumetric-flow' && (
                        <>
                            <InputLabel>Density</InputLabel>
                            <Input inputMode='decimal' conditionError={conditionError.density} onBlur={() => { updateCondition.flush() }} defaultValue={conditionsValues.density} onChange={e => { updateCondition(e.target.value, 'density') }} type='text' className='max-w-[10rem] h-7' name='density'/>
                            <SelectUnit onValueChange={newValue => { updateConditionUnits(newValue, 'density') }} value={conditionsUnitsValues.density} selectOptions={densityUnits}/>
                        </>
                    )}
                    <Popover>
                        <PopoverTrigger asChild >
                            <Button className='text-sm align-middle text-left p-0 m-0 h-full w-fit whitespace-normal' variant='ghost'>Roughness (&epsilon;)&nbsp;<ChevronDown size='18px'/></Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-fit'>
                            <RoughnessPopup onValueChange={handleRoughnessChange}/>
                        </PopoverContent>
                    </Popover>
                    <Input inputMode='decimal' conditionError={conditionError.roughness} onBlur={() => { updateCondition.flush() }} value={roughnessValue} onChange={e => { handleRoughnessInput(e.target.value) }} type='text' className='max-w-[10rem] h-7' name='roughness'/>
                    <SelectUnit onValueChange={newValue => { updateConditionUnits(newValue, 'roughness') }} value={conditionsUnitsValues.roughness} selectOptions={diameterUnits}/>

                </Card>

            </TabsContent>
            <TabsContent value="90-elbow">
                <Card className ='grid grid-fit-2 xsm:grid-fit-4 gap-5 items-center h-auto min-h-[19rem] p-3'>
                    <InputLabel>Threaded, SR (R/D = 1)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.threaded90} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'threaded90') }} type='number' className='max-w-[10rem] h-7' name='C90-threaded'/>

                    <InputLabel className='xsm:ml-16'>1 Weld (90° Angle)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.weld190} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'weld190') }} type='number' className='max-w-[10rem] h-7' name='C90-w1'/>

                    <InputLabel>Flanged/Welded, SR (R/D = 1)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.flanged90} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'flanged90') }} type='number' className='max-w-[10rem] h-7' name='C90-flanged-welded'/>

                    <InputLabel className='xsm:ml-16'>2 Weld (45° Angle)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.weld290} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'weld290') }} type='number' className='max-w-[10rem] h-7' name='C90-w2'/>

                    <InputLabel>All Types, LR (R/D = 1.5)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.allTypes90} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'allTypes90') }} type='number' className='max-w-[10rem] h-7' name='C90-lr'/>

                    <InputLabel className='xsm:ml-16'>3 Weld (30° Angle)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.weld390} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'weld390') }} type='number' className='max-w-[10rem] h-7' name='C90-w3'/>

                    <div className='hidden xsm:block xsm:col-span-2'/>

                    <InputLabel className='xsm:ml-16'>4 Weld (22.5° Angle)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.weld490} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'weld490') }} type='number' className='max-w-[10rem] h-7' name='C90-w4'/>

                    <div className='hidden xsm:block xsm:col-span-2'/>

                    <InputLabel className='xsm:ml-16'>5 Weld (18° Angle)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.weld590} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'weld590') }} type='number' className='max-w-[10rem] h-7' name='C90-w5'/>
                </Card>
            </TabsContent>
            <TabsContent value="45-elbow">
                <Card className ='grid grid-fit-2 xsm:grid-fit-4 gap-5 items-center h-auto min-h-[19rem] p-3'>
                    <InputLabel>All Types, SR (R/D = 1)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.allTypesSR45} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'allTypesSR45') }} type='number' className='max-w-[10rem] h-7' name='C45-sr'/>

                    <InputLabel className='xsm:ml-16'>1 Weld (45° Angle)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.weld145} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'weld145') }} type='number' className='max-w-[10rem] h-7' name='C45-w1'/>

                    <InputLabel>All Types LR (R/D = 1.5)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.allTypesLR45} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'allTypesLR45') }} type='number' className='max-w-[10rem] h-7' name='C45-lr'/>

                    <InputLabel className='xsm:ml-16'>2 Welds (45° Angle)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.weld245} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'weld245') }} type='number' className='max-w-[10rem] h-7' name='C45-w2'/>
                </Card>
            </TabsContent>
            <TabsContent value="180">
                <Card className ='grid grid-fit-2 xsm:grid-fit-4 gap-5 items-center h-auto min-h-[19rem] p-3'>
                    <InputLabel>Screwed, SR (R/D = 1)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.screwed180} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'screwed180') }} type='number' className='max-w-[10rem] h-7' name='C180-screwed'/>

                    <InputLabel className='xsm:ml-16'>Flanged/Welded, SR (R/D = 1)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.flanged180} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'flanged180') }} type='number' className='max-w-[10rem] h-7' name="C180-flanged-welded"/>

                    <InputLabel>All Types, LR (R/D = 1.5)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.allTypes180} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'allTypes180') }} type='number' className='max-w-[10rem] h-7' name="C180-lr"/>
                </Card>
            </TabsContent>
            <TabsContent value="tee-elbow">
                <Card className ='grid grid-fit-2 xsm:grid-fit-4 gap-5 items-center h-auto min-h-[19rem] p-3'>
                    <InputLabel>Screwed, SR (R/D = 1)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.screwedSRTee} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'screwedSRTee') }} type='number' className='max-w-[10rem] h-7' name='Tee-el-screwed'/>

                    <InputLabel className='xsm:ml-16'>Screwed, LR</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.screwedLRTee} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'screwedLRTee') }} type='number' className='max-w-[10rem] h-7' name="Tee-el-lr"/>

                    <InputLabel>Flanged/Welded, SR (R/D = 1)</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.flangedTee} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'flangedTee') }} type='number' className='max-w-[10rem] h-7' name="Tee-el-flanged-welded"/>

                    <InputLabel className='xsm:ml-16'>Stub-in-type Branch</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.stubInTee} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'stubInTee') }} type='number' className='max-w-[10rem] h-7' name="Tee-el-branch"/>
                </Card>
            </TabsContent>
            <TabsContent value="tee-thorugh">
                <Card className ='grid grid-fit-2 xsm:grid-fit-4 gap-5 items-center h-auto min-h-[19rem] p-3'>
                    <InputLabel>Screwed</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.screwedTeeThrough} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'screwedTeeThrough') }} type='number' className='max-w-[10rem] h-7' name='Tee-thr-screwed'/>

                    <InputLabel className='xsm:ml-16'>Flanged/Welded</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.flangedTeeThrough} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'flangedTeeThrough') }} type='number' className='max-w-[10rem] h-7' name="Tee-thr-flanged-welded"/>

                    <InputLabel>Stub-in-type Branch</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.stubInTeeThrough} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'stubInTeeThrough') }} type='number' className='max-w-[10rem] h-7' name="Tee-thr-branch"/>
                </Card>
            </TabsContent>
            <TabsContent value="valves">
                <Card className ='grid grid-fit-2 xsm:grid-fit-4 gap-5 items-center h-auto min-h-[19rem] p-3'>
                    <InputLabel>Full Line Size, &beta; = 1</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.valve1b} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'valve1b') }} type='number' className='max-w-[10rem] h-7' name='Valve-beta1'/>

                    <InputLabel className='xsm:ml-16'>Globe, Standard</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.globeStandard} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'globeStandard') }} type='number' className='max-w-[10rem] h-7' name="Valve-globe-std"/>

                    <InputLabel>Reduced Trim, &beta; = 0.9</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.valve09b} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'valve09b') }} type='number' className='max-w-[10rem] h-7' name="Valve-beta09"/>

                    <InputLabel className='xsm:ml-16'>Globe, Angle</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.globeAngle} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'globeAngle') }} type='number' className='max-w-[10rem] h-7' name="Valve-globe-angle"/>

                    <InputLabel>Reduced Trim, &beta; = 0.8</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.valve08b} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'valve08b') }} type='number' className='max-w-[10rem] h-7' name="Valve-beta08"/>

                    <InputLabel className='xsm:ml-16'>Diaphragm, dam type</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.diaphragm} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'diaphragm') }} type='number' className='max-w-[10rem] h-7' name="Valve-diaphragm"/>

                    <InputLabel>Butterfly</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.butterfly} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'butterfly') }} type='number' className='max-w-[10rem] h-7' name="Valve-butterfly"/>

                    <InputLabel className='xsm:ml-16'>Check Lift</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.checkLift} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'checkLift') }} type='number' className='max-w-[10rem] h-7' name="Valve-check-lift"/>

                    <InputLabel>Check Swing</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.checkSwing} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'checkSwing') }} type='number' className='max-w-[10rem] h-7' name="Valve-check-swing"/>

                    <InputLabel className='xsm:ml-16'>Check Tilting-Disk</InputLabel>
                    <Input inputMode='numeric' defaultValue={inputsValues.checkDisk} onBlur={() => { updateInput.flush() }} onChange={e => { updateInput(e.target.value, 'checkDisk') }} type='number' className='max-w-[10rem] h-7' name="Valve-check-disk"/>
                </Card>
            </TabsContent>
            <TabsContent value="misc">
                <Card className ='grid grid-fit-2 xsm:grid-fit-4 gap-5 items-center h-auto min-h-[19rem] p-3'>
                    <InputLabel>Inlet</InputLabel>
                    <Input inputMode='numeric' defaultValue={miscValues.inlet} onBlur={() => { updateMisc.flush() }} onChange={e => { updateMisc(e.target.value, 'inlet') }} type='number' className='max-w-[10rem] h-7' name='Misc-inlet-sq'/>

                    <InputLabel className='xsm:ml-16'>Outlet</InputLabel>
                    <Input inputMode='numeric' defaultValue={miscValues.outlet} onBlur={() => { updateMisc.flush() }} onChange={e => { updateMisc(e.target.value, 'outlet') }} type='number' className='max-w-[10rem] h-7' name='Misc-inlet-inward'/>

                    <InputLabel>Enlargement</InputLabel>
                    <Input inputMode='numeric' defaultValue={miscValues.enlargement} onBlur={() => { updateMisc.flush() }} onChange={e => { updateMisc(e.target.value, 'enlargement') }} type='number' className='max-w-[10rem] h-7' name='Misc-enlargement'/>

                    <InputLabel className='xsm:ml-16'>Contraction</InputLabel>
                    <Input inputMode='numeric' defaultValue={miscValues.contraction} onBlur={() => { updateMisc.flush() }} onChange={e => { updateMisc(e.target.value, 'contraction') }} type='number' className='max-w-[10rem] h-7' name='Misc-contraction'/>
                </Card>
            </TabsContent>

        </Tabs>
    )
}
