inflection-js
=============

JavaScript Inflection Support

This code is based in part on the work done in Ruby to support
infection as part of Ruby on Rails in the ActiveSupport's Inflector
and Inflections classes.  It was initally ported to Javascript by
Ryan Schuft (ryan.schuft@gmail.com) in 2007.

The basic usage is:
  1. Include this script on your web page.
  2. Call functions on any InflectionJS object in Javascript

Currently implemented functions:

  `InflectionJS.pluralize(string, plural)`

    renders a singular English language noun into its plural form
    normal results can be overridden by passing in an alternative


  `InflectionJS.singularize(string, singular)`

    renders a plural English language noun into its singular form
    normal results can be overridden by passing in an alterative


  `InflectionJS.camelize(string, lowFirstLetter)`

    renders a lower case underscored word into camel case
    the first letter of the result will be upper case unless you pass true
    also translates "/" into "::" (underscore does the opposite)


  `InflectionJS.underscore(string)`

    renders a camel cased word into words seperated by underscores
    also translates "::" back into "/" (camelize does the opposite)


  `InflectionJS.humanize(string, lowFirstLetter)`

    renders a lower case and underscored word into human readable form
    defaults to making the first letter capitalized unless you pass true


  `InflectionJS.capitalize(string)`

    renders all characters to lower case and then makes the first upper


  `InflectionJS.dasherize(string)`

    renders all underbars and spaces as dashes


  `InflectionJS.titleize(string)`

    renders words into title casing (as for book titles)


  `InflectionJS.demodulize(string)`

    renders class names that are prepended by modules into just the class


  `InflectionJS.tableize(string)`

    renders camel cased singular words into their underscored plural form


  `InflectionJS.classify(string)`

    renders an underscored plural word into its camel cased singular form


  `InflectionJS.foreign_key(string, dropIdUbar)`

    renders a class name (camel cased singular noun) into a foreign key
    defaults to seperating the class from the id with an underbar unless
    you pass true


  `InflectionJS.ordinalize(string)`

    renders all numbers found in the string into their sequence like "22nd"
