import React, {useEffect} from 'react'
import PokemonLayout from '../layouts/pokemon-layout'
import PokemonCard from './components/pokemon-card'
import PrimaryButton from './components/primary-button'
import Modal from './components/modal.js'

export default function MyPokemons() {
  const [ownedPokemons, setOwnedPokemons] = React.useState([])
  const [show, setShow] = React.useState(false)

  useEffect(() => {
    if(typeof window !== 'undefined' && localStorage.getItem('myPokemons'))
      setOwnedPokemons(JSON.parse(localStorage.getItem('myPokemons')))
  }, [])

  function releasePokemon(nickname) {
    let newArr = ownedPokemons.filter( searchItem => searchItem.nickname !== nickname )
    localStorage.setItem('myPokemons', JSON.stringify(newArr))
    setOwnedPokemons(newArr)
    setShow(false)
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
              <React.Fragment key={pokemon.nickname}>
                <Modal 
                  show={show}
                >
                  <h3>
                    {pokemon.nickname} will be released in the wild are you sure?
                  </h3>
                  <div
                    css={{display: 'flex', width: '100%'}}
                  >
                    <PrimaryButton 
                      onClick={() => setShow(false)}
                      style={{
                        width: 'fit-content',
                        margin: '12px 0px 0px 0px',
                        padding: '8px',
                        marginLeft: 'auto',
                        backgroundColor: 'rgb(219, 80, 74, 0.7)'
                      }}
                    >
                      Cancel
                    </PrimaryButton>
                    <PrimaryButton 
                      onClick={() => releasePokemon(pokemon.nickname)}
                      style={{
                        width: 'fit-content',
                        margin: '12px 0px 0px 12px',
                        padding: '8px'
                      }}
                    >
                      Release
                    </PrimaryButton>
                  </div>
                </Modal>
                <PokemonCard 
                  pokemon={pokemon}
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
                      style={{
                        margin: '0px',
                        fontSize: '8px',
                        padding: '8px 16px',
                        marginTop: '8px',
                        width: 'fit-content'
                      }}
                      onClick={() => {
                        setShow(true)
                      }}
                    >
                      Release
                    </PrimaryButton>  
                  </div>
                  <img css={{width: '15vw'}} src={pokemon.image} />
                </PokemonCard>
              </React.Fragment>
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
