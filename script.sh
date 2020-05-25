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

printfln "${lambdas}"

if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then

    curl -H "Authorization: token a62af12406ca3cc8cdc2f4c58b64f7d310db1120" -X POST \
    -d "{\"body\": \"Hello world\"}" \
    "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
fi

printfln "Done..."



