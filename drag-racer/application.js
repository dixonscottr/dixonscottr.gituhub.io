function Player(img, name, strip) {
  var location = 1;
  var name = name;

  this.strip = strip;
  this.img = img;

  this.getName = function() {
    return name;
  }

  this.getCurrentLocation = function() {
    return location;
  }

  this.setLocation = function(newLocation) {
    location = newLocation;
  }
}

Player.prototype.updatePlayerPosition = function(newLocation) {
  this.setLocation(newLocation);
}
Player.prototype.advancePlayer = function() {
  var newLocation = (this.getCurrentLocation() + 1);
  this.updatePlayerPosition(newLocation);
}

var gameOver = function() {
  if(player1.getCurrentLocation() >= 10 || player2.getCurrentLocation() >= 10 ) {
    return true;
  }
  else {
    return false;
  }
}

var tieGame = function() {
  if(gameOver() && (player1.getCurrentLocation() === player2.getCurrentLocation())) {
    return true;
  }
  else {
    return false;
  }
}
var getWinner = function() {
  if(gameOver() && !(tieGame())) {
    if(player1.getCurrentLocation() > player2.getCurrentLocation()) {
      return player1.getName();
    }
    else {
      return player2.getName();
    }
  }
}

var getLoser = function() {
  if(gameOver() && !(tieGame())) {
    if(player1.getCurrentLocation() > player2.getCurrentLocation()) {
      return player2.getName();
    }
    else {
      return player1.getName();
    }
  }
}

// function makeCellActive(strip, currentLocation) {
//   $(strip + ' td:nth-child(' + currentLocation + ')').addClass('active');
// }

function makeNewestCellActive(player) {
  currentLocation = player.getCurrentLocation();
  $target = $(player.strip + ' td:nth-child(' + currentLocation + ')');
  $target.css({'background-image': player.img, 'background-size': '100%'});
}

function progressPlayer(player) {
  player.advancePlayer();
  // var newLocation = player.getCurrentLocation();
  // makeCellActive(player.strip, newLocation);
  makeNewestCellActive(player);
}

//start jQuery below

var player1 = new Player("url('lil-poundcake.jpg')", "Lil' Poundcake", '#player1_strip');
var player2 = new Player("url('bob.jpg')", "Bob", '#player2_strip');

$( document ).ready(function() {
  $("h1, .game-instructions, footer").sparkle({
    color: 'rainbow',
    count: 30,
    overlap: 0,
    speed: 2,
    minSize: 4,
    maxSize: 20,
    direction: "both"
  });

  makeNewestCellActive(player1);
  makeNewestCellActive(player2);


  $(document).on('keyup', function(event){
    if (gameOver()) {
      if (tieGame()) {
        $('header').append('<h2>Shantay, you BOTH stay</h2>');
      }
      else {
        var winner = getWinner();
        var loser = getLoser();
        var newContent = ('<h2>Condragulations ' + winner + ' !</h2>' +'<h2>Sashay away ' + loser + ' !</h2>')
        if($('.winner-display').text()) {
        }
        else {
          $('.winner-display').append(newContent);
        }
      }
    }
    else {
      var code = event.keyCode || event.which;
      if(code === 81) {
        // $(player1.strip + ' td').removeClass('active');
        $(player1.strip + ' td').css('background-image', '');
        progressPlayer(player1);
      }
      else if (code === 80) {
        // $(player2.strip + ' td').removeClass('active');
        $(player2.strip + ' td').css('background-image', '');
        progressPlayer(player2);
      }
    }
  });

});
