#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Vec};

#[contract]
pub struct MainContract;

#[contractimpl]
impl MainContract {
    pub fn set_bool_value(env: Env, key: Symbol, new_value: bool) {
        env.storage().instance().set(&key, &new_value);
        env.storage().instance().extend_ttl(10, 10);
    }

    pub fn get_bool_value(env: Env, key: Symbol) -> bool {
        let val1 = env.storage().instance().get(&key).unwrap_or(false);
        val1
    }
    // pub fn set_symbol_short(env: Env, key: Symbol, value: Symbol) {
    //     env.storage().instance().set(&key, &value);
    //     env.storage().instance().extend_ttl(10, 10);
    // }

    // pub fn get_symbol_short(env: Env, key: Symbol) -> Symbol {
    //     let val2 = env.storage().instance().get(&key).unwrap_or(Symbol::short("default"));
    //     val2
    // }

    // Set and Get for symbol_long
    pub fn set_symbol_long(env: Env, key: Symbol, value: Symbol) {
        env.storage().instance().set(&key, &value);
        env.storage().instance().extend_ttl(10, 10);
    }

    pub fn get_symbol_long(env: Env, key: Symbol) -> Symbol {
        let val3 = env.storage().instance().get(&key).unwrap_or(Symbol::short("default"));
        val3
    }

    // Set and Get for int32_value
    pub fn set_int32_value(env: Env, key: Symbol, value: i32) {
        env.storage().instance().set(&key, &value);
        env.storage().instance().extend_ttl(10, 10);
    }

    pub fn get_int32_value(env: Env, key: Symbol) -> i32 {
        let val4 = env.storage().instance().get(&key).unwrap_or(0);
        val4
    }

    // Set and Get for uint32_value
    pub fn set_uint32_value(env: Env, key: Symbol, value: u32) {
        env.storage().instance().set(&key, &value);
        env.storage().instance().extend_ttl(10, 10);
    }

    pub fn get_uint32_value(env: Env, key: Symbol) -> u32 {
        let val5 = env.storage().instance().get(&key).unwrap_or(0);
        val5
    }

    // Set and Get for int64_value
    pub fn set_int64_value(env: Env, key: Symbol, value: i64) {
        env.storage().instance().set(&key, &value);
        env.storage().instance().extend_ttl(10, 10);
    }

    pub fn get_int64_value(env: Env, key: Symbol) -> i64 {
        let val6 = env.storage().instance().get(&key).unwrap_or(0);
        val6
    }

    // Set and Get for uint64_value
    pub fn set_uint64_value(env: Env, key: Symbol, value: u64) {
        env.storage().instance().set(&key, &value);
        env.storage().instance().extend_ttl(10, 10);
    }

    pub fn get_uint64_value(env: Env, key: Symbol) -> u64 {
        let val7 = env.storage().instance().get(&key).unwrap_or(0);
        val7
    }

    // Set and Get for int128_value
    pub fn set_int128_value(env: Env, key: Symbol, value: i128) {
        env.storage().instance().set(&key, &value);
        env.storage().instance().extend_ttl(10, 10);
    }

    pub fn get_int128_value(env: Env, key: Symbol) -> i128 {
        let val8 = env.storage().instance().get(&key).unwrap_or(0);
        val8
    }

    // Set and Get for uint128_value
    pub fn set_uint128_value(env: Env, key: Symbol, value: u128) {
        env.storage().instance().set(&key, &value);
        env.storage().instance().extend_ttl(10, 10);
    }

