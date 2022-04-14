const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKry = "e6880b97b8d74c5e9cfefa38f402f2e4";
const moralisBscTestnetNode =
	"https://speedy-nodes-nyc.moralis.io/a186962252b7832578263caf/bsc/testnet";

const fs = require("fs");
const mnemonic = fs.readFileSync("../.secret").toString().trim();

module.exports = {
	networks: {
		ropsten: {
			provider: new HDWalletProvider(mnemonic,`https://ropsten.infura.io/v3/${infuraKry}`),
			network_id: 3, // Ropsten's id
			gas: 5500000, // Ropsten has a lower block limit than mainnet
			confirmations: 2, // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true,
		},
		development: {
			host: "127.0.0.1", // Localhost (default: none)
			port: 7545, // Standard BSC port (default: none)
			network_id: 5777, // Any network (default: none)
		},
		bscTestnet: {
			provider: () => new HDWalletProvider(mnemonic, moralisBscTestnetNode),
			network_id: 97,
			confirmations: 10,
			timeoutBlocks: 200,
			skipDryRun: true,
		},
		bsc: {
			provider: () =>
				new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
			network_id: 56,
			confirmations: 10,
			timeoutBlocks: 200,
			skipDryRun: true,
		},
	},
	contracts_directory: "contracts",
	contracts_build_directory: "build",

	// Configure your compilers
	compilers: {
		solc: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
			version: "^0.8.0",
		},
	},
};
