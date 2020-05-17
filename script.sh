#!/bin/bash

# shellcheck disable=SC2059

set -e


printfln() {
  printf "\n$1\n"
}

BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo "$TRAVIS_BRANCH"; else echo "$TRAVIS_PULL_REQUEST_BRANCH"; fi)

export BRANCH

if [ -n "$TRAVIS_COMMIT_RANGE" ]; then
  if ! git rev-list "$TRAVIS_COMMIT_RANGE" >/dev/null; then
    TRAVIS_COMMIT_RANGE=
  fi
fi


if [ -n "$TRAVIS_COMMIT_RANGE" ]; then
    COMMIT_RANGE="${TRAVIS_COMMIT_RANGE/.../..}"
fi


printfln "$COMMIT_RANGE"

printfln "Starting the simulation...."

git log --oneline $COMMIT_RANGE

lambdas=$(git diff --name-only $TRAVIS_COMMIT_RANGE | sort -u | grep -oP "src\/components\/.+?\/" | cat | uniq)

if [ -z "${lambdas}" ]; then
    printfln "Looks like no changes made to lambdas...skipping the build and upload"
    exit 0
fi

printfln "Changes detected in following lambdas:"

#aws lambda update-function-code --zip-file=fileb://code.zip --region=us-east-1 --function-name=

buildAndUpload() {
    cd $1 && pwd
    echo "hello"
    # aws lambda update-function-code --zip-file=fileb://.tmp/package.zip --region=us-east-1 --function-name=$2
    cd -
}

for lambda in $lambdas; do
    printf "$lambda\n"

    lambda_name=${lambda/src\/components\//}
    lambda_name=${lambda_name::-1}

    
    if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
        printfln "${green}Skipping uploads for pull request build$reset"
        exit 0
    fi

    if [ "${BRANCH}" == "dev" ] || [ "${BRANCH}" == "master" ]; then
        printfln "in dev/master"
    
    fi
    lambda_dir="$TRAVIS_BUILD_DIR/${lambda}"
    
    buildAndUpload $lambda_dir $lambda_name

done

printfln "done !!"



