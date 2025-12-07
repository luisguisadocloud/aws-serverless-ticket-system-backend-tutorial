#!/bin/bash

set -e

FUNCTION_NAME="dev-tsb-lmb-crud"
REGION="us-east-1"

echo "Building deployment package..."
npm run zip

echo "Deploying to AWS Lambda function: $FUNCTION_NAME"
aws lambda update-function-code \
  --function-name "$FUNCTION_NAME" \
  --zip-file fileb://deployment-package.zip \
  --region "$REGION"

echo "Deployment completed successfully!"
