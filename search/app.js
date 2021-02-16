import React from 'react'

export default function () {
  function handleClick () {
    console.log('clicked')
  }

  return (
    <h1 onClick={ handleClick }>hello world</h1>
  )
}
