#!/bin/bash

set -e  

echo "✨ Running lint-staged..."
yarn lint-staged

echo "✨ Validating tsc..."
yarn tsc --noEmit