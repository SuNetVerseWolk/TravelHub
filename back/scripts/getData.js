const
	fs = require('fs'),
	path = require('path')

const getData = (filePath) => {
	filePath = path.join(__dirname, '../data', filePath + '.json');

	return (
		JSON.parse(
			fs.readFileSync(
				filePath,
				{encoding: 'utf8'}
			)
		)
	)
}
const getUsers = () => getData("users");
const getTours = () => getData("tours");
const getBooks = () => getData("books");

module.exports = {
	getUsers,
	getTours,
	getBooks,
	getData
}