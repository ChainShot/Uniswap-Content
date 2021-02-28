// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

contract Contract {
	IUniswapV2Pair pair = IUniswapV2Pair(0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11);
	IUniswapV2ERC20 dai = IUniswapV2ERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);

	function run() public {
		pair.swap(500e18, 0, address(this), "0x");
	}

	function uniswapV2Call(address,uint,uint,bytes calldata) external {
		
	}
}