    pub fn get_uint128_value(env: Env, key: Symbol) -> u128 {
        let val9 = env.storage().instance().get(&key).unwrap_or(0);
        val9
    }
    pub fn set_my_batch_processing(
        env: Env,
        key1: Vec<Symbol>,
        key2: Vec<Symbol>,
        key3: Vec<Symbol>,
        key4: Vec<Symbol>,
        value1: Vec<bool>,
        value2: Vec<Symbol>,
        value3: Vec<i32>,
        value4: Vec<u32>,
    ) {
        for i in 0..key1.len() {
            Self::set_bool_value(env.clone(), key1.get(i).unwrap(), value1.get(i).unwrap());
        }
        for i in 0..key2.len() {
            Self::set_symbol_long(env.clone(), key2.get(i).unwrap(), value2.get(i).unwrap());
        }
        for i in 0..key3.len() {
            Self::set_int32_value(env.clone(), key3.get(i).unwrap(), value3.get(i).unwrap());
        }
        for i in 0..key4.len() {
            Self::set_uint32_value(env.clone(), key4.get(i).unwrap(), value4.get(i).unwrap());
        }
    }
    pub fn get_my_batch_processing(
        env: Env,
        key1: Vec<Symbol>,
        key2: Vec<Symbol>,
        key3: Vec<Symbol>,
        key4: Vec<Symbol>
    ) -> (Vec<bool>, Vec<Symbol>, Vec<i32>, Vec<u32>) {
        let mut result1 = Vec::new(&env);
        let mut result2 = Vec::new(&env);
        let mut result3 = Vec::new(&env);
        let mut result4 = Vec::new(&env);
    
        for i in 0..key1.len() {
            result1.push_back(Self::get_bool_value(env.clone(), key1.get(i).unwrap()));
        }
        for i in 0..key2.len() {
            result2.push_back(Self::get_symbol_long(env.clone(), key2.get(i).unwrap()));
        }
        for i in 0..key3.len() {
            result3.push_back(Self::get_int32_value(env.clone(), key3.get(i).unwrap()));
        }
        for i in 0..key4.len() {
            result4.push_back(Self::get_uint32_value(env.clone(), key4.get(i).unwrap()));
        }
    
        (result1, result2, result3, result4)
    }
}
    // fn upgrade_symbol(env: Env,original: Symbol, index: usize) -> Symbol {
    //     let new_symbol =index.to_u8() ;
    //     let new_symbol = new_symbol.to_string();
    //     Symbol::new(&env,&new_symbol)
    // }

    // [name, age, addr] ["string", "uint32", "string"]

    // fn createSchema(key:[string], valueType:[string]){
        // for i in 0..key.len(){
            // key[0] and valueType[0]

        // if(valueType == "bool"){
        //     set_bool_value(key, true);
        // }
        // else if(valueType == "symbol_short"){
        //     set_symbol_short(key, Symbol::short("default"));
        // }

    // }

    
        

    
    // pub fn set_get_bool_value(env: Env,key: Symbol ,new_value: bool) -> bool {
    //     // let mut bool_value: bool = new_value;}
    //     env.storage().instance().set(&key, &new_value);
    //     env.storage().instance().extend_ttl(10, 10);
    //     new_value
        // let val1: Symbol = key;
        // let mut bool_storage: bool = env.storage().instance().get(&val1).unwrap_or(false);
        // bool_storage = new_value;
        // env.storage().instance().set(&val1, &bool_storage);
        // env.storage().instance().extend_ttl(10, 10);
        // bool_storage
    // }
    
    // pub fn increment(env: Env, key: Symbol) -> u32 {
    //    let counter: Symbol = key; // Directly use the key as the counter symbol
    //     let mut count: u32 = env.storage().instance().get(&counter).unwrap_or(0);

    //     count += 1;

    //     log!(&env, "count: {}", count);

    //     env.storage().instance().set(&counter, &count);

    //     env.storage().instance().extend_ttl(100, 100);

    //     count
    // }
    // bool_value: bool,
//     symbol_short: Symbol,
//     symbol_long: Symbol,
//     int32_value: i32,
//     uint32_value: u32,
//     int64_value: i64,
//     uint64_value: u64,
//     int128_value: i128,
//     uint128_value: u128,

// #![no_std]

// extern crate alloc;

// use soroban_sdk::{contract, contractimpl, contracttype,  Env, Symbol };
// use alloc::collections::BTreeMap;
// use wee_alloc::WeeAlloc;
// use soroban_sdk::storage::Storage;
// // use soroban_sdk::storage::Storage;TryFromVal::Env::soroban_sdk::Val
// // use soroban_sdk::{Env, TryFromVal, Val, storage::Storage};
// // use soroban_sdk::storage::Storage::IntoVal<Env, soroban_sdk::Val>
// // Use `wee_alloc` as the global allocator.
// #[global_allocator]
// static ALLOC: WeeAlloc = WeeAlloc::INIT;

// #[contracttype]
// pub struct MyStorage {
//     values: BTreeMap<Symbol, MyValue>,
// }

// #[derive(Clone, Debug)]
// pub enum MyValue {
//     Bool(bool),
//     SymbolShort(Symbol),
//     SymbolLong(Symbol),
//     Int32(i32),
//     Uint32(u32),
//     Int64(i64),
//     Uint64(u64),
//     Int128(i128),
//     Uint128(u128),
// }

// #[contract]
// pub struct Contracting;

// #[contractimpl]
// impl Contracting {
//     // Initializes the contract with an empty storage
//     pub fn new_contract(_env: Env) -> Storage {
//         MyStorage {
//             values: BTreeMap::new(),
//         }
//     }

