import React from 'react'

const page = ({params}:any) => {
  return (
    <>
      <h1>{params.name}</h1>
    </>
  )
}

export default page
