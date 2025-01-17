// Client
import { Keypair } from '@solana/web3.js';

console.log("My address:", pg.wallet.publicKey.toString());
const balance = await pg.connection.getBalance(pg.wallet.publicKey);
console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

const addressInfoAccount = Keypair.generate()
const addressInfo = {
  name: "mdlabs",
  houseNumber: 40,
  street: 'mdlabs-street',
  city: 'my city'
}

await pg.program.methods.createAdddressInfo(
  addressInfo.name,
  addressInfo.houseNumber,
  addressInfo.street,
  addressInfo.city
).accounts({
  payer: pg.wallet.publicKey,
  addressInfo: addressInfoAccount.publicKey,
}).
signers([addressInfoAccount])
.rpc()

const myInfo = await pg.program.account.addressInfo.fetch(addressInfoAccount.publicKey)
console.log(JSON.stringify(myInfo))

const accounts = await pg.program.account.addressInfo.all()

accounts.forEach((acc) => {
  // console.log(acc.publicKey.toString());
  // console.log(acc.account.name)
});

const specificAccount = '5pEz3sExMP6Tt2YAiLui2mFpwfELBE4bzr6cA1kWL8Fk'
const specificData = await pg.program.account.addressInfo.fetch(specificAccount)
console.log('specific data', JSON.stringify(specificData))

