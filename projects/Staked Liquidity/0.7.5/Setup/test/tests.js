const { assert } = require("chai");
const getWeth = require("./getWeth");
describe('Contract', function () {
    const supply = ethers.utils.parseEther("5000");
    const tokenDepositAmount = ethers.utils.parseEther("1000");
    const wethDepositAmount = ethers.utils.parseEther("10");
    const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

    let staking, token, weth, factory;
    before(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy(supply);
        await token.deployed();

        await getWeth(wethDepositAmount, [await ethers.provider.getSigner(0).getAddress()]);
        weth = await ethers.getContractAt("IERC20", wethAddress);

        // TODO: precompute the staking contract address instead of hardcoding (brittle!)
        const stakingAddr = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
        await weth.transfer(stakingAddr, wethDepositAmount);
        await token.transfer(stakingAddr, tokenDepositAmount);

        const Staking = await ethers.getContractFactory("Staking");
        staking = await Staking.deploy();
        await staking.deployed();

        factory = await ethers.getContractAt("IUniswapV2Factory", factoryAddress);
    });

    it('should have created a pair', async () => {
        const pairAddr = await factory.getPair(token.address, wethAddress);
        const pair = await ethers.getContractAt("IUniswapV2Pair", pairAddr);

        const { reserve0, reserve1 } = await pair.getReserves();

        assert.equal(reserve0.toString(), tokenDepositAmount);
        assert.equal(reserve1.toString(), wethDepositAmount);

        const amountA = ethers.utils.parseEther("1");
        const price = amountA.mul(reserve1).div(reserve0);

        console.log( ethers.utils.formatEther(price) );

        // console.log(reserves.reserve0.toString());
        // console.log(reserves.reserve1.toString());
        
        // const name = await contract.getName();
        // assert.equal(name, "Dai Stablecoin");
    });
});
