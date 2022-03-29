curl -X POST \
-H "Content-Type: application/json" \
-d '{ "query": "mutation { seed { workouts { id } } }" }' \
http://workout-app-docker.herokuapp.com/graphql
