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


# Deploying to Ropsten

```
zos push --network ropsten --from <admin address>
yarn migrate-ropsten
```
