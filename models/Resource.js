class Resource {
    constructor(name, description, owner) {
    this.author = author;
    this.description = description;
    this.author = author;
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
    }
    module.exports = { Resource };