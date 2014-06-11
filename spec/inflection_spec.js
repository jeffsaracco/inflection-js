describe("InflectionJS", function() {
  describe("#pluralize", function() {
    it("pluralizes the words", function() {
      expect(InflectionJS.pluralize("person")).toEqual("people");
      expect(InflectionJS.pluralize("octopus")).toEqual("octopi");
      expect(InflectionJS.pluralize("Hat")).toEqual("Hats");
      expect(InflectionJS.pluralize("guy")).toEqual("guys");
    });

    it("pluralizes the words based on rule", function() {
      expect(InflectionJS.pluralize("person", true)).toEqual("people");
      expect(InflectionJS.pluralize("octopus", 10 > 9)).toEqual("octopi");
      expect(InflectionJS.pluralize("Hat", 1 < 2)).toEqual("Hats");
      expect(InflectionJS.pluralize("guy", false)).toEqual("guy");
    });
  });

  describe("#singularize", function() {
    it("signularizes the words", function() {
      expect(InflectionJS.singularize("people")).toEqual("person");
      expect(InflectionJS.singularize("octopi")).toEqual("octopus");
      expect(InflectionJS.singularize("Hats")).toEqual("Hat");
      expect(InflectionJS.singularize("guys")).toEqual("guy");
    });
  });

  describe("#camelize", function() {
    it("camelizes the words", function() {
      expect(InflectionJS.camelize("message_properties")).toEqual("MessageProperties");
      expect(InflectionJS.camelize("message_properties", true)).toEqual("messageProperties");
    });
  });

  describe("#underscore", function() {
    it("underscores the words", function() {
      expect(InflectionJS.underscore("MessageProperties")).toEqual("message_properties");
      expect(InflectionJS.underscore("messageProperties")).toEqual("message_properties");
    });
  });

  describe("#humanize", function() {
    it("humanizes the words", function() {
      expect(InflectionJS.humanize("message_properties")).toEqual("Message properties");
      expect(InflectionJS.humanize("message_properties", true)).toEqual("message properties");
    });
  });

  describe("#capitalize", function() {
    it("capitalizes the words", function() {
      expect(InflectionJS.capitalize("message_properties")).toEqual("Message_properties");
    });
  });

  describe("#dasherize", function() {
    it("dasherizes the words", function() {
      expect(InflectionJS.dasherize("message_properties")).toEqual("message-properties");
      expect(InflectionJS.dasherize("Message Properties")).toEqual("Message-Properties");
    });
  });

  describe("#titleize", function() {
    it("titleizes the words", function() {
      expect(InflectionJS.titleize("message_properties")).toEqual("Message Properties");
      expect(InflectionJS.titleize("message properties to keep")).toEqual("Message Properties To Keep");
    });
  });

  describe("#demodulize", function() {
    it("demodulizes the words", function() {
      expect(InflectionJS.demodulize("Message::Bus::Properties")).toEqual("Properties");
    });
  });

  describe("#tableize", function() {
    it("tableizes the words", function() {
      expect(InflectionJS.tableize("MessageBusProperty")).toEqual("message_bus_properties");
    });
  });

  describe("#classify", function() {
    it("classifies the words", function() {
      expect(InflectionJS.classify("message_bus_properties")).toEqual("MessageBusProperty");
    });
  });

  describe("#foreign_key", function() {
    it("converts teh word to a foreign key", function() {
      expect(InflectionJS.foreign_key("MessageBusProperty")).toEqual("message_bus_property_id");
      expect(InflectionJS.foreign_key("MessageBusProperty", true)).toEqual("message_bus_propertyid");
    });
  });
});


