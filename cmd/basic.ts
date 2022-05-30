import { ChainConfig, YargsCommand } from '../core/types';
import EnvProvider from '../providers/env';

export class BasicCommand implements YargsCommand {
  public readonly name: string = 'command';
  public readonly describe: string = 'Basic command';

  public async execute(argv: any) {}
  public setOptions(yargs: any) {}

  public chainArgv(): any {
    return {
      c: {
        alias: 'chain',
        type: 'string',
        default: 'ethereum',
        describe: 'The blockchain name, ex: ethereum',
      },
      n: {
        alias: 'network',
        type: 'string',
        default: 'mainnet',
        describe: 'The blockchain network, ex: mainnet',
      },
      rpc: {
        type: 'string',
        default: '',
        describe: 'Custom rpc endpoint',
      },
    };
  }

  public getRpcEndpoint(argv: any): string {
    if (argv.rpc !== '') {
      return argv.rpc;
    } else {
      const envConfig = new EnvProvider();
      const chainConfig: ChainConfig = envConfig.getChainConfig({
        name: argv.c,
        network: argv.n,
      });
      return chainConfig.nodeRpc;
    }
  }
}
