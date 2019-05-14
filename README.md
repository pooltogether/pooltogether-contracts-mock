# PoolTogether Mock Contracts

A set of migrations that deploy the PoolTogether contracts, along with a mock MoneyMarket and Token.

The migrations will deploy the contracts, mint tokens, start a lottery, and deposit into the lottery.

# Local Usage

Clone the repo and then install deps:

```
$ yarn
```

Copy over .envrc and allow [direnv](https://direnv.net/):

```
$ cp .envrc.example .envrc
$ direnv allow
```

Start `ganache-cli`:

```
$ yarn start
```

If you changed the mnemonic, you should update the ADMIN_ADDRESS variable in `.envrc` with another address (I use the second address listed when `ganache-cli` starts).

Now start a new zos session:

```
$ yarn session
```

Push out the local contracts:

```
$ zos push
```

Migrate the contracts and bootstrap the data:

```
$ yarn migrate
```

To see what data is bootstrapped, have a look at the migrations.

If things aren't working properly (getting random errors?) then try:

```
$ rm networks/1234.json && rm -rf build && rm zos.dev-1234.json && zos push && yarn migrate
```


# Deploying to Rinkeby

```
zos push --network rinkeby --from <admin address>
yarn migrate-rinkeby
```

# Notes

Rinkeby DAI address: 0x6f2d6ff85efca691aad23d549771160a12f0a0fc
Rinkeby MoneyMarket address: 0x3fda67f7583380e67ef93072294a7fac882fd7e7
