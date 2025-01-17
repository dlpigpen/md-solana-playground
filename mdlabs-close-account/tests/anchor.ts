import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from '@solana/web3.js';
import type { Instructions } from "../target/types/instructions";

describe("Test", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Instructions as anchor.Program<Instructions>;

  it("create user", async () => {
    // Generate keypair for the new account
    const payer = provider.wallet as anchor.Wallet;

    const [userAccountAddress] = PublicKey.findProgramAddressSync([Buffer.from('USER'), payer.publicKey.toBuffer()], program.programId)
    console.log('PDA userAccountAddress', userAccountAddress.toString())

    // Send transaction
    const txHash = await program.methods
      .createUser('Duc')
      .accounts({
        user: payer.publicKey,
        userAccount: userAccountAddress,
      })
      .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    const userAccount = await program.account.userState.fetch(userAccountAddress)
    console.log("Username", userAccount.name)
    console.log("User", userAccount.user)
  });
});
