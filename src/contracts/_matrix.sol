//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract Matrix {
    uint8 private constant SIZE = 10; 
    uint8[SIZE][SIZE] private matrix;
 
    constructor(uint8 initNumber) {
        for(uint8 i = 0; i < SIZE; i++){
            for(uint8 j = 0; j < SIZE; j++){
                matrix[i][j] = initNumber;
            }
        }
    }
 
    function getMatrix() external view returns(uint8[SIZE][SIZE] memory){
        return matrix;
    }
 
    function setMatrixNumber(uint8 x, uint8 y, uint8 newData) external {
        require(x < SIZE && y < SIZE, "MATRIX: Out of bounds");
        matrix[x][y] = newData;
    }
}
