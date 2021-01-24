import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ({ match }) {
  const [workbook, setWorkbook] = useState({})

  useEffect(() => {
    console.log(match)
    axios.get(`/api/workbook/${match.params.id}`).then(response => {
      console.log(response)
      setWorkbook(response.data)
    })
  }, [])

  return (
    <div>
      <h1>{ workbook.title }</h1>
      <div><em>{ workbook.subtitle }</em></div>
      <div>by { workbook.authors }</div>
      <div>{ workbook.edition } Edition</div>
      <div>Version { workbook.version }</div>
    </div>
  )
}
