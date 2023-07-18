#!/bin/bash
cd ..
VER_TYPE=$1
echo "Version type: $VER_TYPE"
PV=$(grep -Po "(?<=\"version\": \").*?(?=\")" package.json)
echo "package.json Last Version: $PV"
if [ -z "$PV" ]; then
  echo "package.json must have a version property";
  exit 1
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
pwd
ng build --aot --configuration "production"
firebase deploy --only hosting
git add .
git status
git commit -m "Deployed Version $PV"
git push
