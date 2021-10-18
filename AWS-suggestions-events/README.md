# 💾 AWS serverless functions

### ⚠️ if your not running a dashboard don't use versions with events ⚠️

This is an example implemention for suggestify engine on AWS. It runs the `suggestions` function and an `events` functions it also includes a `pre-build` script that will pull your suggestions from your dashboard.

##### AWS services:

-   HTTP API
-   2 Lambda functions
-   Basic logging
-   Bucket for storing SAM-template
-   SAM stack

### 📦 Requirments

-   [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
-   [Node.js 14](https://nodejs.org/en/)
-   [Docker](https://hub.docker.com/search/?type=edition&offering=community)
-   [Yarn v1.22 or higher](https://yarnpkg.com/lang/en/)

### 🏇 QuickStart SAM

#### Functions

-   `EventsLogFunction`
-   `SuggestifyFunction`

#### Build

Install developer packages and run build (bundle scripts and pull new suggestions from the database)

```bash
$ yarn
$ yarn build
$ sam build
```

Test function

```bash
$ sam local invoke [Function] --no-event
```

Deploy the updated application.

```bash
$ sam deploy
```

Debug function

```bash
$ sam logs -n [Function] --stack-name suggestify-serverless --tail
```

## Unit tests

Tests are defined in the `__tests__` folder in this project. Use `yarn` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
$ yarn build
$ yarn test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name suggestify-serverless
```
