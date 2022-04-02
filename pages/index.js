/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PokemonList from './pokemon-list'
import PokemonLayout from '../layouts/pokemon-layout';

export default function Home() {
  return (
    <PokemonLayout>
      <PokemonList></PokemonList>
    </PokemonLayout>
  )
}
