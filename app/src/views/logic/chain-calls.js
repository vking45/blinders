import * as anchor from "@project-serum/anchor";
import idl from "./idl/blinders.json";
import * as web3 from "@solana/web3.js";
import { burn, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { async } from "@firebase/util";

const w1 = new Uint8Array([228,63,7,177,32,77,239,178,123,69,95,171,182,2,30,188,51,43,177,238,75,208,186,131,147,73,57,95,202,15,158,87,165,38,92,211,186,106,53,178,1,112,53,129,229,50,47,21,121,232,121,179,69,89,34,25,190,38,136,175,153,237,255,140]);
let sign = web3.Keypair.fromSecretKey(w1);

export const getProvider = (wallet) => {

    if(!wallet) {
        return null;
    }
    const network = "https://api.devnet.solana.com";
    const connection = new web3.Connection(network, "processed");

    const provider = new anchor.AnchorProvider(
        connection, wallet, {"preflightCommitment" : "processed"},
    )
    return provider;
}

export const getMatchesOnChain = async (wallet) => {
    const provider = getProvider(wallet);
    if(!provider) {
      throw("Provider is null");
  }
  const temp = JSON.parse(JSON.stringify(idl));
  const program = new anchor.Program(temp, temp.metadata.address, provider);
    const matchAccounts = await program.account.match.all();
  //  for(const i of clusterAccounts){
  //    console.log(i.publicKey.toBase58());
  //+  }
  //  console.log(matchAccounts);
    return matchAccounts;
}

export const getBetsOnChain = async (wallet) => {
    const provider = getProvider(wallet);
    if(!provider) {
      throw("Provider is null");
  }
  const temp = JSON.parse(JSON.stringify(idl));
  const program = new anchor.Program(temp, temp.metadata.address, provider);
    const betAccounts = await program.account.bet.all();
  //  for(const i of clusterAccounts){
  //    console.log(i.publicKey.toBase58());
  //+  }
    return betAccounts;
}   

export const getSpecificMatchOnChain = async (wallet, addr) => {
  const provider = getProvider(wallet);
  if(!provider) {
    throw("Provider is null");
}
const temp = JSON.parse(JSON.stringify(idl));
const program = new anchor.Program(temp, temp.metadata.address, provider);
  const matchAccounts = await program.account.match.fetch(addr);
//  for(const i of clusterAccounts){
//    console.log(i.publicKey.toBase58());
//+  }
  console.log(matchAccounts);
  return matchAccounts;  
}

export const getSpecificBetOnChain = async (wallet, addr) => {
  const provider = getProvider(wallet);
  if(!provider) {
    throw("Provider is null");
}
const temp = JSON.parse(JSON.stringify(idl));
const program = new anchor.Program(temp, temp.metadata.address, provider);
  const matchAccounts = await program.account.bet.fetch(addr);
//  for(const i of clusterAccounts){
//    console.log(i.publicKey.toBase58());
//+  }
  console.log(matchAccounts);
  return matchAccounts;    
}

export const createBet = async (wallet, match, mint, amount, condition) => {
    const provider = getProvider(wallet);
    if(!provider) {
        throw("Provider is null");
    }
    const temp = JSON.parse(JSON.stringify(idl));
    const program = new anchor.Program(temp, temp.metadata.address, provider);

    const bet_program = anchor.web3.Keypair.generate();
    const creator_acc = await getOrCreateAssociatedTokenAccount(provider.connection,sign,mint,provider.wallet.publicKey);

    const [mintAcc, mintAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [match.toBuffer(),
          mint.toBuffer()
        ],
        program.programId
      );

    if(condition == 1){
      condition = { one : {}};
    } else if(condition == 2){
      condition = { two : {}};
    } else if(condition == 3){
      condition = { three : {}};
    } else if(condition == 4){
      condition = { four : {}};
    } else if(condition == 5){
      condition = { five : {}};
    }
    // example condition - { one : {}} //

    try{
        const betCreateTx = await program.methods.createBet(amount, condition)
        .accounts({
            bet : bet_program.publicKey,
            signer : provider.wallet.publicKey,
            matchInst : match,
            creatorAcc : creator_acc.address,
            mint : mint,
            tokenAcc : mintAcc,
            tokenProgram : TOKEN_PROGRAM_ID,
            systemProgram : anchor.web3.SystemProgram.programId,
        })
        .signers([bet_program])
        .rpc();
        console.log("Bet Created", betCreateTx);
        alert("Bet Created");
        console.log();
      } catch (error){
        console.log(error);
        alert(error);
        console.log();
      }    

}

export const acceptBet = async(wallet, match, bet, mint) => {
    const provider = getProvider(wallet);
    if(!provider) {
        throw("Provider is null");
    }
    const temp = JSON.parse(JSON.stringify(idl));
    const program = new anchor.Program(temp, temp.metadata.address, provider);

    const challenger_acc = await getOrCreateAssociatedTokenAccount(provider.connection, sign, mint, provider.wallet.publicKey);

    const [mintAcc, mintAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [match.toBuffer(),
          mint.toBuffer()
        ],
        program.programId
      );

    try{
        const acceptBetTx = await program.methods.acceptBet()
        .accounts({
          bet : bet,
          signer : provider.wallet.publicKey,
          matchInst : match,
          mint : mint,
          challengerAcc : challenger_acc.address,
          tokenAcc : mintAcc,
          tokenProgram : TOKEN_PROGRAM_ID,
          systemProgram : anchor.web3.SystemProgram.programId,
        })
        .signers([])
        .rpc();
        console.log("Bet Accepted", acceptBetTx);
        alert("Bet Accepted");
        console.log();
      } catch(error) {
        console.log(error);
        alert(error);
        console.log();
      }
}

export const claimBet = async(wallet, match, bet, mint, creator, challenger) => {
    const provider = getProvider(wallet);
    if(!provider) {
        throw("Provider is null");
    }
    const temp = JSON.parse(JSON.stringify(idl));
    const program = new anchor.Program(temp, temp.metadata.address, provider);

    const creator_acc = await getOrCreateAssociatedTokenAccount(provider.connection, sign, mint, creator);
    const challenger_acc = await getOrCreateAssociatedTokenAccount(provider.connection, sign, mint, challenger);

    const [mintAcc, mintAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [match.toBuffer(),
          mint.toBuffer()
        ],
        program.programId
      );

    try{
        const redeemBetTx = await program.methods.claimBet(mintAccBump)
        .accounts({
          bet : bet,
          signer : provider.wallet.publicKey,
          matchInst : match,
          mint : mint,
          tokenAcc : mintAcc,
          challengerAcc : challenger_acc.address,
          creatorAcc : creator_acc.address,
          tokenProgram : TOKEN_PROGRAM_ID,
          systemProgram : anchor.web3.SystemProgram.programId,
        })
        .signers([])
        .rpc();
        console.log("Claim Successful", redeemBetTx);
        alert("Claim has been successfully transfered to the winner");
        console.log();    
      } catch(error) {
        console.log(error);
        alert(error);
        console.log();
      }
}

export const withdrawBet = async(wallet, match, bet, mint, creator) => {
  const provider = getProvider(wallet);
  if(!provider) {
      throw("Provider is null");
  }
  const temp = JSON.parse(JSON.stringify(idl));
  const program = new anchor.Program(temp, temp.metadata.address, provider);

  const creator_acc = await getOrCreateAssociatedTokenAccount(provider.connection, sign, mint, creator);

  const [mintAcc, mintAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [match.toBuffer(),
      mint.toBuffer()
    ],
    program.programId
  );

  try{
    const tx = await program.methods.withdrawBet(mintAccBump)
    .accounts({
      bet : bet,
      sign : provider.wallet.publicKey,
      matchInst : match,
      mint : mint,
      creatorAcc : creator_acc.address,
      tokenAcc : mintAcc,
      tokenProgram : TOKEN_PROGRAM_ID,
      systemProgram : anchor.web3.SystemProgram.programId,
    })
    .signers([])
    .rpc();
    console.log("Withdrawn Successfully", tx);
    alert("The Bet Has Been Withdrawn Successfully");
    console.log();       
  } catch(error){
    console.log(error);
    alert(error);
    console.log();
  }
}

export const exchangeToTokens = async (wallet, amount) => {
  const provider = getProvider(wallet);
  if(!provider) {
      throw("Provider is null");
  }

  const transferTransaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: provider.wallet.publicKey,
      toPubkey: sign.publicKey,
      lamports: 100000 * amount,
    })
  );
  
  let blockhash = (await provider.connection.getLatestBlockhash('finalized')).blockhash;
  transferTransaction.recentBlockhash = blockhash;
  transferTransaction.feePayer = provider.wallet.publicKey;

  const buyerToken = await getOrCreateAssociatedTokenAccount(provider.connection, sign, new anchor.web3.PublicKey("4ke5umoZLkRByReUXZFSUeYtD6y6WQze6cbwH9nEPefE"), provider.wallet.publicKey);
 try{
  await provider.wallet.signTransaction(transferTransaction);
  await mintTo(provider.connection, sign, new anchor.web3.PublicKey("4ke5umoZLkRByReUXZFSUeYtD6y6WQze6cbwH9nEPefE"), buyerToken.address, sign.publicKey, amount * 10**6);
  alert("Done, Exchanged!");
} catch(error){
  console.log(error);
  alert(error);
 }
}

