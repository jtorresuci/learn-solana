import { Keypair, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, TransactionConfirmationStrategy } from "@solana/web3.js";
import bs58 from 'bs58';
import fs from 'fs';

// File path to save and load keypairs
const keypairFilePath = './keypairs.json';

// Function to load keypairs from file
function loadKeypairsFromFile(filePath: string): Array<{ publicKey: string, secretKey: string }> {
  if (fs.existsSync(filePath)) {
    const keypairData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(keypairData);
  }
  return [];
}

// Function to save keypairs to file
function saveKeypairsToFile(filePath: string, keypairs: Array<{ publicKey: string, secretKey: string }>) {
  fs.writeFileSync(filePath, JSON.stringify(keypairs, null, 2));
}

// Generate a new keypair and save to file
const keypair = Keypair.generate();
const newKeypair = {
  publicKey: keypair.publicKey.toBase58(),
  secretKey: bs58.encode(keypair.secretKey)
};

// Load existing keypairs and append the new keypair
const keypairs = loadKeypairsFromFile(keypairFilePath);
keypairs.push(newKeypair);
saveKeypairsToFile(keypairFilePath, keypairs);

console.log(`Generated and saved new keypair to ${keypairFilePath}`);
console.log(`New public key: ${newKeypair.publicKey}`);
console.log(`New secret key: ${newKeypair.secretKey}`);

// Connect to the Solana devnet
const connection = new Connection(clusterApiUrl("devnet"));
console.log(`✅ Connected!`);

// Define the amount of SOL to airdrop
const amountSol = 1; // 1 SOL

// Airdrop SOL
async function airdropSol(connection: Connection, publicKey: PublicKey, amountSol: number) {
  try {
    console.log(`Requesting airdrop of ${amountSol} SOL to ${publicKey.toBase58()}`);
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      amountSol * LAMPORTS_PER_SOL // Convert SOL to lamports
    );

    const confirmationStrategy: TransactionConfirmationStrategy = {
      signature: airdropSignature,
      blockhash: (await connection.getRecentBlockhash()).blockhash,
      lastValidBlockHeight: (await connection.getBlockHeight()) + 5, // Adjust according to your requirements
    };

    await connection.confirmTransaction(confirmationStrategy);
    console.log(`Airdrop successful: ${airdropSignature}`);
  } catch (error) {
    console.error(`Airdrop failed: ${error.message}`);
  }
}

// Execute the airdrop for the latest keypair
(async () => {
  await airdropSol(connection, keypair.publicKey, amountSol);
})();
