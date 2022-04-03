import styled from '@emotion/styled'

const Card = styled.div`
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
    background: linear-gradient(80deg, rgb(219, 80, 74, 0.8) 50%, #db504a30 0%);
  }

  @media (min-width: 420px) {
    height: 175px;
  }
`

export default function PokemonCard({pokemon, children, onClick}) {
  return (
    <Card
      onClick={() => typeof onClick  === 'function' ? onClick() : ''}
    >
      {children}       
    </Card>
  )
}