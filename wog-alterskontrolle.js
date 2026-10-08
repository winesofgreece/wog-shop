(function () {

    'use strict';

    function getRequiredAge() {

        var path = (window.location.pathname || '').toLowerCase();

        /* 18+ für Spirituosen */

        if (

            path.indexOf('/spirituosen/') !== -1 ||

            path.indexOf('/ouzo/') !== -1 ||

            path.indexOf('/gin/') !== -1 ||

            path.indexOf('/likoer/') !== -1 ||

            path.indexOf('/likör/') !== -1 ||

            path.indexOf('/brandy/') !== -1 ||

            path.indexOf('/metaxa/') !== -1 ||

            path.indexOf('/tsipouro/') !== -1 ||

            path.indexOf('/raki/') !== -1

        ) {

            return 18;

        }

        /* 16+ für Wein und Schaumwein */

        if (

            path.indexOf('/weine/') !== -1 ||

            path.indexOf('/wein/') !== -1 ||

            path.indexOf('/schaumwein/') !== -1

        ) {

            return 16;

        }

        return 0;

    }

    function isProductPage() {

        return !!document.querySelector(

            '.product--details, .product--detail-upper, .product--buybox, .buybox--form, form[action*="checkout/addArticle"]'

        );

    }

    function getSavedAge() {

        try {

            return parseInt(

                localStorage.getItem('wog_age_level') || '0',

                10

            );

        } catch (e) {

            return 0;

        }

    }

    function getSavedTime() {

        try {

            return parseInt(

                localStorage.getItem('wog_age_time') || '0',

                10

            );

        } catch (e) {

            return 0;

        }

    }

    function saveAge(age) {

        try {

            var currentAge = getSavedAge();

            localStorage.setItem(

                'wog_age_level',

                String(Math.max(currentAge, age))

            );

            localStorage.setItem(

                'wog_age_time',

                String(Date.now())

            );

        } catch (e) {}

    }

    function alreadyConfirmed(requiredAge) {

        var savedAge = getSavedAge();

        var savedTime = getSavedTime();

        var thirtyDays =

            30 * 24 * 60 * 60 * 1000;

        return (

            savedAge >= requiredAge &&

            savedTime > 0 &&

            (Date.now() - savedTime) < thirtyDays

        );

    }

    function showAgeGate(requiredAge) {

        if (document.getElementById('wog-age-overlay')) {

            return;

        }

        var overlay = document.createElement('div');

        overlay.id = 'wog-age-overlay';

        overlay.innerHTML =

            '<div id="wog-age-box" role="dialog" aria-modal="true">' +

                '<h2>Altersbestätigung</h2>' +

                '<p>' +

                    'Dieses Produkt darf nur an Personen ab ' +

                    '<strong>' + requiredAge + ' Jahren</strong> ' +

                    'abgegeben werden.' +

                    '<br><br>' +

                    'Bitte bestätigen Sie Ihr Alter.' +

                '</p>' +

                '<button type="button" ' +

                    'id="wog-age-confirm" ' +

                    'class="wog-age-button">' +

                    'Ja, ich bin mindestens ' +

                    requiredAge +

                    ' Jahre alt' +

                '</button>' +

                '<button type="button" ' +

                    'id="wog-age-deny" ' +

                    'class="wog-age-button">' +

                    'Nein, zurück zur Startseite' +

                '</button>' +

            '</div>';

        document.body.appendChild(overlay);

        overlay.style.display = 'flex';

        document.body.style.overflow = 'hidden';

        /* JA */

        document

            .getElementById('wog-age-confirm')

            .addEventListener(

                'click',

                function () {

                    saveAge(requiredAge);

                    document.body.style.overflow = '';

                    if (overlay.parentNode) {

                        overlay.parentNode.removeChild(overlay);

                    }

                }

            );

        /* NEIN */

        document

            .getElementById('wog-age-deny')

            .addEventListener(

                'click',

                function () {

                    window.location.href = '/';

                }

            );

    }

    function runAgeCheck() {

        var requiredAge = getRequiredAge();

        if (!requiredAge) {

            return;

        }

        if (!isProductPage()) {

            return;

        }

        if (alreadyConfirmed(requiredAge)) {

            return;

        }

        showAgeGate(requiredAge);

    }

    if (document.readyState === 'loading') {

        document.addEventListener(

            'DOMContentLoaded',

            runAgeCheck

        );

    } else {

        runAgeCheck();

    }

})();
