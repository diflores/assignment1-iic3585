// Functional Programming Assignment
// Authors: Daniela Flores - Javiera Jorquera
const fs = require("fs");
const _ = require("lodash");

// Source: https://stackoverflow.com/questions/6456864/why-does-node-js-fs-readfile-return-a-buffer-instead-of-string
const fileText = fs.readFileSync("example.txt", "utf8");

// Source: class slides
const pipe = functions => data => (
  functions.reduce((value, func) => func(value), data)
);

// Regex testing and explanations:
// https://regex101.com/
const sentencesSpaces = n => text => (
  text.replace(/\. +/g, ".".concat(" ".repeat(n)))
);

const paragraphsSeparation = n => text => (
  text.replace(/\.\n+/g, ".".concat("\n".repeat(n + 1)))
);

// Source (adapted from Python): https://stackoverflow.com/questions/9894983/wrapping-a-text-file-so-that-each-line-contain-a-maximum-of-80-characters
// Regex finds all lines longer than n, keeping the closest full word in the line.
// Map removes remaining whitespaces from those lines.
// Join sends all characters from lines longer than n to the following line.
const textWidth = n => text => (
  text
    .match(RegExp(`[\\S\\s]{1,${n}}(?:\\s+|$)`, "g"))
    .map(line => _.trim(line))
    .join("\n")
);

const paragraphsIndentation = n => text => (
  text.replace(/\S/, " ".repeat(n).concat(text.match(/\S/))).replace(/\.\n+/g, text.match(/\.\n+/g)[0].concat(" ".repeat(n)))
);

const paragraphsMinSentences = n => text => (
  text
    .split(/\.\n+/g)
    .filter(paragraph =>
      paragraph.match(/\w\./g) ? paragraph.match(/\w\./g).length >= n - 1 : true
    )
    .join(text.match(/\.\n+/g)[0])
);

const paragraphsMaxSentences = n => text => (
  text
    .split(/\.\n+/g)
    .filter(paragraph =>
      paragraph.match(/\w\./g) ? paragraph.match(/\w\./g).length <= n - 1 : true
    )
    .join(text.match(/\.\n+/g)[0])
);

const OneSentencePerParagraph = text => text.replace(/\. +/g, ".\n");

const sentencesPerParagraph = n => text => (
  text
    .split(".\n")
    .map(paragraph =>
      paragraph
        .split(". ")
        .slice(0, n)
        .join(". ")
    )
    .join(".\n")
);

const pipeline = pipe([
  textWidth(80),
  sentencesSpaces(5),
  paragraphsSeparation(5),
  paragraphsIndentation(4),
  paragraphsMinSentences(10),
  paragraphsMaxSentences(13),
  sentencesPerParagraph(2),
]);

const modifiedText = pipeline(fileText);
fs.writeFileSync("modified_text.txt", modifiedText, { encoding: "utf-8" });
