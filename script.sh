#!/bin/bash

# shellcheck disable=SC2059

set -e


printfln() {
  printf "\n$1\n"
}
printfln "$TRAVIS_PULL_REQUEST"
printfln "$TRAVIS_REPO_SLUG"

BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo "$TRAVIS_BRANCH"; else echo "$TRAVIS_PULL_REQUEST_BRANCH"; fi)

export BRANCH

printfln "${BRANCH}"

if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
    printfln "i am heres"
    curl -H "Authorization: token $GITHUB_TOKEN" -X POST \
    -d "{\"body\": \"Hello world\"}" \
    "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
fi

printfln "Done..."



