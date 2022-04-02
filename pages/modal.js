export default function Modal({closeModal, show, catchedPokemon, nickname, children}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  
  function submit() {
    let obj = {
      id: catchedPokemon.id,
      nickname: nickname,
      name: catchedPokemon.name,
      image: catchedPokemon.sprites.front_default 
    }

    let arr = typeof window !== 'undefined' && localStorage.getItem('myPokemons') ? JSON.parse(localStorage.getItem('myPokemons')) : []
    arr.push(obj)
    localStorage.setItem('myPokemons', JSON.stringify(arr))
    closeModal()
  }
  return (
    <div className={showHideClassName}>
      <section css={{
        position: 'fixed',
        background: 'white',
        width: '80%',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
        <button type="button" onClick={() => submit()}>
          Save to Bag
        </button>
      </section>
    </div>
  )
}
