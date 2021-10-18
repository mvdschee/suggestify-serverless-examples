const { createClient } = require("@supabase/supabase-js");

const config = {
	INTERNAL_ERROR: "Woopsie, we will look into it!",
	SUCCESS: "ok",
	SANITIZE: {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#x27;",
		"`": "&grave;",
		"/": "&#x2F;",
	},
};

const secrets = {
	url: process.env.SUPABASE_URL,
	team_id: process.env.SUPABASE_TEAM_ID,
	prefix: process.env.SUPABASE_PREFIX,
	service_key: process.env.SUPABASE_SERVICE_KEY,
};

const supabase = createClient(secrets.url, secrets.service_key);

module.exports.handler = async (event) => {
	let response;

	if (event) {
		const { body } = event;
		const parsed = JSON.parse(body);

		const value = sanitize(parsed.value);
		const success = sanitize(parsed.success);

		if (value) {
			try {
				if (success === "MISS" || success === "HIT") await EventsHandler({ value, success });
				await SuggstionHandler({ value });

				response = {
					statusCode: 200,
					headers: {
						"Content-Type": "text/plain",
					},
					body: config.SUCCESS,
				};
			} catch (error) {
				console.log(error);
				response = {
					statusCode: 200,
					headers: {
						"Content-Type": "text/plain",
					},
					body: config.INTERNAL_ERROR,
				};
			}
		}
	}

	return response;
};

const SuggstionHandler = async ({ value }) => {
	const suggestions = `${secrets.prefix}_suggestions`;
	const dataset = {
		value,
		team_id: secrets.team_id,
	};

	try {
		const { data } = await supabase.from(suggestions).select("*").eq("value", value);

		if (data && data.length) {
			await supabase
				.from(suggestions)
				.update({ hits: data[0].hits + 1 })
				.eq("id", data[0].id);
		} else {
			await supabase.from(suggestions).insert(dataset);
		}
	} catch (error) {
		console.log(error);
	}
};

const EventsHandler = async ({ value, success }) => {
	const events = `${secrets.prefix}_events`;
	const dataset = {
		value,
		success,
		team_id: secrets.team_id,
	};

	try {
		await supabase.from(events).insert(dataset);
	} catch (error) {
		console.log(error);
	}
};

const sanitize = (input) => {
	const reg = /[&<>"'/`]/gi;
	return input.replace(reg, (match) => config.SANITIZE[match]).trim();
};
