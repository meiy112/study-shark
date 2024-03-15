import { createServer } from "miragejs"

if (window.server) {
  server.shutdown()
}

export default window.server = createServer({
  models: {
    topic: Model,
  },

  seeds(server) {
    server.create('topic', {id: "1", title: "Phys901", })
  },

  routes() {
    this.get("/topic/:id", () => {
      return {
        movies: [
          { id: 1, name: "Inception", year: 2010 },
          { id: 2, name: "Interstellar", year: 2014 },
          { id: 3, name: "Dunkirk", year: 2017 },
        ],
      }
    });


  },
});

