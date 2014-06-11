/*
Copyright (c) 2010 Ryan Schuft (ryan.schuft@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

if (window && !window.InflectionJS) {
  window.InflectionJS = null;
}

/*
This sets up some constants for later use
This should use the window namespace variable if available
*/
InflectionJS = {
/*
This is a list of nouns that use the same form for both singular and plural.
This list should remain entirely in lower case to correctly match Strings.
*/
  uncountable_words: [
    'equipment', 'information', 'rice', 'money', 'species', 'series',
    'fish', 'sheep', 'moose', 'deer', 'news'
  ],

/*
These rules translate from the singular form of a noun to its plural form.
*/
  plural_rules: [
    [new RegExp('(m)an$', 'gi'),                 '$1en'],
    [new RegExp('(pe)rson$', 'gi'),              '$1ople'],
    [new RegExp('(child)$', 'gi'),               '$1ren'],
    [new RegExp('^(ox)$', 'gi'),                 '$1en'],
    [new RegExp('(ax|test)is$', 'gi'),           '$1es'],
    [new RegExp('(octop|vir)us$', 'gi'),         '$1i'],
    [new RegExp('(alias|status)$', 'gi'),        '$1es'],
    [new RegExp('(bu)s$', 'gi'),                 '$1ses'],
    [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'],
    [new RegExp('([ti])um$', 'gi'),              '$1a'],
    [new RegExp('sis$', 'gi'),                   'ses'],
    [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'),  '$1$2ves'],
    [new RegExp('(hive)$', 'gi'),                '$1s'],
    [new RegExp('([^aeiouy]|qu)y$', 'gi'),       '$1ies'],
    [new RegExp('(x|ch|ss|sh)$', 'gi'),          '$1es'],
    [new RegExp('(matr|vert|ind)ix|ex$', 'gi'),  '$1ices'],
    [new RegExp('([m|l])ouse$', 'gi'),           '$1ice'],
    [new RegExp('(quiz)$', 'gi'),                '$1zes'],
    [new RegExp('s$', 'gi'),                     's'],
    [new RegExp('$', 'gi'),                      's']
  ],

/*
These rules translate from the plural form of a noun to its singular form.
*/
  singular_rules: [
    [new RegExp('(m)en$', 'gi'),                                                       '$1an'],
    [new RegExp('(pe)ople$', 'gi'),                                                    '$1rson'],
    [new RegExp('(child)ren$', 'gi'),                                                  '$1'],
    [new RegExp('([ti])a$', 'gi'),                                                     '$1um'],
    [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi'), '$1$2sis'],
    [new RegExp('(hive)s$', 'gi'),                                                     '$1'],
    [new RegExp('(tive)s$', 'gi'),                                                     '$1'],
    [new RegExp('(curve)s$', 'gi'),                                                    '$1'],
    [new RegExp('([lr])ves$', 'gi'),                                                   '$1f'],
    [new RegExp('([^fo])ves$', 'gi'),                                                  '$1fe'],
    [new RegExp('([^aeiouy]|qu)ies$', 'gi'),                                           '$1y'],
    [new RegExp('(s)eries$', 'gi'),                                                    '$1eries'],
    [new RegExp('(m)ovies$', 'gi'),                                                    '$1ovie'],
    [new RegExp('(x|ch|ss|sh)es$', 'gi'),                                              '$1'],
    [new RegExp('([m|l])ice$', 'gi'),                                                  '$1ouse'],
    [new RegExp('(bus)es$', 'gi'),                                                     '$1'],
    [new RegExp('(o)es$', 'gi'),                                                       '$1'],
    [new RegExp('(shoe)s$', 'gi'),                                                     '$1'],
    [new RegExp('(cris|ax|test)es$', 'gi'),                                            '$1is'],
    [new RegExp('(octop|vir)i$', 'gi'),                                                '$1us'],
    [new RegExp('(alias|status)es$', 'gi'),                                            '$1'],
    [new RegExp('^(ox)en', 'gi'),                                                      '$1'],
    [new RegExp('(vert|ind)ices$', 'gi'),                                              '$1ex'],
    [new RegExp('(matr)ices$', 'gi'),                                                  '$1ix'],
    [new RegExp('(quiz)zes$', 'gi'),                                                   '$1'],
    [new RegExp('s$', 'gi'),                                                           '']
  ],

/*
This is a list of words that should not be capitalized for title case
*/
  non_titlecased_words: [
    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
    'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
    'with', 'for'
  ],

/*
These are regular expressions used for converting between String formats
*/
  id_suffix: new RegExp('(_ids|_id)$', 'g'),
  underbar: new RegExp('_', 'g'),
  space_or_underbar: new RegExp('[\ _]', 'g'),
  uppercase: new RegExp('([A-Z])', 'g'),
  underbar_prefix: new RegExp('^_'),

/*
This is a helper method that applies rules based replacement to a String
Signature:
InflectionJS.apply_rules(str, rules, skip, override) == String
Arguments:
str - String - String to modify and return based on the passed rules
rules - Array: [RegExp, String] - Regexp to match paired with String to use for replacement
skip - Array: [String] - Strings to skip if they match
override - String (optional) - String to return as though this method succeeded (used to conform to APIs)
Returns:
String - passed String modified by passed rules
Examples:
InflectionJS.apply_rules("cows", InflectionJs.singular_rules) === 'cow'
*/
  apply_rules: function(str, rules, skip, override, rule) {
    if(rule == null) { rule = true; }

    if (override) {
      str = override;
    }
    else {
      var ignore = (skip.indexOf(str.toLowerCase()) > -1);
      if (!ignore && rule) {
        for (var x = 0; x < rules.length; x++) {
          if (str.match(rules[x][0])) {
            str = str.replace(rules[x][0], rules[x][1]);
            break;
          }
        }
      }
    }
    return str;
  }
};

/*
This lets us detect if an Array contains a given element in IE < 9
Signature:
Array.indexOf(item, fromIndex, compareFunc) == Integer
Arguments:
item - Object - object to locate in the Array
fromIndex - Integer (optional) - starts checking from this position in the Array
compareFunc - Function (optional) - function used to compare Array item vs passed item
Returns:
Integer - index position in the Array of the passed item
Examples:
['hi','there'].indexOf("guys") === -1
['hi','there'].indexOf("hi") === 0
*/
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(item, fromIndex, compareFunc) {
    if (!fromIndex) {
      fromIndex = -1;
    }
    var index = -1;
    for (var i = fromIndex; i < this.length; i++) {
      if (this[i] === item || compareFunc && compareFunc(this[i], item)) {
        index = i;
        break;
      }
    }
    return index;
  };
}

/*
This function adds pluralization support to every String object
Signature:
String.pluralize(plural) == String
Arguments:
rule - Boolean (optional) - provides an conditional for if to pluralize or not
Returns:
String - singular English language nouns are returned in plural form
*/
InflectionJS.pluralize = function(string, rule) {
  return InflectionJS.apply_rules(
    string,
    this.plural_rules,
    this.uncountable_words,
    null,
    rule
  );
};

/*
This function adds singularization support to every String object
Signature:
String.singularize(singular) == String
Arguments:
singular - String (optional) - overrides normal output with said String
Returns:
String - plural English language nouns are returned in singular form
Examples:
"people".singularize() == "person"
"octopi".singularize() == "octopus"
"Hats".singularize() == "Hat"
"guys".singularize("person") == "person"
*/
InflectionJS.singularize = function(string, singular) {
  return InflectionJS.apply_rules(
    string,
    this.singular_rules,
    this.uncountable_words,
    singular
  );
};

/*
This function adds camelization support to every String object
Signature:
String.camelize(lowFirstLetter) == String
Arguments:
lowFirstLetter - boolean (optional) - default is to capitalize the first
letter of the results... passing true will lowercase it
Returns:
String - lower case underscored words will be returned in camel case
additionally '/' is translated to '::'
Examples:
"message_properties".camelize() == "MessageProperties"
"message_properties".camelize(true) == "messageProperties"
*/
InflectionJS.camelize = function(string, lowFirstLetter) {
  string = string.toLowerCase();
  var str_path = string.split('/');
  for (var i = 0; i < str_path.length; i++) {
    var str_arr = str_path[i].split('_');
    var initX = ((lowFirstLetter && i + 1 === str_path.length) ? (1) : (0));
    for (var x = initX; x < str_arr.length; x++) {
      str_arr[x] = str_arr[x].charAt(0).toUpperCase() + str_arr[x].substring(1);
    }
    str_path[i] = str_arr.join('');
  }
  string = str_path.join('::');
  return string;
};

/*
This function adds underscore support to every String object
Signature:
String.underscore() == String
Arguments:
N/A
Returns:
String - camel cased words are returned as lower cased and underscored
additionally '::' is translated to '/'
Examples:
"MessageProperties".camelize() == "message_properties"
"messageProperties".underscore() == "message_properties"
*/
InflectionJS.underscore = function(string) {
  var str_path = string.split('::');
  for (var i = 0; i < str_path.length; i++) {
    str_path[i] = str_path[i].replace(InflectionJS.uppercase, '_$1');
    str_path[i] = str_path[i].replace(InflectionJS.underbar_prefix, '');
  }
  string = str_path.join('/').toLowerCase();
  return string;
};

/*
This function adds humanize support to every String object
Signature:
String.humanize(lowFirstLetter) == String
Arguments:
lowFirstLetter - boolean (optional) - default is to capitalize the first
letter of the results... passing true will lowercase it
Returns:
String - lower case underscored words will be returned in humanized form
Examples:
"message_properties".humanize() == "Message properties"
"message_properties".humanize(true) == "message properties"
*/
InflectionJS.humanize = function(string, lowFirstLetter) {
  string = string.toLowerCase();
  string = string.replace(InflectionJS.id_suffix, '');
  string = string.replace(InflectionJS.underbar, ' ');
  if (!lowFirstLetter) {
    string = InflectionJS.capitalize(string);
  }
  return string;
};

/*
This function adds capitalization support to every String object
Signature:
String.capitalize() == String
Arguments:
N/A
Returns:
String - all characters will be lower case and the first will be upper
Examples:
"message_properties".capitalize() == "Message_properties"
"message properties".capitalize() == "Message properties"
*/
InflectionJS.capitalize = function(string) {
  string = string.toLowerCase();
  string = string.substring(0, 1).toUpperCase() + string.substring(1);
  return string;
};

/*
This function adds dasherization support to every String object
Signature:
String.dasherize() == String
Arguments:
N/A
Returns:
String - replaces all spaces or underbars with dashes
Examples:
"message_properties".capitalize() == "message-properties"
"Message Properties".capitalize() == "Message-Properties"
*/
InflectionJS.dasherize = function(string) {
  string = string.replace(InflectionJS.space_or_underbar, '-');
  return string;
};

/*
This function adds titleize support to every String object
Signature:
String.titleize() == String
Arguments:
N/A
Returns:
String - capitalizes words as you would for a book title
Examples:
"message_properties".titleize() == "Message Properties"
"message properties to keep".titleize() == "Message Properties to Keep"
*/
InflectionJS.titleize = function(string) {
  string = string.toLowerCase();
  string = string.replace(InflectionJS.underbar, ' ');
  var str_arr = string.split(' ');
  for (var x = 0; x < str_arr.length; x++) {
    var d = str_arr[x].split('-');
    for (var i = 0; i < d.length; i++) {
      d[i] = InflectionJS.capitalize(d[i]);
    }
    str_arr[x] = d.join('-');
  }
  string = str_arr.join(' ');
  string = string.substring(0, 1).toUpperCase() + string.substring(1);
  return string;
};

/*
This function adds demodulize support to every String object
Signature:
String.demodulize() == String
Arguments:
N/A
Returns:
String - removes module names leaving only class names (Ruby style)
Examples:
"Message::Bus::Properties".demodulize() == "Properties"
*/
InflectionJS.demodulize = function(string) {
  var str_arr = string.split('::');
  string = str_arr[str_arr.length - 1];
  return string;
};

/*
This function adds tableize support to every String object
Signature:
String.tableize() == String
Arguments:
N/A
Returns:
String - renders camel cased words into their underscored plural form
Examples:
"MessageBusProperty".tableize() == "message_bus_properties"
*/
InflectionJS.tableize = function(string) {
  return InflectionJS.underscore(InflectionJS.pluralize(string));
};

/*
This function adds classification support to every String object
Signature:
String.classify() == String
Arguments:
N/A
Returns:
String - underscored plural nouns become the camel cased singular form
Examples:
"message_bus_properties".classify() == "MessageBusProperty"
*/
InflectionJS.classify = function(string) {
  return InflectionJS.camelize(InflectionJS.singularize(string));
};

/*
This function adds foreign key support to every String object
Signature:
String.foreign_key(dropIdUbar) == String
Arguments:
dropIdUbar - boolean (optional) - default is to seperate id with an
underbar at the end of the class name, you can pass true to skip it
Returns:
String - camel cased singular class names become underscored with id
Examples:
"MessageBusProperty".foreign_key() == "message_bus_property_id"
"MessageBusProperty".foreign_key(true) == "message_bus_propertyid"
*/
InflectionJS.foreign_key = function(string, dropIdUbar) {
  string = InflectionJS.demodulize(InflectionJS.underscore(string)) + ((dropIdUbar) ? ('') : ('_')) + 'id';
  return string;
};

/*
This function adds ordinalize support to every String object
Signature:
String.ordinalize() == String
Arguments:
N/A
Returns:
String - renders all found numbers their sequence like "22nd"
Examples:
"the 1 pitch".ordinalize() == "the 1st pitch"
*/
InflectionJS.ordinalize = function(string) {
  var str_arr = string.split(' ');
  for (var x = 0; x < str_arr.length; x++) {
    var i = parseInt(str_arr[x]);
    if (i === NaN) {
      var ltd = str_arr[x].substring(str_arr[x].length - 2);
      var ld = str_arr[x].substring(str_arr[x].length - 1);
      var suf = "th";
      if (ltd != "11" && ltd != "12" && ltd != "13") {
        if (ld === "1") {
          suf = "st";
        }
        else if (ld === "2") {
          suf = "nd";
        }
        else if (ld === "3") {
          suf = "rd";
        }
      }
      str_arr[x] += suf;
    }
  }
  string = str_arr.join(' ');
  return string;
};
