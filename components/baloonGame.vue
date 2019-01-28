<template>
  <div id="game">
   <!--  <h1>HI there</h1> -->
  <div id="renato">
    <!-- <a href="http://rena.to/">rena.to</a> -->
  </div>
  <div style="opacity: 0;" id="counter"></div>
  <div id="msg"></div>
  <div style="opacity: 0;" id="level"></div>
  <div id="balloons"></div>
</div>
</template>

<script>
  export default {
    mounted: function() {
      // + jquery

var Game;

Game = {
  
  level: 1,
  counter: 0,
  points: 0,
  balloons: function(){ return Math.round(Math.pow(((this.level + 2)*1.5), 1.1)) },
  velocity: function(){ return Math.max(500, Math.round(2000 - Math.pow(this.level*100, 1.2))); },
  alter: false,
  single: '.balloon',
  balloonsWrapper: '#balloons',
  counterWrapper: '#counter',
  msgWrapper: '#msg',
  levelWrapper: '#level',
  gameWrapper: '#game',
  
  Utils: { 
    animationEndEvent: "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
  },
  
  Assets: {
    balloons: [
      {color: '#f1c40f', points: 40},
      {color: '#2ecc71', points: 30},
      {color: '#3498db', points: 20},
      {color: '#9b59b6', points: 15},
      {color: '#7f8c8d', points: 10},
      {color: '#e74c3c', points: 30}
    ], 
    rareBalloons: [
      {color: '#2c3e50', points: 1000}, 
    ], 
    balloonsAnim: ['anim1', 'anim2', 'anim3', 'anim4'],
    msgs: ['Yeah!', 'You rocks!', 'Amazing!', 'Perfect!'],
  },
  
  _startEvents: function(){
    $(this.counterWrapper)
    .unbind('count0')
    .bind('count0', function(){
      Game.level++;
      localStorage.setItem('bLevel', Game.level);
      $(Game.msgWrapper)
      .text(Game.Assets.msgs[Game.Utils.getRandomInt(0, Game.Assets.msgs.length-1)])
      .addClass('displayMsg')
      .on(Game.Utils.animationEndEvent, function(){
        $(this).removeClass('displayMsg');
        $(Game.gameWrapper).trigger('end').trigger('endLevel' + (Game.level - 1));
        Game.start();
      });

    });
    
    $(this.single).not('.speedOut')
    .unbind('click')
    .bind('click', function(e){
     
      var balloon_type = $(e.currentTarget).data('type'),
          rare = $(e.currentTarget).data('rare'),
          balloon;
      if(rare == 1){
        balloon = Game.Assets.rareBalloons[balloon_type];
        Game._allBalloons(0);
      } else {
        balloon = Game.Assets.balloons[balloon_type];
      }
      Game._addPoint(e.pageX, e.pageY, balloon);
      Game._clickEffect(e.pageX, e.pageY);
      Game._updateCounter(false); 
      $(this).addClass('speedOut').on(Game.Utils.animationEndEvent, function(){ $(this).remove(); });

    });
    
    $(this.gameWrapper)
    .unbind('end')
    .bind('end', function(){
      Game._alterStop();
    });

  },
  
  _allBalloons: function(id){
    $(this.single).not('.speedOut').each(function(){
      var balloon = Game._getBalloonInfo(id);
      $(this).data('type', id)
      .data('rare', 0)
      .css('box-shadow', 'none')
      .css('background', balloon.color);
    });
  },
  
  _alterBalloons: function(){
    $(this.single).not('.speedOut').each(function(){
      var lucky = Game.Utils.getRandomInt(0, 1000),
          rBalloon, newBalloon, rare;
      if(lucky > 995){
        rBalloon = Game._getRandomRareBalloon();
        newBalloon = Game._getRareBalloonInfo(rBalloon);
        rare = 1;
        $(this).css('box-shadow', '0 0 25px 5px rgba(0,0,0,0.75)');
      } else {
        rBalloon = Game._getRandomBalloon();
        newBalloon = Game._getBalloonInfo(rBalloon);
        rare = 0;
        $(this).css('box-shadow', 'none');
      }
      $(this).data('type', rBalloon)
      .data('rare', rare)
      .css('background', newBalloon.color);
    });
  },
  
  _alterStart: function(){
    this.alter = setInterval(function(){
      Game._alterBalloons();
    }, this.velocity());
  },
  
  _alterStop: function(){
    clearInterval(this.alter);
  },
  
  _addPoint: function(x, y, balloon){
    var point = $("<div class='point'></div>");
    point.css('left', x).css('top', y);
    point.text(balloon.points);
    if(balloon.points > 0){
      point.addClass('gain');
      point.text("+" + balloon.points);
    } else {
      point.addClass('loss');
    }
    point.prependTo('html');
    this.points = this.points + balloon.points;
    this._updateInfo();
  },
  
  _clickEffect: function(x, y){
    var click = $("<div class='click'></div>");
    click.css('left', x).css('top', y);
    click.prependTo('html');
  },
  
  _updateCounter: function(setup){
    if(setup){
      this.counter = $(this.single).toArray().length;
    } else {
      this.counter--;
    }
    $(this.counterWrapper).trigger('count' + this.counter.toString());
    $(this.counterWrapper).text(this.counter);
  },
  
  _getRandomBalloon: function(){
    return this.Utils.getRandomInt(0, this.Assets.balloons.length-1);
  },
  
  _getBalloonInfo: function(id){
    return this.Assets.balloons[id];
  }, 
  
  _getRandomRareBalloon: function(){
    return this.Utils.getRandomInt(0, this.Assets.rareBalloons.length-1); 
  },
  
  _getRareBalloonInfo: function(id){
    return this.Assets.rareBalloons[id];
  }, 
  
  _drawBalloons: function(){
    var maxTop = $(this.balloonsWrapper).height() - 65;
    var maxLeft = $(this.balloonsWrapper).width() - 45;  
    var balloons = this.balloons();
    for (let i = 0; i < balloons; i++) {
      var rBalloon = this._getRandomBalloon();
      var r = {
        top: this.Utils.getRandomInt(0, maxTop),
        left: this.Utils.getRandomInt(0, maxLeft), 
        balloon: this._getBalloonInfo(rBalloon),
        anim: this.Assets.balloonsAnim[this.Utils.getRandomInt(0, this.Assets.balloonsAnim.length-1)]
      }
      var balloon = $("<div></div>").addClass('balloon');
      balloon.addClass(r.anim);
      balloon.data('type', rBalloon);
      balloon.data('rare', 0);
      balloon.css('top', r.top + 'px');
      balloon.css('left', r.left + 'px');
      balloon.css('background', r.balloon.color);
      balloon.appendTo(this.balloonsWrapper); 
    } 
  },
  
  _updateInfo: function(){
    var info = $("<div></div>")
    .append("<strong>Level: </strong>" + this.level)
    .append(" - <strong>Points: </strong>" + this.points);
    $(this.levelWrapper).html(info);
  },
  
  start: function(){
    $(this.gameWrapper).trigger('start').trigger('startLevel' + this.level);
    this._drawBalloons();
    this._updateCounter(true);
    this._updateInfo();
    this._startEvents();
    this._alterStart();
  },
}

$(document).ready(function(){  
  Game.start();
});
    }
  }
