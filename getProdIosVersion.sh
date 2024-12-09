#!/bin/bash
# Hardcoded bundle ID
BUNDLE_ID="com.netflix.homeapp"

# Get the app ID
APP_ID=$(ideviceinstaller -l | grep "$BUNDLE_ID" | awk -F', ' '{print $2}' | tr -d '"')

# Print the app ID
echo "$APP_ID"