//     // Function to set a boolean value for a given key
//     pub fn set_bool_value(env: Env, key: Symbol, new_value: bool) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::Bool(new_value));
//     }

//     // Function to get a boolean value for a given key
//     pub fn get_bool_value(env: Env, key: Symbol) -> Option<bool> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::Bool(value)) => Some(value),
//             _ => None,
//         }
//     }

//     // Function to set a short symbol value for a given key
//     pub fn set_symbol_short(env: Env, key: Symbol, new_value: Symbol) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::SymbolShort(new_value));
//     }

//     // Function to get a short symbol value for a given key
//     pub fn get_symbol_short(env: Env, key: Symbol) -> Option<Symbol> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::SymbolShort(value)) => Some(value.clone()),
//             _ => None,
//         }
//     }

//     // Function to set a long symbol value for a given key
//     pub fn set_symbol_long(env: Env, key: Symbol, new_value: Symbol) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::SymbolLong(new_value));
//     }

//     // Function to get a long symbol value for a given key
//     pub fn get_symbol_long(env: Env, key: Symbol) -> Option<Symbol> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::SymbolLong(value)) => Some(value.clone()),
//             _ => None,
//         }
//     }

//     // Function to set a signed 32-bit integer value for a given key
//     pub fn set_int32_value(env: Env, key: Symbol, new_value: i32) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::Int32(new_value));
//     }

//     // Function to get a signed 32-bit integer value for a given key
//     pub fn get_int32_value(env: Env, key: Symbol) -> Option<i32> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::Int32(value)) => Some(value),
//             _ => None,
//         }
//     }

//     // Function to set an unsigned 32-bit integer value for a given key
//     pub fn set_uint32_value(env: Env, key: Symbol, new_value: u32) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::Uint32(new_value));
//     }

//     // Function to get an unsigned 32-bit integer value for a given key
//     pub fn get_uint32_value(env: Env, key: Symbol) -> Option<u32> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::Uint32(value)) => Some(value),
//             _ => None,
//         }
//     }

//     // Function to set a signed 64-bit integer value for a given key
//     pub fn set_int64_value(env: Env, key: Symbol, new_value: i64) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::Int64(new_value));
//     }

//     // Function to get a signed 64-bit integer value for a given key
//     pub fn get_int64_value(env: Env, key: Symbol) -> Option<i64> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::Int64(value)) => Some(value),
//             _ => None,
//         }
//     }

//     // Function to set an unsigned 64-bit integer value for a given key
//     pub fn set_uint64_value(env: Env, key: Symbol, new_value: u64) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::Uint64(new_value));
//     }

//     // Function to get an unsigned 64-bit integer value for a given key
//     pub fn get_uint64_value(env: Env, key: Symbol) -> Option<u64> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::Uint64(value)) => Some(value),
//             _ => None,
//         }
//     }

//     // Function to set a signed 128-bit integer value for a given key
//     pub fn set_int128_value(env: Env, key: Symbol, new_value: i128) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::Int128(new_value));
//     }

//     // Function to get a signed 128-bit integer value for a given key
//     pub fn get_int128_value(env: Env, key: Symbol) -> Option<i128> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::Int128(value)) => Some(value),
//             _ => None,
//         }
//     }

//     // Function to set an unsigned 128-bit integer value for a given key
//     pub fn set_uint128_value(env: Env, key: Symbol, new_value: u128) {
//         let mut minestorage = env.storage::<Storage>();
//         minestorage.values.insert(key, MyValue::Uint128(new_value));
//     }

//     // Function to get an unsigned 128-bit integer value for a given key
//     pub fn get_uint128_value(env: Env, key: Symbol) -> Option<u128> {
//         let minestorage = env.storage::<Storage>();
//         match minestorage.values.get(&key) {
//             Some(MyValue::Uint128(value)) => Some(value),
//             _ => None,
//         }
//     }
// }

// #![no_std]

// extern crate alloc;
// // use alloc::string::String;
// use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env,Address, Symbol};
// use wee_alloc::WeeAlloc;

// // Use `wee_alloc` as the global allocator.
// #[global_allocator]
// static ALLOC: WeeAlloc = WeeAlloc::INIT;

// #[contracttype]
// pub struct Storage {
//     bool_value: bool,
//     symbol_short: Symbol,
//     symbol_long: Symbol,
//     int32_value: i32,
//     uint32_value: u32,
//     int64_value: i64,
//     uint64_value: u64,
//     int128_value: i128,
//     uint128_value: u128,
// }

