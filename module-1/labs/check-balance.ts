// Reading from the Solana blockchain is a common task when working with Solana. 
// In this lab, you will write a script that reads the balance of a Solana wallet 
// and prints it to the console. You will use the Solana web3.js library to interact 
// with the Solana blockchain.
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey("CtFz4VoUFt7uw6osC7xYP8JSwgGmBkM6ZeZ4BZXwWb7h");

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);