/**
 * @var crypto Variavel Global com os metodos de criptografia.
 */
import { SHA256 } from './node_modules/crypto-js';
import chain from './chain.js';
/**
 * @module generateHash geração de hash criptografado
 */
export function generateHash({index, prevHash, timestamp, data}) {
  return SHA256(data + index + prevHash + timestamp).toString();;
}

export function create(data) {
  const lastBlock = chain.last();
  
  const newblock = {
    index : lastBlock.index + 1,
    prevHash : lastBlock.hash,
    timestamp : new Date().getTime(),
    data : data,
  }
  newblock.hash = this.generateHash(newblock);
  return newblock;
}

export function validateBlock(newBlock, lastBlock = chain.last()) {
  let blockIsValid = false;

  if (newBlock.index == lastBlock.index+1) {
    blockIsValid = true;
  } else if (newBlock.prevHash == lastBlock.hash) {
    blockIsValid = true;
  } else if (newBlock.hash == this.generateHash(newBlock)) {
    blockIsValid = true
  }

  return blockIsValid;
}