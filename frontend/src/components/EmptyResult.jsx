import React from 'react'

const EmptyResult = (props) => {
  return (
    <div className='container' style={{fontFamily:'var(--font1)',fontSize:'x-large',textAlign:'center',color:'grey',marginTop:'20px'}} >
      {props.text}
    </div>
  )
}

export default EmptyResult
