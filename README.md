# Agritoca

[![Build Status](https://travis-ci.com/mdmundo/agritoca-api.svg?token=zfA4xNhjqqTDRjuKoYwd&branch=main)](https://travis-ci.com/mdmundo/agritoca-api) [![Coverage Status](https://coveralls.io/repos/github/mdmundo/agritoca-api/badge.svg?branch=main&t=9Ll4xC)](https://coveralls.io/github/mdmundo/agritoca-api?branch=main)

## Docs

- [Here](https://documenter.getpostman.com/view/11086441/TVRrUj9u)

## Privileges

|                                 | Admin | Mod         | Regular | No Auth |
| ------------------------------- | ----- | ----------- | ------- | ------- |
| See Registers                   | 👍    | 👍          | 👍      | 👍      |
| Change Privilege                | 👍    | 👎          | 👎      | 👎      |
| Modify Registers                | 👍    | 👉 if owner | 👎      | 👎      |
| See History                     | 👍    | 👍          | 👎      | 👎      |
| See Private Data from Producers | 👍    | 👍          | 👎      | 👎      |
| Sync Baskets                    | 👍    | 👍          | 👍      | 👎      |

Besides this, **Admin** can change/assign a **mod** as _owner_ for a register. Then the **mod** can now update/remove the register. Old _owners_ can restore those registers which they were _owners_.
