use anchor_lang::prelude::*;
use crate::errors::Errors;

#[account]
pub struct Bet {
	pub match_pubkey : Pubkey, //32
	pub amount : u64, //8
	pub better_one : Pubkey, //32
	pub better_two : Pubkey, //32
	pub bet_condition : BetConditions,
	pub bet_state : BetState,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const MAX_BET_CONDITION : usize = 5 * 4;
const MAX_BET_STATE : usize = 10 * 4;
const U64_LENGTH : usize = 8;

impl Bet{
    pub const LEN : usize = DISCRIMINATOR_LENGTH  + 
        PUBLIC_KEY_LENGTH + U64_LENGTH +
        (PUBLIC_KEY_LENGTH * 2) + 
        STRING_LENGTH_PREFIX + MAX_BET_CONDITION +
        STRING_LENGTH_PREFIX + MAX_BET_STATE;

	pub fn accept_bet(&mut self) -> Result<()> {
		require!(self.bet_state == BetState::Created, Errors::BetStateError);
		self.bet_state = BetState::Accepted;
		Ok(())
	}

	pub fn claim_bet(&mut self) -> Result<()> {
		require!(self.bet_state == BetState::Accepted, Errors::BetStateError);
		self.bet_state = BetState::Claimed;
		Ok(())
	}

	pub fn withdraw_bet(&mut self) -> Result<()> {
		require!(self.bet_state == BetState::Created, Errors::BetStateError);
		self.bet_state = BetState::Withdrawn;
		Ok(())
	}
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum BetState {
	Created, // Someone has created a challenge
	Accepted, // The bet has been accepted
	Claimed, // The bet prize has been claimed
	Withdrawn, // The bet has been withdrawn
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum BetConditions {
    One, // c_one
	Two, // c_two
	Three, // c_three
	Four, // c_four
	Five, // c_five
}