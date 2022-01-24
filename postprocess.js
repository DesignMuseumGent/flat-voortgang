// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, json, excel, zip, and image files
import { readCSV, writeJSON } from 'https://deno.land/x/flat@0.0.11/mod.ts' 

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const csv = await readCSV(filename)
console.log(csv)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const currencyRates = {'foo': 'bar'}

// Step 3. Write a new JSON file with our filtered data
const newFilename = `voortgang-postprocessed.csv` // name of a new file to be saved
await writeJSON(newFilename, currencyRates) // create a new JSON file with just the Bitcoin price
console.log("Wrote a post process file")
