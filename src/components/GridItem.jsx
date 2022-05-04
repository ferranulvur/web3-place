import React from "react";
import { CompactPicker } from "react-color";
import { STORAGE_URL } from "../Constants";
import "./GridItem.css";

import Web3 from 'web3';
import MatrixABI from 'truffle-build/Matrix.json';

let matrixContract;
let isInitialized = false;

const colors = [
  "#ffffff","#4d4d4d","#999999","#f44e3b","#fe9200","#fcdc00","#dbdf00","#a4dd00","#68ccca","#73d8ff","#aea1ff","#fda1ff",
  "#333333","#808080","#cccccc","#d33115","#e27300","#fcc400","#b0bc00","#68bc00","#16a5a5","#009ce0","#7b64ff","#fa28ff",
  "#000000","#666666","#b3b3b3","#9f0500","#c45100","#fb9e00","#808900","#194d33","#0c797d","#0062b1","#653294","#ab149e"
]

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
      color: colors[props.color],
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
    console.log(color);
    console.log(colors);

    if(!isInitialized){
      init().then(matrixContract => {
        matrixContract.methods
          .setMatrixNumber(rowIndex, columnIndex, colors.indexOf(color))
          .send({from: "0xAC01c136cb9853769EF919c0EcfCB8fe07cA8f09"})
      })
    } else{
        matrixContract.methods
          .setMatrixNumber(rowIndex, columnIndex, colors.indexOf(color))
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
