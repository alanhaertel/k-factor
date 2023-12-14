import { useToast } from '@/components/ui/use-toast'
import { useInputStore } from '@/lib/useInputStore'
import { useOutputStore } from '@/lib/useOutputStore'
import { validateInputs } from '@/lib/utils'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

export function useCalculate () {
    const [loading, setLoading] = useState(false)
    const inputsData = useInputStore(useShallow(state => state.inputs))
    const flowType = useInputStore(useShallow(state => state.flowType))
    const conditionsData = useInputStore(useShallow(state => state.conditions))
    const conditionsUnitsData = useInputStore(useShallow(state => state.conditionsUnits))
    const miscData = useInputStore(useShallow(state => state.misc))

    const { toast } = useToast()

    const updateTotalK = useOutputStore.use.updateTotalK()
    const updateLeq = useOutputStore.use.updateLeq()
    const totalK = useOutputStore.use.totalK()
    const leq = useOutputStore.use.leq()

    const updateErrors = useInputStore.use.updateConditionsErrors()

    const calculateK = () => {
        setLoading(true)
        const data = {
            inputs: inputsData,
            conditions: conditionsData,
            conditionsUnits: conditionsUnitsData,
            misc: miscData,
            flowType
        }
        const { validation, errorMessage, errors } = validateInputs(conditionsData, flowType)

        if (validation) {
            fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (!response.ok) {
                        setLoading(false)
                        toast({
                            title: 'Error',
                            description: 'Internal server error',
                            variant: 'destructive'
                        })
                    }
                    return await response.json()
                })
                .then(resultData => {
                    setLoading(false)
                    updateErrors(errors)
                    updateTotalK(resultData.totalK.toString())
                    updateLeq(resultData.leq.toString())
                    toast({
                        title: 'Success',
                        description: 'Successfully Calculated'
                    })
                })
                .catch(error => {
                    setLoading(false)
                    toast({
                        title: 'Error',
                        description: 'Internal server error',
                        variant: 'destructive'
                    })
                    console.log(error)
                })
        } else {
            setLoading(false)
            updateErrors(errors)
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
                className: 'whitespace-pre-wrap'
            })
        }
    }

    return { loading, totalK, leq, calculateK }
}
