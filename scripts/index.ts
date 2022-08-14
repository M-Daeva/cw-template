import {
  aliceAddress,
  bobAddress,
  getAliceClient,
  getBobClient,
  contractAddress,
  SigningCosmWasmClient,
  SigningStargateClient,
} from "./signer";

const l = console.log.bind(console);

async function main() {
  const aliceClient = (await getAliceClient()) as SigningCosmWasmClient;
  const gas = {
    amount: [{ denom: "ujunox", amount: "625" }],
    gas: "250000",
  };

  let res = await aliceClient.queryContractSmart(contractAddress, {
    get_count: {},
  });
  l("\n", res, "\n");

  res = await aliceClient.execute(
    aliceAddress,
    contractAddress,
    { increment: {} },
    gas
  );
  l({ attributes: res.logs[0].events[2].attributes }, "\n");

  res = await aliceClient.queryContractSmart(contractAddress, {
    get_count: {},
  });
  l(res, "\n");

  res = await aliceClient.execute(
    aliceAddress,
    contractAddress,
    { set: { count: 50 } },
    gas
  );
  l({ attributes: res.logs[0].events[2].attributes }, "\n");

  res = await aliceClient.queryContractSmart(contractAddress, {
    get_count: {},
  });
  l(res, "\n");
}

main();
