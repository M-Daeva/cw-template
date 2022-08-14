import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  ALICE_ADDR,
  ALICE_SEED,
  BOB_ADDR,
  BOB_SEED,
  CONTRACT_ADDRESS,
} from "./chain_data.json";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

async function getSigningClient(
  seed: string,
  isCW: boolean
): Promise<SigningStargateClient | SigningCosmWasmClient> {
  const RPC = "http://localhost:26657/";
  const prefix = "juno";

  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seed, {
    prefix,
  });

  const signingClient = await SigningStargateClient.connectWithSigner(
    RPC,
    signer,
    {
      prefix,
      gasPrice: GasPrice.fromString("0.1ujunox"),
    }
  );

  const cwSigningClient = await SigningCosmWasmClient.connectWithSigner(
    RPC,
    signer
  );

  return isCW ? cwSigningClient : signingClient;
}

async function getAliceClient(isCW: boolean = true) {
  return await getSigningClient(ALICE_SEED, isCW);
}

async function getBobClient(isCW: boolean = true) {
  return await getSigningClient(BOB_SEED, isCW);
}

const aliceAddress = ALICE_ADDR;
const bobAddress = BOB_ADDR;
const contractAddress = CONTRACT_ADDRESS;

export {
  getAliceClient,
  getBobClient,
  aliceAddress,
  bobAddress,
  contractAddress,
  SigningCosmWasmClient,
  SigningStargateClient,
};
