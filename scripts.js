$(document).ready(function() {
    $('#convert-coordinates').click(function() {
        $('#conversion-form').html(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Conversion de Coordonnées</h5>
                    ${/* Formulaire mis à jour */''}
                    <form id="coordinate-form">
                        <div class="form-group">
                            <label for="input-lat-deg">Latitude (Degrés)</label>
                            <input type="text" class="form-control" id="input-lat-deg" placeholder="Entrez les degrés">
                        </div>
                        <div class="form-group">
                            <label for="input-lat-min">Latitude (Minutes)</label>
                            <input type="text" class="form-control" id="input-lat-min" placeholder="Entrez les minutes">
                        </div>
                        <div class="form-group">
                            <label for="input-lat-sec">Latitude (Secondes)</label>
                            <input type="text" class="form-control" id="input-lat-sec" placeholder="Entrez les secondes">
                        </div>
                        <div class="form-group">
                            <label for="input-lon-deg">Longitude (Degrés)</label>
                            <input type="text" class="form-control" id="input-lon-deg" placeholder="Entrez les degrés">
                        </div>
                        <div class="form-group">
                            <label for="input-lon-min">Longitude (Minutes)</label>
                            <input type="text" class="form-control" id="input-lon-min" placeholder="Entrez les minutes">
                        </div>
                        <div class="form-group">
                            <label for="input-lon-sec">Longitude (Secondes)</label>
                            <input type="text" class="form-control" id="input-lon-sec" placeholder="Entrez les secondes">
                        </div>
                        <button type="submit" class="btn btn-primary">Convertir en Laborde</button>
                    </form>
                </div>
            </div>
        `);

        $('#coordinate-form').submit(function(event) {
            event.preventDefault();
            var latDeg = parseFloat($('#input-lat-deg').val());
            var latMin = parseFloat($('#input-lat-min').val());
            var latSec = parseFloat($('#input-lat-sec').val());
            var lonDeg = parseFloat($('#input-lon-deg').val());
            var lonMin = parseFloat($('#input-lon-min').val());
            var lonSec = parseFloat($('#input-lon-sec').val());

            // Conversion DMS en décimal
            function dmsToDecimal(deg, min, sec) {
                return deg + (min / 60) + (sec / 3600);
            }

            var lat = dmsToDecimal(latDeg, latMin, latSec);
            var lon = dmsToDecimal(lonDeg, lonMin, lonSec);

            // Conversion de coordonnées géographiques en coordonnées Laborde
            function geographicToLaborde(lat, lon) {
                // Constantes pour l'ellipsoïde de Hayford 1924
                var a = 6378388.0;  // demi-grand axe en mètres
                var e2 = 0.00672267;  // première excentricité au carré

                var latRad = lat * Math.PI / 180;
                var lonRad = lon * Math.PI / 180;

                var N = a / Math.sqrt(1 - e2 * Math.sin(latRad) * Math.sin(latRad));

                var X = (N + 0) * Math.cos(latRad) * Math.cos(lonRad);
                var Y = (N + 0) * Math.cos(latRad) * Math.sin(lonRad);
                var Z = (N * (1 - e2) + 0) * Math.sin(latRad);

                // Coordonnées du centre de projection (Antananarivo)
                var lat0 = -18.8792 * Math.PI / 180;
                var lon0 = 47.5079 * Math.PI / 180;
                var alpha0 = 0;  // Azimut de la ligne initiale en radians
                var k0 = 1;  // Facteur d'échelle

                var N0 = a / Math.sqrt(1 - e2 * Math.sin(lat0) * Math.sin(lat0));
                var X0 = (N0 + 0) * Math.cos(lat0) * Math.cos(lon0);
                var Y0 = (N0 + 0) * Math.cos(lat0) * Math.sin(lon0);
                var Z0 = (N0 * (1 - e2) + 0) * Math.sin(lat0);

                var dX = X - X0;
                var dY = Y - Y0;
                var dZ = Z - Z0;

                // Rotation et mise à l'échelle
                var X_laborde = k0 * (dX * Math.cos(alpha0) + dY * Math.sin(alpha0));
                var Y_laborde = k0 * (-dX * Math.sin(alpha0) + dY * Math.cos(alpha0));

                return [X_laborde, Y_laborde];
            }

            var convertedCoord = geographicToLaborde(lat, lon);
            $('#conversion-result').html(`<p>Coordonnées Laborde : X=${convertedCoord[0]}, Y=${convertedCoord[1]}</p>`);
        });
    });

    $('#convert-data').click(function() {
        $('#conversion-form').html(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Conversion de Données</h5>
                    <p>Fonctionnalité à implémenter...</p>
                </div>
            </div>
        `);
    });
});
