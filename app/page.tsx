import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputLabel } from '@/components/ui/input-label'
import { ModeToggle } from '@/components/ui/mode-toogle'
import { SelectUnit } from '@/components/ui/select-unit'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { densityUnits, diameterUnits, volumeFlowUnits } from '@/lib/units'

export default function Home () {
    return (
        <main className="">
            <Tabs defaultValue="account" className="w-fit">
                <TabsList>
                    <TabsTrigger className='hover:bg-slate-700' value="flow-conditions">Flow Conditions</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="90-elbow">90° Elbow</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="45-elbow">45° Elbow</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="180">180°</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="tee-elbow">Tee used as elbow</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="tee-thorugh">Tee Run Through</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="valves">Valves</TabsTrigger>
                    <TabsTrigger className='hover:bg-slate-700' value="others">Others</TabsTrigger>
                    <ModeToggle/>
                </TabsList>
                <TabsContent className='border rounded-md border-slate-700 h-96' value="flow-conditions">
                    <div className='flex px-5 py-2 gap-5 items-center'>
                        <InputLabel>Flow</InputLabel>
                        <Input className='max-w-[13rem] h-7' name='flow'/>
                        <SelectUnit selectOptions={volumeFlowUnits}/>
                    </div>
                    <div className='flex px-5 py-2 gap-5 items-center'>
                        <InputLabel>Density</InputLabel>
                        <Input className='max-w-[13rem] h-7' name='density'/>
                        <SelectUnit selectOptions={densityUnits}/>
                    </div>
                    <div className='flex px-5 py-2 gap-5 items-center'>
                        <InputLabel>Inside Diameter</InputLabel>
                        <Input className='max-w-[13rem] h-7' name='id'/>
                        <SelectUnit selectOptions={diameterUnits}/>
                    </div>
                </TabsContent>
                <TabsContent value="90-elbow">Change your password here.</TabsContent>

            </Tabs>
            <Button>Calculate</Button>

        </main>
    )
}
