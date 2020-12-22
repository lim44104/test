function character() {
    let urlQueryParameters = new URLSearchParams(window.location.search),
      queryParameterName = urlQueryParameters.get("name"),
      name = document.getElementById("name").value;
    
    // console.log(name);
  
    if (queryParameterName !== null && queryParameterName !== "") {
      document.getElementById("name").value = queryParameterName;
      connection();
    } else if (name !== null && name !== "") {
      document
        .getElementById("connectForm")
        .addEventListener("submit", connection);
    } else {
      document.getElementById("characterSection").innerHTML =
        '<h2 id="characterTitle">Enter search term above...</h2>';
    }
  }
  
  function connection() {
    document.getElementById("characterLoading").innerHTML = "";
    document.getElementById("comicLoading").innerHTML = "";
  
    const xhr = new XMLHttpRequest();
    const name = document.getElementById("name").value;
    const params = "name=" + name;
  
    xhr.open("GET", "./connect/search-name.php?" + params, true);
    //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); 
    xhr.onloadstart = function() {
      document.getElementById("characterLoading").innerHTML =
      '<strong id="spinnerText" class="text-primary">Loading character...</strong>' +
      '<div class="text-primary spinner-border ml-auto" role="status" ' +
      'aria-hidden="true" id="spinner"></div>';
    }
    xhr.onerror = function() {
      document.getElementById("characterSection").innerHTML = '<h2 id="characterTitle">An error has occured, check connection.</h2>';
    }
    xhr.onload = function() {
      if (this.status == 200) {
        const results = JSON.parse(this.responseText);
        console.log(result);
  
        if (results["data"].count === 0) {
          document.getElementById("characterSection").innerHTML =
            '<h2 id="characterTitle"><span style="font-weight:bold;">No results for... ' +
            name + "</span>" + ". Try again.</h2>";
          
          document.getElementById("characterLoading").innerHTML = "";
          document.getElementById("comicLoading").innerHTML = "";
          
        } else if (results == undefined || results.length == 0) {
          document.getElementById("characterSection").innerHTML =
            '<h2 id="characterTitle">' +
            "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";
          
          document.getElementById("characterLoading").innerHTML = "";
          document.getElementById("comicLoading").innerHTML = "";
          
        } else {
          const characterAttributes = results["data"].results[0],
            characterID = results["data"].results[0].id;
          let output = "";
  
          output +=
            '<h2 id="characterTitle">' +
            "Character" +
            "</h2>" +
            '<div class="card flex-md-row mb-4 box-shadow h-md-250" id="characterCard">' +
            '<div id="characterImage">' +
            '<img class="card-img-right flex-auto d-md-block img-fluid"' +
            ' alt="Picture of ' +
            characterAttributes.name +
            '" src="' +
            characterAttributes.thumbnail["path"] +
            "." +
            characterAttributes.thumbnail["extension"] +
            '">' +
            "</div>" +
            '<div class="card-body d-flex flex-column align-items-start">' +
            '<h3 class="mb-0 text-dark" id="characterName">' +
            characterAttributes.name +
            "</h3>" +
            '<p class="card-text mb-3" id="characterDescription">';
          if (characterAttributes.description !== "") {
            output += characterAttributes.description;
          }
          output +=
            "</p>" +
            '<p class="text-muted mb-3" id="comicsAvailable">' +
            "Comics: " +
            characterAttributes.comics.available +
            " | " +
            "Series: " +
            characterAttributes.series.available +
            " | " +
            "Stories: " +
            characterAttributes.stories.available +
            " | " +
            "Events: " +
            characterAttributes.events.available +
            "</p>" +
            '<p class="mb-1 text-muted" id="characterInfoAttribution">' +
            results["attributionText"] +
            "</p>" +
            "</div>" +
            "</div>";
          
          document.getElementById("characterSection").innerHTML = output;
          
          //comics(characterID)
        }
  
      } else {
        document.getElementById("characterSection").innerHTML = '<h2 id="characterTitle">Request not received</h2>';
      }
    }
    xhr.onloadend = function() {
      document.getElementById("characterLoading").innerHTML = "";
    }
    xhr.send()
  }