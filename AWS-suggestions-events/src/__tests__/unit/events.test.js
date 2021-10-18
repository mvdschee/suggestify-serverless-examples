const lambda = require("../../events/index");

describe("🎉 Test for index.js", function () {
	it("Verifies successful initial response", async () => {
		const result = await lambda.handler();

		expect(result).toBe(undefined);
	});

	it("Verifies successful normal response", async () => {
		const event = {
			body: JSON.stringify({
				value: "--test--",
				success: "MISS",
			}),
		};

		const result = await lambda.handler(event);
		// const body = JSON.parse(result.body);

		console.log(result);
	});

	// it("Verifies successful empty response", async () => {
	// 	const event = {
	// 		queryStringParameters: {
	// 			q: "00000000000000000000",
	// 		},
	// 	};

	// 	const result = await lambda.handler(event);
	// 	const body = JSON.parse(result.body);

	// 	expect(body).toHaveProperty("type", "empty");
	// 	expect(body).toHaveProperty("items", []);
	// 	expect(body).toHaveProperty("time");
	// });
});
