import React from 'react'

function BasicInfo() {
  return (
    <div>
      <p>
        Please give the input elements in the following format:
        string,num,string,num...
      </p>
      <p>
        For example: <strong>orange,12,kiwi,2,mango,22.22...</strong>
      </p>
      <p>The app only accepts unique names, otherwise it will filter out duplicates.</p>
    </div>
  )
}

export default BasicInfo
