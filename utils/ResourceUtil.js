const { Resource } = require('../models/Resource');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}

async function viewBlogs(req, res) {
    try {
        const allResources = await readJSON('utils/resources.json');
        return res.status(201).json(allResources);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function addResource(req, res) {
    try {
      const title = req.body.title;
      const description = req.body.description;
      const author = req.body.author;
  
      const newResource = new Resource(title, description, author);
      const updatedResources = await writeJSON(newResource, 'utils/resources.json');
      return res.status(201).json(updatedResources);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  

async function editResource(req, res) {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const author = req.body.author;
        const allResources = await readJSON('utils/resources.json');
        var modified = false;
        for (var i = 0; i < allResources.length; i++) {
            var curcurrResource = allResources[i];
            if (curcurrResource.id == id) {
                allResources[i].title = title;
                allResources[i].description = description;
                allResources[i].author = author;
                modified = true;
            }
        }
        if (modified) {
            await fs.writeFile('utils/resources.json', JSON.stringify(allResources), 'utf8');
            return res.status(201).json({ message: 'Blog modified successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to modify!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    readJSON, writeJSON, viewBlogs, editResource, addResource
}