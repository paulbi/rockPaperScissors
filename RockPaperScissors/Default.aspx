<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="RockPaperScissors._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Rock, Paper, Scissors - Lets have some fun!</title>
    <link href="Css/main-001.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/jquery-1.4.1.min.js" type="text/javascript"></script>
    <script src="http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js"></script>
    <script src="Scripts/gameLogic.js" type="text/javascript"></script>
</head>
<body>
    <div id="page">
        
        <!-- Information HUD bar -->
        <div id="hud">
            <div>
            <select id="selectPlayerType" class="hudSelect">
                <option value="1">Human</option>
                <option value="2">Computer</option>
            </select>
            <input type="button" id="btnStartGame" value="Start" />
            <input type="button" id="btnStopGame" value="Stop" />
            </div>
            <div>&nbsp;<img src="Images/vs.png" id="vsImg" /></div>
            <div>Computer</div>
        </div>
        <!-- // -->
        
        <!-- Simple drop down loader -->
        <div id="loader" style="display: none"></div>
        <!-- // -->
        <div class="clear"></div>
        
        <!-- Player option images -->
        <div id="player1">
            <div class="rock" rel="1"></div>
            <div class="paper" rel="2"></div>
            <div class="scissors" rel="3"></div>
        </div>
        <!-- // -->

        <!-- Scores container DIV -->
        <div id="gameSummary">
            <div class="totals">
                <h4>player</h4>
                <p id="playerScore">0</p>
            </div>
            <div class="totals">
                <h4>ties</h4>
                <p  id="drawScore">0</p>
            </div>
            <div class="totals">
                <h4>computer</h4>
                <p id="computerScore">0</p>
            </div>
            <div class="clear"></div>
            <div id="turnResult"></div>
        </div>
        <!-- // -->
        
        <!-- Computer display options container DIV -->
        <div id="computer">
            <img src="Images/spinner.gif" style="display: none" id="spinner"/>
            <div class="rock" style="display: none" rel="1"></div>
            <div class="paper" style="display: none" rel="2"></div>
            <div class="scissors" style="display: none" rel="3"></div>
        </div>
        <!-- // -->
        <div class="clear"></div>
    </div>
    
    <div id="startupInfo">
          <div>
            <h2>Rock, Paper, Scissors by Paul Bilton</h2>
            <p>
              Simply select your player option from the drop down box (top left) and then sit back and enjoy a game!
            </p>
            <p style="color:#666">
              To close, click the Continue button or hit the ESC key.
            </p>
            <p>
              <button class="close"> Continue </button>
            </p>
          </div>
    </div>

</body>
</html>
