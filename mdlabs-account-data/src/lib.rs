#![allow(clippy::result_large_err)]
use anchor_lang::prelude::*;
use instructions::*;

pub mod constant;
pub mod instructions;
pub mod state;


// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("FQmspyZzaTvkuHGy5XsptFk4cqwt5WoM7j4rSXiXnFKa");


#[program]
mod mdlabs_account_data_program {
    use super::*;
    pub fn create_adddress_info(ctx: Context<CreateAddressInfo>, name: String, house_number: u8, street: String, city: String) -> Result<()> {
          create::create_address_info(ctx, name, house_number, street, city)
    }
}