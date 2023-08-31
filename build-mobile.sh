#!/bin/bash
echo "Remove output folder"
rm -rf ../messenger-mobile/www

echo "Src folder copying..."
cp -R ../messenger-client ../messenger-mobile/www
echo "Src folder copied to /www"

echo "Build..."
cd ../messenger-mobile/www && yarn build:prepare-cordova

echo "Install dependencies..."
yarn install

cd ../
echo "Run!"
cordova run android