# Weedmaps Bugs

## Setup

Install prerequisites

```
yarn 
```

## Update config values

Do one of the following to configure the token, orgId, and catalogId

  Export three variables that will contain the necessary values

  * export WEEDMAPS_ACCESS_TOKEN=[some token]
  * export WEEDMAPS_ORG_ID=[some org id]
  * export WEEDMAPS_CATALOG_ID=[some catalogId]

### Or 

  * modify the variable values in './config.js' and replace the "replace_with*" values with legitimate values

## Running the tests

```
yarn test
```

Update the variable 'totalNumberOfProductsExpected' in './config.js' if you are providing a token, orgId, and catalogId that will result in a result set larger than 27 (the current default in './config.js')

