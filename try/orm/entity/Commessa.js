var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Commessa",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true  
    },
    matricola: {
      type: String
    },
    tipo: {
      type: String
    },
    cliente: {
      type: String
    },
    riferimento: {
      type: String
    }
  }
});
