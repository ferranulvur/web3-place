import React from "react";
import { CompactPicker } from "react-color";
import { STORAGE_URL } from "../Constants";
import "./GridItem.css";

import Web3 from 'web3';
import MatrixABI from 'truffle-build/Matrix.json';

let matrixContract;
let isInitialized = false;

const init = async()=>{
  let provider = window.ethereum;
  const web3 = new Web3(provider)
  const networkId = await web3.eth.net.getId();

  matrixContract = new web3.eth.Contract(
      MatrixABI.abi, 
      MatrixABI.networks[networkId].address
  );

  isInitialized = true;
  return matrixContract

}

class GridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      displayColorPicker: false,
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  onColorChange = ({ hex }) => {
    this.setState({ color: hex });
  };

  onColorPickerClose = () => {
    const { rowIndex, columnIndex } = this.props;
    const color = this.state.color;

    if(!isInitialized){
      init().then(matrixContract => {
        matrixContract.methods
          .setMatrixNumber(rowIndex, columnIndex, color)
          .send({from: "0xAC01c136cb9853769EF919c0EcfCB8fe07cA8f09"})
      })
    } else{
        matrixContract.methods
          .setMatrixNumber(rowIndex, columnIndex, color)
          .send({from: "0xAC01c136cb9853769EF919c0EcfCB8fe07cA8f09"})
    }

    console.log(JSON.stringify({ rowIndex, columnIndex, color }))

  };

  render() {
    return (
      <div className="GridItem" onClick={this.handleClick} style={{ backgroundColor: this.state.color }}>
        {this.state.displayColorPicker ? (
          <div className="GridItemPopover">
            <div className="GridItemCover" onClick={this.handleClose} />
            <CompactPicker
              color={this.state.color}
              onChange={this.onColorChange}
              onChangeComplete={this.onColorPickerClose}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default GridItem;
