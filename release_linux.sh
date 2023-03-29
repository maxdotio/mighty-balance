#!/bin/bash

if [ -z "$1" ]
then
    echo "Specify the release version! Like this:"
    echo "./release_linux.sh 0.9.9"
    exit
fi

CWD=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
name=build_$1_$(date +"%Y%m%d%H%M")
folder=$CWD/dist/$name

rm -rf $folder
mkdir -p $folder

rm ./latest
ln -s $folder ./latest

#App
cd src
pkg . --target linux-x64
cp mighty-balance $folder/mighty-balance
cd ..

#Scripts and Documentation
cp README.md $folder/
cp LICENSE $folder/
cp scripts/install.sh $folder/
cp scripts/mighty-balance.service $folder/

#Package it up!
rm -rf dist/temp/mighty-balance
mkdir -p dist/temp
cp -R $folder dist/temp/mighty-balance
cd dist/temp
tar -zcf mighty-balance-linux.tar.gz mighty-balance
mv mighty-balance-linux.tar.gz $folder
cd $CWD

mkdir -p releases/linux/$1
cp $folder/mighty-balance-linux.tar.gz ./releases/linux/$1/
cp $folder/mighty-balance-linux.tar.gz ./releases/linux/mighty-balance-linux-$1.tar.gz