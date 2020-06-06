#!/bin/bash

set -e

printfln() {
  printf "\n$1\n"
}


# Extract branch for current build
BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo "$TRAVIS_BRANCH"; else echo "$TRAVIS_PULL_REQUEST_BRANCH"; fi)
printfln "Current branch: $BRANCH"

# TRAVIS_COMMIT_RANGE is usually invalid for force pushes - ignore such values
# This is just a safe guard against force push on the main branch(s).
if [ -n "$TRAVIS_COMMIT_RANGE" ]; then
  if ! git rev-list "$TRAVIS_COMMIT_RANGE" >/dev/null; then
    TRAVIS_COMMIT_RANGE=
  fi
fi

# Find all the commits for the current build
if [ -n "$TRAVIS_COMMIT_RANGE" ]; then
  COMMIT_RANGE="${TRAVIS_COMMIT_RANGE/.../..}"
fi

printfln "Commit range: $COMMIT_RANGE"