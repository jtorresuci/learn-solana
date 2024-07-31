// In this lab you will write a script that connects to the Solana blockchain.

import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("mainnet-beta"));
console.log(`✅ Connected!`)