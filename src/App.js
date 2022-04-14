import logo from './logo.svg';
import './App.css';
import Grid from "./components/Grid"
import ConnectWallet from "./components/wallet/connectWallet"
import {Button, Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import useMetamask from './hooks/metamask';
import { init, getPixels } from './hooks/web3Client';

function App() {

  //getPixels();
  //setInterval(getPixels, 10000);

  const { connect, disconnect, isActive, account, shouldDisable } = useMetamask()

  return (
    <div className="App pb-5" style={{backgroundColor: "#464c65"}}>
      <Navbar variant="dark" style={{backgroundColor: "#464c65"}}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="safepix.png"
              height="32"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Documentation</Nav.Link>
            </Nav>
            <Nav>
              <ConnectWallet/> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Grid />
    </div>
  );
}

export default App;
