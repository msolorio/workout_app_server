# docker exec -it app \
curl -X POST \
-H "Content-Type: application/json" \
-d '{ "query": "mutation { seed { workouts { id } } }" }' \
http://app:4000/graphql

