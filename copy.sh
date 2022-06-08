#!/usr/bin/env bash

rsync -am --include '*/' --include '*.less' --exclude '*' src/ es/
