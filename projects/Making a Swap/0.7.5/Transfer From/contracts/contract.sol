// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./IERC20.sol";
import "./IUniswapV2Router02.sol";

contract Contract {
	IERC20 dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
	IUniswapV2Router02 router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);

	// accept dai from the user
	function deposit() external {
		dai.transferFrom(msg.sender, address(this), 50e18);
	}

	function fromDai(address tokenAddress, uint amountIn) external { 
		dai.approve(address(router), amountIn);

		address[] memory path = new address[](2);
		path[0] = address(dai);
		path[1] = tokenAddress;
		router.swapExactTokensForTokens(amountIn, 0, path, address(this), block.timestamp);
	}

	function toDai(address tokenAddress, uint amountIn) external {
		IERC20(tokenAddress).approve(address(router), amountIn);

		address[] memory path = new address[](2);
		path[0] = tokenAddress;
		path[1] = address(dai);
		router.swapExactTokensForTokens(amountIn, 0, path, address(this), block.timestamp);
	}
}
