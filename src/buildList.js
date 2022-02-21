const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");
const bmc = require("./tokens/bmc.json");
const bmc_testnet = require("./tokens/bmc_testnet.json");

module.exports = function buildList() {
  const parsed = version.split(".");
  return {
    name: "Uniswap Labs List",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "https://cdn.blockmeta.com/resources/logo/bmc/btm.png",
    keywords: ["bmc", "default"],
    tokens: [...mainnet, ...bmc, ...bmc_testnet]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
};
