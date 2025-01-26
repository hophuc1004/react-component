aws s3 sync dist s3://cs-hrm-fe --delete --profile codestringers
aws cloudfront create-invalidation --distribution-id E2JN217O5A24O6 --paths "/*" --profile codestringers