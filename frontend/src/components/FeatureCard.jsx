import React from 'react'
import './css/featurecard.css'
const FeatureCard = (props) => {
  return (
    <div className='feature-card'>
      <div className='card-icon'>
        {props.icon}
      </div>
      <div className="card-title">
        {props.title}
      </div>
      <div className="card-description">
        {props.desc}
      </div>
    </div>
  )
}

export default FeatureCard