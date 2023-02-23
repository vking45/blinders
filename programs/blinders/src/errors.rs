use anchor_lang::error_code;

#[error_code]
pub enum Errors{
    #[msg("The match state doesn't match the requirements")]   
    MatchStateError,
}