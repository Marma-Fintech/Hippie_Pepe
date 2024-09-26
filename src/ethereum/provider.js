const { ethers, run } = require("hardhat");
require("dotenv").config;
const private_key = process.env.PRIVATE_KEY;


// const {}
const Provider ={
  // const provider = new InfuraProvider("sepolia",infura_key);

  // Provider for Sepolia Testnet
  provider : new ethers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/0fba3fdf4179467ba9832ac74d77445c"
  )
  // provoider for Matic testnet
  // const provider = new ethers.JsonRpcProvider(
  //   "https://autumn-falling-firefly.matic-testnet.quiknode.pro/c8e3ff914ff86361fd66c6de0e7aed3c878963fb/"
  // );

  // provoider for Scroll sepolia testnet
  // const provider = new ethers.JsonRpcProvider(
  //   "https://winter-ultra-sheet.scroll-testnet.quiknode.pro/3d92ec6b4d0bd800befb790f751b5b79441575a1/"
  // );
}

export default Provider;
