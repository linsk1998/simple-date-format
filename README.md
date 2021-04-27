Date format like java SimpleDateFormat

```javascript
var dateFormat=new SimpleDateFormat('yyyy-MM-dd HH:mm:ss');
var date1=new Date(2000,1,1,1,1,1,999);
assert.strictEqual(dateFormat.format(date1),"2000-02-01 01:01:01");
```

```javascript
var dateFormat=new SimpleDateFormat('yyyy-MM-dd HH:mm:ss');
var date1=new Date(2000,1,1,1,1,1);
assert.strictEqual(dateFormat.parse("2000-02-01 01:01:01").getTime(),date1.getTime());
```