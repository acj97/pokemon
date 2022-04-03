import React, {useEffect} from 'react'
import styled from '@emotion/styled'
import PokemonLayout from '../layouts/pokemon-layout';

const PokemonCard = styled.div`
  padding: 0.5rem;
  text-align: left;
  color: white;
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease;
  background: linear-gradient(80deg, #db504a80 50%, #db504a30 0%);
  border: 1px solid #db504a;
  border-radius: 10px;
  width: 48%;
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  cursor: pointer;
  &:focus,
  &:active,
  &:hover {
    color: white;
    border-color: #db504a;
    background: linear-gradient(80deg, #db504a 50%, #db504a30 0%);
  }

  @media (min-width: 420px) {
    height: 175px;
  }
`

const PrimaryButton = styled.button`
  width: 250px;
  background-color: rgb(219, 80, 74, 0.9);
  border: 1px solid #db504a;
  border-radius: 10px;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 8px;
  cursor: pointer;
  font-family: 'slkscr';

  &:focus,
  &:active,
  &:hover {
    background: #db504a;
  }
`

export default function myPokemons() {
  const [ownedPokemons, setOwnedPokemons] = React.useState([])

  useEffect(() => {
    if(typeof window !== 'undefined' && localStorage.getItem('myPokemons'))
      setOwnedPokemons(JSON.parse(localStorage.getItem('myPokemons')))
  }, [])

  function releasePokemon(nickname) {
    let newArr = ownedPokemons.filter( searchItem => searchItem.nickname !== nickname )
    localStorage.setItem('myPokemons', JSON.stringify(newArr))
    setOwnedPokemons(newArr)
  }

  function truncateString(string, limit) {
    if (string.length > limit) {
      return string.substring(0, limit) + "..."
    } else {
      return string
    }
  }

  return (
    <PokemonLayout>
      <div 
        css={{
          paddingLeft: '12px',
          paddingTop: '12px',
          paddingRight: '12px',
          overflowY: 'auto',
          height: '100vh'
        }}
      >
        <div css={{width: '100%', height: '10vh', marginBottom: '8px'}}></div>
        <div 
          css={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap',
            gap: '8px',
            maxHeight: '90vh'
          }}
        >
          {
            ownedPokemons.length > 0 ?
              ownedPokemons.map((pokemon) => (
                <PokemonCard 
                  key={pokemon.nickname} 
                >
                  <div>
                    <div css={{fontSize: '2vw', margin: '0px'}}>
                      #{pokemon.id.toString().padStart(3, '0')}
                    </div>
                    <div css={{fontSize: '2.5vw', margin: '0px'}}>
                      {pokemon.name}
                    </div>
                    <div css={{fontSize: '1.5vw', margin: '0px', marginTop: '8px'}}>
                      nickname:
                    </div>
                    <div css={{fontSize: '2.5vw'}}>{truncateString(pokemon.nickname, 10)}</div>

                    <PrimaryButton 
                      css={{
                        marginTop: '8px',
                        width: 'fit-content'
                      }}
                      onClick={() => {
                        releasePokemon(pokemon.nickname)
                      }}
                    >
                      Release
                    </PrimaryButton>
                  </div>
                  <img css={{width: '15vw'}} src={pokemon.image} />        
                </PokemonCard>
              ))
              : 
              <div 
                css={{
                  width: '100%', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems:'center', 
                  justifyContent: 'center'
                }}
              >
                <div css={{textAlign: 'center'}}>
                  you don't have any pokemon.<br/>
                  catch one in the wild!
                </div>
              </div>
          }
        </div>
      </div>
    </PokemonLayout>
  )
}
