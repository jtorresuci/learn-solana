import "dotenv/config";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';

export function getKeypairFromEnvironment(envVar: string): Keypair {
    const secretKey = process.env[envVar];
    if (!secretKey) {
      throw new Error(`Environment variable ${envVar} not found`);
    }
    const secretKeyUint8Array = bs58.decode(secretKey);
    return Keypair.fromSecretKey(secretKeyUint8Array);
  }


