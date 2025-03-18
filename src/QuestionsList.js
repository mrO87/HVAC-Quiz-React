  const questions = [
    {
        id : 0,
      text: "Het koelvermogen, dat door de verdamper opgenomen wordt, verkleint als:",
      options: [
        { text: "zijn oppervlakte groter gekozen wordt", isCorrect: false },
        { text: "de verdampingstemperatuur meer verschilt van de celtemperatuur", isCorrect: false },
        { text: "de verdampingstemperatuur minder verschilt van de cel temperatuur", isCorrect: true },
        { text: "de celtemperatuur stijgt", isCorrect: false },
      ],
      explanationPrompt: "waarom verkleint het koelvermogen als de verdampingtemperatuur minder verschilt van de cel temperatuur",
    },
    {
        id : 1,
      text: "Who wrote 'To Kill a Mockingbird'?",
      options: [
        { text: "Harper Lee", isCorrect: true },
        { text: "Mark Twain", isCorrect: false },
        { text: "J.K. Rowling", isCorrect: false },
        { text: "Ernest Hemingway", isCorrect: false },
      ],
      explanationPrompt: "Who wrote 'To kill a mockingbird'?",
    },
  ];
  export default questions;