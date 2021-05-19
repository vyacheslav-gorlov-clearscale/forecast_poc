set -e
set -u
set -o pipefail

apt-get update && apt-get upgrade
apt-get install node
npm install -g aws-cdk
