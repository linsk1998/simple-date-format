import { parsePattern } from './parse-pattern.js';

function pad(n, len) {
	return String(n).padStart(len, '0');
}



/** 12 小时制：0→12, 1→1, …, 12→12, 13→1, …, 23→11 */
function toH12(hours) {
	var h = hours % 12;
	return h === 0 ? 12 : h;
}

function formatValue(pattern, date) {
	var letter = pattern[0];
	var len = pattern.length;

	switch (letter) {
		case 'y': {
			var year = date.getFullYear();
			if (len === 2) return pad(year % 100, 2);
			return pad(year, len);
		}
		case 'M': {
			var month = date.getMonth() + 1;
			return len === 1 ? '' + month : pad(month, 2);
		}
		case 'd': {
			var day = date.getDate();
			return len === 1 ? '' + day : pad(day, 2);
		}
		case 'H': {
			var hours = date.getHours();
			return len === 1 ? '' + hours : pad(hours, 2);
		}
		case 'h': {
			var h = toH12(date.getHours());
			return len === 1 ? '' + h : pad(h, 2);
		}
		case 'm': {
			var minutes = date.getMinutes();
			return len === 1 ? '' + minutes : pad(minutes, 2);
		}
		case 's': {
			var seconds = date.getSeconds();
			return len === 1 ? '' + seconds : pad(seconds, 2);
		}
		case 'S': {
			var ms = date.getMilliseconds();
			return pad(ms, len);
		}
		case 'a':
			return date.getHours() < 12 ? 'AM' : 'PM';
		default:
			return pattern;
	}
}

function SimpleDateFormat(pattern) {
	this.pattern = pattern;
}

SimpleDateFormat.prototype.format = function(date) {
	var tokens = parsePattern(this.pattern);
	var result = '';
	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		if (token.type === 'literal') {
			result += token.value;
		} else {
			result += formatValue(token.value, date);
		}
	}
	return result;
};

SimpleDateFormat.prototype.parse = function(dateString) {
	var tokens = parsePattern(this.pattern);

	// 构建 parse 正则，收集 pattern token 及其对应捕获组
	var regexParts = [];
	var patternTokens = [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];

		if (token.type === 'literal') {
			regexParts.push(RegExp.escape(token.value));
		} else if (token.value[0] === 'a') {
			regexParts.push('(AM|PM)');
			patternTokens.push(token);
		} else {
			// 数字字段：若紧接另一个数字字段则使用固定长度，否则使用 \d+
			var nextToken = i + 1 < tokens.length ? tokens[i + 1] : null;
			var isNextNumber = nextToken && nextToken.type === 'pattern' && nextToken.value[0] !== 'a';

			if (isNextNumber) {
				regexParts.push('(\\d{' + token.value.length + '})');
			} else {
				regexParts.push('(\\d+)');
			}
			patternTokens.push(token);
		}
	}

	var regex = new RegExp('^' + regexParts.join('') + '$');
	var match = dateString.match(regex);
	if (!match) return NaN;

	var values = match.slice(1);

	// 收集解析字段
	var year, month, day, hours, minutes, seconds, millis, ampm;
	var is12Hour = false;

	for (var j = 0; j < patternTokens.length; j++) {
		var tk = patternTokens[j];
		var val = values[j];
		var letter = tk.value[0];
		var len = tk.value.length;

		switch (letter) {
			case 'y':
				year = parseInt(val, 10);
				if (len === 2) {
					// Java 默认 80 年窗口
					var now = new Date();
					var currentYear = now.getFullYear();
					var windowStart = currentYear - 80;
					var base = Math.floor(windowStart / 100) * 100;
					year = base + year;
					if (year < windowStart) {
						year += 100;
					}
				}
				break;
			case 'M':
				month = parseInt(val, 10);
				break;
			case 'd':
				day = parseInt(val, 10);
				break;
			case 'H':
				hours = parseInt(val, 10);
				is12Hour = false;
				break;
			case 'h':
				hours = parseInt(val, 10);
				is12Hour = true;
				break;
			case 'm':
				minutes = parseInt(val, 10);
				break;
			case 's':
				seconds = parseInt(val, 10);
				break;
			case 'S':
				millis = parseInt(val, 10);
				break;
			case 'a':
				ampm = val;
				break;
		}
	}

	// 12 小时制 + AM/PM 修正
	if (is12Hour) {
		if (ampm === 'PM') {
			if (hours < 12) hours += 12;
		} else if (ampm === 'AM') {
			if (hours === 12) hours = 0;
		}
	}

	// 构造 Date
	var date = new Date(0);
	date.setFullYear(year !== undefined ? year : 1970);
	date.setMonth(month !== undefined ? month - 1 : 0);
	date.setDate(day !== undefined ? day : 1);
	date.setHours(
		hours !== undefined ? hours : 0,
		minutes !== undefined ? minutes : 0,
		seconds !== undefined ? seconds : 0,
		millis !== undefined ? millis : 0
	);

	return date;
};

export default SimpleDateFormat;
