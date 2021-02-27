import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Orphans () {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [orphans, setOrphans] = useState([])

  useEffect(() => {
    axios.get('/api/audio').then(response => {
      setOrphans(response.data)
    })
  }, [lastUpdate])

  function handleDelete(e) {
    axios.delete(`/api/audio/${e.target.id}`).then(() => {
      setLastUpdate(new Date())
    })
  }

  return (
    orphans.length
    ? (
      <ul>
        { orphans.map(orphan => {
          return (
            <li key={ orphan.audio_id }>
              <div>{ orphan.audio_id }</div>
              <div>{ orphan.filename }</div>
              <span style={{ border: '2px solid red' }} id={ orphan.audio_id } onClick={ handleDelete }>DELETE</span>
            </li>
          )
        })}
      </ul>
    )
    : <div>No orphans</div>
  )
}
