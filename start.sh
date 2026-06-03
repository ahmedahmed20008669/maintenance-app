#!/bin/sh
set -e

# Create directories on the persistent volume
mkdir -p /data/uploads

# Symlink the persistent uploads folder to public/uploads
# Next.js serves files from public/
# First, remove public/uploads if it exists
rm -rf ./public/uploads
ln -s /data/uploads ./public/uploads

# Run Next.js production server
exec npm run start
