import React, { useState, useEffect } from 'react'
import { deleteMatter, editMatter } from '../../db/crud'
import { Link } from 'react-router-dom'

function MatterElement({id, children, setMatterListUpdate, matterListUpdateVal}) {
  const [hiddenItemNormal, setHiddenItemNormal] = useState(false)
  const [newMatterName, setNewMatterName] = useState(children)

  function handleEditClick() {
    setHiddenItemNormal(!hiddenItemNormal)
    let input = document.getElementById("matterEdit")
    input.focus()
    input.select()
  }


  function handleEditCommit(e) {
    if (e.key === "Enter") {
      editMatter(children, newMatterName).then((result) => {
        setMatterListUpdate(!matterListUpdateVal)
        setHiddenItemNormal(false)    
      })

    }
  }

  function handleDeleteClick() {
    deleteMatter(children).then((result) => {
      setMatterListUpdate(!matterListUpdateVal)
    })
  }

  return (
  <Link to={`/materia/${id}`}>
    <div className="flex px-[20vw] mt-4" title="Haga click para agregar unidades">
      <span className={"w-full text-[1.5rem] font-bold bg-slate-200 p-4 rounded-l-lg hover:bg-slate-300 cursor-pointer text-semibold text-lg  dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white" + (hiddenItemNormal ? " hidden" : "")}>{children}</span>
      <input onKeyDown={handleEditCommit} id="matterEdit" value={newMatterName} onChange={(e) => setNewMatterName(e.target.value)} type="text" className={"w-full text-[1.5rem] font-bold bg-slate-100 p-4 rounded-l-lg  outline-none cursor-pointer text-semibold text-lg  dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white" + (hiddenItemNormal ? "" : " hidden")} />
      <button onClick={handleEditClick} title={(hiddenItemNormal ? "Editar" : "Cancelar") }className="bg-slate-200 p-4 hover:bg-slate-300 cursor-pointer text-semibold text-lg  dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white">{hiddenItemNormal ? "❌" : "✏️"}</button>
      <button onClick={handleDeleteClick}title="Eliminar" className="bg-slate-200 p-4 hover:bg-slate-300 cursor-pointer text-semibold text-lg  dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white">🗑️</button>
    </div>
  </Link>
  )
}
export default function ListMatter({matterList, setMatterListUpdate, matterListUpdateVal}) {  
  return (
    <>
      <h2 className="text-[1.5rem] font-bold px-[20vw] mt-4">Lista de materias</h2>
      <div>
        {(matterList.map((matter) => <MatterElement key={matter.id} id={matter.id} setMatterListUpdate={setMatterListUpdate} matterListUpdateVal={matterListUpdateVal}>{matter.name}</MatterElement>))}
      </div>
    </>
    
  )
}
