use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount, Token};
use solana_program::pubkey::Pubkey;
use crate::{errors::Errors, state::Match};

pub const PLATFORM_ADDRESS : Pubkey = solana_program::pubkey!("C7gCVnr8oxzZ5htuPBKa2UsXsPHwfjRuCPmh8pct4djq");

pub fn open_bets(ctx : Context<OpenBets>) -> Result<()> {
    let match_inst : &mut Account<Match> = &mut ctx.accounts.match_inst;
    let signer : &Signer = &ctx.accounts.signer;
    require_keys_eq!(signer.key(), PLATFORM_ADDRESS, Errors::AuthorityError);
    match_inst.open_bets(ctx.accounts.token_acc.key())?;
    Ok(())
}

pub fn close_bets(ctx : Context<CloseBets>) -> Result<()> {
    let match_inst : &mut Account<Match> = &mut ctx.accounts.match_inst;
    let signer : &Signer = &ctx.accounts.signer;
    require_keys_eq!(signer.key(), PLATFORM_ADDRESS, Errors::AuthorityError);
    match_inst.close_bets()?;    
    Ok(())
}

pub fn declare_results(ctx : Context<DeclareResults>, c_one : bool, c_two : bool, c_three : bool, c_four : bool, c_five : bool) -> Result<()> {
    let match_inst : &mut Account<Match> = &mut ctx.accounts.match_inst;
    let signer : &Signer = &ctx.accounts.signer;
    require_keys_eq!(signer.key(), PLATFORM_ADDRESS, Errors::AuthorityError);    
    match_inst.declare_results(c_one, c_two, c_three, c_four, c_five)?;
    Ok(())
}

#[derive(Accounts)]
pub struct OpenBets<'info> {
    
    #[account(mut)]
    pub match_inst : Box<Account<'info, Match>>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut,
        address = match_inst.mint.key()
    )]
    pub mint : Account<'info, Mint>,

    #[account(init,
        payer = signer,
        token::mint = mint,
        token::authority = token_acc,
        seeds = [
            &match_inst.to_account_info().key.clone().to_bytes(),
            &mint.to_account_info().key.clone().to_bytes(),
        ],
        bump,
    )]
    pub token_acc : Box<Account<'info, TokenAccount>>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,

    pub rent : Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct CloseBets<'info> {

    #[account(mut)]
    pub match_inst : Box<Account<'info, Match>>,

    #[account(mut)]
    pub signer : Signer<'info>,    

    pub system_program : Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeclareResults<'info> {
    #[account(mut)]
    pub match_inst : Box<Account<'info, Match>>,

    #[account(mut)]
    pub signer : Signer<'info>,    

    pub system_program : Program<'info, System>,    
}