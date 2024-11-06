class Resource {
    constructor(title, description, author) {
      this.title = title;
      this.description = description;
      this.author = author;
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
  }
  
  module.exports = { Resource };
  