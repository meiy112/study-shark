const Members = [
  { name: "Mustard", pfp: require("../../../assets/images/misc/lindy.jpg") },
  { name: "Almond", pfp: require("../../../assets/images/misc/jayee.jpg") },
  {
    name: "Dio Italiano",
    pfp: require("../../../assets/images/misc/majjie.jpg"),
  },
  {
    name: "Sigmund",
    pfp: require("../../../assets/images/misc/freud.jpg"),
  },
  {
    name: "Expo Go",
    pfp: require("../../../assets/images/misc/rice.jpeg"),
  },
];

const GroupData = [
  {
    title: "Jaywalkers",
    numMats: 12,
    members: [Members[0], Members[1], Members[2], Members[3], Members[4]],
    joinCode: "LXA8H14G9",
  },
  {
    title: "Psychoanalysis",
    numMats: 69,
    members: [Members[3], Members[4]],
    joinCode: "B6A87VX1A",
  },
];

export default GroupData;
