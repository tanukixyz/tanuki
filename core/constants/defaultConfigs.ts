import { EnvConfig } from '../types';
import { AnkrPublicNodes } from './ankrPublicNodes';

export const DefaultEnvConfig: EnvConfig = {
  chains: {
    ethereum: {
      chain: {
        name: 'ethereum',
        network: 'mainnet',
      },
      nodeRpc: AnkrPublicNodes.ethereum,
    },
    avalanche: {
      chain: {
        name: 'avalanche',
        network: 'mainnet',
      },
      nodeRpc: AnkrPublicNodes.avalanche,
    },
    polygon: {
      chain: {
        name: 'polygon',
        network: 'mainnet',
      },
      nodeRpc: AnkrPublicNodes.polygon,
    },
    fantom: {
      chain: {
        name: 'fantom',
        network: 'mainnet',
      },
      nodeRpc: AnkrPublicNodes.fantom,
    },
    bsc: {
      chain: {
        name: 'bsc',
        network: 'mainnet',
      },
      nodeRpc: AnkrPublicNodes.bsc,
    },
  },
};
