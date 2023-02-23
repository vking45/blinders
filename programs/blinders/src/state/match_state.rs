use anchor_lang::prelude::*;
use crate::errors::Errors;

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

    pub fn open_bets(&mut self) -> Result<()> {
        require!(self.match_state == MatchState::Created, Errors::MatchStateError);
        self.match_state = MatchState::Open;
        Ok(())
    }

    pub fn close_bets(&mut self) -> Result<()> {
        require!(self.match_state == MatchState::Open, Errors::MatchStateError);
        self.match_state = MatchState::Started;
        Ok(())
    }

    pub fn declare_results(&mut self) -> Result<()> {
        require!(self.match_state == MatchState::Started, Errors::MatchStateError);
        self.match_state = MatchState::Declared;
        Ok(())
    }

    pub fn check_state(&self) -> MatchState {
        return self.match_state;
    }
}

pub enum MatchState {
	Created, // The match has been listed
	Open, // The match is now open to take bets
	Started, // The match has begun and no more bets can be placed
	Declared, // The results have been declared and winners can collect their prizes
}