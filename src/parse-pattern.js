const SUPPORTED_LETTERS = new Set(['y', 'M', 'd', 'H', 'h', 'm', 's', 'S', 'a']);

/**
 * 将 SimpleDateFormat 模式字符串解析为 token 数组
 *
 * 支持的 pattern 字母: y M d H h m s S a
 * 不支持: Y(week year) D(day in year) E G w W F k K z Z X
 *
 * 转译规则（同 Java）:
 *   'text'   → 字面量文本，内部的 pattern 字母不被解释
 *   ''       → 字面量单引号 '
 *   'it''s'  → 字面量 it's（引号内用 '' 转义单引号）
 */
export function parsePattern(pattern) {
	const tokens = [];
	let i = 0;

	while (i < pattern.length) {
		const ch = pattern[i];

		if (ch === "'") {
			i++;
			if (i < pattern.length && pattern[i] === "'") {
				// '' → 字面量单引号
				tokens.push({ type: 'literal', value: "'" });
				i++;
			} else {
				// 引号内的文本
				let literal = '';
				while (i < pattern.length) {
					if (pattern[i] === "'") {
						if (i + 1 < pattern.length && pattern[i + 1] === "'") {
							literal += "'";
							i += 2;
						} else {
							i++;
							break;
						}
					} else {
						literal += pattern[i];
						i++;
					}
				}
				tokens.push({ type: 'literal', value: literal });
			}
		} else if (SUPPORTED_LETTERS.has(ch)) {
			// 连续相同的 pattern 字母合并为一个 token
			let count = 1;
			while (i + count < pattern.length && pattern[i + count] === ch) {
				count++;
			}
			tokens.push({ type: 'pattern', value: ch.repeat(count) });
			i += count;
		} else {
			// 非模式字母 → 字面量
			let literal = '';
			while (i < pattern.length && !SUPPORTED_LETTERS.has(pattern[i]) && pattern[i] !== "'") {
				literal += pattern[i];
				i++;
			}
			tokens.push({ type: 'literal', value: literal });
		}
	}

	return tokens;
}
