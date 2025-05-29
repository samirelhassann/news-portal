#!/bin/bash
modified_files=$(git diff --name-only --cached | grep '\.ts$')

for file in $modified_files; do
  tsc --noEmit $file
done
