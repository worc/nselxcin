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
      <div>
        { orphans.map(orphan => {
          return (
            <div key={ orphan.audio_id }>
              <div>{ orphan.audio_id }</div>
              <div>{ orphan.filename }</div>
              <div id={ orphan.audio_id } onClick={ handleDelete }>DELETE</div>
            </div>
          )
        })}
      </div>
    )
    : <div>No orphans</div>
  )
}
