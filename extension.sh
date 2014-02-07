#!/usr/bin/env bash

if [ "$1" == "--build" ]
then
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
        --pack-extension=extension \
        --pack-extension-key=extension.pem
else
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
        --user-data-dir=user-data-dir \
        --load-extension=extension
fi
