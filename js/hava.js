var dev = false;
var lat = 0;
var lon = 0;
var current = 0;
var scrollSpeed = 0;
var marker;
var map;
var rainInterval;
var snowInterval;

// This is temporary hopefully
var lazyWayOfDoingThings = false;
var ohBoyAmIBadAtCoding = false;

function tempConversion() {
    var temp = $("#temperature").text();
    if (temp.indexOf("F") >= 0) {
        $("#temperature").html(((temp.slice(0,-2) - 32) * 5 / 9).toFixed(2)+"&nbsp;ºC");
        $("#switch").html("&nbsp;(ºF)");
    } else if (temp.indexOf("C") >= 0) {
        $("#temperature").html((temp.slice(0,-2) * 9 / 5 + 32).toFixed(2)+"&nbsp;ºF");
        $("#switch").html("&nbsp;(ºC)");
    } 
}

function devlog(x) {
    if (dev) console.log(x);
}

function toggleMap() {
    if(map && !$("#map").hasClass("hidden")) {
        $("#map").toggleClass("hidden");
        $("#go").toggleClass("hidden");
        return;
    } else if (map) {
        $("#map").toggleClass("hidden");
        $("#go").toggleClass("hidden");
        return;
    }
    $("#go").toggleClass("hidden");
    
    var latlng = new google.maps.LatLng(lat, lon);

    var myOptions = {
        zoom: 3,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);
    
    var myLatLng = {lat: lat, lng: lon};
    marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Buradasınız'
        });

    google.maps.event.addListener(map, 'click', function(e) {
        placeMarker(e.latLng);
    });

    function placeMarker(location) {
        if (marker == undefined){
            marker = new google.maps.Marker({
                position: location,
                map: map, 
                title: 'Burada değilsiniz',
                animation: google.maps.Animation.DROP,
            });
        }
        else{
            marker.setPosition(location);
        }
        lat = marker.position.lat();
        lon = marker.position.lng();
    }
}

// Not reeeeally needed but hey
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            devlog( "Coğrafi Konum isteği reddedildi.");
            break;
        case error.POSITION_UNAVAILABLE:
            devlog( "Konum bilgisi kullanılamıyor.");
            break;
        case error.TIMEOUT:
            devlog( "Kullanıcı konumu zaman aşımına uğradı.");
            break;
        case error.UNKNOWN_ERROR:
            devlog( "Bilinmeyen bir hata oluştu.");
            break;
                     }
}

function getLocalData() {
    // openweathermap API
    var url = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?units=metric";
    url += "&APPID=" + "79b6dd8389c5d064400a81ee89b84e66";
    url += "&lat=" + lat;
    url += "&lon=" + lon;

    // google maps API
    var url2 = "https://maps.googleapis.com/maps/api/timezone/json?";
    url2 += "key=" + "AIzaSyAtNCmXXIqEE5l-U3aQdY4ngJ2LwboFmC4";
    url2 += "&location=" + lat + "," + lon;
    url2 += "&timestamp=";

    $.getJSON(url, function(json) {
        $.getJSON(url2 + json.dt, function(timeZone) {
            devlog(JSON.stringify(json));
            parseWeather(json);
            var date = new Date((json.sys.sunrise+timeZone.rawOffset-3600) * 1000);
            devlog(date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds());
            date = new Date((json.sys.sunset+timeZone.rawOffset-3600) * 1000);
            scrollSpeed = json.wind.speed*25;
            devlog(date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds());
            devlog(timeZone);
            date = new Date((json.dt+timeZone.rawOffset-3600)*1000);
            devlog(date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds());

            var amount = (json.hasOwnProperty('rain')) ? json.rain["3h"]*60 : 500;
            if (json.weather[0].description.indexOf("rain") >= 0) setTimeout(() => makeItRain(amount), 1200); 
            else makeItRain(0);
            amount = (json.hasOwnProperty('snow')) ? json.snow["3h"]*15 : 40; // not working yet TODO
            if (json.weather[0].description.indexOf("snow") >= 0) setTimeout(() => makeItSnow(amount), 1200); 
            else makeItSnow(0);
            adjustCloudiness(json.clouds.all);
            adjustSkyCrap(json.sys.sunrise+timeZone.rawOffset-3600, json.sys.sunset+timeZone.rawOffset-3600, json.dt+timeZone.rawOffset-3600);
        });
    });
}

