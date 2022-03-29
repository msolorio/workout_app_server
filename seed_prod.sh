curl -X POST \
-H "Content-Type: application/json" \
-d '{ "query": "mutation { seed { workouts { id } } }" }' \
http://${HEROKU_APP_NAME}.herokuapp.com/graphql
