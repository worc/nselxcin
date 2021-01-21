import React from 'react'

function testPost() {
  console.log('posting...')
  // axios.post('/api/workbook', {
  //   title: 'title',
  //   subtitle: 'subtitle',
  //   authors: ['first', 'second'],
  //   edition: 'edition',
  //   version: 'version number',
  // }).then(res => console.log(res)).catch(err => console.error(err))
}

export default function () {
  return (
    <div>
      <h1>hello world</h1>
      <div style={{border: '1px solid #ace'}} onClick={testPost}>test post request</div>
    </div>
  )
}
