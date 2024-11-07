import { useState } from 'react'
import FormVisit from './visit-tech/form'
import RegisterVisit from './visit-tech/register-visit'

export default function SectionVisit() {
    const [StateSection, setStateSection] = useState<number>(0)
    function NextSect() {
        if (StateSection === SectionVisit.length) return
        setStateSection(StateSection + 1)
    }
    function PrevSect() {
        if (StateSection === 0) return
        setStateSection(StateSection - 1)
    }
    const SectionVisit = [
        <FormVisit next={NextSect} />,
        <RegisterVisit next={NextSect} />,
    ]

    return <div>{SectionVisit[StateSection]}</div>
}
