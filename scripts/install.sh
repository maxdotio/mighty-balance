#!/bin/bash

CWD=$(pwd)
MIGHTY_BALANCE_PATH=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $MIGHTY_BALANCE_PATH
sed -e "s#/home/ubuntu/mighty-balance#$MIGHTY_BALANCE_PATH##g" mighty-balance.service > temp-service
sudo mv temp-service /etc/systemd/system/mighty-balance.service
sudo systemctl daemon-reload
sudo systemctl enable mighty-balance.service
sudo systemctl start mighty-balance.service
cd $CWD