// This generates the rain effect, I didn't make it sadly. 
function makeItRain(maxParts) {
    if (lazyWayOfDoingThings) clearInterval(rainInterval);
    lazyWayOfDoingThings = true;

    var canvas = $('#rain')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        ctx.strokeStyle = "rgba( 174, 194, 224, 0.5)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.clearRect( 0, 0, w, h);


        var init = [];
        for (var a = 0; a < maxParts; a++) {
            init.push({
                x: Math.random() * w,
                y: Math.random() * h,
                l: Math.random() * 1,
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10
            })
        }

        var particles = [];
        for(var b = 0; b < maxParts; b++) {
            particles[b] = init[b];
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for(var c = 0; c < particles.length; c++) {
                var p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
            }
            move();
        }

        function move() {
            for(var b = 0; b < particles.length; b++) {
                var p = particles[b];
                p.x += p.xs;
                p.y += p.ys;
                if (p.x > w || p.y > h) {
                    p.x = Math.random() * w;
                    p.y = -20;
                }
            }
        }

    }   
    rainInterval = setInterval(draw, 30);
}

// Didn't make this
function makeItSnow(mp) {
    if (ohBoyAmIBadAtCoding) clearInterval(snowInterval);
    ohBoyAmIBadAtCoding = true;
    
    console.log(mp);

    var canvas = $("#snow")[0];
    var ctx = canvas.getContext("2d");

    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    var particles = [];
    for(var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random()*W, 
            y: Math.random()*H, 
            r: Math.random()*4+1,
            d: Math.random()*mp
        })
    }

    function drawSnow() {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for(var i = 0; i < mp; i++) {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        update();
    }

    var angle = 0;
    function update() {
        angle += 0.01;
        for(var i = 0; i < mp; i++) {
            var p = particles[i];
            p.y += Math.cos(angle+p.d) + 1 + p.r/2;
            p.x += Math.sin(angle) * 2;

            if(p.x > W+5 || p.x < -5 || p.y > H) {
                if(i%3 > 0) {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                } else {
                    if(Math.sin(angle) > 0) {
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                    } else {
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                }
            }
        }
    }

    snowInterval = setInterval(drawSnow, 33);
}

// Temp solution to get the info on the screen
function parseWeather(json) {
    $("#weather").text(json.weather[0].main);
    $("#weatherdesc").text('"'+json.weather[0].description+'"');
    $("#icon").attr("src","https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
    $("#country").text(json.name.slice(0,15) + ", " + json.sys.country);
    $('#country').prop("title", json.name);
    $("#lonlat").text(json.coord.lon + " / " + json.coord.lat);
    $("#temperature").html(json.main.temp + "&nbsp;ºC");
    $("#cloudiness").text(json.clouds.all + "%");
    $("#humidity").text(json.main.humidity + "%");
    $("#wind").text(json.wind.speed + "m/s");
}

function adjustCloudiness(clouds) {
    if(!clouds) $(".clouds").css({display: "none"}); // Don't lag my browser if there's no clouds
    else $(".clouds").css({display: "initial"});

    var temp = 100-(0.4 * clouds) +"%";
    devlog("cloudiness: " + clouds, temp);
    $(".clouds").velocity({bottom: temp}, 1000, "spring");
} 

function adjustSkyColor(n, day) {
    n *= 2;   
    if (day) {
        $("#sky").velocity({ 
            backgroundColorGreen: 30+(100*n),
            backgroundColorBlue: 255-(80*n)
        }, 1000);       
    } else {
        $("#sky").velocity({  // Night colors could use some work
            backgroundColorGreen: (130*n),
            backgroundColorBlue: 255-(80*n)
        }, 1000); 
    }   
}

function adjustStars(opacity, day) {
    if (!day) $("#stars").velocity({opacity: 1-opacity});
    else $("#stars").velocity({opacity: 0});
}

function adjustDarkness(opacity, day) {
    opacity *= 1.5;
    if (day) $("#darkness").velocity({opacity: 0});
    else $("#darkness").velocity({opacity: opacity});
}

// This looks like ass on vertical screens
function adjustMountains()  {
    $("#mtn-left").css({"left": "-15%"});
    $("#mtn-right").css({"right": "-15%"});

    $("#mtn-left").velocity({"bottom": "10%"},Math.floor(((Math.random() * 8) + 5)*100),"easeOutBack");
    $("#mtn-right").velocity({"bottom": "10%"},Math.floor(((Math.random() * 8) + 5)*100),"easeOutBack");

}

function adjustSunPos(pos, day) {
    var w = window.innerWidth;

    if (day) {
        devlog("sun: " + 90-(pos*100*2)+"%");
        $("#sun").velocity({
            top: [90-(pos*100*2)+"%", "ease"],
            width: (w/15+(w*pos/3))+"px",
            height: (w/15+(w*pos/3))+"px"
        }, 1000, "linear");
    } else {
        devlog("sun: gone");
        $("#sun").velocity({top: 100+"%"}, 500);
    }
}

/*function adjustSunColor(color, day) {
    // Do I even need this
}*/

function adjustMoonPos(pos, day) {
    var w = window.innerWidth;

    $("#moon").velocity({width: (w/12)+"px", height: (w/12)+"px"}, 500);

    if (day) {
        devlog("moon: gone");
        $("#moon").velocity({top: 100+"%"}, 500, "spring");
    } else {
        devlog("moon: " + 90-(pos*100*2)+"%");
        $("#moon").velocity({top:90-(pos*100*2)+"%"}, 500, "spring");
    }
}

function adjustSkyCrap(sunrise, sunset, time, offset) {
    var T = new Date(time*1000);
    var R = new Date(sunrise*1000);
    var S = new Date(sunset*1000);
    var tMin = T.getHours() * 60 + T.getMinutes();
    var rMin = R.getHours() * 60 + R.getMinutes();
    var sMin = S.getHours() * 60 + S.getMinutes();
    var day = (tMin > rMin && tMin < sMin);
    var x = (tMin-rMin)/(sMin-rMin);

    if (!day) x = (tMin > sMin) ? (rMin-tMin+24*60)/(rMin-sMin+24*60) : -((sMin-tMin-24*60)/(rMin-sMin+24*60));

    // Sunsets are cool
    $("#skygradient").velocity({opacity: 1*x**20}, 1000); 

    adjustStars(x, day);

    devlog("day/night% " + x);
    devlog("day: " + day);

    x = (x > 0.5) ? 1-x : x;

    adjustDarkness(x, day);
    adjustMoonPos(x, day);
    adjustSunPos(x, day);
    //adjustSunColor(x);
    adjustMountains();
    adjustSkyColor(x, day)
}

/*function resizeEverything(height, width) {
    // ...
}*/

$(document).ready( function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            getLocalData();
        }, function(error) {
            showError(error);
            $.getJSON('https://cors-anywhere.herokuapp.com/jsonip.com/?', function(client) { 
                var foobar = client.ip.split(",");
                $.getJSON('https://cors-anywhere.herokuapp.com/ip-api.com/json/' + foobar[0], function(ip) { 
                    lat = ip.lat;
                    lon = ip.lon;
                    getLocalData();
                });
            });
        });
    } 
    setInterval(getLocalData, 60000); 
});

/*$(document).keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // This is just so I can test various things
    }
});*/

/*window.addEventListener('resize', function(event){
    // do stuff here to make everything responsive
    // will probably lag a lot
    // maybe later
});*/
