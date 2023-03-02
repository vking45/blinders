import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Blinders } from "../target/types/blinders";
import * as web3 from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";

describe("blinders", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env();

  const w1 = new Uint8Array([228,63,7,177,32,77,239,178,123,69,95,171,182,2,30,188,51,43,177,238,75,208,186,131,147,73,57,95,202,15,158,87,165,38,92,211,186,106,53,178,1,112,53,129,229,50,47,21,121,232,121,179,69,89,34,25,190,38,136,175,153,237,255,140]);
  let sign = web3.Keypair.fromSecretKey(w1);

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

    const bet_one_program = anchor.web3.Keypair.generate();

    const creator_acc = await getOrCreateAssociatedTokenAccount(provider.connection,sign,t1key,sign.publicKey);
try{
    const betCreateTxFail = await program.methods.createBet(new anchor.BN(2), { one : {}})
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
    console.log("Bet Creation Failed", betCreateTxFail);
  } catch(error) {
    console.log(error);
  }
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
    console.log("Bets can placed now!", openBetsTx);

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
    console.log("Bet Creation Failed", betCreateTx);
  } catch (error){
    console.log(error);
  }
  
  });
});
