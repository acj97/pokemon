import styled from '@emotion/styled'

const Button = styled.button`
  width: 250px;
  background-color: rgb(219, 80, 74, 0.9);
  border: 1px solid #db504a;
  border-radius: 10px;
  color: white;
  padding: 16px 32px;
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
  
  &:disabled,
  &[disabled]{
    cursor: no-drop;
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`

export default function PrimaryButton({onClick, style, disabled, children}) {
  return (
    <Button 
      css={style}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}