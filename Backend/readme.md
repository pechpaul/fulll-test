# Requirements
To run this project you will need a computer with Node, Typescript and Cucumber installed.

# Install
To install the project, you just have to run `npm install` to get all the dependencies

# Running the tests
After installing the dependencies you can run the tests with this command `npm run test`.

# Running the cli
npm run cli -- create <userId>
npm run cli -- register-vehicle <fleetId> <vehiclePlateNumber>
npm run cli -- localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng>

### Step 3

- For code quality, you can use some tools : which one and why (in a few words) ?
  - a pre push check is necessary to guarantee code coverage
  - an error handling library like winston would be needed
  - dotenv or another library to handle environment variables and not have hard coded SQL logins
- you can consider to setup a ci/cd process : describe the necessary actions in a few words
  - those will be the steps implemented in cicd in order:
    - running the tests in github and check coverage updates
    - request code review from peers
    - push to main branch and deploy to a dev environment where further testing can be done
    - at the end of each sprint deploy the main branch minus the untested changes to a staging or prod environment depending on the number of environment desired
