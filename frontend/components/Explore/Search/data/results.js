// Fake data for results
const colors = {
  purple: {
    name: "purple",
    primary: "#5F2EB3",
    gradient: "#29144D",
    circle: "#3D1E73",
  },
  pink: {
    name: "pink",
    primary: "#F5878D",
    gradient: "#B9568C",
    circle: "#B9568C",
  },
  blue: {
    name: "blue",
    primary: "#22B0D2",
    gradient: "#1455CE",
    circle: "#1455CE",
  },
};

const resultsData = [
  {
    title: "Phys901",
    date: "March 19,, 2024",
    numNotes: 3,
    numCards: 5,
    numQuizzes: 2,
    color: colors.purple,
  },
  {
    title: "Chem123",
    date: "March 23, 2024",
    numNotes: 21,
    numCards: 7,
    numQuizzes: 11,
    color: colors.pink,
  },
  {
    title: "Beep Boop",
    date: "i hate math",
    numNotes: 29,
    numCards: 45,
    numQuizzes: 22,
    color: colors.blue,
  },
  {
    title: "How to be emo",
    date: "September 11, 2000",
    numNotes: 0,
    numCards: 68,
    numQuizzes: 70,
    color: colors.purple,
  },
  {
    title: "Out of the cooking pot and into the fire",
    date: "September 11, 2012",
    numNotes: 0,
    numCards: 68,
    numQuizzes: 70,
    color: colors.purple,
  },
];

export default resultsData;
