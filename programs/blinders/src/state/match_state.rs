use anchor_lang::prelude::*;
use crate::errors::Errors;

#[account]
pub struct Match {
	pub title : String, //20 * 4 == 80
	pub info : String, //100 * 4 == 400
	pub side_a : String, //10 * 4 == 40
	pub side_b : String, //10 * 4 == 40
	pub mint : Pubkey, //32
	pub c_one : bool, //1
	pub c_two : bool, //1
	pub c_three : bool, //1
	pub c_four : bool, //1
	pub c_five : bool, //1
	pub token_acc : Pubkey, //32
    pub match_state : MatchState, // 10 * 4 == 40
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const MAX_TITLE : usize = 20 * 4;
const MAX_INFO : usize = 100 * 4;
const MAX_SIDE : usize = 10 * 4;
const MAX_MATCH_STATE : usize = 10 * 4;
const BOOL_LENGTH: usize = 1;

impl Match{
    pub const LEN : usize = DISCRIMINATOR_LENGTH +
        STRING_LENGTH_PREFIX + MAX_TITLE +
        STRING_LENGTH_PREFIX + MAX_INFO + 
        (STRING_LENGTH_PREFIX + MAX_SIDE * 2) +
        PUBLIC_KEY_LENGTH + (BOOL_LENGTH * 5) +
        PUBLIC_KEY_LENGTH + 
        STRING_LENGTH_PREFIX + MAX_MATCH_STATE;

    pub fn open_bets(&mut self, token_acc : Pubkey) -> Result<()> {
        require!(self.match_state == MatchState::Created, Errors::MatchStateError);
        self.match_state = MatchState::Open;
        self.token_acc = token_acc;
        Ok(())
    }

    pub fn close_bets(&mut self) -> Result<()> {
        require!(self.match_state == MatchState::Open, Errors::MatchStateError);
        self.match_state = MatchState::Started;
        Ok(())
    }

    pub fn declare_results(&mut self, c_one : bool, c_two : bool, c_three : bool, c_four : bool, c_five : bool) -> Result<()> {
        require!(self.match_state == MatchState::Started, Errors::MatchStateError);
        self.match_state = MatchState::Declared;
        self.c_one = c_one;
        self.c_two = c_two;
        self.c_three = c_three;
        self.c_four = c_four;
        self.c_five = c_five;
        Ok(())
    }

    pub fn check_state(&self) -> MatchState {
        return self.match_state.clone();
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum MatchState {
	Created, // The match has been listed
	Open, // The match is now open to take bets
	Started, // The match has begun and no more bets can be placed
	Declared, // The results have been declared and winners can collect their prizes
}