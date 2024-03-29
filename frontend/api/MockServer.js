import { createServer, Model } from "miragejs"

let mirageServer;

export function startServer() {
  mirageServer = createServer({
    models: {
      topic: Model, 
      tag: Model,
      color: Model,
    },

    // Seed data
    seeds(server) {
      server.create("topic", { id: "1", title: "Phys901", isPublic: true, lastOpened: new Date(), description: "Random fake description very fake pretend this is a description" }); 
      server.create("topic", { id: "2", title: "Chem123", isPublic: false, lastOpened: new Date(), description: "idk what to write here bro" }); 
      server.create("topic", { id: "3", title: "Math049", isPublic: false, lastOpened: new Date(), description: "Man my neck hurts" }); 
      server.create("topic", { id: "4", title: "Cpsc304", isPublic: true, lastOpened: new Date(), description: "blah blah blah blah blah blah blah ahhhhhhhhhhhh" }); 
      server.create("topic", { id: "5", title: "Hello World", isPublic: false, lastOpened: new Date(), description: "someone save me im not creative enough to come up with these" }); 
      server.create("topic", { id: "6", title: "How to swim", isPublic: false, lastOpened: new Date(), description: "description here" }); 
      server.create("topic", { id: "7", title: "Bible studies", isPublic: true, lastOpened: new Date(), description: "description here 2" }); 

      server.create("tag", { name: "Physics", color: "#5F2EB3" });
      server.create("tag", { name: "Chemistry", color: "#FF7A8B" });
      server.create("tag", { name: "Math", color: "#22B0D2" });
      server.create("tag", { name: "Biology", color: "#399CFF" });
      server.create("tag", { name: "Waves", color: "#9D3CA1" });
      server.create("tag", { name: "Showering", color: "#5F2EB3" });

      server.create("color", {name: "pink", primary: "#F5878D", gradient: "#B9568C", circle: "#B9568C"});
      server.create("color", {name: "blue", primary: "#22B0D2", gradient: "#1455CE", circle: "#1455CE"});
      server.create("color", {name: "purple", primary: "#5F2EB3", gradient: "#29144D", circle: "#3D1E73"});
      server.create("color", {name: "default", primary: "#5F2EB3", gradient: "#29144D", circle: "#3D1E73"});
      
    },

    // ROUTES 
    // - Oscar pls ignore the code inside the route, they dont actually reflect what the backend should do
    // - each route has a path as well as a comment describing what it should return. you should use
    //   as an interface to the backend api. 
    // - Some routes will have an example variable showing what fields are requried, for the ones without examples, 
    //   return the entire entity with all of its fields.
    // - None of these routes are actually complete, they all need user authentication which i have not yet included.
    routes() {
      this.urlPrefix = "http://localhost:3000"; 

      // already finished, can ignore this
      // AUTH -------------------------------
      this.post("/login", () => {
        return {
          "message": "User logged in successfully",
          "success": true,
          "token": "test"
        }
      });

      this.post("/signup", () => {
        return {
          "message": "User signed in successfully",
          "success": true,
          "token": "test"
        }
      });

      // USER -------------------------------
      // Return all topics for a given user
      this.get("/topic", (schema) => {
        return schema.topics.all();
      });

      // look at hardcoded example below
      this.get("/topic/home-page", (schema) => {
        const example = [
          {
            id: "1", // topic id
            title: "Phys901", // topic title
            isPublic: true, // topic isPublic
            date: "March 19, 2024", // lastOpened
            numNotes: 3, // count studymaterail of type "Notes" within this topic
            numCards: 5, // count studymaterail of type "Flashcard" within this topic
            numQuizzes: 2, // count studymaterail of type "Quiz" within this topic
            color: {name: "purple", primary: "#5F2EB3", gradient: "#29144D", circle: "#3D1E73"}, // topic color
          },
          {
            id: "2",
            title: "Chem123",
            isPublic: false,
            date: "March 23, 2024",
            numNotes: 21,
            numCards: 7,
            numQuizzes: 11,
            color: {name: "pink", primary: "#F5878D", gradient: "#B9568C", circle: "#B9568C"},
          },
          {
            id: "3",
            title: "Math049",
            isPublic: false,
            date: "April 9, 2049",
            numNotes: 49,
            numCards: 49,
            numQuizzes: 49,
            color: {name: "blue", primary: "#22B0D2", gradient: "#1455CE", circle: "#1455CE"},
          },
          {
            id: "4",
            title: "Cpsc304",
            isPublic: true,
            date: "March 14, 2024",
            numNotes: 11,
            numCards: 210,
            numQuizzes: 3,
            color: {name: "default", primary: "#5F2EB3", gradient: "#29144D", circle: "#3D1E73"},
          },
          {
            id: "5",
            title: "Hello World",
            isPublic: false,
            date: "January 29, 2025",
            numNotes: 23,
            numCards: 10,
            numQuizzes: 78,
            color: {name: "pink", primary: "#F5878D", gradient: "#B9568C", circle: "#B9568C"},
          },
          {
            id: "6",
            title: "How to swim",
            isPublic: false,
            date: "tee hee im not a date",
            numNotes: 34,
            numCards: 3,
            numQuizzes: 5,
            color: {name: "blue", primary: "#22B0D2", gradient: "#1455CE", circle: "#1455CE"},
          },
          {
            id: "7",
            title: "Bible Studies",
            isPublic: true,
            date: "December 25, 5 BC",
            numNotes: 5,
            numCards: 3,
            numQuizzes: 13,
            color: {name: "blue", primary: "#22B0D2", gradient: "#1455CE", circle: "#1455CE"},
          },
        ];
        return (example);
      });

      // Return topic by id. Only return data if topic's user is authorized user, or if topic is public
      this.get("/topic/:id/general-info", (schema, request) => {
        const example = {
          id: "1", // topic id
          title: "Phys901", // topic title
          description: "description here", // topic description
        }

        const { id } = request.params;
        return schema.topics.find(id).attrs;
      });

      // Given a topic id, Return all tags associated the topic
      this.get("/topic/:id/tags", (schema, request) => {
        return schema.tags.all().models; // fake data, currently returns all tags, doing this just for simplicity
      });

      // - Given a topic id, returns its sorted and filtered study material. 
      // - lastOpened field should be a string in the form of "January 01, 2025"
      // - numComponents is the number of components inside the study material. Is either number of pages, num of quizzes,
      //   or num of flashcards depending on type. Num of pages is #words / words_per_page rounded up. Havent yet decided on
      //   what words per page should be, you can choose some random number since it wont be hard to change.
      // - Query Params: 
      //    type: string, is either "Notes", "Flashcards", "Quiz", or "None". if not "None", filter by type, else return all
      //    sort: string, is either "lastOpened" or "alphabetical", Sort by either last opened date or alphabetically
      this.get("/topic/:id/studymaterial/", (schema, request) => {
        const { type, sort } = request.queryParams;

        const example = [
            {title: "Wave Interference", type: "Notes", lastOpened: "January 69, 2025", numComponents: 69},
            {title: "Simple Harmonic Motion", type: "Flashcards", lastOpened: "Febuary 12, 1992", numComponents: 19},
            {title: "Standing Waves", type: "Quiz", lastOpened: "April 2, 2937", numComponents: 9},
            {title: "1", type: "Notes", lastOpened: "January 20, 2006", numComponents: 26},
            {title: "2", type: "Flashcards", lastOpened: "September 28, 1078", numComponents: 20},
            {title: "3", type: "Notes", lastOpened: "Febuary 9, 3057", numComponents: 7},
            {title: "4", type: "Quiz", lastOpened: "December 90, 2004", numComponents: 32}
        ];

        return example;
      });

      // given a topic id and studymaterial title, delete the studymaterial
      this.delete("/topic/:id/studymaterial/:title", (schema, request) => {
        // blank
      });

      // get all the public topics in the database, sorted by most recently created first, filtered by subject
      // - all fields are same as /topic/home-page except lastOpened is replaced with dateCreated and there is no isPublic
      // QueryParams:
      //    - subject: string - return only topics that contains at least one tag with the given subject.
      //                        If subject is an empty string, return all public topics.
      this.get("/topic/featured", (schema, request) => {
        const example = [
          {
            id: "1", // topic id
            title: "Phys901", // topic title
            date: "March 19, 2024", // creation date
            numNotes: 3, // count studymaterial of type "Notes" within this topic
            numCards: 5, // count studymaterial of type "Flashcard" within this topic
            numQuizzes: 2, // count studymaterial of type "Quiz" within this topic
            color: {name: "purple", primary: "#5F2EB3", gradient: "#29144D", circle: "#3D1E73"}, // topic color
          },
          {
            id: "4",
            title: "Beep Boop",
            date: "March 14, 2024",
            numNotes: 11,
            numCards: 210,
            numQuizzes: 3,
            color: {name: "pink", primary: "#F5878D", gradient: "#B9568C", circle: "#B9568C"},
          },
          {
            id: "7",
            title: "How to be emo",
            date: "December 25, 5 BC",
            numNotes: 5,
            numCards: 3,
            numQuizzes: 13,
            color: {name: "blue", primary: "#22B0D2", gradient: "#1455CE", circle: "#1455CE"},
          },
        ];

        return example;
      });

      // - get all the public studymaterial in the database, sorted by most recently created first
      // - numComponents same as /topic/:id/studymaterial/
      // - date is date created
      this.get("/topic/studymaterial/featured", (schema, request) => {
        const example = [
          {title: "Standing Waves", type: "Quiz", date: "April 69, 6969", numComponents: 9, color: {name: "purple", primary: "#5F2EB3", gradient: "#29144D", circle: "#3D1E73"}, topicTitle: "PHYS901"},
          {title: "Stereochemistry", type: "Notes", date: "November 69, 2000", numComponents: 69, color: {name: "pink", primary: "#F5878D", gradient: "#B9568C", circle: "#B9568C"}, topicTitle:"CHEM123"},
          {title: "Space Meditation", type: "Flashcards", date: "April 1 1992", numComponents: 19, color: {name: "blue", primary: "#22B0D2", gradient: "#1455CE", circle: "#1455CE"}, topicTitle: "ASTR101"},
        ];

        return example;
      });

      // TAGS ------------------------------------
      // gets all the tags of all the topics belonging to the current user
      this.get("/tag", (schema) => {
        return schema.tags.all().models;
      }); 


    },
  });
}

export function stopServer() {
  if (mirageServer) {
    mirageServer.shutdown();
    mirageServer = null;
  }
}