</script>

<style>
  /* @import url(https://fonts.googleapis.com/css?family=Maven+Pro:400,700);
html, body {
  font-family: "Maven Pro";
  height: 100%;
  margin: 0;
  background: #ecf0f1;
} */

#game {
  position: relative;
  width: 100%;
  height: 350px;
  /*background: #f9f9f9;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;*/
}

#balloons {
  position: relative;
  width: 100%;
  height: 100%;
}

.balloon {
  z-index: 1;
  width: 55px;
  height: 65px;
  position: absolute;
  background: #999;
 
  cursor: crosshair;
  border-radius:50% ;

}
.balloon:after, .balloon:before {
  position: absolute;
  content: '';
  display: block;
}
.balloon:before {
  width: 10px;
  height: 15px;
  top: 7px;
  left: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: rotate(25deg);
}
.balloon:after {
  left: 50%;
  height: 20px;
  width: 4px;
  background: #BCB0AC;
  transform: translateX(-50%) translateY(98%);
  bottom: 0;
  border-radius: 5px;
}

#counter {
  pointer-events: none;
  position: absolute;
  right: 5px;
  top: 5px;
  color: #000;
}

#renato {
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 100;
}
#renato a {
  color: #e6e6e6;
}

#level {
  pointer-events: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 5px;
  color: #2980b9;
  font-weight: 400;
}
#level strong {
  font-weight: 700;
}

#msg {
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 3;
  font-size: 70px;
  opacity: 0;
  text-align: center;
  z-index: 0;
  cursor: default;
}

.click {
  z-index: 2;
  pointer-events: none;
  transform: translateY(-50%) translateX(-50%);
  animation: click .5s linear;
  animation-fill-mode: forwards;
  position: absolute;
  background: rgba(200, 200, 200, 0.4);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.point {
  pointer-events: none;
  transform: translateY(-50%) translateX(-50%);
  animation: point .5s linear;
  animation-fill-mode: forwards;
  position: absolute;
  z-index: 3;
  color: black;
  font-size: 30px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}
.point.gain {
  color: #27ae60;
}
.point.loss {
  color: #c0392b;
}

@keyframes anim1 {
  0%, 100% {
    transform: translateY(20%);
  }
  50% {
    transform: translateY(-20%);
  }
}
.anim1 {
  animation: anim1 3s ease-in-out infinite;
}

@keyframes anim2 {
  0%, 100% {
    transform: translateY(-20%);
  }
  60% {
    transform: translateY(30%);
  }
}
.anim2 {
  animation: anim2 5s ease-in-out infinite;
}

@keyframes anim3 {
  0%, 100% {
    transform: translateY(-10%);
  }
  30% {
    transform: translateY(10%);
  }
}
.anim3 {
  animation: anim3 4s ease-in-out infinite;
}

@keyframes anim4 {
  0%, 100% {
    transform: translateY(10%);
  }
  50% {
    transform: translateY(-40%);
  }
}
.anim4 {
  animation: anim4 6s ease-in-out infinite;
}

@keyframes speedOut {
  0% {
    transform: rotate(0deg) translateY(0);
    background: #999!important;
  }
  100% {
    transform: rotate(-10deg);
    top: -200px;
    transform: scale(4);
    opacity: 0;background: #999!important;
  }
}
.speedOut {
  pointer-events: none;
  animation: speedOut 1s ease;

}

@keyframes displayMsg {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.displayMsg {
  z-index: 10;
  animation: displayMsg 3s ease-in-out;
}

@keyframes point {
  0% {
    transform: translateY(-50%) translateX(-50%);
    opacity: 1;
  }
  100% {
    transform: translateY(-150%) translateX(-50%);
    opacity: 0;
  }
}
@keyframes click {
  0% {
    transform: translateY(-50%) translateX(-50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-50%) translateX(-50%) scale(0);
    opacity: 0;
  }
}

</style>