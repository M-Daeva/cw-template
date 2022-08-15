import { getData, SigningCosmWasmClient } from "./signer";
const { ADDR, CONTR, getAliceClient } = getData(true);

const l = console.log.bind(console);

async function main() {
  const aliceClient = (await getAliceClient(true)) as SigningCosmWasmClient;
  const gas = {
    amount: [{ denom: "ujunox", amount: "625" }],
    gas: "250000",
  };

  let res = await aliceClient.queryContractSmart(CONTR.ADDR, {
    get_count: {},
  });
  l("\n", res, "\n");

  res = await aliceClient.execute(
    ADDR.ALICE,
    CONTR.ADDR,
    { increment: {} },
    gas
  );
  l({ attributes: res.logs[0].events[2].attributes }, "\n");

  res = await aliceClient.queryContractSmart(CONTR.ADDR, {
    get_count: {},
  });
  l(res, "\n");

  res = await aliceClient.execute(
    ADDR.ALICE,
    CONTR.ADDR,
    { set: { count: 50 } },
    gas
  );
  l({ attributes: res.logs[0].events[2].attributes }, "\n");

  res = await aliceClient.queryContractSmart(CONTR.ADDR, {
    get_count: {},
  });
  l(res, "\n");
}

main();
