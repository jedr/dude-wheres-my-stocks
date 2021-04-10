#!/bin/bash

set -euxo pipefail

declare image_name="jedr/dude-wheres-my-stocks"

declare current_version
current_version=$(sed 's/.*"version": "\(.*\)".*/\1/;t;d' ./package.json)
# declare is_published
# is_published=$(docker manifest inspect "${image_name}:${current_version}" > /dev/null && echo "yes" || echo "no")
# [[ "${is_published}" == "yes" ]] && exit 0

docker buildx build --platform linux/arm/v7,linux/arm64,linux/amd64 --push --tag "${image_name}:${current_version}" .

# declare tag="v${current_version}"
# git tag --annotate --message="${tag}" "${tag}"
# git push origin "${tag}"