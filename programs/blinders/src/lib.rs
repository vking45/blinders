use anchor_lang::prelude::*;

pub mod state;
pub mod errors;
pub mod instructions;

declare_id!("EDZae9LKkhuoRXfbL1JeR9tWeYtdnjd2v9RkWkpsGNj2");

#[program]
pub mod blinders {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
