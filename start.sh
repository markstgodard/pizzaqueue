LICENSE_FILE='./newrelic-license'
[ ! -f $LICENSE_FILE ] || [ -z $LICENSE_FILE ] && echo "Can't find $LICENSE_FILE" && exit 1;
LICENSE=$(cat $LICENSE_FILE)

export NEW_RELIC_APP_NAME='AH-Q-TIME'
export NEW_RELIC_LICENSE_KEY=$LICENSE
export NEW_RELIC_NO_CONFIG_FILE=true
