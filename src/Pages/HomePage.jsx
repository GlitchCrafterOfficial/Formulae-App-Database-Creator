import React, {useState, useEffect} from 'react'
import '../App.css'
import Navbar from '../components/Home/Navbar'
import NewMatterForm from '../components/Home/NewMatterForm'
import { listMatter } from '../db/crud'
import ListMatter from '../components/Home/ListMatter'
export default function HomePage() {
  const [matterList, setMatterList] = useState([])
  const [matterListUpdate, setMatterListUpdate] = useState(false)
  useEffect(() => {
    listMatter().then((result) => {
        if (result) setMatterList(result);
        console.log(result);
        
    })
  }, [matterListUpdate])

  return (
    <div>
      <section>
      </section>
      <section id="content">
        <NewMatterForm setMatterListUpdate={setMatterListUpdate} matterListUpdateVal={matterListUpdate}/>
        <ListMatter matterList={matterList} setMatterListUpdate={setMatterListUpdate} matterListUpdateVal={matterListUpdate} />
      </section>
    </div>
  )
}
