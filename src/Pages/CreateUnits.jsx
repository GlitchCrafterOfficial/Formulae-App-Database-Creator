import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { selectOneMatter } from '../db/crud'

function MatterTitle({children}) {
  return (
    <div className="flex justify-center items-center">
          <h2 className="font-bold px-[20vw] mt-4 text-3xl">{children}</h2>

    </div>
  )
}

export default function CreateUnits() {
  const { matterId } = useParams()
  const [matter, setMatter] = useState({id: 0, name: 'Default', color: 'green-500'})


  useEffect(() => {
    selectOneMatter(matterId).then((result) => {
      setMatter({
        id: result[0].id,
        name: result[0].name,
        color: result[0].color
      })
    })
  }, [])
  

  return (
    <MatterTitle>{matter.name}</MatterTitle>
  )
}
