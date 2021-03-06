import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function PokemonLayout(props) {
  const {children} =  props
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Pokedex by Abraham</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <main 
        css={{
          oberflow: 'hidden',
          height: '100vh',
          backgroundColor: '#00041F'
        }}
      >
        <div css={{
          position: 'fixed', 
          backgroundColor: '#db504a', 
          width: '100%', 
          paddingLeft: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          borderRadius: '0px 0px 10px 10px', 
          fontFamily: "'PokemonSolid'", 
          color: '#ffde5a', 
          WebkitTextStroke: '1px black'}}>
          <h2 css={{
            width: 'fit-content', 
            margin: 0
          }}>
            Pokedex <sub css={{fontSize: '10pt'}}>by Abraham</sub></h2>
        </div>
        <div 
          onClick={() => router.push('/my-pokemons')}
          css={{
            position: 'absolute',
            bottom: '120px',
            zIndex: 1,
            right: '20px',
            background: '#db504a',
            padding: '20px',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '65px',
            height: '65px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <img 
            css={{
              width: '25px',
              height: '25px'
            }}
            src="bag.svg" 
          />
          <b>Bag</b>
        </div>
        <div 
          onClick={() => router.push('/')}
          css={{
            position: 'absolute',
            bottom: '30px',
            zIndex: 1,
            right: '20px',
            background: '#db504a',
            padding: '20px',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '65px',
            height: '65px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <img 
            css={{
              width: '25px',
              height: '25px'
            }}
            src="home.svg" 
          />
          <b>Home</b>
        </div>
        {children}
      </main>
    </div>
  )
}
