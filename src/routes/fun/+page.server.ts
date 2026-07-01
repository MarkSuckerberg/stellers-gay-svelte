import { WEATHER_LAT, WEATHER_LONG } from '$env/static/private';
import { fetchWeatherApi } from 'openmeteo';

type WeatherRecord<K extends string | number | symbol, V> = Record<K, V> & {
	time: V;
};

enum DailyEnum {
	'weather_code' = 'weather_code',
	'apparent_temperature_max' = 'apparent_temperature_max',
	'apparent_temperature_min' = 'apparent_temperature_min'
}

const dailyItems = Object.values(DailyEnum).filter((value) => typeof value == 'string');
type Daily = WeatherRecord<DailyEnum, Float32Array>;

enum HourlyEnum {
	'apparent_temperature' = 'apparent_temperature'
}

const hourlyItems = Object.values(HourlyEnum).filter((value) => typeof value == 'string');
type Hourly = WeatherRecord<HourlyEnum, Float32Array>;

enum CurrentEnum {
	'weather_code' = 'weather_code',
	'apparent_temperature' = 'apparent_temperature',
	'relative_humidity_2m' = 'relative_humidity_2m',
	'is_day' = 'is_day'
}

const currentItems = Object.values(CurrentEnum).filter((value) => typeof value == 'string');
type Current = WeatherRecord<CurrentEnum, number>;

const params = {
	latitude: WEATHER_LAT || 41.85,
	longitude: WEATHER_LONG || -87.65,
	daily: dailyItems,
	hourly: hourlyItems,
	current: currentItems,
	timezone: 'America/Chicago',
	timeformat: 'unixtime',
	temperature_unit: 'fahrenheit'
};

const lastData = {
	weatherNow: 'probably present',
	weatherFuture: 'hopefully present',
	updated: 0,
	day: true,
	error: ''
};

export async function load() {
	try {
		lastData.error = '';
		return GetWeatherData();
	} catch (error) {
		lastData.error = error as string;
		return lastData;
	}
}

