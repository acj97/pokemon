import styled from '@emotion/styled'

const Pokeball = styled.img`
width: 50px;
height: 50px;
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

export default function PokeballImage() {
  return (
    <Pokeball src="/pokeball.png"></Pokeball>
  )
}