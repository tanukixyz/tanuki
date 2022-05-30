import Web3 from 'web3';

import { IChainProvider } from '../core/namespaces/IChainProvider';
import { GetBlockArgv, GetEvmBlockArgv, GetTransactionArgv } from '../core/types';

export class ChainProvider implements IChainProvider {
  _rpc: string;

  constructor(nodeRpc: string) {
    this._rpc = nodeRpc;
  }

  public async getBlock(argv: GetBlockArgv): Promise<any> {}

  public async getTransaction(argv: GetTransactionArgv): Promise<any> {}
}

export class EvmChainProvider extends ChainProvider {
  private _web3: Web3;

  constructor(nodeRpc: string) {
    super(nodeRpc);

    // setup web3 instance
    this._web3 = new Web3(this._rpc);
  }

  public getContractAt(abi: any, address: string): any {
    return new this._web3.eth.Contract(abi, address);
  }

  public async getBlock(argv: GetEvmBlockArgv): Promise<any> {
    return await this._web3.eth.getBlock(
      argv.hash === '' ? argv.number : argv.hash,
      argv.includeTransactionsObject ? argv.includeTransactionsObject : false
    );
  }

  public async getTransaction(argv: GetTransactionArgv): Promise<any> {
    const txData: any = await this._web3.eth.getTransaction(argv.hash);
    if (!argv.includeReceipt) {
      return txData;
    } else {
      const receipt: any = await this._web3.eth.getTransactionReceipt(argv.hash);
      return {
        ...txData,
        receipt,
      };
    }
  }
}
