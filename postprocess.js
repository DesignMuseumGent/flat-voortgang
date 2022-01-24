// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, json, excel, zip, and image files
import { readCSV, writeJSON } from 'https://deno.land/x/flat@0.0.11/mod.ts'

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0]; // Same name as downloaded_filename `const filename = 'btc-price.json';`
const csv = await readCSV(filename)
let list = []

for(let r in csv) {
  if(csv[r].objectnummer) {
    list.push(csv[r])
  }
}

for(let l in list) {
  list[l]['status'] = {}
  if(list[l]['basisregistratie (fysiek object te bekijken)'] == "ok") {
    list[l]['status']['basisregistratie'] = 'groen';
  } else {
    list[l]['status']['basisregistratie'] = 'rood';
  }

  if(list[l]['staat te ontsluiten beeld op de R-schijf in groot formaat?'] == "ok") {
    list[l]['status']['beeldOpRSchijf'] = 'groen';
  } else {
    list[l]['status']['beeldOpRSchijf'] = 'rood';
  }

  if(list[l]['inhoudelijke registratie koepel en deelnummers'] == "ok") {
    list[l]['status']['inhoudelijkeRegistratie'] = 'groen';
  } else {
    list[l]['status']['inhoudelijkeRegistratie'] = 'rood';
  }

  if(list[l]['fotorechten'] == "geklaard") {
    list[l]['status']['fotoRechten'] = 'groen';
  } else {
    list[l]['status']['fotoRechten'] = 'rood';
  }

  if(list[l]['toestemmingAuteursrecht'] == "geklaard" || list[l]['toestemmingAuteursrecht'] == "ok") {
    list[l]['status']['auteursrechten'] = 'groen';
  } else {
    list[l]['status']['auteursrechten'] = 'rood';
  }

  if(list[l]['publicatie op coghent (via europeana)'].search("geklaard") || list[l]['publicatie op coghent (via europeana)'].search("ok") || list[l]['publicatie op coghent (via europeana)'].search("OK")) {
    list[l]['status']['publicatieEuropeana'] = 'groen';
  } else {
    list[l]['status']['publicatieEuropeana'] = 'rood';
  }

  if(list[l]['publicatie op erfgoedinzicht'].search("geklaard") || list[l]['publicatie op erfgoedinzicht'].search("ok") || list[l]['publicatie op erfgoedinzicht'].search("OK")) {
    list[l]['status']['publicatieErfgoedinzicht'] = 'groen';
  } else {
    list[l]['status']['publicatieErfgoedinzicht'] = 'rood';
  }

  let naam = list[l]['naam'];
  let objectnummer = list[l]['objectnummer']
  list[l] = list[l].status
  list[l].naam = naam;
  list[l].objectnummer = objectnummer;

}


// Step 2: Filter specific data we want to keep and write to a new JSON file


// Step 3. Write a new JSON file with our filtered data
const newFilename = `voortgang-postprocessed.json` // name of a new file to be saved
await writeJSON(newFilename, list) // create a new JSON file with just the Bitcoin price
console.log("Wrote a post process file")
