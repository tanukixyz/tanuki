import { DefaultEnvConfig } from '../core/constants/defaultConfigs';
import { ChainConfig, ChainIdentity, EnvConfig } from '../core/types';

class EnvProvider {
  private readonly _configPath: string;
  private readonly _configEnv: EnvConfig;
  constructor() {
    this._configPath = '';
    this._configEnv = DefaultEnvConfig;
  }

  public getChainConfig(queryProps: ChainIdentity): ChainConfig {
    const { name } = queryProps;
    if (this._configEnv.chains[name]) {
      return this._configEnv.chains[name];
    } else {
      return this._configEnv.chains['ethereum'];
    }
  }
}

export default EnvProvider;
