const fs = require("fs")
const path = require("path")
const uuid = require("uuid")

const input = process.argv[2]
const matches = input.matchAll(new RegExp('((?<=\ForecastAPIGateway)(.*?= )(.*?)(?=\\n))', 'g'))

// matches is not an array, but iterator
let apiEndpoint = null
// noinspection LoopStatementThatDoesntLoopJS
for (const match of matches) {
    apiEndpoint = match[3].slice(0, -1)
    break
}

const postmanCollectionString = fs.readFileSync(path.join(__dirname, "ForecastPOC.postman_collection.json"), {
    encoding: "utf8"
})
const processedPostmanCollectionString = postmanCollectionString.replace("@API_GATEWAY_ENDPOINT", apiEndpoint)

const outputPostmanCollectionDirectory = "/tmp/ClearScale-ForecastPOC"
if (fs.existsSync(outputPostmanCollectionDirectory) === false) {
    fs.mkdirSync(outputPostmanCollectionDirectory)
}

const outputPostmanCollectionFilePath = `${outputPostmanCollectionDirectory}/${uuid.v4()}.json`
fs.writeFileSync(outputPostmanCollectionFilePath, processedPostmanCollectionString)
console.log(`Grab your Postman collection at ${outputPostmanCollectionFilePath}`)

