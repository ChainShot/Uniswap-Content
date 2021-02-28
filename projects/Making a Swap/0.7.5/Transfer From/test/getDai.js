const depositorAddr = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503";
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

async function getDai(amount, accts) {
    const dai = await ethers.getContractAt("IERC20", daiAddress);
    const signer = await ethers.provider.getSigner(accts[0]);
    await signer.sendTransaction({ to: depositorAddr, value: ethers.utils.parseEther("1") });
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [depositorAddr]
    });
    depositorSigner = await ethers.provider.getSigner(depositorAddr);

    for (let i = 0; i < accts.length; i++) {
        await dai.connect(depositorSigner).transfer(accts[i], amount);
    }
}

module.exports = getDai;