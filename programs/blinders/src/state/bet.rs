use anchor_lang::prelude::*;
use crate::errors::Errors;

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
const MAX_BET_STATE : usize = 8 * 4;
const U64_LENGTH : usize = 8;
const BOOL_LENGTH: usize = 1;

impl Bet{
    pub const LEN : usize = DISCRIMINATOR_LENGTH  + 
        PUBLIC_KEY_LENGTH + U64_LENGTH +
        (PUBLIC_KEY_LENGTH * 2) + 
        STRING_LENGTH_PREFIX + MAX_BET_CONDITION +
        STRING_LENGTH_PREFIX + MAX_BET_STATE;
}

pub enum BetState {
	Created, // Someone has created a challenge
	Accepted, // The bet has been accepted
	Claimed, // The bet prize has been claimed
}

pub enum BetConditions {
    one, // c_one
	two, // c_two
	three, // c_three
	four, // c_four
	five, // c_five
}