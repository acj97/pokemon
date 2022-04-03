import React, {useEffect} from 'react'
import styled from '@emotion/styled'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import PokemonLayout from '../layouts/pokemon-layout'
import Modal from './components/modal.js'
import PrimaryButton from './components/primary-button'
import PokeballImage from './components/pokeball-image'

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      weight
      moves {
        move {
          name
        }
      }
      sprites {
        front_default
      }
      stats {
        base_stat
        effort
        stat {
          url
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
      status
    }
  }
`

const PokeballText = styled.div`
  margin-top: -34px;
  margin-left: 18px;
  position: absolute;
  font-size: 16px;
  color: black;

  -webkit-animation: shake .5s infinite alternate;
  /* Chrome, Safari, Opera */

  animation: shake .5s infinite alternates;

  @keyframes shake {
    0% {
      transform: rotate(7deg);
    }
    25% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-7deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`

export default function PokemonDetail() {
  const [show, setShow] = React.useState(false)
  const [nickname, setNickname] = React.useState('')
  const [catchedPokemon, setCatchedPokemon] = React.useState({})
  const [randomNumber, setRandomNumber] = React.useState(0)
  const [text, setText] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const router = useRouter()

  useEffect(() => {
    checkDuplicate()
  }, [nickname])

  function checkDuplicate() {
    let arr = typeof window !== 'undefined' && localStorage.getItem('myPokemons') ? JSON.parse(localStorage.getItem('myPokemons')) : []
    let check = false
    for(let i=0; i<arr.length; i++) {
      if(arr[i].nickname == nickname.toUpperCase()) {
        setErrorMessage('you already have pokemon nicknamed ' + nickname + '!')
        check = true
      }
    }

    if(!check || nickname == '') setErrorMessage('')
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
  
  const { loading, error, data: { pokemon = {} } = {} } = useQuery(GET_POKEMON, {
    variables: { name: router.query.name },
  })

  useEffect(() => {
    if(loading === false && pokemon) {
      setRandomNumber(Math.random())
    }
  }, [loading, pokemon])

  if (error) return `Error! ${error.message}`

  function closeModal() {
    setNickname('')
    setShow(false)
  }

  function catchPokemon(pokemon) {
    let rand = Math.random() < 0.5
    if(rand) {
      setCatchedPokemon(pokemon)
      setShow(true)
      setText('')
    } else {
      setText('try again!')
    }
  }
  
  return (
    <PokemonLayout>
      <div css={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '12px',
        overflowY: 'hidden',
        height: '100vh'
      }}>
        <Modal show={show} closeModal={closeModal} nickname={nickname} catchedPokemon={catchedPokemon}>
          <h3>
            gotcha!<br/> 
            {catchedPokemon.name} was caught!
          </h3>
          <input 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            placeholder="Input Nickname"
          />
          <div css={{
            fontSize: '8pt'
          }}>*nickname will be converted to uppercase</div>
          <div css={{
            color: 'rgb(219, 80, 74, 1)',
            marginTop: '12px'
          }}>
            {errorMessage}
          </div>
          <PrimaryButton 
            onClick={() => submit()}
            style={{
              width: '100%',
              margin: '12px 0px 0px 0px'
            }}
            disabled={
            nickname != '' && errorMessage == '' ?
              false
              :
              true
            }
          >
            Save to Bag
          </PrimaryButton>
        </Modal>
        {
          loading ?
          <div css={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <PokeballImage src="/pokeball.png" />
          </div>
          :
          <>
            <div css={{
              color: 'white', 
              backgroundImage: `url(terrain${Math.floor((randomNumber * 5) + 1) + ''}.png)`, 
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '45vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <div css={{width: '100%', height: '10vh'}}></div>
              <img css={{width: '30vh', marginBottom: '24px'}} src={pokemon.sprites.front_default} />        
            </div>
            <div css={{
              height: '55vh',
              backgroundColor: 'white', 
              padding: '32px',
              borderRadius: '20px 20px 0px 0px',
              display: 'block',
              marginTop: '-20px',
              overflowY: 'auto'
            }}>
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  marginTop: '-90px',
                  left: '0',
                  width: '100%',
                }}
              >
                <div
                  css={{
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    borderRadius: '50%',
                    color: 'white',
                    width: '120px',
                    height: '120px'
                  }}
                >
                  <div 
                    onClick={() => {
                      catchPokemon(pokemon)}
                    }
                    css={{
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      css={{
                        width: '90px',
                        height: '90px'
                      }} 
                      src="pokeball.png" 
                    />
                    <PokeballText>
                      <b>Catch</b>
                    </PokeballText> 
                  </div>
                </div>
              </div>
              <div 
                css={{
                  textAlign: 'center', 
                  color: 'black'
                }}
              >
                <div 
                  css={{
                    marginTop: '32px',
                    color: '#db504a'
                  }}
                >
                  {text}
                </div>
                <h2 
                  css={{
                    margin: '24px 0px 12px 0px'
                  }}
                >
                  {
                    pokemon.name
                  }
                </h2>
                
                <div 
                  css={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px'
                  }}
                >
                  {
                    pokemon.types.map((e) => (
                      <div 
                        key={e.type.name}
                        className={e.type.name}
                        css={{
                          borderRadius: '50px',
                          padding: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}
                      >
                        <img 
                          css={{
                            width: '15px',
                            height: '15px',
                            marginRight: '12px'
                          }}
                          src={'/element-icons/' + e.type.name + '.svg'}
                        />
                        <div>
                          {e.type.name}
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div css={{marginTop: '32px'}}>
                  <h4>Abilities</h4>
                  <div css={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
                    {
                      pokemon.abilities.map((e) => (
                        <div 
                          key={e.ability.name}
                          css={{
                            background: '#C4BDAC',
                            borderRadius: '50px',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}
                        >
                          {e.ability.name}
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div css={{marginTop: '32px'}}>
                  <h4>Moves</h4>
                  <div css={{
                    flexWrap: 'wrap',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px'
                  }}>
                    {
                      pokemon.moves.map((e) => (
                        <div 
                          key={e.move.name}
                          css={{
                            background: '#AEBCC4',
                            borderRadius: '50px',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}
                        >
                          {e.move.name}
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div css={{marginTop: '32px'}}>
                  <h4>Stats</h4>
                  <div 
                    css={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-start'
                    }}
                  >
                    {
                      pokemon.stats.map((e) => (
                        <div 
                          key={e.stat.name}
                          css={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: '12px'
                          }}
                        >
                          <div 
                            css={{
                              marginRight: '16px',
                              width: '150px',
                              backgroundColor: '#DDDDD2',
                              borderRadius: '10px'
                            }}
                          >
                            {!e.stat.name.includes('special') ? e.stat.name : ''}
                            {e.stat.name == 'special-attack' ? 'sp.atk' : ''}
                            {e.stat.name == 'special-defense' ? 'sp.def' : ''}
                          </div>
                          <div css={{
                            width: '100%',
                            backgroundColor: '#F0EFEB',
                            height: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            borderRadius: '10px'
                          }}>
                            <div css={{
                              width: parseInt(e.base_stat)/200 * 100 + '%',
                              height: '100%',
                              background: '#db504a',
                              borderRadius: '10px'
                            }}>
                            </div>
                            <div css={{
                              position: 'absolute',
                              width: '100%',
                            }}>
                              {e.base_stat}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </PokemonLayout>
  )
}
