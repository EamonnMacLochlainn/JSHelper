const Helper = {

    // Window-related functions

    /**
     * Safely opens a new window or tab with the given URL.
     * Example usage: Helper.safeWindowOpen('https://example.com');
     * @param {string} url - The URL to open
     */
    safeWindowOpen: function(url)
    {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.target = "_blank";
        a.click();
        document.body.removeChild(a);
    },

    /**
     * Gets the current viewport dimensions.
     * Example usage: let viewport = Helper.getViewportDimensions();
     * @returns {Object} An object with width and height properties
     */
    getViewportDimensions: () => ({
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    }),

    /**
     * Initiates a file download from a given URL.
     * Example usage: Helper.safeDownload('https://example.com/file.pdf', 'document.pdf');
     * @param {string} url - The URL of the file to download
     * @param {string} title - The desired filename for the download
     */
    safeDownload: function(url, title)
    {
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', title);

        let ev = new MouseEvent('click', {
            bubbles: true,
            view: window
        });
        a.dispatchEvent(ev);
        a.remove();
    },

    // Element-related functions

    /**
     * Checks if an element has a specific attribute.
     * Example usage: if (Helper.hasAttr($('#myElement'), 'data-id')) { ... }
     * @param {jQuery|HTMLElement} el - The element to check
     * @param {string} attrName - The name of the attribute to check for
     * @returns {boolean} True if the attribute exists, false otherwise
     */
    hasAttr: (el, attrName) => $(el).attr(attrName) !== undefined,

    /**
     * Gets the type of an element.
     * Example usage: let type = Helper.getElementType($('#myInput'));
     * @param {jQuery|HTMLElement} el - The element to check
     * @returns {string} The lowercase type of the element
     */
    getElementType: function(el)
    {
        el = $(el);
        if(el.is(':input'))
        {
            return el[0].tagName.toString().toLowerCase() === "input" ?
                el.prop("type").toLowerCase() :
                el[0].tagName.toLowerCase();
        }

        return el.prop('nodeName').toLowerCase();
    },

    /**
     * Removes all jQuery UI dialog elements from the body.
     * Example usage: Helper.clearPopups();
     */
    clearPopups: function()
    {
        $('body').find('> .ui-dialog').remove();
    },

    /**
     * Smoothly scrolls to a specific offset and executes a callback.
     * Example usage: Helper.scrollTo(500, function() { console.log('Scrolled!'); });
     * @param {number} offset - The scroll offset to reach
     * @param {Function} callback - The function to call after scrolling
     * @param {*} callback_args - Arguments to pass to the callback function
     */
    scrollTo: function (offset, callback, callback_args)
    {
        const fixedOffset = offset.toFixed();
        const onScroll = function ()
        {
            if (window.scrollY.toFixed() === fixedOffset)
            {
                window.removeEventListener('scroll', onScroll)
                callback(callback_args)
            }
        }

        window.addEventListener('scroll', onScroll)
        onScroll()
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        })
    },

    // String-related functions

    /**
     * Removes all whitespace from a string.
     * Example usage: let stripped = Helper.stripAllWhitespace('  Hello   World  ');
     * @param {string} str - The input string
     * @returns {string} The string with all whitespace removed
     */
    stripAllWhitespace: str => str.replace(/\s+/g, ''),

    /**
     * Removes all non-numeric characters from a string.
     * Example usage: let numbers = Helper.stripAllNonNumeric('abc123def456');
     * @param {string} str - The input string
     * @returns {string} The string with only numeric characters
     */
    stripAllNonNumeric: str => str.replace(/\D/g,''),

    /**
     * Returns a regular expression for validating email addresses.
     * Example usage: let isValidEmail = Helper.emailRegex().test('user@example.com');
     * @returns {RegExp} A regular expression for email validation
     */
    emailRegex: function()
    {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    },

    /**
     * Capitalizes the first letter of each word in a string.
     * Example usage: let titleCase = Helper.ucWords('hello world');
     * @param {string} str - The input string
     * @returns {string} The string with the first letter of each word capitalized
     */
    ucWords: function(str)
    {
        return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
            return $1.toUpperCase();
        });
    },

    /**
     * Pads a string on the left with a specified character to a certain length.
     * Example usage: let padded = Helper.lpad('5', '0', 3); // Returns '005'
     * @param {string|number} str - The input string or number
     * @param {string} char - The character to pad with (default '0')
     * @param {number} len - The desired length of the resulting string (default 2)
     * @returns {string} The padded string
     */
    lpad: function (str, char = '0', len = 2)
    {
        char = char || '0';
        char = char.toString();
        str = str.toString();

        return str.length >= len
            ? str
            : Array.from({length: len - str.length + 1}).join(char) + str;
    },

    /**
     * Pads a string on the right with a specified character to a certain length.
     * Example usage: let padded = Helper.rpad('5', '0', 3); // Returns '500'
     * @param {string|number} str - The input string or number
     * @param {string} char - The character to pad with (default '0')
     * @param {number} len - The desired length of the resulting string (default 2)
     * @returns {string} The padded string
     */
    rpad: function(str, char, len = 2)
    {
        char = char || '0';
        str = str.toString();
        return str.length >= len
            ? str
            : str + Array.from({length: len - str.length + 1}).join(char);
    },

    /**
     * Formats a datetime string according to a specified format.
     * Example usage: let formatted = Helper.formatDatetimeString('2023-04-15T14:30:00', 'd/m/Y H:i');
     * @param {string} datetime_string - The input datetime string
     * @param {string} desired_format - The desired output format
     * @returns {string} The formatted datetime string
     */
    formatDatetimeString: function (datetime_string, desired_format) {
        let date = new Date(datetime_string);

        let formatMap = {
            'd': date.getDate().toString().padStart(2, '0'),
            'm': (date.getMonth() + 1).toString().padStart(2, '0'),
            'Y': date.getFullYear(),
            'H': date.getHours().toString().padStart(2, '0'),
            'h': (date.getHours() % 12 || 12).toString().padStart(2, '0'),
            'i': date.getMinutes().toString().padStart(2, '0'),
            's': date.getSeconds().toString().padStart(2, '0'),
            'j': date.getDate(),
            'n': date.getMonth() + 1,
            'y': date.getFullYear().toString().slice(-2),
            'G': date.getHours(),
            'g': (date.getHours() % 12 || 12),
            'A': date.getHours() < 12 ? 'AM' : 'PM',
            'a': date.getHours() < 12 ? 'am' : 'pm',
            'M': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()],
            'F': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()],
        };

        let result = '';
        let inBrackets = false;

        for (let i = 0; i < desired_format.length; i++) {
            if (desired_format[i] === '[') {
                inBrackets = true;
            } else if (desired_format[i] === ']') {
                inBrackets = false;
            } else if (inBrackets) {
                result += desired_format[i];
            } else if (formatMap.hasOwnProperty(desired_format[i])) {
                result += formatMap[desired_format[i]];
            } else {
                result += desired_format[i];
            }
        }

        return result;
    },

    /**
     * Formats a number as currency with two decimal places.
     * Example usage: let formatted = Helper.formatCurrency('1234.5678'); // Returns '1234.57'
     * @param {string|number} value - The input value to format
     * @returns {string} The formatted currency string
     */
    formatCurrency: function (value)
    {
        // Remove any non-numeric characters except for the decimal point
        value = value.replace(/[^\d.]/g, '');

        // Ensure only one decimal point
        let parts = value.split('.');
        if(parts.length > 2)
            parts = [parts[0], parts.slice(1).join('')];

        // Limit to two decimal places
        if(parts.length > 1)
            parts[1] = parts[1].slice(0, 2);

        value = parts.join('.');

        // Format for display (always show two decimal places)
        let displayValue = parseFloat(value).toFixed(2);
        if (isNaN(displayValue)) displayValue = '0.00';

        return displayValue;
    },

    /**
     * Pluralizes a string and optionally makes it possessive.
     * Example usage:
     * Helper.pluralise('cat'); // Returns 'cats'
     * Helper.pluralise('cat', true); // Returns 'cat's'
     * @param {string} str - The input string to pluralize
     * @param {boolean} possessive - Whether to make the result possessive
     * @returns {string} The pluralized (and possibly possessive) string
     */
    pluralise: function(str, possessive = false)
    {
        if(typeof str !== 'string')
            return '';

        str = str.trim();
        let last = str[str.length - 1].toLowerCase();

        if(possessive)
            str+= (last === 's') ? '\'' : '\'s'
        else
        {
            if(last === 's')
                str+= '\''
            else if(last === 'y')
                str = str.substr(0, (str.length -1)) + 'ies';
            else
                str+= 's';
        }

        return str;
    },

    /**
     * Adds an ordinal suffix to a number.
     * Example usage: Helper.ordinalSuffix(23); // Returns '23rd'
     * @param {number} number - The input number
     * @returns {string} The number with its ordinal suffix
     */
    ordinalSuffix: function(number)
    {
        let numStr = number.toString(),
            last = numStr.slice(-1),
            ord = '';
        switch(last)
        {
            case '1':
                ord = numStr.slice(-2) === '11' ? 'th' : 'st';
                break;
            case '2':
                ord = numStr.slice(-2) === '12' ? 'th' : 'nd';
                break;
            case '3':
                ord = numStr.slice(-2) === '13' ? 'th' : 'rd';
                break;
            default:
                ord = 'th';
                break;
        }
        return number.toString() + ord;
    },

    /**
     * Generates a random string of specified length.
     * Example usage: let randomStr = Helper.randomString(10);
     * @param {number} n - The length of the random string (default 5)
     * @returns {string} A random string of the specified length
     */
    randomString: function(n)
    {
        if(typeof n !== 'number')
            n = 5;

        var text = '',
            possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for(var i = 0; i < n; i++)
            text+= possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    copyToClipboard: function(textToCopy)
    {
        // Navigator clipboard api needs a secure context (https)
        if(navigator.clipboard && window.isSecureContext)
            navigator.clipboard.writeText(textToCopy);
        else
        {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "absolute";
            textArea.style.left = "-999999px";

            document.body.prepend(textArea);
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
        }
    },

    // Array-related functions

    /**
     * Creates an array of numbers from start to end (inclusive).
     * Example usage: let arr = Helper.range(1, 5); // Returns [1, 2, 3, 4, 5]
     * @param {number} start - The start of the range
     * @param {number} end - The end of the range
     * @returns {Array} An array of numbers from start to end
     */
    range: function(start, end)
    {
        let arr = [];
        for(let i = start; i <= end; i++){ arr.push(i); }
        return arr;
    },

    /**
     * Maps an array of strings to an array of integers.
     * Example usage: let intArray = Helper.arrayMapParseInt(['1', '2', '3']); // Returns [1, 2, 3]
     * @param {Array} arr - The input array of strings
     * @returns {Array} An array of integers
     */
    arrayMapParseInt: arr => arr.map(value => parseInt(value, 10)),

    /**
     * Removes duplicate strings from an array.
     * Example usage: let unique = Helper.arrayUniqueStr(['a', 'b', 'a', 'c']); // Returns ['a', 'b', 'c']
     * @param {Array} arr - The input array with potential duplicates
     * @returns {Array} An array with duplicate strings removed
     */
    arrayUniqueStr: arr => [...new Set(arr)],

    /**
     * Splits an array into chunks of a specified size.
     * Example usage: let chunks = Helper.chunk([1, 2, 3, 4, 5], 2); // Returns [[1, 2], [3, 4], [5]]
     * @param {Array} arr - The input array to be chunked
     * @param {number} chunk_size - The size of each chunk
     * @returns {Array} An array of chunks
     */
    chunk: function(arr, chunk_size)
    {
        let r = [];
        for (let i = 0, len = arr.length; i < len; i += chunk_size)
            r.push(arr.slice(i, i + chunk_size));
        return r;
    },

    // Callback-related functions

    /**
     * Creates a debounced function that delays invoking the provided function until after `delay` milliseconds have elapsed since the last time it was invoked.
     * Example usage:
     * let debouncedSearch = Helper.debounce(function() {
     *     // Perform search
     * }, 300);
     * // Call debouncedSearch whenever the search input changes
     * @param {Function} func - The function to debounce
     * @param {number} delay - The number of milliseconds to delay
     * @returns {Function} A debounced version of the provided function
     */
    debounce(func, delay = 0) {
        let timeout_id;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout_id);
            timeout_id = setTimeout(function() {
                func.apply(context, args);
            }, delay);
        };
    }
};