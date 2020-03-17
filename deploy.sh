set -e
set -u
set -o pipefail

cdk synthesize
cdk deploy
