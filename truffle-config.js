'use strict';

var HDWalletProvider = require("truffle-hdwallet-provider")

module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 8545,
      gas: 8000000,
      gasPrice: 5e9,
      network_id: '*'
    },

    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.HDWALLET_MNEMONIC,
        process.env.INFURA_PROVIDER_URL,
        0, // we start with address[0]
        8 // notice that we unlock eight: which will be address[0] and address[1]
      ),
      network_id: 4,
      gas: 1000000,
      gasPrice: 10 * 1000000000
    },

    mainnet: {
      provider: () => new HDWalletProvider(
        process.env.HDWALLET_MNEMONIC,
        "https://mainnet.infura.io/v3/1d6cb6d8f137423ab26111c61c0760ef",
        0,
        2
      ),
      network_id: 1,
      gas: 7000000,
      gasPrice: 10 * 1000000000
    }
  },

  compilers: {
    solc: {
      version: "0.5.12",
    }
  },

  solc: {
    optimizer: {
      enabled: false
    }
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'USD',
      gasPrice: 10
    }
  }
};
