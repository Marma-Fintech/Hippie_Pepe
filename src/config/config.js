const ABI = require("../ethereum/TheMemeTV.json").abi;
const contractAddress = require("../ethereum/deploy.json").MTVContractAddress;
const config = {
  contract_ABI: ABI,
  contract_Address: contractAddress //_Sepolia
};

module.exports = config;
