const fs = require('fs/promises');

const write = async (data) => {
    try {
         await fs.writeFile('data.json', JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = write;
