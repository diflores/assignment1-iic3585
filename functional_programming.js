// Tarea 1, Grupo 1
const fs = require('fs');
// Fuente: https://stackoverflow.com/questions/6456864/why-does-node-js-fs-readfile-return-a-buffer-instead-of-string
const fileText = fs.readFileSync('example.txt', 'utf8');

// Fuente: diapositivas clase funcional 2
const pipe = functions => data => {
  return functions.reduce(
    (value, func) => func(value),
    data,
  );
};

// Funciones de modificación
// https://regex101.com/
const sentencesSpaces = n => text => (
  text.replace(/\. +/g, ".".concat(" ".repeat(n)))
);
const paragraphsSeparation = n => text => (
  text.replace(/\.\n+/g, ".".concat("\n".repeat(n + 1)))
);
const textWidth = n => text => null;
const paragraphsIndentation = n => text => (
  text.replace(/\.\n+/g, text.match(/\.\n+/g)[0].concat(" ".repeat(n)))
);
const paragraphsMinSentences = n => text => (
  text.split(/.\n+/g).filter(paragraph => paragraph.match(/\w\./g) ? paragraph.match(/\w\./g).length >= n - 1 : true).join(text.match(/\.\n+/g)[0])
);
const paragraphsMaxSentences = n => text => (
  text.split(/.\n+/g).filter(paragraph => paragraph.match(/\w\./g) ? paragraph.match(/\w\./g).length <= n - 1 : true).join(text.match(/\.\n+/g)[0])
);
const OneSentencePerParagraph = text => (
  text.replace(/\. +/g, ".\n")
);
const sentencesPerParagraph = n => text => (
  text.split(".\n").map(paragraph => (
    paragraph.split(". ").slice(0, n).join(". ")
  )).join(".\n")
);

const pipeline = pipe([
  sentencesSpaces(5),
  paragraphsSeparation(5),
  paragraphsIndentation(4),
  paragraphsMinSentences(10),
  paragraphsMaxSentences(13),
  sentencesPerParagraph(2),
]);

const modifiedText = pipeline(fileText);
console.log(modifiedText);
