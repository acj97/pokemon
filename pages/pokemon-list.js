import React from 'react'
import styled from '@emotion/styled'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client'

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`

const H3 = styled.h3`
  text-align: center;
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

export default function PokemonList() {
  const [limit, setLimit] = React.useState(20)
  const [offset, setOffset] = React.useState(0)
  const [scrollPosition, setScrollPosition] = React.useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const scrollToY = () => {
    window.scrollTo(0, scrollPosition)
  }

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
  })

  if (loading) return (
    <div>
      <PokeballImage src="/pokeball.png" />
    </div>
  )
  if (error) return `Error! ${error.message}`

  return (
    <div>
      {data.pokemons.results.map((pokemon) => (
        <div key={pokemon.name} className={styles.card}>
          <img src={pokemon.image} />
          <H3>
            {pokemon.name}
          </H3>
        </div>
      ))}
      <button onClick={() => {
        handleScroll(),
        setLimit(limit + 20)
      }}
      >Load More</button>
    </div>
  )
}
