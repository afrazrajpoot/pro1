'use client'

const error = ({error,reset}:{error:Error,reset: ()=>void}) => {
  return (
    <div>
     <h1>about 2 error</h1>
     <button onClick={()=>reset()} className="bg-green-500 p-3">try again</button> 
    </div>
  )
}

export default error
