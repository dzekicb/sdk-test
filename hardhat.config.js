require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");

const tdly = require("@tenderly/hardhat-tenderly");
tdly.setup();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000,
      },
    },
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: '',
      accounts: [''],
    }
  },
};
