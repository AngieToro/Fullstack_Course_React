const App = ( { store } ) => {
  return (
    <div>
      <div>
        <button onClick={ () => 
          store.dispatch( { type: 'GOOD' } )} >
          Good 
        </button>
        <button onClick={ () => 
          store.dispatch( { type: 'NEUTRAL' } )} >
          Neutral 
        </button>
        <button onClick={ () => 
          store.dispatch( { type: 'BAD' } )} >
          Bad 
        </button>
        <button onClick={ () => 
          store.dispatch( { type: 'ZERO' } )} >
          Reset Count 
        </button>
      </div>
      <div>
        <h2>Counts</h2>
        <p>
          Good: { store.getState().good }
        </p>
        <p>
          Neutral { store.getState().bad }
        </p>
        <p>
          Bad: { store.getState().bad }
        </p>
      </div>
    </div>
  )
}

export default App