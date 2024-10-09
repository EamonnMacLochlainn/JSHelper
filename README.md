# Helper Class

## Overview

The Helper class is a collection of utility functions designed to simplify common JavaScript tasks. It provides a variety of methods for string manipulation, array operations, DOM manipulation, and more.

## Installation

To use the Helper class, include the `helper.js` file in your project:

```html
<script src="path/to/helper.js"></script>
```

## Usage

The Helper class is designed as a static class, meaning you can call its methods directly without instantiation:

```javascript
let stripped = Helper.stripAllWhitespace("  Hello   World  ");
```

## Available Methods

### Window-related Functions

#### `safeWindowOpen(url)`
Safely opens a new window or tab with the given URL.
- **Parameters**: `url` (string) - The URL to open
- **Example**: `Helper.safeWindowOpen('https://example.com');`

#### `getViewportDimensions()`
Gets the current viewport dimensions.
- **Returns**: Object with `width` and `height` properties
- **Example**: `let viewport = Helper.getViewportDimensions();`

#### `safeDownload(url, title)`
Initiates a file download from a given URL.
- **Parameters**:
    - `url` (string) - The URL of the file to download
    - `title` (string) - The desired filename for the download
- **Example**: `Helper.safeDownload('https://example.com/file.pdf', 'document.pdf');`

### Element-related Functions

#### `hasAttr(el, attr_name)`
Checks if an element has a specific attribute.
- **Parameters**:
    - `el` (jQuery|HTMLElement) - The element to check
    - `attr_name` (string) - The name of the attribute to check for
- **Returns**: boolean
- **Example**: `if (Helper.hasAttr($('#myElement'), 'data-id')) { ... }`

#### `getElementType(el)`
Gets the type of an element.
- **Parameters**: `el` (jQuery|HTMLElement) - The element to check
- **Returns**: string (lowercase type of the element)
- **Example**: `let type = Helper.getElementType($('#myInput'));`

#### `clearPopups()`
Removes all jQuery UI dialog elements from the body.
- **Example**: `Helper.clearPopups();`

#### `scrollTo(offset, callback, callback_args)`
Smoothly scrolls to a specific offset and executes a callback.
- **Parameters**:
    - `offset` (number) - The scroll offset to reach
    - `callback` (Function) - The function to call after scrolling
    - `callback_args` (*) - Arguments to pass to the callback function
- **Example**: `Helper.scrollTo(500, function() { console.log('Scrolled!'); });`

### String-related Functions

#### `stripAllWhitespace(str)`
Removes all whitespace from a string.
- **Parameters**: `str` (string) - The input string
- **Returns**: string
- **Example**: `let stripped = Helper.stripAllWhitespace('  Hello   World  ');`

#### `stripAllNonNumeric(str)`
Removes all non-numeric characters from a string.
- **Parameters**: `str` (string) - The input string
- **Returns**: string
- **Example**: `let numbers = Helper.stripAllNonNumeric('abc123def456');`

#### `emailRegex()`
Returns a regular expression for validating email addresses.
- **Returns**: RegExp
- **Example**: `let isValidEmail = Helper.emailRegex().test('user@example.com');`

#### `ucWords(str)`
Capitalizes the first letter of each word in a string.
- **Parameters**: `str` (string) - The input string
- **Returns**: string
- **Example**: `let titleCase = Helper.ucWords('hello world');`

#### `lpad(str, char, len)`
Pads a string on the left with a specified character to a certain length.
- **Parameters**:
    - `str` (string|number) - The input string or number
    - `char` (string) - The character to pad with (default '0')
    - `len` (number) - The desired length of the resulting string (default 2)
- **Returns**: string
- **Example**: `let padded = Helper.lpad('5', '0', 3); // Returns '005'`

#### `rpad(str, char, len)`
Pads a string on the right with a specified character to a certain length.
- **Parameters**:
    - `str` (string|number) - The input string or number
    - `char` (string) - The character to pad with (default '0')
    - `len` (number) - The desired length of the resulting string (default 2)
