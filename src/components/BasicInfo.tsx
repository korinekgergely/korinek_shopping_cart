import React from 'react'

function BasicInfo() {
  return (
    <div>
      <p>
        Please give the input elements in the following format:
        string,num,string,num...
      </p>
      <p>
        For example: <strong>orange,12,kiwi,2...</strong>
      </p>
      <p>The app accepts only unique names.</p>
    </div>
  )
}

export default BasicInfo
