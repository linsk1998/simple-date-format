import SimpleDateFormat from "../dist/simple-date-format.mjs";
import assert from 'assert';

describe('format', () => {
	it('yyyy-MM-dd HH:mm:ss', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss');
		var date1 = new Date(2000, 1, 1, 1, 1, 1, 999);
		assert.strictEqual(dateFormat.format(date1), "2000-02-01 01:01:01");
	});
	it('yyyy-MM-dd', () => {
		var dateFormat = new SimpleDateFormat('yyyy-MM-dd');
		var date1 = new Date(2000, 1, 1);
		assert.strictEqual(dateFormat.format(date1), "2000-02-01");
	});
	it('yyyy-MM-dd HH:mm:ss.SSS', () => {
		var dateFormat1 = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss.SSS');
		var date1 = new Date(2000, 1, 1, 1, 1, 1, 999);
		assert.strictEqual(dateFormat1.format(date1), "2000-02-01 01:01:01.999");
	});
	it('yyyy-MM-ddTHH:mm:ssZ', () => {
		var dateFormat1 = new SimpleDateFormat('yyyy-MM-ddTHH:mm:ssZ');
		var date1 = new Date(2000, 1, 1, 1, 1, 1, 999);
		assert.strictEqual(dateFormat1.format(date1), "2000-02-01T01:01:01Z");
	});
	it('single-letter patterns (y M d H m s)', () => {
		var dateFormat = new SimpleDateFormat('y-M-d H:m:s');
		var date1 = new Date(2000, 1, 1, 9, 5, 3);
		assert.strictEqual(dateFormat.format(date1), "2000-2-1 9:5:3");
	});
	// 12 小时制
	it('hh:mm a (1 PM)', () => {
		var dateFormat = new SimpleDateFormat('hh:mm a');
		var date1 = new Date(2000, 0, 1, 13, 5, 0);
		assert.strictEqual(dateFormat.format(date1), "01:05 PM");
	});
	it('hh:mm a (noon)', () => {
		var dateFormat = new SimpleDateFormat('hh:mm a');
		var date1 = new Date(2000, 0, 1, 12, 0, 0);
		assert.strictEqual(dateFormat.format(date1), "12:00 PM");
	});
	it('hh:mm a (midnight)', () => {
		var dateFormat = new SimpleDateFormat('hh:mm a');
		var date1 = new Date(2000, 0, 1, 0, 0, 0);
		assert.strictEqual(dateFormat.format(date1), "12:00 AM");
	});
	it('h:m:s a (single letter)', () => {
		var dateFormat = new SimpleDateFormat('h:m:s a');
		var date1 = new Date(2000, 0, 1, 9, 5, 3);
		assert.strictEqual(dateFormat.format(date1), "9:5:3 AM");
	});
	// 转译 —— 单引号包裹的字面量
	it('quoted literal text', () => {
		var dateFormat = new SimpleDateFormat("'Date:' yyyy-MM-dd");
		var date1 = new Date(2025, 5, 16);
		assert.strictEqual(dateFormat.format(date1), "Date: 2025-06-16");
	});
	it('quoted pattern letters are not interpreted', () => {
		var dateFormat = new SimpleDateFormat("'yyyy-MM-dd'");
		var date1 = new Date(2025, 5, 16);
		assert.strictEqual(dateFormat.format(date1), "yyyy-MM-dd");
	});
	it('escaped single quote with double quotes', () => {
		var dateFormat = new SimpleDateFormat("yyyy'年'MM'月'dd'日'");
		var date1 = new Date(2025, 5, 16);
		assert.strictEqual(dateFormat.format(date1), "2025年06月16日");
	});
	it("escaped single quote ''", () => {
		var dateFormat = new SimpleDateFormat("hh''mm");
		var date1 = new Date(2000, 0, 1, 9, 5, 0);
		assert.strictEqual(dateFormat.format(date1), "09'05");
	});
	it("quoted text with escaped quote 'it''s'", () => {
		var dateFormat = new SimpleDateFormat("yy'year: ''it''s' MM");
		var date1 = new Date(2025, 5, 16);
		assert.strictEqual(dateFormat.format(date1), "25year: 'it's 06");
	});
	// S (毫秒) 各种长度
	it('S (1-digit ms)', () => {
		var dateFormat = new SimpleDateFormat('S');
		var date1 = new Date(2000, 0, 1, 0, 0, 0, 9);
		assert.strictEqual(dateFormat.format(date1), "9");
	});
	it('SS (2-digit ms)', () => {
		var dateFormat = new SimpleDateFormat('SS');
		var date1 = new Date(2000, 0, 1, 0, 0, 0, 9);
		assert.strictEqual(dateFormat.format(date1), "09");
	});
	// yy (2 位年)
	it('yy (2-digit year)', () => {
		var dateFormat = new SimpleDateFormat('yy-MM-dd');
		var date1 = new Date(2005, 0, 1);
		assert.strictEqual(dateFormat.format(date1), "05-01-01");
	});
});
