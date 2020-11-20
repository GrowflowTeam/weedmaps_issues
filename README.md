# Weedmaps Bugs

## Setup

1. Install prerequisites

    ```
    yarn 
    ```
2. Do one of the following to configure the token, orgId, and catalogId

  1. Export three variables that will contain the necessary values
    * export WEEDMAPS_ACCESS_TOKEN=[some token]
    * export WEEDMAPS_ORG_ID=[some org id]
    * export WEEDMAPS_CATALOG_ID=[some catalogId]

  2. OR - modify the variable values in './config.js' and replace the "replace_with*" values with legitimate values

## Running the tests

```
yarn test
```


