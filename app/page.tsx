import { MainTabs } from '@/components/main-tabs'
import { TabsFooter } from '@/components/tabs-footer'

export default function Home () {
    return (
        <main>
            <div className='mx-auto mt-28 w-fit'>
                <MainTabs/>
                <TabsFooter/>
            </div>

        </main>
    )
}
