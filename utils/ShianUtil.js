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

async function deleteResource(req, res) {
    try {
        const id = req.params.id;
        const allResources = await readJSON('utils/resources.json');
        var index = -1;
        
        for (var i = 0; i < allResources.length; i++) {
            var currentResource = allResources[i];
            if (currentResource.id == id) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            allResources.splice(index, 1);
            await fs.writeFile('utils/resources.json', JSON.stringify(allResources), 'utf8');
            return res.status(201).json({ message: 'Resource deleted successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, resource unable to delete!' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred, resource unable to delete!', error: error.message });
    }
}



module.exports = {
    readJSON, writeJSON, deleteResource 
}