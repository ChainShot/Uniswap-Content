const { assert } = require("chai");
const getDai = require('./getDai');
describe('Contract', function () {
    const depositAmount = ethers.utils.parseEther("50");
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    let contract;
    let dai, weth;
    before(async () => {
        dai = await ethers.getContractAt("IERC20", daiAddress);
        weth = await ethers.getContractAt("IERC20", wethAddress);

        await getDai(depositAmount, [await ethers.provider.getSigner(0).getAddress()]);

        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    describe('depositing', () => {
        before(async () => {
            await dai.approve(contract.address, depositAmount);
            await contract.deposit();
        });

        it('should be successful', async () => {
            const balance = await dai.balanceOf(contract.address);
            assert.equal(balance.toString(), depositAmount.toString());
        });

        describe('converting from dai', () => {
            before(async () => {
                await contract.fromDai(wethAddress, depositAmount);
            });

            it('should be successful', async () => {
                const balance = await dai.balanceOf(contract.address);
                assert.equal(balance.toString(), "0");
            });

            it('should have a balance of weth', async () => {
                const balance = await weth.balanceOf(contract.address);
                assert(balance.gt("0"));
            });

            describe('converting back to dai', () => {
                let expected;
                before(async () => {
                    const balance = await weth.balanceOf(contract.address);

                    const router = await ethers.getContractAt("IUniswapV2Router02", routerAddress);
                    [, expected] = await router.getAmountsOut(balance, [wethAddress, daiAddress]);

                    await contract.toDai(wethAddress, balance);
                });
                
                it('should be successful', async () => {
                    const balance = await dai.balanceOf(contract.address);
                    assert.equal(balance.toString(), expected.toString());
                });

                it('should have zero weth', async () => {
                    const balance = await weth.balanceOf(contract.address);
                    assert(balance.eq("0"));
                });
            });
        });
    });
});
