use anchor_lang::error_code;

#[error_code]
pub enum Errors{
    #[msg("The match state doesn't match the requirements")]   
    MatchStateError,

    #[msg("The bet state doesn't match the requirements")]   
    BetStateError,

    #[msg("Only the platform account can create or update matches")]   
    AuthorityError,

    #[msg("The match has to been Open state for the creation of bets")]   
    BetCreationError,    
}