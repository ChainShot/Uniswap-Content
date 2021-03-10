const { assert } = require("chai");
const getDai = require('./getDai');
describe('Contract', function () {
    const depositAmount = ethers.utils.parseEther("50");
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    let contract;
    let dai;
    before(async () => {
        dai = await ethers.getContractAt("IERC20", daiAddress);

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
    });
});
