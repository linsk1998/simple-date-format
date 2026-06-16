import SimpleDateFormat from "../dist/simple-date-format.mjs";
import assert from 'assert';

describe('parse', () => {
	it('yyyy-MM-dd HH:mm:ss', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss');
		var date1 = new Date(2000, 1, 1, 1, 1, 1);
		assert.strictEqual(dateFormat.parse("2000-02-01 01:01:01").getTime(), date1.getTime());
	});
	it('yyyy-MM-dd', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd');
		var date1 = new Date(2000, 1, 1);
		assert.strictEqual(dateFormat.parse("2000-02-01").getTime(), date1.getTime());
	});
	it('yyyy-MM-dd HH:mm:ss.SSS', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss.SSS');
		var date1 = new Date(2000, 1, 1, 1, 1, 1, 999);
		assert.strictEqual(dateFormat.parse("2000-02-01 01:01:01.999").getTime(), date1.getTime());
	});
	it('yyyy-MM-ddTHH:mm:ssZ', () => {
		var dateFormat1 = new SimpleDateFormat('yyyy-MM-ddTHH:mm:ssZ');
		var date1 = new Date(2000, 1, 1, 1, 1, 1);
		assert.strictEqual(dateFormat1.parse("2000-02-01T01:01:01Z").getTime(), date1.getTime());
	});
	it('single-letter patterns (y-M-d H:m:s)', () => {
		var dateFormat = new SimpleDateFormat('y-M-d H:m:s');
		var date1 = new Date(2000, 1, 1, 9, 5, 3);
		assert.strictEqual(dateFormat.parse("2000-2-1 9:5:3").getTime(), date1.getTime());
	});
	// 12 小时制 + AM/PM
	it('yyyy-MM-dd hh:mm a (PM)', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd hh:mm a');
		var date1 = new Date(2000, 0, 1, 13, 5, 0);
		assert.strictEqual(dateFormat.parse("2000-01-01 01:05 PM").getTime(), date1.getTime());
	});
	it('yyyy-MM-dd hh:mm a (AM)', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd hh:mm a');
		var date1 = new Date(2000, 0, 1, 9, 5, 0);
		assert.strictEqual(dateFormat.parse("2000-01-01 09:05 AM").getTime(), date1.getTime());
	});
	it('yyyy-MM-dd hh:mm a (noon)', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd hh:mm a');
		var date1 = new Date(2000, 0, 1, 12, 0, 0);
		assert.strictEqual(dateFormat.parse("2000-01-01 12:00 PM").getTime(), date1.getTime());
	});
	it('yyyy-MM-dd hh:mm a (midnight)', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd hh:mm a');
		var date1 = new Date(2000, 0, 1, 0, 0, 0);
		assert.strictEqual(dateFormat.parse("2000-01-01 12:00 AM").getTime(), date1.getTime());
	});
	it('h:m:s a (single letter, epoch default)', () => {
		var dateFormat = new SimpleDateFormat('h:m:s a');
		var date1 = new Date(1970, 0, 1, 9, 5, 3);
		assert.strictEqual(dateFormat.parse("9:5:3 AM").getTime(), date1.getTime());
	});
	// 转译 —— 引号包裹的字面量
	it('quoted literal text', () => {
		var dateFormat = new SimpleDateFormat("'Date:' yyyy-MM-dd");
		var date1 = new Date(2025, 5, 16);
		assert.strictEqual(dateFormat.parse("Date: 2025-06-16").getTime(), date1.getTime());
	});
	it('quoted pattern letters are not interpreted', () => {
		var dateFormat = new SimpleDateFormat("'yyyy-MM-dd' yyyy");
		var date1 = new Date(2025, 0, 1);
		assert.strictEqual(dateFormat.parse("yyyy-MM-dd 2025").getTime(), date1.getTime());
	});
	it('CJK literal characters', () => {
		var dateFormat = new SimpleDateFormat("yyyy'年'MM'月'dd'日'");
		var date1 = new Date(2025, 5, 16);
		assert.strictEqual(dateFormat.parse("2025年06月16日").getTime(), date1.getTime());
	});
	it("escaped single quote '' (with date)", () => {
		var dateFormat = new SimpleDateFormat("yyyy-MM-dd hh''mm");
		var date1 = new Date(2000, 0, 1, 9, 5, 0);
		assert.strictEqual(dateFormat.parse("2000-01-01 09'05").getTime(), date1.getTime());
	});
	it("quoted text with escaped quote 'it''s'", () => {
		var dateFormat = new SimpleDateFormat("yyyy 'it''s' MM");
		var date1 = new Date(2025, 5, 1);
		assert.strictEqual(dateFormat.parse("2025 it's 06").getTime(), date1.getTime());
	});
	// 相邻数字字段（无分隔符）
	it('yyyyMMdd (adjacent number fields)', () => {
		var dateFormat = new SimpleDateFormat('yyyyMMdd');
		var date1 = new Date(2000, 1, 1);
		assert.strictEqual(dateFormat.parse("20000201").getTime(), date1.getTime());
	});
	// yy (2 位年) 解析
	it('yy (2-digit year, within 80-year window)', () => {
		var dateFormat = new SimpleDateFormat('yy-MM-dd');
		var parsed = dateFormat.parse("25-06-16");
		assert.strictEqual(parsed.getFullYear(), 2025);
		assert.strictEqual(parsed.getMonth(), 5);
		assert.strictEqual(parsed.getDate(), 16);
	});
	it('yy (2-digit year, old year)', () => {
		var dateFormat = new SimpleDateFormat('yy-MM-dd');
		var parsed = dateFormat.parse("99-01-01");
		assert.strictEqual(parsed.getFullYear(), 1999);
	});
	// S (毫秒) 解析
	it('S (1-digit ms)', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss.S');
		var date1 = new Date(2000, 0, 1, 1, 1, 1, 9);
		assert.strictEqual(dateFormat.parse("2000-01-01 01:01:01.9").getTime(), date1.getTime());
	});
	// 解析失败返回 NaN
	it('parse failure returns NaN', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd');
		assert.strictEqual(dateFormat.parse("invalid"), NaN);
	});
});
