const {
  Wallet,
  parseKlay,
  JsonRpcProvider,
  TxType,
} = require("@klaytn/ethers-ext");

async function main() {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const senderWallet = new Wallet(
    "0xc82d6236982eec150c13be403056e4333488cdce2a190e5f03e8155a4840330a",
    provider
  );
  const fermentWallet = new Wallet(
    "0x0b9927c3c26eebe710907e68b177124bd7a0f6adfb32eefb793446466730696b",
    provider
  );

  let tx = {
    type: TxType.FeeDelegatedValueTransfer,
    from: senderWallet.address,
    to: senderWallet.address,
    value: parseKlay("0"),
  };

  tx = await senderWallet.populateTransaction(tx);
  const signedTx = await senderWallet.signTransaction(tx);
  const txHash = await fermentWallet.sendTransactionAsFeePayer(signedTx);
  const receipt = await txHash.wait();
  console.log(receipt);
}

main();
