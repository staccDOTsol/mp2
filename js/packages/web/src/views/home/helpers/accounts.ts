import {Keypair, PublicKey, SystemProgram} from '@solana/web3.js';
import {
  CANDY_MACHINE,
  CANDY_MACHINE_PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from './constants';
import * as anchor from '@project-serum/anchor';
import fs from 'fs';
import BN from "bn.js";
import {createConfigAccount} from "./instructions";

export const createConfig = async function (
  anchorProgram: anchor.Program,
  payerWallet: Keypair,
  configData: {
    maxNumberOfLines: BN;
    symbol: string;
    sellerFeeBasisPoints: number;
    isMutable: boolean;
    maxSupply: BN;
    retainAuthority: boolean;
    creators: {
      address: PublicKey;
      verified: boolean;
      share: number;
    }[];
  },
) {
  const configAccount = Keypair.generate();
  const uuid = configAccount.publicKey.toBase58().slice(0, 6);

  return {
    config: configAccount.publicKey,
    uuid,
    txId: await anchorProgram.rpc.initializeConfig(
      {
        uuid,
        ...configData,
      },
      {
        accounts: {
          config: configAccount.publicKey,
          authority: payerWallet.publicKey,
          payer: payerWallet.publicKey,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [payerWallet, configAccount],
        instructions: [
          await createConfigAccount(
            anchorProgram,
            configData,
            payerWallet.publicKey,
            configAccount.publicKey,
          ),
        ],
      },
    ),
  };
};

export const getTokenWallet = async function (
  wallet: PublicKey,
  mint: PublicKey,
) {
  return (
    await PublicKey.findProgramAddress(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0];
};

export const getCandyMachineAddress = async (
  config: anchor.web3.PublicKey,
  uuid: string,
) => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(CANDY_MACHINE), config.toBuffer(), Buffer.from(uuid)],
    CANDY_MACHINE_PROGRAM_ID,
  );
};

export const getConfig = async (
  authority: anchor.web3.PublicKey,
  uuid: string,
) => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(CANDY_MACHINE), authority.toBuffer(), Buffer.from(uuid)],
    CANDY_MACHINE_PROGRAM_ID,
  );
};

export const getMetadata = async (
  mint: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

export const getMasterEdition = async (
  mint: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('edition'),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

export function loadWalletKey(keypair): Keypair {
  return Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(( "[40, 200,  52,  40, 104, 158,  26, 147, 200, 116, 203,   83,  74,  80, 137, 114, 183,  28, 221, 197, 210,  29,  112,   6, 114, 152,  58,  61, 248, 163, 144, 212,  11,  104,   1,  98, 157, 132,   6,  66,  56, 145,  46,  23,  166, 169, 128,  72,  42, 182, 110, 102, 186, 149,  41,  234,   3,  45,  74, 223, 196,   6, 238, 165]"
).toString())),
  );
}

export async function loadAnchorProgram(walletKeyPair: Keypair, env: string) {
  const solConnection = new anchor.web3.Connection(
    'https://fragrant-bitter-sound.solana-mainnet.quiknode.pro/8a6cee2a1b6d44f3ad57a2fbd3af1be61defc820/',
  );
  const walletWrapper = new anchor.Wallet(walletKeyPair);
  const provider = new anchor.Provider(solConnection, walletWrapper, {
    preflightCommitment: 'recent',
  });
  const idl = await anchor.Program.fetchIdl(CANDY_MACHINE_PROGRAM_ID, provider);

  return new anchor.Program(idl, CANDY_MACHINE_PROGRAM_ID, provider);
}
