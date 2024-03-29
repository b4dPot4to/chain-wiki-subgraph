import { Address, ByteArray, Bytes, log } from '@graphprotocol/graph-ts/index'

import { NFT as SchematicNFT } from '../types/schema'
import { NFT as NFTTemplate } from '../types/templates'
import { SX1155NFT as NFTContract } from '../types/templates/NFT/SX1155NFT'
import { push, remove } from '../utils/array'
import { stringToByteArray } from '../utils/stringToByteArray'

const DEFAULT_ADMIN_ROLE_BYTES = Bytes.fromHexString(
  '0x0000000000000000000000000000000000000000000000000000000000000000',
)
const EDITOR_ROLE_BYTES: ByteArray = stringToByteArray('EDITOR_ROLE')

export class NFT extends SchematicNFT {
  constructor(address: Address) {
    super(address.toHex())

    this.uri = ''
    this.admins = []
    this.editors = []

    NFTTemplate.create(address)
  }

  public grantRole(role: Bytes, _account: Address): void {
    const account = Bytes.fromHexString(_account.toHex()) as Bytes

    if (
      role.equals(DEFAULT_ADMIN_ROLE_BYTES) &&
      this.admins.indexOf(account) === -1
    ) {
      this.admins = push<Bytes>(this.admins, account)
    } else if (
      role.equals(EDITOR_ROLE_BYTES) &&
      this.editors.indexOf(account) === -1
    ) {
      this.editors = push<Bytes>(this.editors, account)
    } else {
      log.warning('Unknown role: {} was granted to {}', [
        role.toHex(),
        account.toHex(),
      ])
    }
  }

  public revokeRole(role: Bytes, _account: Address): void {
    const account = Bytes.fromHexString(_account.toHex()) as Bytes

    if (role.equals(DEFAULT_ADMIN_ROLE_BYTES)) {
      this.admins = remove<Bytes>(this.admins, account)
    } else if (role.equals(EDITOR_ROLE_BYTES)) {
      this.editors = remove<Bytes>(this.editors, account)
    } else {
      log.warning('Unknown role: {} was revoked from {}', [
        role.toHex(),
        account.toHex(),
      ])
    }
  }

  static safeLoad(id: string): NFT | null {
    let nft = NFT.load(id)

    if (nft === null) {
      log.warning('NFT not found: {}', [id])
      return null
    }

    return changetype<NFT>(nft)
  }

  static mustLoad(id: string): NFT {
    let nft = NFT.load(id)

    if (nft === null) {
      log.critical('NFT not found: {}', [id])
    }

    return changetype<NFT>(nft)
  }
}
