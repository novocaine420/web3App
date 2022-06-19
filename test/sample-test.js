const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer NFT to someone", async function () {
    const FiredGuys = await ethers.getContractFactory("FiredGuys");
    const firedGuys = await FiredGuys.deploy();
    await firedGuys.deployed();

    const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const metadataURI = 'cid/est.png';

    let balance = await firedGuys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await firedGuys.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05')});

    await newlyMintedToken.wait();

    balance = await firedGuys.balanceOf(recipient);
    expect(balance).to.equal(1);
    expect(await firedGuys.isContentOwned(metadataURI)).to.equal(true);
  });
});
