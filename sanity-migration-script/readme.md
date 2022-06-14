# Sanity Migration Script

The node.js script that will run to get the JSON and upload all content to Sanity. In our case we used it with a Kirby 2 Website, but technically this should work with any other JSON.

## .env Variables
Please make sure to add a `.env` file with the necessary variables:
```
PROJECT_ID=""
DATASET=""
API_VERSION=""
TOKEN=""
```

## URL Setup
Also make sure to ping to the [right URL](projects.js#L3):
```js
const jsonUrl = "http://localhost:8888/sanity";
```

## Run the script
```bash
npm run migrate
```

## Explanation
Visit [our blog](https://ungroup.group/blog/kirby-sanity-content-migration) for the whole walkthrough.