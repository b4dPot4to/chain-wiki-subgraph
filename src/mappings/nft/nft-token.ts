import { log } from '@graphprotocol/graph-ts'
import {
  Minted,
  TokenKyaUpdated,
  TokenSlugUpdated,
} from '../../types/templates/NFT/SX1155NFT'
import { Token } from '../../wrappers/nft-token'

export function handleCreateToken(event: Minted): void {
  const nftAddress = event.address
  const tokenId = event.params.tokenId
  const slug = event.params.slug

  const token = new Token(nftAddress, tokenId)

  token.setUriJson(event.params.uri, event)

  token.slug = slug
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

export function handleUpdateTokenSlug(event: TokenSlugUpdated): void {
  const nftAddress = event.address
  const tokenId = event.params.slugId
  const slug = event.params.slug

  const token = Token.safeLoad(nftAddress, tokenId)
  if (token === null) {
    return
  }

  log.warning('UPDATE SLUG end: {}', [slug.toString()])

  token.slug = slug.toString()

  token.save()
}
