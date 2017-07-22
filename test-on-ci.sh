
npm run coverage

cat ./coverage/lcov.info | COVERALLS_REPO_TOKEN=$COVERALLS_REPO_TOKEN COVERALLS_SERVICE_NAME=$COVERALLS_SERVICE_NAME node ./node_modules/coveralls/bin/coveralls.js
