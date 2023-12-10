import { InputLabel } from './ui/input-label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type RoughnessValues = {
    'cast-iron': {
        name: 'Cast Iron'
        value: string
    }
    'galvanized-iron': {
        name: 'Galvanized Iron'
        value: string
    }
    'asphalted-cast-iron': {
        name: 'Asphalted Cast Iron'
        value: string
    }
    'commercial-or-welded-steel': {
        name: 'Commercial or Welded Steel'
        value: string
    }
    'pvc-glass-other-drawn-tubing': {
        name: 'PVC, Glass, Other Drawn Tubing'
        value: string
    }
    'smooth-steel': {
        name: 'Smooth steel'
        value: string
    }
}

type SelectRoughnessProps = {
    onValueChange: (value: string) => void
}

const roughnessValues: RoughnessValues = {
    'cast-iron': {
        name: 'Cast Iron',
        value: '0.26'
    },
    'galvanized-iron': {
        name: 'Galvanized Iron',
        value: '0.15'
    },
    'asphalted-cast-iron': {
        name: 'Asphalted Cast Iron',
        value: '0.12'
    },
    'commercial-or-welded-steel': {
        name: 'Commercial or Welded Steel',
        value: '0.045'
    },
    'pvc-glass-other-drawn-tubing': {
        name: 'PVC, Glass, Other Drawn Tubing',
        value: '0.0015'
    },
    'smooth-steel': {
        name: 'Smooth steel',
        value: '0'
    }
}

export function RoughnessPopup ({ onValueChange }: SelectRoughnessProps) {
    const entries = Object.entries(roughnessValues)
    return (
        <>
            <InputLabel className='pb-4'>Pipe Material</InputLabel>
            <Select onValueChange={onValueChange}>
                <SelectTrigger className='max-w-[13rem] min-w-[7rem] h-7'>
                    <SelectValue placeholder='Select a Material'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {entries.map(([key, value]) => (
                            <SelectItem key={key} value={value.value}>{value.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <InputLabel className='max-w-[13rem] min-w-[7rem] text-xs pt-4'>The values of the selected pipe material roughness are expressed in mm. On select, the Roughness (&epsilon;) input unit will the automatically set to mm.</InputLabel>
        </>
    )
}
