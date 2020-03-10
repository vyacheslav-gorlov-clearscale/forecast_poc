set -e
set -u
set -o pipefail

npm run build
cdk synthesize
cdk deploy
