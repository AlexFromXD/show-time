# showtime (Beta)

convert unix timestamp to human readable date, or convert date string to unix timestamp

## Using

focus on a single line and press `cmd+d`(mac) or `alt+d`(windows)

if any text match `/\d{10}/`(second) or `/\d{13}/`(millisecond), there should be an alert message of convert result, otherwise extenstion will pass this line into [`Date.parse()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).
