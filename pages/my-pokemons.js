import React, {useEffect} from 'react'
import PokemonLayout from '../layouts/pokemon-layout'
import PokemonCard from './components/pokemon-card'
import PrimaryButton from './components/primary-button'

export default function MyPokemons() {
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
                  pokemon={pokemon}
                >
                  <div css={{fontSize: '1.5vw', margin: '0px', marginTop: '8px'}}>
                    nickname:
                  </div>
                  <div css={{fontSize: '2.5vw'}}>{truncateString(pokemon.nickname, 10)}</div>

                  <PrimaryButton 
                    style={{
                      margin: '0px',
                      fontSize: '8px',
                      padding: '8px 16px',
                      marginTop: '8px',
                      width: 'fit-content'
                    }}
                    onClick={() => {
                      releasePokemon(pokemon.nickname)
                    }}
                  >
                    Release
                  </PrimaryButton>  
                </PokemonCard>
              ))
              : 
              <div 
                css={{
                  width: '100%', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems:'center', 
                  justifyContent: 'center',
                  height: '90vh'
                }}
              >
                <div css={{textAlign: 'center'}}>
                  you don&apos;t have any pokemon.<br/>
                  catch one in the wild!
                </div>
              </div>
          }
        </div>
      </div>
    </PokemonLayout>
  )
}
