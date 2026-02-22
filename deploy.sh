#!/bin/bash

# ─────────────────────────────────────────
# Avianca Demo - Deploy Script
# Usage: ./deploy.sh
# ─────────────────────────────────────────

BUCKET="avianca-demo"
DISTRIBUTION_ID="E27ZEE9AOMFS01"
SOURCE_DIR="."

echo "Starting deployment to S3..."

# Upload all files to S3
aws s3 sync "$SOURCE_DIR" "s3://$BUCKET" \
  --exclude "*.sh" \
  --exclude ".git/*" \
  --exclude "node_modules/*" \
  --exclude "*.DS_Store" \
  --exclude "./images/*" \
  --delete

# Check if upload was successful
if [ $? -ne 0 ]; then
  echo "S3 upload failed. Check your AWS credentials."
  exit 1
fi

echo "S3 upload successful!"
echo "Creating CloudFront invalidation..."

# Create CloudFront invalidation
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

# Check if invalidation was created
if [ $? -ne 0 ]; then
  echo "CloudFront invalidation failed."
  exit 1
fi

echo "Invalidation created: $INVALIDATION_ID"
echo "Waiting for invalidation to complete..."

# Wait for invalidation to finish
aws cloudfront wait invalidation-completed \
  --distribution-id "$DISTRIBUTION_ID" \
  --id "$INVALIDATION_ID"

echo "Deployment complete! Your changes are live at:"
echo "   https://d1cq6wgq3znilx.cloudfront.net"