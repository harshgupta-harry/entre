#!/bin/sh

case "$1" in
    develop)
        tag="develop"
        ;;

    uat)
        tag="uat"
        ;;

    production)
        tag="production"
        ;;

    *)
        echo $"Usage: $0 {develop|uat|production}"
        exit 1
esac

## TODO: change .env variables according to platform, maybe use AWS secret manager?

npm run-script build
docker build -t entre/web:$tag .
docker tag entre/web:$tag 262905279692.dkr.ecr.us-east-1.amazonaws.com/entre/web:$tag
aws ecr get-login-password | docker login --username AWS --password-stdin 262905279692.dkr.ecr.us-east-1.amazonaws.com
docker push 262905279692.dkr.ecr.us-east-1.amazonaws.com/entre/web:$tag
aws ecs update-service --cluster entre-web --service fe-$tag --force-new-deployment