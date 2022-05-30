import { GetBlockArgv, GetTransactionArgv } from '../types';

export interface IChainProvider {
  // query block info by number or hash
  getBlock: (argv: GetBlockArgv) => Promise<any>;

  // query transaction by hash
  getTransaction: (argv: GetTransactionArgv) => Promise<any>;
}