async function GetWeatherData() {
	const now = Date.now();
	if (now - lastData.updated < 1000 * 60 * 15) {
		return lastData;
	}

	const response = (await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params)).at(
		0
	);

	if (response == undefined) {
		return lastData;
	}
	// Attributes for timezone and location
	const utcOffsetSeconds = response.utcOffsetSeconds();

	const currentData = response.current()!;
	const hourlyData = response.hourly()!;
	const dailyData = response.daily()!;

	const current = currentItems.values().reduce<Partial<Current>>(
		(dict, metric, index) => {
			dict[metric] = currentData.variables(index)!.value();
			return dict;
		},
		{ time: Number(currentData.time()) }
	) as Current;

	const hourlyRange = {
		time: Float32Array.from(
			{
				length:
					(Number(hourlyData.timeEnd()) - Number(hourlyData.time())) /
					hourlyData.interval()
			},
			(_, i) =>
				(Number(hourlyData.time()) + i * hourlyData.interval() + utcOffsetSeconds) * 1000
		)
	};

	const hourly = hourlyItems.values().reduce<Partial<Hourly>>((dict, metric, index) => {
		dict[metric] = hourlyData.variables(index)!.valuesArray()!;
		return dict;
	}, hourlyRange) as Hourly;

	const dailyRange = {
		time: Float32Array.from(
			{
				length:
					(Number(dailyData.timeEnd()) - Number(dailyData.time())) / dailyData.interval()
			},
			(_, i) =>
				(Number(dailyData.time()) + i * dailyData.interval() + utcOffsetSeconds) * 1000
		)
	};

	const daily = dailyItems.values().reduce<Partial<Daily>>((dict, metric, index) => {
		dict[metric] = dailyData.variables(index)!.valuesArray()!;
		return dict;
	}, dailyRange) as Daily;

	const currentHumidity = HumidityToText(current.relative_humidity_2m);

	const hourlyTempHigh = Math.max(...hourly.apparent_temperature);
	const hourlyTempLow = Math.min(...hourly.apparent_temperature);

	const highsHourly = Math.floor(hourlyTempHigh / 10);
	const lowsHourly = Math.floor(hourlyTempLow / 10);

	const tempsText =
		highsHourly == lowsHourly
			? `temps in the ${highsHourly}0s`
			: `highs in the ${highsHourly}0s and lows in the ${lowsHourly}0s`;

	if (currentHumidity) {
		lastData.weatherNow = CodeToText(
			current.weather_code,
			`${TempToText(current.apparent_temperature)} and ${currentHumidity}, ${tempsText}`
		);
	} else {
		lastData.weatherNow = CodeToText(
			current.weather_code,
			`${TempToText(current.apparent_temperature)}, ${tempsText}`
		);
	}

	const avgDailyTempHigh =
		daily.apparent_temperature_max.reduce((prev, curr) => prev + curr) /
		daily.apparent_temperature_max.length;
	const avgDailyTempLow =
		daily.apparent_temperature_min.reduce((prev, curr) => prev + curr) /
		daily.apparent_temperature_min.length;

	const modeDailyCode =
		daily.weather_code
			.reduce((array, code) => {
				const current = array.get(code) || 0;
				array.set(code, current + 1);
				return array;
			}, new Map<number, number>())
			.entries()
			.toArray()
			.sort((a, b) => b[1] - a[1])
			.at(0)
			?.at(0) || 0;

	const tempHighText = TempToText(avgDailyTempHigh);
	const tempLowText = TempToText(avgDailyTempLow);

	const highsDaily = Math.floor(avgDailyTempHigh / 10);
	const lowsDaily = Math.floor(avgDailyTempLow / 10);

	if (tempHighText == tempLowText) {
		lastData.weatherFuture = CodeToText(
			modeDailyCode,
			`${tempHighText}, temps in the ${highsDaily}0s`
		);
	} else {
		lastData.weatherFuture = CodeToText(
			modeDailyCode,
			`${tempLowText} to ${tempHighText}, highs in the ${highsDaily}0s and lows in the ${lowsDaily}0s`
		);
	}

	lastData.day = current.is_day == 1;
	lastData.updated = now;

	return lastData;
}

function HumidityToText(humidity: number) {
	switch (true) {
		case humidity > 80:
			return 'extremely humid';
		case humidity > 60:
			return 'humid';
		case humidity > 40:
			return null;
		case humidity > 30:
			return 'dry';
		default:
			return 'extremely dry';
	}
}

function TempToText(temp: number) {
	switch (true) {
		case temp > 100:
			return 'very hot';
		case temp > 80:
			return 'hot';
		case temp > 70:
			return 'warm';
		case temp > 60:
			return 'temperate';
		case temp > 40:
			return 'cool';
		case temp > 30:
			return 'cold';
		default:
			return 'frigid';
	}
}

function CodeToText(code: number, text: string) {
	switch (code) {
		case 0:
			return text + ' with clear skies';
		case 1:
			return text + ' with mostly clear skies';
		case 2:
			return 'cloudy, ' + text;
		case 3:
			return 'overcast, ' + text;

		case 45:
		case 48:
			return 'foggy, ' + text;

		case 51:
		case 56:
			return 'lightly drizzling, ' + text;
		case 52:
		case 53:
		case 57:
			return 'drizzling, ' + text;

		case 61:
			return text + ' with light rain';
		case 63:
			return text + ' with raining';
		case 65:
			return text + ' with heavy rain';
		case 66:
		case 67:
			return text + ' with freezing rain';

		case 71:
		case 77:
			return 'lightly snowing, ' + text;
		case 73:
			return 'snowing, ' + text;
		case 75:
			return 'heavily snowing, ' + text;

		case 80:
			return text + ' with light showers';
		case 81:
			return text + ' with rain showers';
		case 82:
			return text + ' with violent showers';

		case 85:
			return text + 'with snow showers';
		case 86:
			return text + ' with heavy snow showers';

		case 95:
			return 'stormy, ' + text;
		case 96:
		case 99:
			return 'stormy, ' + text + ' with hail';

		default:
			return text;
	}
}
