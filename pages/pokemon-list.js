import React, {useEffect} from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import PokemonLayout from '../layouts/pokemon-layout'
import PokemonCard from './components/pokemon-card'
import PrimaryButton from './components/primary-button'
import PokeballImage from './components/pokeball-image'
const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`

export default function PokemonList() {
  const [limit, setLimit] = React.useState(20)
  const [offset, setOffset] = React.useState(0)
  const [ownedPokemons, setOwnedPokemons] = React.useState({})
  const router = useRouter()
  
  const { loading, error, data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
  })

  const[pokemonList, setPokemonList] = React.useState([])

  function groupBy(arr, key) {
    return arr.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  useEffect(() => {
    if(loading === false && pokemons) {
      if(typeof window !== 'undefined' && localStorage.getItem('myPokemons')) {
        let arr = JSON.parse(localStorage.getItem('myPokemons'))
        let obj = groupBy(arr, 'name')
        setOwnedPokemons(obj)
      }
      

      if(pokemonList.length > 0) setPokemonList([...pokemonList, ...pokemons.results])
      else setPokemonList(pokemons.results) 
    }
  }, [loading, pokemons])

  if (error) return `Error! ${error.message}`

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
            pokemonList.length > 0 ?
              pokemonList.map((pokemon) => (
                <PokemonCard 
                  key={pokemon.id} 
                  pokemon={pokemon}
                  onClick={() => {
                    router.push({
                      pathname: '/pokemon-detail',
                      query: { name: pokemon.name }
                    })
                  }}
                >
                  <div css={{fontSize: '1.5vw', margin: '0px', marginTop: '8px'}}>
                    Owned:&nbsp;
                    {ownedPokemons.hasOwnProperty(pokemon.name) ? ownedPokemons[pokemon.name].length : 0}
                  </div>     
                </PokemonCard>
              ))
              : ''
          }
          <div css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%'
          }}>
            {
              loading ?
              <div css={{height: pokemonList.length == 0 ? '60vh' : '', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <PokeballImage />
              </div>
              :
              <PrimaryButton 
                onClick={() => {
                  setLimit(limit)
                  setOffset(offset + 20)
                }}
              >
                Load More
              </PrimaryButton>
            }
          </div>
        </div>
      </div>
    </PokemonLayout>
  )
}
