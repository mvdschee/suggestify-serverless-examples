const SuggestifyEngine = require("suggestify-engine");
const _default = require("./data/default.json");
const _sorted = require("./data/sorted.json");
const _recommended = require("./data/recommended.json");

const suggestifyEngine = new SuggestifyEngine({
	defaultItems: _default,
	sortedItems: _sorted,
	options: {
		MIN_DISTANCE: 4,
		ITEM_CAP: 8,
	},
});

module.exports.handler = async (event) => {
	let response;

	if (event && event.queryStringParameters && event.queryStringParameters["q"]) {
		const userInput = event.queryStringParameters["q"];

		try {
			let start = process.hrtime();
			const sortedItems = await suggestifyEngine.getResults(userInput);
			let stop = process.hrtime(start);

			response = {
				statusCode: 200,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: sortedItems.length ? "results" : "empty",
					items: sortedItems,
					time: `${(stop[0] * 1e3 + stop[1] / 1e6).toFixed(2)}ms`,
				}),
			};
		} catch (error) {
			console.error(error);

			response = {
				statusCode: 500,
				headers: {
					"Content-Type": "text/plain",
				},
				body: "Woopsie, we will look into it!",
			};
		}
	} else {
		response = {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type: "suggestions",
				items: _recommended,
				time: "0ms",
			}),
		};
	}

	return response;
};
