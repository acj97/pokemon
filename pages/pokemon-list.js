import React, {useEffect} from 'react'
import styled from '@emotion/styled'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

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

const PokeballImage = styled.img`
width: 250px;
height: 250px;
-webkit-animation-name: spin;
-webkit-animation-duration: 4000ms;
-webkit-animation-iteration-count: infinite;
-webkit-animation-timing-function: linear;
-moz-animation-name: spin;
-moz-animation-duration: 4000ms;
-moz-animation-iteration-count: infinite;
-moz-animation-timing-function: linear;
-ms-animation-name: spin;
-ms-animation-duration: 4000ms;
-ms-animation-iteration-count: infinite;
-ms-animation-timing-function: linear;

animation-name: spin;
animation-duration: 4000ms;
animation-iteration-count: infinite;
animation-timing-function: linear;
@-moz-keyframes spin {
  from { -moz-transform: rotate(0deg); }
  to { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  from { -webkit-transform: rotate(0deg); }
  to { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}`

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
`

const PrimaryButton = styled.button`
  width: 250px;
  background-color: rgb(219, 80, 74, 0.9);
  border: 1px solid #db504a;
  border-radius: 10px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  margin: 16px;
  font-family: 'slkscr';

  &:focus,
  &:active,
  &:hover {
    background: #db504a;
  }
`

export default function PokemonList() {
  const [limit, setLimit] = React.useState(20)
  const [offset, setOffset] = React.useState(0)

  const router = useRouter()
  
  const { loading, error, data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
  })

  if (loading) return (
    <div css={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <PokeballImage src="/pokeball.png" />
    </div>
  )
  if (error) return `Error! ${error.message}`

  return (
    <div css={{
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      flexWrap: 'wrap',
      gap: '8px',
      paddingLeft: '12px',
      paddingTop: '12px',
      paddingRight: '12px',
      overflowY: 'auto',
      height: '100vh'
    }}>
      <div css={{width: '100%', height: '10vh'}}></div>
      {pokemons.results.map((pokemon) => (
        <PokemonCard 
          key={pokemon.name} 
          onClick={() => {
            router.push({
              pathname: '/pokemon-detail',
              query: { name: pokemon.name }
          })
          }}>
          <div>
            <div css={{fontSize: '2vw', margin: '0px'}}>
              #{pokemon.id.toString().padStart(3, '0')}
            </div>
            <div css={{fontSize: '2.5vw', margin: '0px'}}>
              {pokemon.name}
            </div>
          </div>
          <img css={{width: '15vw'}} src={pokemon.image} />        
        </PokemonCard>
      ))}
      <div css={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%'
      }}>
        <PrimaryButton onClick={() => {
          setLimit(limit + 20)
        }}
        >
          Load More
        </PrimaryButton>
      </div>
    </div>
  )
}
