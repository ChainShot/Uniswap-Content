const { assert } = require("chai");
const getWeth = require("./getWeth");
describe('Contract', function () {
    const supply = ethers.utils.parseEther("5000");
    const tokenDepositAmount = ethers.utils.parseEther("1000");
    const wethDepositAmount = ethers.utils.parseEther("10");
    const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

    let staking, token, weth;
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
    });

    it('should have created a pair', async () => {
        // const name = await contract.getName();
        // assert.equal(name, "Dai Stablecoin");
    });
});
