const reverseWordsInSentence = (sentence) =>
  sentence
    .split(/\s+/)
    .map((word) => word.split("").reverse().join(""))
    .join(" ");

const inputSentence = "This is a sunny day";
const reversedSentence = reverseWordsInSentence(inputSentence);
//OUTPUT : sihT si a ynnus yad
console.log(reversedSentence);
