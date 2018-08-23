(function() {
  const model = {
    currentEngine: null,
    currentQuery: null,
    google: {
      url: "https://www.google.com.ua/search?q="
    },
    bing: {
      url: "https://bing.com/search?q="
    },
    ask: {
      url: "http://ask.com/web/?q="
    }
  };

  const controller = {
    setEngine: function(searchEngine) {
      model.currentEngine = model[searchEngine];
      searchView.render();
    },

    getEngine: function() {
      return model.currentEngine;
    },

    setQuery: function(query) {
      model.currentQuery = query.split(" ");
    },

    getQuery: function() {
      return model.currentQuery;
    }
  };

  const searchView = {
    init: function() {
      const searchBtn = document.getElementById("submit");
      const selectElem = document.getElementById("search--engine");
      this.input = document.getElementById("query");

      //initialize Meterialise select
      const options = document.querySelectorAll("option");
      const instances = M.FormSelect.init(selectElem, options);

      let query, searchEngine;

      searchBtn.addEventListener("click", function() {
        if (selectElem.selectedIndex === 0) {
          alert("Укажите поисковую систему");
          return false;
        }

        searchEngine = selectElem.options[selectElem.selectedIndex].value;
        query = document.getElementById("query").value;
        controller.setQuery(query);
        controller.setEngine(searchEngine);
      });
    },

    render: function() {
      const url = controller.getEngine().url;
      const queries = controller.getQuery().join("+");

      //to open in a new tab
      const win = window.open(url + queries, "_blank");
      win.focus();

      this.input.value = "";
    }
  };

  searchView.init();
})();
