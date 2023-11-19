import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputLabel } from '@/components/ui/input-label'
import { ModeToggle } from '@/components/ui/mode-toogle'
import { SelectUnit } from '@/components/ui/select-unit'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { densityUnits, diameterUnits, volumeFlowUnits } from '@/lib/units'

export default function Home () {
    return (
        <main>
            <Tabs defaultValue="flow-conditions" className="w-fit">
                <TabsList>
                    <TabsTrigger className='hover:bg-slate-700' value="flow-conditions">Flow Conditions</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="90-elbow">90° Elbow</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="45-elbow">45° Elbow</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="180">180°</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="tee-elbow">Tee used as elbow</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="tee-thorugh">Tee Run Through</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="valves">Valves</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="misc">Misc</TabsTrigger>
                    <ModeToggle/>
                </TabsList>
                <TabsContent value="flow-conditions">
                    <div className ='grid grid-fit-3 gap-5 items-center border rounded-md border-slate-700 h-72 p-3'>
                        <InputLabel>Flow</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='flow'/>
                        <SelectUnit selectOptions={volumeFlowUnits}/>

                        <InputLabel>Inside Diameter</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='inside-diameter'/>
                        <SelectUnit selectOptions={diameterUnits}/>

                        <InputLabel>Density</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='density'/>
                        <SelectUnit selectOptions={densityUnits}/>
                    </div>

                </TabsContent>
                <TabsContent value="90-elbow">
                    <div className ='grid grid-fit-4 gap-5 items-center border rounded-md border-slate-700 h-72 p-3'>
                        <InputLabel>Threaded, SR (R/D = 1)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C90-threaded'/>

                        <InputLabel>1 Weld (90° Angle)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C90-w1'/>

                        <InputLabel>Flanged/Welded, SR (R/D = 1)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C90-flanged-welded'/>

                        <InputLabel>2 Weld (45° Angle)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C90-w2'/>

                        <InputLabel>All Types, LR (R/D = 1.5)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C90-lr'/>

                        <InputLabel>3 Weld (30° Angle)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C90-w3'/>

                        <div className='col-span-2'/>

                        <InputLabel>4 Weld (22.5° Angle)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C90-w4'/>

                        <div className='col-span-2'/>

                        <InputLabel>5 Weld (18° Angle)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C90-w5'/>
                    </div>
                </TabsContent>
                <TabsContent value="45-elbow">
                    <div className ='grid grid-fit-4 gap-5 items-center border rounded-md border-slate-700 h-72 p-3'>
                        <InputLabel>All Types, SR (R/D = 1)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C45-sr'/>

                        <InputLabel>1 Weld (45° Angle)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C45-w1'/>

                        <InputLabel>All Types LR (R/D = 1.5)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C45-lr'/>

                        <InputLabel>2 Welds (45° Angle)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C45-w2'/>
                    </div>
                </TabsContent>
                <TabsContent value="180">
                    <div className ='grid grid-fit-4 gap-5 items-center border rounded-md border-slate-700 h-72 p-3'>
                        <InputLabel>Screwed, SR (R/D = 1)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='C180-screwed'/>

                        <InputLabel>Flanged/Welded, SR (R/D = 1)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="C180-flanged-welded"/>

                        <InputLabel>All Types, LR (R/D = 1.5)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="C180-lr"/>
                    </div>
                </TabsContent>
                <TabsContent value="tee-elbow">
                    <div className ='grid grid-fit-4 gap-5 items-center border rounded-md border-slate-700 h-72 p-3'>
                        <InputLabel>Screwed, SR (R/D = 1)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Tee-el-screwed'/>

                        <InputLabel>Screwed, LR</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Tee-el-lr"/>

                        <InputLabel>Flanged/Welded, SR (R/D = 1)</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Tee-el-flanged-welded"/>

                        <InputLabel>Stub-in-tpye Branch</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Tee-el-branch"/>
                    </div>
                </TabsContent>
                <TabsContent value="tee-thorugh">
                    <div className ='grid grid-fit-4 gap-5 items-center border rounded-md border-slate-700 h-72 p-3'>
                        <InputLabel>Screwed</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Tee-thr-screwed'/>

                        <InputLabel>Flanged/Welded</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Tee-thr-flanged-welded"/>

                        <InputLabel>Stub-in-type Branch</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Tee-thr-branch"/>
                    </div>
                </TabsContent>
                <TabsContent value="valves">
                    <div className ='grid grid-fit-4 gap-5 items-center border rounded-md border-slate-700 h-72 p-3'>
                        <InputLabel>Full Line Size, &beta; = 1</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Valve-beta1'/>

                        <InputLabel>Globe, Standard</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-globe-std"/>

                        <InputLabel>Reduced Trim, &beta; = 0.9</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-beta09"/>

                        <InputLabel>Globe, Angle</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-globe-angle"/>

                        <InputLabel>Reduced Trim, &beta; = 0.8</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-beta08"/>

                        <InputLabel>Diaphragm, dam type</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-diaphragm"/>

                        <InputLabel>Butterfly</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-butterfly"/>

                        <InputLabel>Check Lift</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-check-lift"/>

                        <InputLabel>Check Swing</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-check-swing"/>

                        <InputLabel>Check Tilting-Disk</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name="Valve-check-disk"/>
                    </div>
                </TabsContent>
                <TabsContent value="misc">
                    <div className ='grid grid-fit-4 gap-5 items-center border rounded-md border-slate-700 h-72 p-3'>
                        <InputLabel>Square Inlet</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Misc-inlet-sq'/>

                        <InputLabel>Inward Inlet</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Misc-inlet-inward'/>

                        <InputLabel>Flush Inlet</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Misc-inlet-flush'/>

                        <InputLabel>Enlargment</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Misc-enlargment'/>

                        <InputLabel>Contraction</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Misc-contraction'/>

                        <InputLabel>Orifice &beta; = 0.5</InputLabel>
                        <Input type='number' className='max-w-[10rem] h-7' name='Misc-orifice'/>
                    </div>
                </TabsContent>

            </Tabs>
            <Button>Calculate</Button>

        </main>
    )
}
// className = 'grid grid-fit-3 gap-4 items-center border rounded-md border-slate-700 h-96 p-3'
