import Web3 from 'web3';
import MatrixABI from 'truffle-build/Matrix.json';

let matrixContract;
let isInitialized = false;
 
export const init = async()=>{
    let provider = window.ethereum;
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId();

    matrixContract = new web3.eth.Contract(
        MatrixABI.abi, 
        MatrixABI.networks[networkId].address
    );

    isInitialized = true;

}

export const getPixels = async () => {
    if(!isInitialized){
        await init()
    }
    matrixContract.methods
    .getMatrix()
    .call()
    .then(response => {
        return response;
    })
}