- **Returns**: string
- **Example**: `let padded = Helper.rpad('5', '0', 3); // Returns '500'`

#### `formatDatetimeString(datetime_string, desired_format)`
Formats a datetime string according to a specified format.
- **Parameters**:
    - `datetime_string` (string) - The input datetime string
    - `desired_format` (string) - The desired output format
- **Returns**: string
- **Example**: `let formatted = Helper.formatDatetimeString('2023-04-15T14:30:00', 'd/m/Y H:i');`

#### `formatCurrency(value)`
Formats a number as currency with two decimal places.
- **Parameters**: `value` (string|number) - The input value to format
- **Returns**: string
- **Example**: `let formatted = Helper.formatCurrency('1234.5678'); // Returns '1234.57'`

#### `pluralise(str, possessive)`
Pluralizes a string and optionally makes it possessive.
- **Parameters**:
    - `str` (string) - The input string to pluralize
    - `possessive` (boolean) - Whether to make the result possessive
- **Returns**: string
- **Example**:
  ```javascript
  Helper.pluralise('cat'); // Returns 'cats'
  Helper.pluralise('cat', true); // Returns 'cat's'
  ```

#### `ordinalSuffix(number)`
Adds an ordinal suffix to a number.
- **Parameters**: `number` (number) - The input number
- **Returns**: string
- **Example**: `Helper.ordinalSuffix(23); // Returns '23rd'`

#### `randomString(n)`
Generates a random string of specified length.
- **Parameters**: `n` (number) - The length of the random string (default 5)
- **Returns**: string
- **Example**: `let randomStr = Helper.randomString(10);`

#### `copyToClipboard(text_to_copy)`
Copies the provided text to the clipboard. Uses the Clipboard API if available in a secure context, otherwise falls back to the deprecated execCommand('copy') method.
- **Parameters**: `text_to_copy` (string) - The text to be copied to the clipboard
- **Example**:
  ```javascript
  Helper.copyToClipboard('This text will be copied to the clipboard');
  ```
- **Note**: The fallback method temporarily adds a hidden textarea to the DOM to perform the copy operation.

### Array-related Functions

#### `range(start, end)`
Creates an array of numbers from start to end (inclusive).
- **Parameters**:
    - `start` (number) - The start of the range
    - `end` (number) - The end of the range
- **Returns**: Array
- **Example**: `let arr = Helper.range(1, 5); // Returns [1, 2, 3, 4, 5]`

#### `arrayMapParseInt(arr)`
Maps an array of strings to an array of integers.
- **Parameters**: `arr` (Array) - The input array of strings
- **Returns**: Array
- **Example**: `let intArray = Helper.arrayMapParseInt(['1', '2', '3']); // Returns [1, 2, 3]`

#### `chunk(arr, chunk_size)`
Splits an array into chunks of a specified size.
- **Parameters**:
    - `arr` (Array) - The input array to be chunked
    - `chunk_size` (number) - The size of each chunk
- **Returns**: Array
- **Example**: `let chunks = Helper.chunk([1, 2, 3, 4, 5], 2); // Returns [[1, 2], [3, 4], [5]]`

#### `arrayUniqueStr(arr)`
Removes duplicate strings from an array.
- **Parameters**: `arr` (Array) - The input array with potential duplicates
- **Returns**: Array
- **Example**: `let unique = Helper.arrayUniqueStr(['a', 'b', 'a', 'c']); // Returns ['a', 'b', 'c']`

### Callback-related Functions

#### `debounce(func, delay)`
Creates a debounced function that delays invoking the provided function until after `delay` milliseconds have elapsed since the last time it was invoked.
- **Parameters**:
    - `func` (Function) - The function to debounce
    - `delay` (number) - The number of milliseconds to delay
- **Returns**: Function
- **Example**:
  ```javascript
  let debouncedSearch = Helper.debounce(function() { 
      // Perform search 
  }, 300);
  // Call debouncedSearch whenever the search input changes
  ```

## License

Do what you like.