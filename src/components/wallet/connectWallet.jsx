import React, {useState} from "react";
import { IoIosWallet } from "react-icons/io";
import {Card, ListGroup, Button} from 'react-bootstrap'
import useMetamask from '../../hooks/metamask';

function ConnectWallet(){

    const { connect, disconnect, isActive, account, shouldDisable } = useMetamask()
    const [style, setStyle] = useState({display: 'none'});
    if(isActive){
        return (
            <div
            className="nav-link small"
            onMouseEnter={e => {
                setStyle({display: 'block'});
            }}
            onMouseLeave={e => {
                setStyle({display: 'none'})
            }}>
                <IoIosWallet
                    className="icon"
                    style={{
                        marginRight: "-30px",
                        padding: "7px",
                        backgroundImage: "linear-gradient(130deg, #1b9d8c, #58e7d4)",
                        borderRadius: "100px",
                        position: "relative",
                        zIndex: "1",
                    }}
                    size="46px"
                    color="white"
                />
                <p
                    className="d-inline"
                    style={{
                        padding: "7px 7px 7px 40px",
                        marginRight: "20px",
                        //borderImageSlice: 1,
                        borderImageSource:
                            "linear-gradient(130deg, #1b9d8c, #58e7d4)",
                        border: "1px solid",
                        borderRadius: "20px",
                        position: "relative",
                        zIndex: "0",
                    }}>
                    { account ? account.substring(0, 2) + "..." + account.substring(account.length - 6) : ''}
                </p>
    
                <Card style={style}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><a href="#">Check Etherscan</a></ListGroup.Item>
                        <ListGroup.Item style={{cursor: 'pointer'}} onClick={disconnect}>Disconnect Wallet</ListGroup.Item>
                    </ListGroup>
                </Card>
    
            </div>
        );
    }
    else if(!isActive){
        return(
            <Button variant="success" onClick={connect} disabled={shouldDisable}>Connect Wallet</Button>
        )
    }

  }

export default ConnectWallet;
