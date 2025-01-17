#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
mod instructions;
mod state;
use instructions::*;


// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("11111111111111111111111111111111");

#[program]
mod close_account_program {
    use super::*;

   
   pub fn create_user(ctx: Context<CreateUserContext>, name: String) -> Result<()> {
    create_user::create_user(ctx, name)

   }

   pub fn close_user(ctx: Context<CloseUserContext>) -> Result<()> {
    close_user::close_user(ctx)
   }
}
