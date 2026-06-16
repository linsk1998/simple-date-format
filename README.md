Date format like java SimpleDateFormat

[![npm](https://img.shields.io/npm/v/java.text.simple-date-format)](https://www.npmjs.com/package/java.text.simple-date-format)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/linsk1998/simple-date-format/actions/workflows/ci.yml/badge.svg)](https://github.com/linsk1998/simple-date-format/actions)

```javascript
var dateFormat = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss');
var date1 = new Date(2000,1,1,1,1,1,999);
assert.strictEqual(dateFormat.format(date1),"2000-02-01 01:01:01");
```

```javascript
var dateFormat = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss');
var date1 = new Date(2000,1,1,1,1,1);
assert.strictEqual(dateFormat.parse("2000-02-01 01:01:01").getTime(),date1.getTime());
```

## Supported pattern letters

| Letter | Meaning            | Example         |
|--------|--------------------|-----------------|
| y      | Year               | yy → 25, yyyy → 2025 |
| M      | Month              | M → 6, MM → 06  |
| d      | Day in month       | d → 1, dd → 01  |
| H      | Hour (0-23)        | H → 9, HH → 09  |
| h      | Hour (1-12)        | h → 9, hh → 09  |
| m      | Minute             | m → 5, mm → 05  |
| s      | Second             | s → 3, ss → 03  |
| S      | Millisecond        | S → 9, SSS → 009 |
| a      | AM/PM marker       | AM, PM          |

## Quoting and escaping

Like Java's SimpleDateFormat, single quotes can be used to quote literal text:

```javascript
var dateFormat = new SimpleDateFormat("'Date:' yyyy-MM-dd");
dateFormat.format(new Date(2025, 5, 16)); // "Date: 2025-06-16"
```

Two consecutive single quotes produce a literal single quote:

```javascript
var dateFormat = new SimpleDateFormat("hh''mm");
dateFormat.format(new Date(2000, 0, 1, 9, 5)); // "09'05"
```

Inside quoted text, use `''` to escape a single quote:

```javascript
var dateFormat = new SimpleDateFormat("'it''s' yyyy");
dateFormat.format(new Date(2025, 0, 1)); // "it's 2025"
```

CJK characters as literals:

```javascript
var dateFormat = new SimpleDateFormat("yyyy'年'MM'月'dd'日'");
dateFormat.format(new Date(2025, 5, 16)); // "2025年06月16日"
```

## 12-hour time with AM/PM

```javascript
var dateFormat = new SimpleDateFormat('hh:mm a');
dateFormat.format(new Date(2000, 0, 1, 0, 0));  // "12:00 AM" (midnight)
dateFormat.format(new Date(2000, 0, 1, 12, 0)); // "12:00 PM" (noon)
dateFormat.format(new Date(2000, 0, 1, 13, 5)); // "01:05 PM"
```

## Not supported

- `Y` (week year) - a common pitfall in Java, intentionally not implemented
- `D` (day in year) - a common pitfall in Java, intentionally not implemented
- `E` (day name), `G` (era), `w`/`W` (week), `F`, `k`, `K`, `z`, `Z`, `X` (timezone)
