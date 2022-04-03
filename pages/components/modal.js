import React from 'react'

export default function Modal({show, children}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none"
  
  return (
    <div className={showHideClassName}>
      <section css={{
        position: 'fixed',
        background: 'white',
        width: '80%',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px'
      }}>
        {children}
      </section>
    </div>
  )
}
