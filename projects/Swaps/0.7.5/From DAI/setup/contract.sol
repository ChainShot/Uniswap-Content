// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./IERC20.sol";
import "./IUniswapV2Router02.sol";

contract Contract {
	IERC20 dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
	IUniswapV2Router02 router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);

	// accept dai from each member 
	function deposit() external {
		dai.transferFrom(msg.sender, address(this), 50e18);
	}

	// swap from dai to some erc20 token
	function fromDai(address tokenAddress, uint amountIn) external { 
		
	}

	// swap back to dai
	function toDai(address tokenAddress, uint amountIn) external {
		
	}
}
