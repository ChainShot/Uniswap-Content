// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./IERC20.sol";
import "./IUniswapV2Router02.sol";
import "./IUniswapV2Factory.sol";

contract Staking {
	IERC20 token = IERC20(0x5FbDB2315678afecb367f032d93F642f64180aa3);
	IERC20 weth = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
	IUniswapV2Router02 router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
	IUniswapV2Factory factory = IUniswapV2Factory(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f);

	mapping(address => uint) staked; 

	constructor() {
		factory.createPair(address(token), address(weth));

		uint amountDesiredA = 1000e18;
		uint amountDesiredB = 10e18;

		token.approve(address(router), amountDesiredA);
		weth.approve(address(router), amountDesiredB);

		router.addLiquidity( 
			address(token),
			address(weth),
			amountDesiredA,
			amountDesiredB,
			amountDesiredA,
			amountDesiredB,
			address(this),
			block.timestamp
		);
	}

	// function stake() {
	// 	require(staked[msg.sender] == 0);

	// 	token.transferFrom(msg.sender, )

	// 	staked[msg.sender] = block.timestamp;
	// }

	// function unstake() {
	// 	require(staked[msg.sender] != 0);

	// 	staked[msg.sender] = 0;
	// }
}
