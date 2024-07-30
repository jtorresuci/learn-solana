import "dotenv/config";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';

function getKeypairFromEnvironment(envVar) {
  const secretKey = process.env[envVar];
  if (!secretKey) {
    throw new Error(`Environment variable ${envVar} not found`);
  }
  const secretKeyUint8Array = bs58.decode(secretKey);
  return Keypair.fromSecretKey(secretKeyUint8Array);
}

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);
