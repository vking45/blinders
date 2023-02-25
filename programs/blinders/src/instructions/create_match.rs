use anchor_lang::prelude::*;
use crate::{errors::Errors, state::MatchState};
use crate::state::match_state::Match;
use solana_program::pubkey::Pubkey;
use anchor_spl::token::{Token, Mint};

pub const PLATFORM_ADDRESS : Pubkey = solana_program::pubkey!("C7gCVnr8oxzZ5htuPBKa2UsXsPHwfjRuCPmh8pct4djq");
// add token_mint_address const for the chips 

pub fn create_match(ctx : Context<CreateMatch>, match_title : String, match_info : String, side_a : String, side_b : String, cone : String, ctwo : String, cthree : String, cfour : String, cfive : String) -> Result<()> {
    let match_inst : &mut Account<Match> = &mut ctx.accounts.match_inst;
    let signer : &Signer = &ctx.accounts.signer;
    require_keys_eq!(signer.key(), PLATFORM_ADDRESS, Errors::AuthorityError);

    match_inst.title = match_title;
    match_inst.info = match_info;
    match_inst.side_a = side_a;
    match_inst.side_b = side_b;
    match_inst.mint = ctx.accounts.mint.key();
    match_inst.condition_one = cone;
    match_inst.condition_two = ctwo;
    match_inst.condition_three = cthree;
    match_inst.condition_four = cfour;
    match_inst.condition_five = cfive;
    match_inst.match_state = MatchState::Created;

    Ok(())
}

#[derive(Accounts)]
pub struct CreateMatch<'info> {

    #[account(init,
        payer = signer,
        space = Match::LEN,
    )]
    pub match_inst : Account<'info, Match>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut)]
    pub mint : Account<'info, Mint>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}