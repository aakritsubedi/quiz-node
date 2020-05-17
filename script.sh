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

lambdas=$(git diff --name-only $TRAVIS_COMMIT_RANGE | sort -u | grep -oP "src\/.+?\/" | cat | uniq)

printfln "$lambdas"

if [ -z "${lambdas}" ]; then
    printfln "Sorry no changes made to lambdas"
    exit 0
fi

printfln "done !!"