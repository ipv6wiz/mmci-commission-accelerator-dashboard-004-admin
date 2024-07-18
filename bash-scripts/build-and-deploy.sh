#!/bin/bash
if ! firebase login; then
  echo "Firebase login failed - trying --reauth"
  if ! firebase login --reauth; then
    echo "Firebase login --reauth failed"
    exit 1
  fi
fi
cd ..
while getopts v:m: flag
do
    case "${flag}" in
    v) VER_TYPE=${OPTARG};;
    m) MSG=${OPTARG};;
    *) ;;
    esac
done
if [ -z "$VER_TYPE" ]; then
    VER_TYPE="PATCH"
fi
echo "Version type: $VER_TYPE"
PV=$(grep -Po "(?<=\"version\": \").*?(?=\")" package.json)
echo "package.json Last Version: $PV"
if [ -z "$PV" ]; then
  echo "package.json must have a version property";
  exit 1
fi

CV=$(grep -Po "(?<=version\: string \= ').*?(?=')" src/app/app.config.ts)
if [ -z "$CV" ]; then
    echo "app.config.ts must have a version property";
  exit 1
fi
echo "app.config.js Last Version: $CV"
if [ "$PV" != "$CV" ]; then
  echo "Versions in package.json ($PV) does not match version in app.config.js ($CV). Using package.json as golden source."
  sed -i -E "s/version: string = '(.*)'/version: string = '$PV'/" src/app/app.config.ts
fi

FIRST=$(echo -n "$PV" | cut -d "." -f 1)
SECOND=$(echo -n "$PV" | cut -d "." -f 2)
THIRD=$(echo -n "$PV" | cut -d "." -f 3)
if [ -z "$FIRST" ]; then
  FIRST=0
fi
if [ -z "$SECOND" ]; then
  SECOND=0
fi
if [ -z "$THIRD" ]; then
  THIRD=0
fi

#if [ "$FIRST" -eq 0 ]; then
#  FIRST=1
#fi

if [[ $VER_TYPE = "MAJOR" ]]
     then
       FIRST=$((FIRST + 1))
       SECOND="0"
       THIRD="0"
  elif [[ $VER_TYPE = "MINOR" ]]
    then
      SECOND=$((SECOND +1))
      THIRD="0"
  else
     THIRD=$((THIRD + 1))
fi

VER="$FIRST"."$SECOND"."$THIRD"
echo "New Version: $VER"
sed -i -E 's/"version": "(.*)"/"version": "'$VER'"/' package.json
sed -i -E "s/version: string = '(.*)'/version: string = '$VER'/" src/app/app.config.ts
pwd
echo "Save changes to GitHub first"
git add .
git status
git commit -m "Deployed Version $VER. $MSG"
git push
echo "deleting dist folder"
rm -rf dist
echo "Building Admin Dashboard"
# Check the exit code of the build command
if ! ng build --aot --configuration "production"; then
    # The build failed
    echo "Angular build failed"
    exit 1
fi
if ! firebase deploy --only hosting; then
      if ! firebase login --reauth; then
        echo "Firebase login --reauth failed"
        exit 1
      fi
      firebase deploy --only hosting
fi
echo "MMCI Admin Dashboard New Version: $VER"