export const tokenBalance = async(wallet) => {
  const provider = getProvider(wallet);
  if(!provider) {
      throw("Provider is null");
  }  

  const Tokens = await getOrCreateAssociatedTokenAccount(provider.connection, sign, new anchor.web3.PublicKey("4ke5umoZLkRByReUXZFSUeYtD6y6WQze6cbwH9nEPefE"), provider.wallet.publicKey);
  return Tokens.amount.toString();
}

export const SOLBalance = async(wallet) => {
  const provider = getProvider(wallet);
  if(!provider) {
      throw("Provider is null");
  }  
  const b = await provider.connection.getBalance(provider.wallet.publicKey);
  return b;
}

export const withdrawSOL = async(wallet, amount) => {
  const provider = getProvider(wallet);
  if(!provider) {
      throw("Provider is null");
  }
  const transferTransaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: sign.publicKey,
      toPubkey: provider.wallet.publicKey,
      lamports: 100000 * amount,
    })
  );

  const network = "https://api.devnet.solana.com";
  const connection = new web3.Connection(network);  

  const sellerToken = await getOrCreateAssociatedTokenAccount(provider.connection, sign, new anchor.web3.PublicKey("4ke5umoZLkRByReUXZFSUeYtD6y6WQze6cbwH9nEPefE"), provider.wallet.publicKey);

  let blockhash = (await provider.connection.getLatestBlockhash('finalized')).blockhash;
  transferTransaction.recentBlockhash = blockhash;
  transferTransaction.feePayer = sign.publicKey;

  try{
    const { signature } = await window.solana.signAndSendTransaction(transferTransaction);
    await connection.confirmTransaction(signature);
    await burn(provider.connection, provider.wallet, sellerToken.address, new anchor.web3.PublicKey("4ke5umoZLkRByReUXZFSUeYtD6y6WQze6cbwH9nEPefE"), provider.wallet.publicKey, amount * 10**6);
    alert("Done, Withdrawn!");
  } catch(error){
    console.log(error);
    alert(error);
   }  
}