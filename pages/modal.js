import React from 'react'
import styled from '@emotion/styled'
import { useEffect } from 'react'

const PrimaryButton = styled.button`
  width: 250px;
  background-color: rgb(219, 80, 74, 0.9);
  border: 1px solid #db504a;
  border-radius: 10px;
  color: white;
  padding: 16px 16px 16px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  font-family: 'slkscr';

  &:focus,
  &:active,
  &:hover {
    background: #db504a;
  }
  &:disabled,
  &[disabled]{
    cursor: no-drop;
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`

export default function Modal({closeModal, show, catchedPokemon, nickname, children}) {
  const [error, setError] = React.useState('')

  const showHideClassName = show ? "modal display-block" : "modal display-none"
  
  useEffect(() => {
    checkDuplicate()
  }, [nickname])

  function checkDuplicate() {
    let arr = typeof window !== 'undefined' && localStorage.getItem('myPokemons') ? JSON.parse(localStorage.getItem('myPokemons')) : []
    let check = false
    for(let i=0; i<arr.length; i++) {
      if(arr[i].nickname == nickname.toUpperCase()) {
        setError('you already have pokemon nicknamed ' + nickname + '!')
        check = true
      }
    }

    if(!check || nickname == '') setError('')
    return check
  }

  function submit() {
    let obj = {
      id: catchedPokemon.id,
      nickname: nickname.toUpperCase(),
      name: catchedPokemon.name,
      image: catchedPokemon.sprites.front_default 
    }
    
    let arr = typeof window !== 'undefined' && localStorage.getItem('myPokemons') ? JSON.parse(localStorage.getItem('myPokemons')) : []
    arr.push(obj)
    localStorage.setItem('myPokemons', JSON.stringify(arr))

    closeModal()
  }
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
        <h3>
          gotcha!<br/> 
          {catchedPokemon.name} was caught!
        </h3>
        {children}
        <div css={{
          fontSize: '8pt'
        }}>*nickname will be converted to uppercase</div>
        <div css={{
          color: 'rgb(219, 80, 74, 1)',
          marginTop: '12px'
        }}>
          {error}
        </div>
        <PrimaryButton 
          onClick={() => submit()}
          type="button"
          css={{
            width: '100%',
            marginTop: '12px'
          }}

          disabled={nickname != '' && error == '' ?
          false
          :
          true}
        >
          Save to Bag
        </PrimaryButton>
      </section>
    </div>
  )
}
