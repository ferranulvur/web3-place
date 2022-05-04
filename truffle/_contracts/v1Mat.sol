//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract Matrix {
    uint8 private constant SIZE = 20; 
    string[SIZE][SIZE] private matrix;
    // mapping(uint256 => uint256) public colours;
    // mapping(bytes32 => bytes32) public colours;
 
    constructor() {
        for(uint8 i = 0; i < SIZE; i++){
            for(uint8 j = 0; j < SIZE; j++){
                matrix[i][j] = "#ffffff";
            }
        }
    }
 
    function getMatrix() external view returns(string[SIZE][SIZE] memory){
        return matrix;
    }
 
    function setMatrixNumber(uint8 x, uint8 y, string memory newValue) external {
        require(x <= SIZE && y >= 0, "MATRIX: Out of bounds");
        require(x <= SIZE && x >= 0, "MATRIX: Out of bounds");
        matrix[x][y] = newValue;
    }
}