// #[contract]
// pub struct Contract;

// #[contractimpl]
// impl Contract {
//     // Initializes the contract with default values
//     pub fn new_contract(env: Env) -> Storage {
//         // user.require_auth();
//         Storage {
//             bool_value: false,
//             symbol_short: symbol_short!("default"), // short symbol (<= 9 chars)
//             symbol_long: Symbol::new(&env, "default_long_symbol"), // long symbol (<= 32 chars)
//             int32_value: 0,
//             uint32_value: 0,
//             int64_value: 0,
//             uint64_value: 0,
//             int128_value: 0,
//             uint128_value: 0,
//         }
//     }

//     // Function to set a boolean value
//     pub fn set_bool_value( user: Address,storage: Storage, new_value: bool) -> Storage {
//         user.require_auth();
//         Storage {
//             bool_value: new_value,
//             ..storage
//         }
//     }

//     // Function to get a boolean value
//     pub fn get_bool_value( user: Address,storage: Storage) -> bool {
//         user.require_auth();
//         storage.bool_value
//     }

//     // Function to set a short symbol value (<= 9 chars)
//     pub fn set_symbol_short( user: Address,storage: Storage, new_value: Symbol) -> Storage {
//         user.require_auth();
//         Storage {
//             symbol_short: new_value,
//             ..storage
//         }
//     }

//     // Function to get a short symbol value (<= 9 chars)
//     pub fn get_symbol_short( user: Address,storage: Storage) -> Symbol {
//         user.require_auth();
//         storage.symbol_short.clone()
//     }

//     // Function to set a long symbol value (<= 32 chars)
//     pub fn set_symbol_long( user: Address,storage: Storage, new_value: Symbol) -> Storage {
//         user.require_auth();
//         Storage {
//             symbol_long: new_value,
//             ..storage
//         }
//     }

//     // Function to get a long symbol value (<= 32 chars)
//     pub fn get_symbol_long( user: Address,storage: Storage) -> Symbol {
//         user.require_auth();
//         storage.symbol_long.clone()
//     }

//     // Function to set a signed 32-bit integer value
//     pub fn set_int32_value( user: Address,storage: Storage, new_value: i32) -> Storage {
//         user.require_auth();
//         Storage {
//             int32_value: new_value,
//             ..storage
//         }
//     }

//     // Function to get a signed 32-bit integer value
//     pub fn get_int32_value( user: Address,storage: Storage) -> i32 {
//         user.require_auth();
//         storage.int32_value
//     }

//     // Function to set an unsigned 32-bit integer value
//     pub fn set_uint32_value( user: Address,storage: Storage, new_value: u32) -> Storage {
//         user.require_auth();
//         Storage {
//             uint32_value: new_value,
//             ..storage
//         }
//     }

//     // Function to get an unsigned 32-bit integer value
//     pub fn get_uint32_value( user: Address,storage: Storage) -> u32 {
//         user.require_auth();
//         storage.uint32_value
//     }

//     // Function to set a signed 64-bit integer value
//     pub fn set_int64_value( user: Address,storage: Storage, new_value: i64) -> Storage {
//         user.require_auth();
//         Storage {
//             int64_value: new_value,
//             ..storage
//         }
//     }

//     // Function to get a signed 64-bit integer value
//     pub fn get_int64_value( user: Address,storage: Storage) -> i64 {
//         user.require_auth();
//         storage.int64_value
//     }

//     // Function to set an unsigned 64-bit integer value
//     pub fn set_uint64_value( user: Address,storage: Storage, new_value: u64) -> Storage {
//         user.require_auth();
//         Storage {
//             uint64_value: new_value,
//             ..storage
//         }
//     }

//     // Function to get an unsigned 64-bit integer value
//     pub fn get_uint128_value( user: Address,storage: Storage) -> u128 {
//         user.require_auth();
//         storage.uint128_value
//     }

//     pub fn set_uint128_value( user: Address,storage: Storage, new_value: u128) -> Storage {
//         user.require_auth();
//         Storage {
//             uint128_value: new_value,
//             ..storage
//         }
//     }

//     // Function to get an unsigned 128-bit integer value
//     pub fn get_int128_value( user: Address,storage: Storage) -> i128 {
//         user.require_auth();
//         storage.int128_value
//     }
//     pub fn set_int128_value( user: Address,storage: Storage, new_value: i128) -> Storage {
//         user.require_auth();
//         Storage {
//             int128_value: new_value,
//             ..storage
//         }
//     }
// }
