import React, {useState, useEffect} from 'react'
import {createMatter} from '../../db/crud'
function ButtonIcon({icon, color}) {
    return (
        <span id="icon" className={`text-2xl font-bold pr-2 text-${color}`}>{icon}</span>
    )
}

function CreateMatterButton({setCrudNewMatter}) {

    return (
        <div className="flex px-[20vw] mt-4">
            <button 
                onClick={(_) => setCrudNewMatter(true)}
                className="w-full bg-slate-200 p-2 rounded-lg hover:bg-slate-300 cursor-pointer text-semibold text-lg  dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white">
                <ButtonIcon icon="+" color="green-500" additionalClass="p-2"/> Crear nueva materia
            </button>
        </div>
    )
}

function CrudNewMatter({setCrudNewMatter, setMatterListUpdate, matterListUpdateVal}) {
    const [newMatterName, setNewMatterName] = useState("")
    const [tooltipState, setTooltipState] = useState("hidden")
    useEffect(() => {
        setTimeout(() => setTooltipState("visible"), 8000)

        return () => {
            clearTimeout()
            setTooltipState("hidden")
        }
    }, [newMatterName])

    const submitHandler = (e) => {
        e.preventDefault()

        if (newMatterName === "") {
            return
        }

        createMatter(newMatterName).then((result) => {
            if (result) {
                setNewMatterName("")
            } else {
                setNewMatterName("")
            }
        })
        setMatterListUpdate(!matterListUpdateVal)

        setCrudNewMatter(false)

    }

    const handleCancelClick = (e) => {
        console.log("Entrante")
        if (event.which === "13") {
            e.preventDefault()
        }
    }

    
    return (
        <form className="px-[20vw] mt-4 flex" onSubmit={submitHandler}>
            <input type="text" name="matter" id="matter" placeholder="Ingrese el nombre de la materia (presione la x para cancelar)" 
                className={"w-full bg-slate-200 p-2 hover:bg-slate-300 cursor-pointer text-semibold text-lg  dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"}
                onChange={(e) => setNewMatterName(e.target.value)}
            />

            <div data-tooltip="tooltip" className={"absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal top-[12vh] text-white" + " " + tooltipState}>
                Presiona "Enter {"«↵»"}" para crear la materia
            </div>

            <button 
                onClick={handleCancelClick}
            >
                <ButtonIcon icon="x" color="red-500 relative -ml-14 p-4" />
            </button>
            <input type="submit" value="Crear" className="hidden"/>
        </form>
    )
}

export default function NewMatterForm({setMatterListUpdate, matterListUpdateVal}) {
    const [crudNewMatter, setCrudNewMatter] = useState(false)
    
    if (crudNewMatter) {
        return <CrudNewMatter setCrudNewMatter={setCrudNewMatter} crudNewMatter={crudNewMatter} setMatterListUpdate={setMatterListUpdate} matterListUpdateVal={matterListUpdateVal}/>
    } else {
        return <CreateMatterButton setCrudNewMatter={setCrudNewMatter} crudNewMatter={crudNewMatter}/>
    }
}
