set -euo pipefail

npm install --save
cdk synthesize
cdk bootstrap
DEPLOY_OUTPUT=$(cdk deploy --require-approval never 2>&1) # Cause AWS CDK writes its messages into stderr
node ./postman_collections/make.js "${DEPLOY_OUTPUT}"
