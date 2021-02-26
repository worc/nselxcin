import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/admin'>Admin</Link>
          <ul>
            <li><Link to='/admin/phrases'>Phrases</Link></li>
            <li><Link to='/admin/phrases/bulk'>Bulk Phrase Upload</Link></li>
            <li><Link to='/admin/audio/orphans'>Orphaned Audio</Link></li>
          </ul>
        </li>
        <li><Link to='/search'>Search</Link></li>
      </ul>
    </nav>
  )
}
