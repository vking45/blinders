use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount, Token, Transfer, transfer};
use crate::{errors::Errors, state::{Bet, Match, MatchState, BetConditions}};

pub fn accept_bet(ctx : Context<AcceptBet>) -> Result<()> {
    let signer : &Signer = &ctx.accounts.signer;
    let match_inst : &mut Account<Match> = &mut ctx.accounts.match_inst;
    let bet : &mut Account<Bet> = &mut ctx.accounts.bet;
    let token_program = &ctx.accounts.token_program;

    require!(match_inst.match_state == MatchState::Open, Errors::MatchStateError);

    transfer(
        CpiContext::new(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.challenger_acc.to_account_info(),
                to : ctx.accounts.token_acc.to_account_info(),
                authority : signer.to_account_info(),
            },
        ),
        bet.amount
    )?;

    bet.accept_bet(signer.key())?;

    Ok(())
}

pub fn claim_bet(ctx : Context<ClaimBet>, bump : u8) -> Result<()> {
    let match_inst : &mut Account<Match> = &mut ctx.accounts.match_inst;
    let bet : &mut Account<Bet> = &mut ctx.accounts.bet;
    let token_program = &ctx.accounts.token_program;
    let final_bool : bool;

    require!(match_inst.match_state == MatchState::Declared, Errors::MatchStateError);

    if bet.bet_condition == BetConditions::One {
        final_bool = match_inst.c_one;
    } else if bet.bet_condition == BetConditions::Two {
        final_bool = match_inst.c_two;
    } else if bet.bet_condition == BetConditions::Three {
        final_bool = match_inst.c_three;
    } else if bet.bet_condition == BetConditions::Four {
        final_bool = match_inst.c_four;
    } else {
        final_bool = match_inst.c_five;
    }

    if final_bool == true {
        transfer(
            CpiContext::new_with_signer(
                token_program.to_account_info(),
                Transfer{
                    from : ctx.accounts.token_acc.to_account_info(),
                    to : ctx.accounts.creator_acc.to_account_info(),
                    authority : ctx.accounts.token_acc.to_account_info(),
                },
                &[&[
                    &match_inst.to_account_info().key.clone().to_bytes(),
                    &ctx.accounts.mint.to_account_info().key.clone().to_bytes(),
                    &[bump],
                ]]
            ),
            bet.amount * 2
        )?;
    } else {
        transfer(
            CpiContext::new_with_signer(
                token_program.to_account_info(),
                Transfer{
                    from : ctx.accounts.token_acc.to_account_info(),
                    to : ctx.accounts.challenger_acc.to_account_info(),
                    authority : ctx.accounts.token_acc.to_account_info(),
                },
                &[&[
                    &match_inst.to_account_info().key.clone().to_bytes(),
                    &ctx.accounts.mint.to_account_info().key.clone().to_bytes(),
                    &[bump],
                ]]
            ),
            bet.amount * 2
        )?;        
    }

    bet.claim_bet()?;

    Ok(())
}

pub fn withdraw_bet(ctx : Context<WithdrawBet>, bump : u8) -> Result<()> {
    let match_inst : &mut Account<Match> = &mut ctx.accounts.match_inst;
    let bet : &mut Account<Bet> = &mut ctx.accounts.bet;
    let token_program = &ctx.accounts.token_program;

    require!(match_inst.match_state != MatchState::Open, Errors::MatchStateError);

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.token_acc.to_account_info(),
                to : ctx.accounts.creator_acc.to_account_info(),
                authority : ctx.accounts.token_acc.to_account_info(),
            },
            &[&[
                &match_inst.to_account_info().key.clone().to_bytes(),
                &ctx.accounts.mint.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        bet.amount
    )?;

    bet.withdraw_bet()?;    

    Ok(())
}

#[derive(Accounts)]
pub struct AcceptBet<'info> {

    #[account(mut)]
    pub bet : Account<'info, Bet>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(
        address = bet.match_pubkey.key(),
    )]
    pub match_inst : Box<Account<'info, Match>>,

    #[account(mut,
        address = match_inst.mint.key(),
    )]
    pub mint : Account<'info, Mint>,

    #[account(mut, 
        token::mint = mint,
        token::authority = signer,
    )]
    pub challenger_acc : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        address = match_inst.token_acc.key(),
        token::mint = mint,
        token::authority = token_acc,    
    )]
    pub token_acc : Box<Account<'info, TokenAccount>>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimBet<'info> {

    #[account(mut)]
    pub bet : Account<'info, Bet>,

    #[account(mut,
        address = bet.challenger.key(),
    )]
    pub signer : Signer<'info>,

    #[account(
        address = bet.match_pubkey.key(),
    )]
    pub match_inst : Box<Account<'info, Match>>,

    #[account(mut,
        address = match_inst.mint.key(),
    )]
    pub mint : Account<'info, Mint>,

    #[account(mut,
        address = match_inst.token_acc.key(),
        token::mint = mint,
        token::authority = token_acc,
        seeds = [
            &match_inst.to_account_info().key.clone().to_bytes(),
            &mint.to_account_info().key.clone().to_bytes(),
        ],
        bump,    
    )]
    pub token_acc : Box<Account<'info, TokenAccount>>,

    #[account(mut, 
        token::mint = mint,
        token::authority = bet.challenger.key(),
    )]
    pub challenger_acc : Box<Account<'info, TokenAccount>>,

    #[account(mut, 
        token::mint = mint,
        token::authority = bet.creator.key(),
    )]
    pub creator_acc : Box<Account<'info, TokenAccount>>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}

#[derive(Accounts)]
pub struct WithdrawBet<'info> {

    #[account(mut)]
    pub bet : Account<'info, Bet>,

    #[account(mut,
        address = bet.creator.key(),
    )]
    pub signer : Signer<'info>,    

    #[account(
        address = bet.match_pubkey.key(),
    )]
    pub match_inst : Box<Account<'info, Match>>,

    #[account(mut,
        address = match_inst.mint.key(),
    )]
    pub mint : Account<'info, Mint>,

    #[account(mut, 
        token::mint = mint,
        token::authority = bet.creator.key(),
    )]
    pub creator_acc : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        address = match_inst.token_acc.key(),
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
}