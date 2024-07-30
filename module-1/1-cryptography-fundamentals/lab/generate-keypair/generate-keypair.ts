import "dotenv/config";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";


import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
console.log(`✅ Finished!`);

// Define the helper function if not provided by the library
function getKeypairFromEnvironment(envVar) {
  const secretKey = process.env[envVar];
  if (!secretKey) {
    throw new Error(`Environment variable ${envVar} not found`);
  }
  const secretKeyUint8Array = bs58.decode(secretKey);
  return Keypair.fromSecretKey(secretKeyUint8Array);
}

// Load keypair from environment variable
try {
  const keypair = getKeypairFromEnvironment("SECRET_KEY");
  console.log(`The public key is: ${keypair.publicKey.toBase58()}`);
  console.log(`The secret key is successfully loaded from the environment variable.`);
  console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
} catch (error) {
  console.error(`Failed to load keypair: ${error.message}`);
}
