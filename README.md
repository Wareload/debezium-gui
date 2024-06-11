# Debezium Gui


````bash
curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" http://localhost:8083/connectors/ -d @example-debezium-connectors/source-register-postgres.json
````


````bash
curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" http://localhost:8083/connectors/ -d @example-debezium-connectors/sink-register-postgres.json
````
