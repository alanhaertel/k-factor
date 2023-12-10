import { MainTabs } from '@/components/main-tabs'
import { TabsFooter } from '@/components/tabs-footer'

export default function Home () {
    return (
        <main>
            <div className='mx-auto mt-6 w-fit xsm:mt-28'>
                <MainTabs/>
                <TabsFooter/>
            </div>

        </main>
    )
}
