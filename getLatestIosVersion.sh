#!/bin/bash

# Endpoint URL
#url="https://center.ms/v0.1/apps/netflix-Organization/sample-Regression-iOS/releases"

# Convert input argument to lowercase
env=$(echo "$1" | tr '[:upper:]' '[:lower:]')

# Endpoint URL based on environment
case "$env" in
"regression")
    url="https://center.ms/v0.1/apps/netflix-Organization/sample-Regression-iOS/releases"
    ;;
"uat")
    url="https://center.ms/v0.1/apps/netflix-Organization/sample-UAT-iOS/releases"
    ;;
"nightly")
    url="https://center.ms/v0.1/apps/netflix-Organization/sample-iOS/releases"
    ;;
*)
    echo "Error: Invalid environment specified. Usage: $0 <qa|prod|dev>"
    exit 1
    ;;
esac

# API token
api_token="f1d2259fe9fc69d68b027c254c5cabc9ea8d317b"

# Perform the curl request and store the response in a variable
response=$(curl -s -X GET "$url" -H "X-API-Token: $api_token")

# Check if curl was successful
if [ $? -eq 0 ]; then
    # Extract the desired value from the response (adjust as per your requirement)

    # Sort releases based on the uploaded_at timestamp in descending order
    sorted_response=$(echo "$response" | jq 'sort_by(.uploaded_at) | reverse')

    # Extract the short_version attribute of the latest release
    value1=$(echo "$sorted_response" | jq -r '.[0].short_version')
    value2=$(echo "$sorted_response" | jq -r '.[0].version')

    combinedValue="$value1($value2)" # Corrected the combination here
    # Output the value
    echo "$combinedValue"
else
    # Curl request failed
    echo "Error: Curl request failed"
    exit 1
fi
