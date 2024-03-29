import { dataSource } from '@graphprotocol/graph-ts/index'

export class ValueByNetwork<TValue> {
  public mainnet: TValue
  public goerli: TValue
  public matic: TValue
  public mumbai: TValue
}

export function getValueByNetwork<TValue>(
  map: ValueByNetwork<TValue>,
  defaultValue: TValue,
): TValue {
  let network = dataSource.network()
  if (network == 'mainnet') return map.mainnet
  else if (network == 'goerli') return map.goerli
  else if (network == 'matic') return map.matic
  else if (network == 'mumbai') return map.mumbai
  else return defaultValue
}
