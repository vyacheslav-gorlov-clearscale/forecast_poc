set -euo pipefail

npm install --save
cdk synthesize
cdk bootstrap
cdk deploy --require-approval never
