const crypto = require('crypto');

const address= [
                    0x0A68c77b6c71c54cD12366a34f3ee74927f13586,
                    0x7085E7D475E9b3f3f9C3250d5ca46c87ecE1C5c9,
                    0x2398005B4552386059E631594aEca3A61fa12F14,
                    0x2398005B4552386059E631594aEca3A61fa12F14,
                    0x2398005B4552386059E631594aEca3A61fa12F14
                ]

function generateMerkleTreeRoot(addresses) {
  if (addresses.length === 0) {
    return null;
  }

  const hashedAddresses = addresses.map(address => crypto.createHash('sha256').update(address).digest('hex'));

  function buildMerkleTree(hashes) {
    if (hashes.length === 1) {
      return hashes[0];
    }

    const nextLevelHashes = [];
    for (let i = 0; i < hashes.length; i += 2) {
      const combinedHash = crypto.createHash('sha256').update(hashes[i] + (hashes[i + 1] || '')).digest('hex');
      nextLevelHashes.push(combinedHash);
    }

    return buildMerkleTree(nextLevelHashes);
  }

  return buildMerkleTree(hashedAddresses);
}

function verifyAddressInMerkleTreeRoot(address, root, addresses) {
  const hashedAddress = crypto.createHash('sha256').update(address).digest('hex');
  const merkleTreeRoot = generateMerkleTreeRoot(addresses);

  return hashedAddress === merkleTreeRoot;
}

const includedAddress = '0x7085E7D475E9b3f3f9C3250d5ca46c87ecE1C5c9';
const isAddressIncluded = verifyAddressInMerkleTreeRoot(includedAddress, generateMerkleTreeRoot(addresses), addresses);

console.log(`Is address included in Merkle Tree root: ${isAddressIncluded}`);