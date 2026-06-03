#!/bin/sh
set -e

# Create directories on the persistent volume
mkdir -p /data/uploads

# Symlink the persistent uploads folder to public/uploads
# Next.js serves files from public/
# First, remove public/uploads if it exists
rm -rf ./public/uploads
ln -s /data/uploads ./public/uploads

# Run Next.js production server binding to all network interfaces
exec npx next start -H 0.0.0.0 -p 3000
