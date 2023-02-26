use anchor_lang::prelude::*;
use instructions::*;
use state::BetConditions;

pub mod state;
pub mod errors;
pub mod instructions;

declare_id!("EDZae9LKkhuoRXfbL1JeR9tWeYtdnjd2v9RkWkpsGNj2");

#[program]
pub mod blinders {
    use crate::state::BetConditions;

    use super::*;

    pub fn create_match(ctx : Context<CreateMatch>, match_title : String, match_info : String, side_a : String, side_b : String, cone : String, ctwo : String, cthree : String, cfour : String, cfive : String) -> Result<()> {
        instructions::create_match::create_match(ctx, match_title, match_info, side_a, side_b, cone, ctwo, cthree, cfour, cfive)?;
        Ok(())
    }

    pub fn create_bet(ctx : Context<CreateBet>, amount : u64, condition : BetConditions) -> Result<()> {
        instructions::create_bet::create_bet(ctx, amount, condition)?;
        Ok(())
    }

    pub fn open_bets(ctx : Context<OpenBets>) -> Result<()> {
        instructions::interact_match::open_bets(ctx)?;
        Ok(())
    }

    pub fn close_bets(ctx : Context<CloseBets>) -> Result<()> {
        instructions::interact_match::close_bets(ctx)?;
        Ok(())
    }


    pub fn declare_results(ctx : Context<DeclareResults>, c_one : bool, c_two : bool, c_three : bool, c_four : bool, c_five : bool) -> Result<()> {
        instructions::interact_match::declare_results(ctx, c_one, c_two, c_three, c_four, c_five)?;
        Ok(())
    }

    pub fn accept_bet(ctx : Context<AcceptBet>) -> Result<()> {
        instructions::interact_bet::accept_bet(ctx)?;
        Ok(())
    }

    pub fn claim_bet(ctx : Context<ClaimBet>, bump : u8) -> Result<()> {
        instructions::interact_bet::claim_bet(ctx, bump)?;
        Ok(())
    }

    pub fn withdraw_bet(ctx : Context<WithdrawBet>, bump : u8) -> Result<()> {
        instructions::interact_bet::withdraw_bet(ctx, bump)?;
        Ok(())
    }

}
