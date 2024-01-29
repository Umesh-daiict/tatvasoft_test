const fetchFromDatabase = async (key) => {
	// Simulate fetching data from the database
	// Replace this with your actual database query
	console.log('Fetching data from the database...');
	return `Data for key: ${key}`;
};

//can cache first 10 get data
const getData = async (key) => {
	const cachedData = await redisClient.get(key);

	if (cachedData) {
		console.log('Data found in the cache:', cachedData);
		return JSON.parse(cachedData);
	}

	const newData = await fetchFromDatabase(key);
	await redisClient.set(key, JSON.stringify(newData), 'EX', 3600); // Cache for 1 hour
	console.log('Data fetched from the database:', newData);
	return newData;
};
