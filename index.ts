#! /usr/bin/env node

import figlet from 'figlet';
import { Command } from 'commander';
import * as fs from 'fs/promises'; // to use methods of fs with promises support instead of using callback

// fix the path thing, using path module to make this tool global

/*
figlet("WC TOOL", (err,data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err); // <-- Printing the error object
        return;
    }
    console.log(data);
});
*/

// using synchronous stuff, ain't a good thing but promises will take a while to write so...
console.log(figlet.textSync("WC Tool"));

const program = new Command();

program
   .version("1.0.0")
   .description("A custom WC Tool made with love")
   .option("-c <value>", "Outputs the number of bytes in the file")
   .option("-l <value>", "Outputs the number of lines in the file")
   .option("-w <value>", "Outputs the number of words in a file")
   .parse(process.argv);

const options = program.opts();

const countingWords = async(filePath: string): Promise<void> => { // not ideal implementation, but almost there
    try {
        const data: string = await fs.readFile(filePath, 'utf8');
        /*
        let numberOfSpaces: number = 0;
        for (let i: number = 0; i <= data.length; i++) {
            if (data[i] == " ") {
                numberOfSpaces++;
            }
        }
        console.log(numberOfSpaces + 1);
        */
        //const words: string[] = data.split(/\b\W+\b/); // Split by word boundaries
        const words: string[] = data.split(/\s+/); // Split by whitespace characters (spaces, tabs, newline characters, etc.).
        const numberOfWords: number = words.length;
        console.log(numberOfWords);
    }
    catch(err) {
        console.log('Something went wrong...');
        console.dir(err); // <-- Printing the error object
        return;
    }
}

const countingLines = async(filePath: string): Promise<void> => { // perfect implementation
    try {
        const data: string = await fs.readFile(filePath, 'utf8');
        let numberOfLines: number = 0;
        for (let i: number = 0; i < data.length; i++) {
            if (data[i] === '\n') { // new line character in unix
                numberOfLines++;
            } else if (data[i] === '\r' && data[i + 1] === '\n') { // new line in windows type
                numberOfLines++;
                i++; // Skip the next character ('\n')
            }
        }
        console.log(numberOfLines);
    }
    catch(err) {
        console.log('Something went wrong...');
        console.dir(err); // <-- Printing the error object
        return;
    }
}

const countingBytes = async(filePath: string): Promise<void> => { // perfect implementation 
    try {
        const data: Buffer = await fs.readFile(filePath);
        console.log(data.length);
    }
    catch (err) {
        console.log('Something went wrong...');
        console.dir(err); // <-- Printing the error object
        return;
    }
}

// no options, that's no options have been passed, process.argv has only node, filename, and filepath as arguments
const noOption = async(): Promise<void> => {
    const myFile: string = process.argv[2];
    await countingLines(myFile);
    await countingWords(myFile);
    await countingBytes(myFile);
    console.log(myFile);
}

if (process.argv.length === 3) {
    noOption();
}
if (options.w) {
    countingWords(options.w);
}
if (options.l) {
    countingLines(options.l);
}
if (options.c) {
    countingBytes(options.c);
}