import { MainTabs } from '@/components/ui/main-tabs'
import { TabsFooter } from '@/components/ui/tabs-footer'

export default function Home () {
    return (
        <main className=''>
            <div className='mx-auto mt-28 w-fit'>
                <MainTabs/>
                <TabsFooter/>
            </div>

        </main>
    )
}
