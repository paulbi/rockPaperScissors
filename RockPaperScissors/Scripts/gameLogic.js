var computerMode = false;
var roundTotal = 10;

$(document).ready(function () {

    // Show game intro tip screen if first time visit
    showStartupOverlay();

    // reset game board
    initNewGame();

    initPlayerClickEvent();

    // Set the page up ready for the user to start the game
    enablePlayerOptions();

    // Bind simple change event to player type drop down 
    $("#selectPlayerType").change(function () {

        
        //Default scores and clear result display
        initNewGame();

        if ($(this).val() == 2) { // If computer game option selected then...
            $("#player1 div").addClass("disabled");
            showStartButton();

            computerMode = true;
        } else {
            enablePlayerOptions();
            hideStartButton();
            hideStopButton();

            clearInterval(intervalId);
            computerMode = false;
        }
    });

    $("#btnStopGame").click(stopComputerGame);
});

var intervalId;

function showStartButton() {
    $("#btnStartGame").show().click(function () {

        showStopButton();

        $("#player1 div").mousedown(function (e) { e.preventDefault(); });

        intervalId = setInterval(function () {
            var num = Math.floor(Math.random() * 3);

            $("#player1 div")[num].click();

        }, 2000);
    });
}

function showStopButton() {
    hideStartButton();
    $("#btnStopGame").show();
}

function stopComputerGame() {
    clearInterval(intervalId);

    hideStopButton();

    showStartButton();
}

function hideStopButton() {
    $("#btnStopGame").hide();
}

function hideStartButton() {
    clearInterval(intervalId);
    
    $("#btnStartGame").hide().unbind("click");
}

function showLoader(ajaxCallFunc) {
    // Show loader element then call the ajax function
    $("#loader").slideDown('fast', ajaxCallFunc);
}

function hideLoader() { $("#loader").slideUp('fast'); }

function disablePlayerOptions() {
    /* visually show images are disabled  */
    $("#player1 div").each(function () {
        // Visually disable all apart from selected item
        if ($(this).hasClass("selected") == false) {
            $(this).addClass("opacity40 disabled");
        }
    });
}

function enablePlayerOptions() {
    // Clean up item CSS classes
    $("#player1 div").removeClass("selected").removeClass("disabled").removeClass("opacity40");
}

// Bind click event to player options
function initPlayerClickEvent() {
    $("#player1 div").click(function () {
        
        // Flag the item which has been selected/clicked on
        var id = $(this).addClass("selected").attr("rel");

        //disable other player options
        disablePlayerOptions();

        //display visual indicator - and pass in our function call to the server (not necessarily the best way but included for demo purposes).
        showLoader(function () {

            $.ajax({
                type: "POST",
                url: "Default.aspx/PlayUserTurn",
                data: "{'option': " + id + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    var gameState = result.d;

                    var gResult = gameState.GameResult.toUpperCase();

                    if (gResult == "WIN")
                        playerScoreIncrement();
                    else if (gResult == "LOSE")
                        computerScoreIncrement();
                    else
                        drawScoreIncrement();

                    displayComputerPlayerChoice(gameState.ComputerPlayerChoice);

                    displayResultOutcome(gResult);

                    enablePlayerOptions();

                    hideLoader();
                }
            });
        });
    });
}

function displayResultOutcome(resultText) {
    $("#turnResult").html(resultText);
}

function displayComputerPlayerChoice(id) {
    $("#computer div").hide();
    $("#computer div[rel = " + id +"]").show().delay(1000).fadeOut("fast");
}

function showStartupOverlay() {

    if (getCookie("showStartup") == "") {

        $("#startupInfo").overlay({
            // custom top position
            top: 60,
            // some mask tweaks suitable for facebox-looking dialogs
            mask: {
                // you might also consider a "transparent" color for the mask
                color: '#fff',
                // load mask a little faster
                loadSpeed: 200,
                // very transparent
                opacity: 0.7
            },
            // disable this for modal dialog-type of overlays
            closeOnClick: false,
            // load it immediately after the construction
            load: true
        });

        createCookie("showStartup", "1", 1);
    }
}

function playerScoreIncrement() {
    var d = $("#playerScore");
    d.html(parseInt(d.html()) +1);
}

function computerScoreIncrement() {
    var d = $("#computerScore");
    d.html(parseInt(d.html()) + 1);
}

function drawScoreIncrement() {
    var d = $("#drawScore");
    d.html(parseInt(d.html()) + 1);
}

function  initNewGame() {
    $("#computerScore").html("0");
    $("#playerScore").html("0");
    $("#drawScore").html("0");

    displayResultOutcome("");

    if ($("#selectPlayerType").val() == 2)
        showStartButton();
    else
        hideStartButton();
}

/* Simple cookie add & read code */
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}