import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Blinders } from "../target/types/blinders";
import * as web3 from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";

describe("blinders", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env();

  const w1 = new Uint8Array([228,63,7,177,32,77,239,178,123,69,95,171,182,2,30,188,51,43,177,238,75,208,186,131,147,73,57,95,202,15,158,87,165,38,92,211,186,106,53,178,1,112,53,129,229,50,47,21,121,232,121,179,69,89,34,25,190,38,136,175,153,237,255,140]);
  let sign = web3.Keypair.fromSecretKey(w1);

  const w2 = new Uint8Array([4,40,71,251,183,122,145,232,227,28,48,7,131,81,30,134,63,39,161,228,15,241,72,225,111,106,81,73,77,49,3,80,220,149,33,105,194,42,218,10,219,224,84,123,44,98,62,241,133,73,115,16,148,129,165,220,43,116,74,66,175,179,250,219]);
  let sign2 = web3.Keypair.fromSecretKey(w2);

  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blinders as Program<Blinders>;

  const match_program = anchor.web3.Keypair.generate();

  it("Basic Tests", async () => {


  const t1key = await createMint(provider.connection, sign, sign.publicKey, null, 6);

  const [mintAcc, mintAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [match_program.publicKey.toBuffer(),
      t1key.toBuffer()
    ],
    program.programId
  );

    const matchCreateTx = await program.methods.createMatch("UEFA Match - 1", "The very first match", "Barcelona", "Real Madrid", "Barcelona wins the match", "Real Madrid keeps a cleansheet", "Ronaldo scores one or more goals", "Messi scores a Hat-Trick", "Match ends in a draw")
    .accounts({
      matchInst : match_program.publicKey,
      signer : sign.publicKey,
      mint : t1key,
      tokenProgram : TOKEN_PROGRAM_ID,
      systemProgram : anchor.web3.SystemProgram.programId,
    })
    .signers([match_program, sign])
    .rpc();
    console.log("Match Created", matchCreateTx);
    console.log();

    const bet_one_program = anchor.web3.Keypair.generate();

    const creator_acc = await getOrCreateAssociatedTokenAccount(provider.connection,sign,t1key,sign.publicKey);
    const challenger_acc = await getOrCreateAssociatedTokenAccount(provider.connection, sign2, t1key, sign2.publicKey);
    await mintTo(provider.connection, sign, t1key, creator_acc.address, sign, 2000);
    await mintTo(provider.connection, sign2, t1key, challenger_acc.address, sign, 2000);

    const openBetsTx = await program.methods.openBets()
    .accounts({
      matchInst : match_program.publicKey,
      signer : sign.publicKey,
      mint : t1key,
      tokenAcc : mintAcc,
      tokenProgram : TOKEN_PROGRAM_ID,
      systemProgram : anchor.web3.SystemProgram.programId,
      rent : anchor.web3.SYSVAR_RENT_PUBKEY,
    })
    .signers([])
    .rpc();
    console.log("Bets can be placed now!", openBetsTx);
    console.log();

try{
    const betCreateTx = await program.methods.createBet(new anchor.BN(2), { one : {}})
    .accounts({
        bet : bet_one_program.publicKey,
        signer : sign.publicKey,
        matchInst : match_program.publicKey,
        creatorAcc : creator_acc.address,
        mint : t1key,
        tokenAcc : mintAcc,
        tokenProgram : TOKEN_PROGRAM_ID,
        systemProgram : anchor.web3.SystemProgram.programId,
    })
    .signers([bet_one_program, sign])
    .rpc();
    console.log("Bet Created", betCreateTx);
    console.log();
  } catch (error){
    console.log(error);
    console.log();
  }

try{
    const acceptBetTx = await program.methods.acceptBet()
    .accounts({
      bet : bet_one_program.publicKey,
      signer : sign2.publicKey,
      matchInst : match_program.publicKey,
      mint : t1key,
      challengerAcc : challenger_acc.address,
      tokenAcc : mintAcc,
      tokenProgram : TOKEN_PROGRAM_ID,
      systemProgram : anchor.web3.SystemProgram.programId,
    })
    .signers([sign2])
    .rpc();
    console.log("Bet Accepted", acceptBetTx);
    console.log();
  } catch(error) {
    console.log(error);
    console.log();
  }

try{
    const closeBetsTx = await program.methods.closeBets()
    .accounts({
      matchInst : match_program.publicKey,
      signer : sign.publicKey,
      systemProgram : anchor.web3.SystemProgram.programId,
    })
    .signers([sign])
    .rpc();
    console.log("Bets Closed", closeBetsTx);
    console.log();   
  } catch(error) {
      console.log(error);
      console.log();
  }

  const bet_two_program = anchor.web3.Keypair.generate()

try{
    const betCreateTxFail = await program.methods.createBet(new anchor.BN(2), { one : {}})
    .accounts({
        bet : bet_two_program.publicKey,
        signer : sign.publicKey,
        matchInst : match_program.publicKey,
        creatorAcc : creator_acc.address,
        mint : t1key,
        tokenAcc : mintAcc,
        tokenProgram : TOKEN_PROGRAM_ID,
        systemProgram : anchor.web3.SystemProgram.programId,
    })
    .signers([bet_two_program, sign])
    .rpc();
    console.log("Bet Creation Failed", betCreateTxFail);
    console.log();
  } catch(error) {
    console.log(error);
    console.log();
  }

try{
    const declareTx = await program.methods.declareResults(true, false, false, true, true)
    .accounts({
      matchInst : match_program.publicKey,
      signer : sign.publicKey,
      systemProgram : anchor.web3.SystemProgram.programId,
    })
    .signers([sign])
    .rpc();
    console.log("Results Declared", declareTx);
    console.log();       
} catch(error) {
    console.log(error);
    console.log();
}

try{
  const redeemBetTx = await program.methods.claimBet(mintAccBump)
  .accounts({
    bet : bet_one_program.publicKey,
    signer : sign2.publicKey,
    matchInst : match_program.publicKey,
    mint : t1key,
    tokenAcc : mintAcc,
    challengerAcc : challenger_acc.address,
    creatorAcc : creator_acc.address,
    tokenProgram : TOKEN_PROGRAM_ID,
    systemProgram : anchor.web3.SystemProgram.programId,
  })
  .signers([sign2])
  .rpc();
  console.log("Claim Successful", redeemBetTx);
  console.log();    
} catch(error) {
  console.log(error);
  console.log();
}

try{
  const redeemBetFailTx = await program.methods.claimBet(mintAccBump)
  .accounts({
    bet : bet_one_program.publicKey,
    signer : sign2.publicKey,
    matchInst : match_program.publicKey,
    mint : t1key,
    tokenAcc : mintAcc,
    challengerAcc : challenger_acc.address,
    creatorAcc : creator_acc.address,
    tokenProgram : TOKEN_PROGRAM_ID,
    systemProgram : anchor.web3.SystemProgram.programId,
  })
  .signers([sign2])
  .rpc();
  console.log("Claim Failed", redeemBetFailTx);
  console.log();    
} catch(error) {
  console.log(error);
  console.log();
}

  });
});
