const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

const leaves = ["0x0A68c77b6c71c54cD12366a34f3ee74927f13586",
                    "0x7085E7D475E9b3f3f9C3250d5ca46c87ecE1C5c9",
                   "0x2398005B4552386059E631594aEca3A61fa12F14",
                    "0x2398005B4552386059E631594aEca3A61fa12F14",
                    "0x2398005B4552386059E631594aEca3A61fa12F14"
                ].map(x => SHA256(x))

const tree = new MerkleTree(leaves, SHA256)
const root = tree.getRoot().toString('hex')
const leaf = SHA256('0x0A68c77b6c71c54cD12366a34f3ee74927f13586')
const proof = tree.getProof(leaf)
console.log(tree.verify(proof, leaf, root)) // true


const badLeaves = ["0x0A68c68b6c71c54cD12366a34f3ee74927f13586",
                    "0x7085E7D475E9b3f3f9C3250d5ca46c87ecE1C5c9",
                   "0x2398005B4552386059E631594aEca3A61fa12F14",
                    "0x2398005B4552386059E631594aEca3A61fa12F14",
                    "0x2398005B4552386059E631594aEca3A61fa12F14"
                ].map(x => SHA256(x))

const badTree = new MerkleTree(badLeaves, SHA256)
const badLeaf = SHA256('0x0A68c68b6c71c54cD12366a34f3ee74927f13586')
const badProof = badTree.getProof(badLeaf)
console.log(badTree.verify(badProof, badLeaf, root))