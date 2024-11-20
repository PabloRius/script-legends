import { GameCanvas } from './components/GameCanvas';

function App() {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Script Legends</h1>
      <GameCanvas />
    </div>
  );
}

export default App;
