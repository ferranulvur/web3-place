import React, { Component } from "react";
import GridItem from "./GridItem";
import "./Grid.css";

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

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: null,
    };
  }

  componentDidMount() {

    if(!isInitialized){
      init()
    }

/*     fetch(STORAGE_URL)
      .then(response => response.json())
      .then(resp => console.log(resp.drawing))
      .then(jsonResponse => this.setState({ drawing: jsonResponse.drawing })); */

    init().then(matrixContract => {
      matrixContract.methods
        .getMatrix()
        .call()
        .then(response =>{
          this.setState({ drawing: response })
          console.log(response)
        })
    })
  }

  render() {
    if (!this.state.drawing) {
      return <div>"Loading..."</div>;
    }
    // Given a 2d array, render it
    const gridItems = [];
    for (let rowIndex = 0; rowIndex < this.state.drawing.length; rowIndex++) {
      gridItems[rowIndex] = [];
      for (let columnIndex = 0; columnIndex < this.state.drawing[rowIndex].length; columnIndex++) {
        gridItems[rowIndex].push(
          <GridItem color={this.state.drawing[rowIndex][columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} />,
        );
      }
    }

    return (
      <div className="artContainer">
        {gridItems.map(rowItem => {
          return <div className="GridRow">{rowItem}</div>;
        })}
      </div>
    );
  }
}
