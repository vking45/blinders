use anchor_lang::prelude::*;
use crate::{errors::Errors, state::MatchState};
use crate::state::{bet::*, Match};
use anchor_spl::token::{TokenAccount, Token, Mint, Transfer, transfer};

pub fn create_bet(ctx : Context<CreateBet>, amount : u64, condition : BetConditions) -> Result<()> {
    let signer : &Signer = &ctx.accounts.signer;
    let match_inst : &mut Account<Match> = &mut ctx.accounts.match_inst;
    let token_program = &ctx.accounts.token_program;
    let bet : &mut Account<Bet> = &mut ctx.accounts.bet;

    require!(match_inst.match_state == MatchState::Open, Errors::BetCreationError);

    bet.match_pubkey = match_inst.key();
    bet.amount = amount as u64;
    bet.better_one = signer.key();
    bet.bet_condition = condition;
    bet.bet_state = BetState::Created;

    transfer(
        CpiContext::new(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.better_one.to_account_info(),
                to : ctx.accounts.match_token_acc.to_account_info(),
                authority : signer.to_account_info(),
            },
        ),
        amount
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct CreateBet<'info> {

    #[account(init,
        payer = signer,
        space = Bet::LEN,
    )]
    pub bet : Account<'info, Bet>,

    #[account(mut)]
    pub signer : Signer<'info>,

    pub match_inst : Account<'info, Match>,

    #[account(
        mut,
        token::mint = mint,
        token::authority = signer,
    )]
    pub better_one : Box<Account<'info, TokenAccount>>,

    #[account(
        mut, 
        address = match_inst.mint,
    )]
    pub mint : Account<'info, Mint>,

    #[account(
        mut,
        token::mint = mint,
        token::authority = match_inst.token_acc,
    )]
    pub match_token_acc : Box<Account<'info, TokenAccount>>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,

}