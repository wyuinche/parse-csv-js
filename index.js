#!/usr/bin/env node

import Dotenv from 'dotenv'
Dotenv.config()

import csv from 'csv-parser'
import fs from 'fs'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const csvFilePath = join(__dirname, process.argv[2])
const jsonFilePath = join(__dirname, process.argv[3])

const results = []

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
        const row = Object.values(data)
        results.push(row)
    })
    .on('end', () => {
        fs.writeFile(jsonFilePath, JSON.stringify(results, null, 2), (err) => {
            if (err) {
                console.error('failed by error: ', err)
            } else {
                console.log('success')
            }
        });
    });