#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const fs = __importStar(require("fs/promises")); // to use methods of fs with promises support instead of using callback
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
console.log(figlet_1.default.textSync("WC Tool"));
const program = new commander_1.Command();
program
    .version("1.0.0")
    .description("A custom WC Tool made with love")
    .option("-c <value>", "Outputs the number of bytes in the file")
    .option("-l <value>", "Outputs the number of lines in the file")
    .option("-w <value>", "Outputs the number of words in a file")
    .parse(process.argv);
const options = program.opts();
const countingWords = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs.readFile(filePath, 'utf8');
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
        const words = data.split(/\s+/); // Split by whitespace characters (spaces, tabs, newline characters, etc.).
        const numberOfWords = words.length;
        console.log(numberOfWords);
    }
    catch (err) {
        console.log('Something went wrong...');
        console.dir(err); // <-- Printing the error object
        return;
    }
});
const countingLines = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs.readFile(filePath, 'utf8');
        let numberOfLines = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === '\n') { // new line character in unix
                numberOfLines++;
            }
            else if (data[i] === '\r' && data[i + 1] === '\n') { // new line in windows type
                numberOfLines++;
                i++; // Skip the next character ('\n')
            }
        }
        console.log(numberOfLines);
    }
    catch (err) {
        console.log('Something went wrong...');
        console.dir(err); // <-- Printing the error object
        return;
    }
});
const countingBytes = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs.readFile(filePath);
        console.log(data.length);
    }
    catch (err) {
        console.log('Something went wrong...');
        console.dir(err); // <-- Printing the error object
        return;
    }
});
// no options, that's no options have been passed, process.argv has only node, filename, and filepath as arguments
const noOption = () => __awaiter(void 0, void 0, void 0, function* () {
    const myFile = process.argv[2];
    yield countingLines(myFile);
    yield countingWords(myFile);
    yield countingBytes(myFile);
    console.log(myFile);
});
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
