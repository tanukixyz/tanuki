export interface ChainIdentity {
  name: string;
  network: string;
}

export interface ChainConfig {
  chain: ChainIdentity;
  nodeRpc: string;
}

export interface EnvConfig {
  chains: { [key: string]: ChainConfig };
}

export interface YargsCommand {
  name: string;
  describe: string;
  setOptions: (yargs: any) => void;
  execute: (argv: any) => void;
}

export interface GetBlockArgv {
  number: number | string;
  hash: string;
}

export interface GetEvmBlockArgv extends GetBlockArgv {
  includeTransactionsObject?: boolean;
}

export interface GetTransactionArgv {
  hash: string;
  includeReceipt?: boolean;
}
