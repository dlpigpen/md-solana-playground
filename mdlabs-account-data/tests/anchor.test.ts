// No imports needed: web3, anchor, pg and more are globally available

describe("Test", () => {
  it("initialize", async () => {
    // Generate keypair for the new account
    const newAccountKp = new web3.Keypair();

    // Send transaction
    const data = new BN(42);
    const txHash = await pg.program.methods
      .createAdddressInfo(
        "mdlabs",
        50,
        "street",
        "city"
      )
      .accounts({
        payer: pg.wallet.publicKey,
        addressInfo: newAccountKp.publicKey,
      })
      .signers([newAccountKp])
      .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    // Confirm transaction
    await pg.connection.confirmTransaction(txHash);

    // Fetch the created account
    const newAccount = await pg.program.account.addressInfo.fetch(
      newAccountKp.publicKey
    );

    console.log("On-chain data is:", newAccount.name.toString());

    
  });
});
