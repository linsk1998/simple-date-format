import SimpleDateFormat from "../dist/simple-date-format.mjs";
import assert from 'assert';

describe('parse', () => {
	it('yyyy-MM-dd HH:mm:ss', () => {
		var dateFormat=new SimpleDateFormat('yyyy-MM-dd HH:mm:ss');
		var date1=new Date(2000,1,1,1,1,1);
		assert.strictEqual(dateFormat.parse("2000-02-01 01:01:01").getTime(),date1.getTime());
	});
	it('yyyy-MM-dd', () => {
		var dateFormat=new SimpleDateFormat('yyyy-MM-dd');
		var date1=new Date(2000,1,1);
		assert.strictEqual(dateFormat.parse("2000-02-01").getTime(),date1.getTime());
	});
	it('yyyy-MM-dd HH:mm:ss.SSS', () => {
		var dateFormat=new SimpleDateFormat('yyyy-MM-dd HH:mm:ss.SSS');
		var date1=new Date(2000,1,1,1,1,1,999);
		assert.strictEqual(dateFormat.parse("2000-02-01 01:01:01.999").getTime(),date1.getTime());
	});
	it('yyyy-MM-ddTHH:mm:ssZ', () => {
		var dateFormat1=new SimpleDateFormat('yyyy-MM-ddTHH:mm:ssZ');
		var date1=new Date(2000,1,1,1,1,1);
		assert.strictEqual(dateFormat1.parse("2000-02-01T01:01:01Z").getTime(),date1.getTime());
	});
});