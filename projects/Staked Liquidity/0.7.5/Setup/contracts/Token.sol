// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./ERC20.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gold", "GLD") {
        _mint(msg.sender, initialSupply);
    }
}