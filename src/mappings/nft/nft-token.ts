import { TokenKyaUpdated, Minted } from '../../types/templates/NFT/SX1155NFT'
import { Token } from '../../wrappers/nft-token'

export function handleCreateToken(event: Minted): void {
  const nftAddress = event.address
  const tokenId = event.params.tokenId

  const token = new Token(nftAddress, tokenId)

  token.setUriJson(event.params.uri, event)

  token.updatedAt = event.block.timestamp
  token.createdAt = event.block.timestamp
  token.nft = nftAddress.toHexString()

  token.save()
}

export function handleUpdateTokenUri(event: TokenKyaUpdated): void {
  const nftAddress = event.address
  const tokenId = event.params.id

  const token = Token.safeLoad(nftAddress, tokenId)

  if (token === null) {
    return
  }

  token.setUriJson(event.params.kya, event, true)

  token.updatedAt = event.block.timestamp

  token.save()
}
