#!/bin/bash

# Hardcoded package name
PACKAGE_NAME="com.netflix.homeapp"

# Get the version name
VERSION_NAME=$(adb shell dumpsys package "$PACKAGE_NAME" | grep versionName | awk -F'=' '{print $2}')

# Print the version name
echo "$VERSION_NAME"
