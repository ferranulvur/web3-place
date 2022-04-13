import logo from './logo.svg';
import './App.css';
import Grid from "./components/Grid"
import {Button} from 'react-bootstrap'
import useMetamask from './hooks/metamask';


function App() {

  const { connect, disconnect, isActive, account, shouldDisable } = useMetamask()


  return (
    <div className="App">
      <header className="App-header">
        <Button variant="success" onClick={connect} disabled={shouldDisable}>
          Connect Wallet
        </Button>
        <div className="mt-2 mb-2"> Connected Account: { isActive ? account : '' }</div>
        <Button variant="danger" onClick={disconnect}>
          Disconnect Wallet
        </Button>
      </header> 
      <Grid />
    </div>
  );
}

export default App;
