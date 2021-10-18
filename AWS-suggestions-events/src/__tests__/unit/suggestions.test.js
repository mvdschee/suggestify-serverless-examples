const lambda = require("../../suggestions/index");

describe("🎉 Test for index.js", function () {
	it("Verifies successful initial response", async () => {
		const result = await lambda.handler();
		const body = JSON.parse(result.body);

		expect(body).toHaveProperty("type", "suggestions");
		expect(body).toHaveProperty("items");
		expect(body).toHaveProperty("time", "0ms");
	});

	it("Verifies successful normal response", async () => {
		const event = {
			queryStringParameters: {
				q: "test",
			},
		};

		const result = await lambda.handler(event);
		const body = JSON.parse(result.body);

		expect(body).toHaveProperty("type", "results");
		expect(body).toHaveProperty("items");
		expect(body).toHaveProperty("time");
	});

	it("Verifies successful empty response", async () => {
		const event = {
			queryStringParameters: {
				q: "00000000000000000000",
			},
		};

		const result = await lambda.handler(event);
		const body = JSON.parse(result.body);

		expect(body).toHaveProperty("type", "empty");
		expect(body).toHaveProperty("items", []);
		expect(body).toHaveProperty("time");
	});
});
