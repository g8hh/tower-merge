(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"index_atlas_1", frames: [[0,0,210,220]]},
		{name:"index_atlas_2", frames: [[0,0,158,240]]},
		{name:"index_atlas_3", frames: [[0,0,223,115],[0,117,238,92]]},
		{name:"index_atlas_4", frames: [[0,0,238,92],[0,94,238,92]]},
		{name:"index_atlas_5", frames: [[0,0,228,94],[0,96,228,94]]},
		{name:"index_atlas_6", frames: [[0,0,228,94],[0,96,228,94]]},
		{name:"index_atlas_7", frames: [[0,0,152,140]]},
		{name:"index_atlas_8", frames: [[0,0,152,140]]},
		{name:"index_atlas_9", frames: [[0,0,152,140]]},
		{name:"index_atlas_10", frames: [[0,0,128,117],[0,119,128,117]]},
		{name:"index_atlas_11", frames: [[0,119,214,68],[0,0,128,117]]},
		{name:"index_atlas_12", frames: [[0,140,193,74],[0,0,214,68],[0,70,214,68]]},
		{name:"index_atlas_13", frames: [[0,134,203,53],[0,0,195,65],[0,67,195,65]]},
		{name:"index_atlas_14", frames: [[89,122,85,120],[0,0,87,120],[0,122,87,120],[89,0,87,120]]},
		{name:"index_atlas_15", frames: [[99,0,90,45],[99,47,90,45],[0,0,97,97],[0,99,167,48],[0,149,167,48],[0,199,167,48]]},
		{name:"index_atlas_16", frames: [[188,188,58,58],[92,0,61,61],[0,47,61,61],[155,0,61,61],[0,110,61,61],[0,173,61,61],[63,63,61,61],[63,126,61,61],[63,189,61,61],[126,63,61,61],[189,63,61,61],[0,0,90,45],[126,126,60,60],[126,188,60,60],[188,126,60,60]]},
		{name:"index_atlas_17", frames: [[0,0,58,58],[0,60,58,58],[0,120,58,58],[0,180,58,58],[60,0,58,58],[120,0,58,58],[180,0,58,58],[60,60,58,58],[60,120,58,58],[60,180,58,58],[120,60,58,58],[180,60,58,58],[120,120,58,58],[120,180,58,58],[180,120,58,58],[180,180,58,58]]},
		{name:"index_atlas_18", frames: [[0,0,58,58],[0,60,58,58],[0,120,58,58],[0,180,58,58],[60,0,58,58],[120,0,58,58],[180,0,58,58],[60,60,58,58],[60,120,58,58],[60,180,58,58],[120,60,58,58],[180,60,58,58],[120,120,58,58],[120,180,58,58],[180,120,58,58],[180,180,58,58]]},
		{name:"index_atlas_19", frames: [[60,179,52,36],[0,180,52,36],[169,203,52,36],[0,0,58,58],[60,0,58,58],[120,0,58,58],[180,0,58,58],[0,60,58,58],[60,60,58,58],[120,60,58,58],[180,60,58,58],[0,120,58,58],[54,217,52,36],[0,218,52,36],[60,120,56,57],[169,173,83,28],[118,120,49,51],[169,120,49,51],[118,173,49,51]]},
		{name:"index_atlas_20", frames: [[177,0,45,32],[177,34,45,32],[0,38,45,32],[150,68,34,34],[186,68,34,34],[47,44,31,44],[54,0,39,42],[0,72,36,32],[80,84,36,32],[38,90,36,32],[0,0,52,36],[80,44,33,38],[115,44,33,38],[95,0,39,42],[136,0,39,42],[224,0,27,26],[118,104,38,26],[158,104,38,26]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_131 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_133 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_134 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_135 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["index_atlas_12"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(img.CachedBmp_129);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,65,446);


(lib.CachedBmp_128 = function() {
	this.initialize(img.CachedBmp_128);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,65,446);


(lib.CachedBmp_121 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_119 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["index_atlas_14"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_116 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_120 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_117 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["index_atlas_17"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["index_atlas_18"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["index_atlas_15"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["index_atlas_15"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["index_atlas_16"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["index_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(img.CachedBmp_60);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,33,420);


(lib.CachedBmp_58 = function() {
	this.initialize(ss["index_atlas_11"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["index_atlas_12"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["index_atlas_12"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(img.CachedBmp_65);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,671,93);


(lib.CachedBmp_50 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["index_atlas_13"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["index_atlas_15"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["index_atlas_13"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["index_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["index_atlas_13"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["index_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["index_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["index_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["index_atlas_14"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["index_atlas_14"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["index_atlas_14"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(img.CachedBmp_29);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,40);


(lib.CachedBmp_30 = function() {
	this.initialize(img.CachedBmp_30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,67,448);


(lib.CachedBmp_27 = function() {
	this.initialize(ss["index_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["index_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["index_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["index_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["index_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["index_atlas_19"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["index_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["index_atlas_9"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["index_atlas_10"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["index_atlas_10"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["index_atlas_20"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["index_atlas_11"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["index_atlas_15"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(img.CachedBmp_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,38);


(lib.CachedBmp_11 = function() {
	this.initialize(img.CachedBmp_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,38);


(lib.CachedBmp_8 = function() {
	this.initialize(ss["index_atlas_15"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["index_atlas_15"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Растровоеизображение16 = function() {
	this.initialize(img.Растровоеизображение16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,569,225);


(lib.Растровоеизображение2 = function() {
	this.initialize(img.Растровоеизображение2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,576);


(lib.Растровоеизображение3 = function() {
	this.initialize(img.Растровоеизображение3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,576);


(lib.Растровоеизображение6 = function() {
	this.initialize(img.Растровоеизображение6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,576);


(lib.Растровоеизображение4 = function() {
	this.initialize(img.Растровоеизображение4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,576);


(lib.Растровоеизображение7 = function() {
	this.initialize(img.Растровоеизображение7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,576);


(lib.Растровоеизображение5 = function() {
	this.initialize(img.Растровоеизображение5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,576);


(lib.Растровоеизображение12 = function() {
	this.initialize(img.Растровоеизображение12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,111,485);


(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,672,70);


(lib.CachedBmp_31 = function() {
	this.initialize(img.CachedBmp_31);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,667,457);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,747,116);


(lib.CachedBmp_38 = function() {
	this.initialize(img.CachedBmp_38);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,718,651);


(lib.CachedBmp_124 = function() {
	this.initialize(img.CachedBmp_124);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1286,721);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,982,652);


(lib.CachedBmp_39 = function() {
	this.initialize(img.CachedBmp_39);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,387,2316);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.yesB = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_131();
	this.instance.setTransform(1.3,0);

	this.instance_1 = new lib.CachedBmp_130();
	this.instance_1.setTransform(-2,-0.9);

	this.instance_2 = new lib.CachedBmp_133();
	this.instance_2.setTransform(1.3,0);

	this.instance_3 = new lib.CachedBmp_132();
	this.instance_3.setTransform(-2,-0.9);

	this.instance_4 = new lib.CachedBmp_135();
	this.instance_4.setTransform(1.3,0);

	this.instance_5 = new lib.CachedBmp_134();
	this.instance_5.setTransform(-2,-0.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_5},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-0.9,52,36);


(lib.xpBar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EgIqAgkIRVAAIAAEhIxVAAg");
	var mask_graphics_1 = new cjs.Graphics().p("Aoqf3IRVAAIAAFOIxVAAg");
	var mask_graphics_2 = new cjs.Graphics().p("AoqfKIRVAAIAAF7IxVAAg");
	var mask_graphics_3 = new cjs.Graphics().p("AoqedIRVAAIAAGoIxVAAg");
	var mask_graphics_4 = new cjs.Graphics().p("AoqdwIRVAAIAAHVIxVAAg");
	var mask_graphics_5 = new cjs.Graphics().p("AoqdDIRVAAIAAICIxVAAg");
	var mask_graphics_6 = new cjs.Graphics().p("AoqcWIRVAAIAAIvIxVAAg");
	var mask_graphics_7 = new cjs.Graphics().p("AoqboIRVAAIAAJdIxVAAg");
	var mask_graphics_8 = new cjs.Graphics().p("Aoqa7IRVAAIAAKKIxVAAg");
	var mask_graphics_9 = new cjs.Graphics().p("AoqaOIRVAAIAAK3IxVAAg");
	var mask_graphics_10 = new cjs.Graphics().p("AoqZhIRVAAIAALkIxVAAg");
	var mask_graphics_11 = new cjs.Graphics().p("AoqY0IRVAAIAAMRIxVAAg");
	var mask_graphics_12 = new cjs.Graphics().p("AoqYHIRVAAIAAM+IxVAAg");
	var mask_graphics_13 = new cjs.Graphics().p("AoqXaIRVAAIAANrIxVAAg");
	var mask_graphics_14 = new cjs.Graphics().p("AoqWtIRVAAIAAOYIxVAAg");
	var mask_graphics_15 = new cjs.Graphics().p("AoqWAIRVAAIAAPFIxVAAg");
	var mask_graphics_16 = new cjs.Graphics().p("AoqVTIRVAAIAAPyIxVAAg");
	var mask_graphics_17 = new cjs.Graphics().p("AoqUmIRVAAIAAQfIxVAAg");
	var mask_graphics_18 = new cjs.Graphics().p("AoqT5IRVAAIAARMIxVAAg");
	var mask_graphics_19 = new cjs.Graphics().p("AoqTMIRVAAIAAR5IxVAAg");
	var mask_graphics_20 = new cjs.Graphics().p("AoqSfIRVAAIAASmIxVAAg");
	var mask_graphics_21 = new cjs.Graphics().p("AoqRyIRVAAIAATTIxVAAg");
	var mask_graphics_22 = new cjs.Graphics().p("AoqRFIRVAAIAAUAIxVAAg");
	var mask_graphics_23 = new cjs.Graphics().p("AoqQYIRVAAIAAUtIxVAAg");
	var mask_graphics_24 = new cjs.Graphics().p("AoqPrIRVAAIAAVaIxVAAg");
	var mask_graphics_25 = new cjs.Graphics().p("AoqO+IRVAAIAAWHIxVAAg");
	var mask_graphics_26 = new cjs.Graphics().p("AoqORIRVAAIAAW0IxVAAg");
	var mask_graphics_27 = new cjs.Graphics().p("AoqNkIRVAAIAAXhIxVAAg");
	var mask_graphics_28 = new cjs.Graphics().p("AoqM3IRVAAIAAYOIxVAAg");
	var mask_graphics_29 = new cjs.Graphics().p("AoqMKIRVAAIAAY7IxVAAg");
	var mask_graphics_30 = new cjs.Graphics().p("AoqLdIRVAAIAAZoIxVAAg");
	var mask_graphics_31 = new cjs.Graphics().p("AoqKwIRVAAIAAaVIxVAAg");
	var mask_graphics_32 = new cjs.Graphics().p("AoqKDIRVAAIAAbCIxVAAg");
	var mask_graphics_33 = new cjs.Graphics().p("AoqJWIRVAAIAAbvIxVAAg");
	var mask_graphics_34 = new cjs.Graphics().p("AoqIpIRVAAIAAccIxVAAg");
	var mask_graphics_35 = new cjs.Graphics().p("AoqH8IRVAAIAAdJIxVAAg");
	var mask_graphics_36 = new cjs.Graphics().p("AoqHPIRVAAIAAd2IxVAAg");
	var mask_graphics_37 = new cjs.Graphics().p("AoqGiIRVAAIAAejIxVAAg");
	var mask_graphics_38 = new cjs.Graphics().p("AoqF1IRVAAIAAfQIxVAAg");
	var mask_graphics_39 = new cjs.Graphics().p("AoqFIIRVAAIAAf9IxVAAg");
	var mask_graphics_40 = new cjs.Graphics().p("AoqEbIRVAAMAAAAgqIxVAAg");
	var mask_graphics_41 = new cjs.Graphics().p("AoqDtIRVAAMAAAAhYIxVAAg");
	var mask_graphics_42 = new cjs.Graphics().p("AoqDAIRVAAMAAAAiFIxVAAg");
	var mask_graphics_43 = new cjs.Graphics().p("AoqCTIRVAAMAAAAiyIxVAAg");
	var mask_graphics_44 = new cjs.Graphics().p("AoqBmIRVAAMAAAAjfIxVAAg");
	var mask_graphics_45 = new cjs.Graphics().p("AoqA5IRVAAMAAAAkMIxVAAg");
	var mask_graphics_46 = new cjs.Graphics().p("AoqAMIRVAAMAAAAk5IxVAAg");
	var mask_graphics_47 = new cjs.Graphics().p("AoqggIRVAAMAAAAllIxVAAg");
	var mask_graphics_48 = new cjs.Graphics().p("AoqhNIRVAAMAAAAmSIxVAAg");
	var mask_graphics_49 = new cjs.Graphics().p("Aoqh6IRVAAMAAAAm/IxVAAg");
	var mask_graphics_50 = new cjs.Graphics().p("AoqinIRVAAMAAAAnsIxVAAg");
	var mask_graphics_51 = new cjs.Graphics().p("AoqjUIRVAAMAAAAoZIxVAAg");
	var mask_graphics_52 = new cjs.Graphics().p("AoqkBIRVAAMAAAApGIxVAAg");
	var mask_graphics_53 = new cjs.Graphics().p("AoqkuIRVAAMAAAApzIxVAAg");
	var mask_graphics_54 = new cjs.Graphics().p("AoqlbIRVAAMAAAAqhIxVAAg");
	var mask_graphics_55 = new cjs.Graphics().p("AoqmIIRVAAMAAAArOIxVAAg");
	var mask_graphics_56 = new cjs.Graphics().p("Aoqm1IRVAAMAAAAr7IxVAAg");
	var mask_graphics_57 = new cjs.Graphics().p("AoqniIRVAAMAAAAsoIxVAAg");
	var mask_graphics_58 = new cjs.Graphics().p("AoqoPIRVAAMAAAAtVIxVAAg");
	var mask_graphics_59 = new cjs.Graphics().p("Aoqo8IRVAAMAAAAuCIxVAAg");
	var mask_graphics_60 = new cjs.Graphics().p("AoqppIRVAAMAAAAuvIxVAAg");
	var mask_graphics_61 = new cjs.Graphics().p("AoqqWIRVAAMAAAAvcIxVAAg");
	var mask_graphics_62 = new cjs.Graphics().p("AoqrDIRVAAMAAAAwJIxVAAg");
	var mask_graphics_63 = new cjs.Graphics().p("AoqrwIRVAAMAAAAw2IxVAAg");
	var mask_graphics_64 = new cjs.Graphics().p("AoqsdIRVAAMAAAAxjIxVAAg");
	var mask_graphics_65 = new cjs.Graphics().p("AoqtKIRVAAMAAAAyQIxVAAg");
	var mask_graphics_66 = new cjs.Graphics().p("Aoqt3IRVAAMAAAAy9IxVAAg");
	var mask_graphics_67 = new cjs.Graphics().p("AoqukIRVAAMAAAAzqIxVAAg");
	var mask_graphics_68 = new cjs.Graphics().p("AoqvRIRVAAMAAAA0XIxVAAg");
	var mask_graphics_69 = new cjs.Graphics().p("Aoqv+IRVAAMAAAA1EIxVAAg");
	var mask_graphics_70 = new cjs.Graphics().p("AoqwrIRVAAMAAAA1xIxVAAg");
	var mask_graphics_71 = new cjs.Graphics().p("AoqxYIRVAAMAAAA2eIxVAAg");
	var mask_graphics_72 = new cjs.Graphics().p("AoqyFIRVAAMAAAA3LIxVAAg");
	var mask_graphics_73 = new cjs.Graphics().p("AoqyyIRVAAMAAAA34IxVAAg");
	var mask_graphics_74 = new cjs.Graphics().p("AoqzgIRVAAMAAAA4mIxVAAg");
	var mask_graphics_75 = new cjs.Graphics().p("Aoq0NIRVAAMAAAA5TIxVAAg");
	var mask_graphics_76 = new cjs.Graphics().p("Aoq06IRVAAMAAAA6AIxVAAg");
	var mask_graphics_77 = new cjs.Graphics().p("Aoq1nIRVAAMAAAA6tIxVAAg");
	var mask_graphics_78 = new cjs.Graphics().p("Aoq2UIRVAAMAAAA7aIxVAAg");
	var mask_graphics_79 = new cjs.Graphics().p("Aoq3BIRVAAMAAAA8HIxVAAg");
	var mask_graphics_80 = new cjs.Graphics().p("Aoq3uIRVAAMAAAA80IxVAAg");
	var mask_graphics_81 = new cjs.Graphics().p("Aoq4bIRVAAMAAAA9hIxVAAg");
	var mask_graphics_82 = new cjs.Graphics().p("Aoq5IIRVAAMAAAA+OIxVAAg");
	var mask_graphics_83 = new cjs.Graphics().p("Aoq51IRVAAMAAAA+7IxVAAg");
	var mask_graphics_84 = new cjs.Graphics().p("Aoq6iIRVAAMAAAA/oIxVAAg");
	var mask_graphics_85 = new cjs.Graphics().p("Aoq7PIRVAAMAAABAVIxVAAg");
	var mask_graphics_86 = new cjs.Graphics().p("Aoq78IRVAAMAAABBCIxVAAg");
	var mask_graphics_87 = new cjs.Graphics().p("Aoq8pIRVAAMAAABBvIxVAAg");
	var mask_graphics_88 = new cjs.Graphics().p("Aoq9WIRVAAMAAABCcIxVAAg");
	var mask_graphics_89 = new cjs.Graphics().p("Aoq+DIRVAAMAAABDJIxVAAg");
	var mask_graphics_90 = new cjs.Graphics().p("Aoq+wIRVAAMAAABD2IxVAAg");
	var mask_graphics_91 = new cjs.Graphics().p("Aoq/dIRVAAMAAABEjIxVAAg");
	var mask_graphics_92 = new cjs.Graphics().p("EgIqggKIRVAAMAAABFQIxVAAg");
	var mask_graphics_93 = new cjs.Graphics().p("EgIqgg3IRVAAMAAABF9IxVAAg");
	var mask_graphics_94 = new cjs.Graphics().p("EgIqghkIRVAAMAAABGqIxVAAg");
	var mask_graphics_95 = new cjs.Graphics().p("EgIqgiRIRVAAMAAABHXIxVAAg");
	var mask_graphics_96 = new cjs.Graphics().p("EgIqgi+IRVAAMAAABIEIxVAAg");
	var mask_graphics_97 = new cjs.Graphics().p("EgIqgjrIRVAAMAAABIxIxVAAg");
	var mask_graphics_98 = new cjs.Graphics().p("EgIqgkYIRVAAMAAABJeIxVAAg");
	var mask_graphics_99 = new cjs.Graphics().p("EgIqglFIRVAAMAAABKLIxVAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:28.9,y:237.2829}).wait(1).to({graphics:mask_graphics_1,x:28.9,y:237.2842}).wait(1).to({graphics:mask_graphics_2,x:28.9,y:237.2854}).wait(1).to({graphics:mask_graphics_3,x:28.9,y:237.2867}).wait(1).to({graphics:mask_graphics_4,x:28.9,y:237.2879}).wait(1).to({graphics:mask_graphics_5,x:28.9,y:237.2892}).wait(1).to({graphics:mask_graphics_6,x:28.9,y:237.2904}).wait(1).to({graphics:mask_graphics_7,x:28.9,y:237.2917}).wait(1).to({graphics:mask_graphics_8,x:28.9,y:237.2929}).wait(1).to({graphics:mask_graphics_9,x:28.9,y:237.2941}).wait(1).to({graphics:mask_graphics_10,x:28.9,y:237.2954}).wait(1).to({graphics:mask_graphics_11,x:28.9,y:237.2966}).wait(1).to({graphics:mask_graphics_12,x:28.9,y:237.2979}).wait(1).to({graphics:mask_graphics_13,x:28.9,y:237.2991}).wait(1).to({graphics:mask_graphics_14,x:28.9,y:237.3004}).wait(1).to({graphics:mask_graphics_15,x:28.9,y:237.3016}).wait(1).to({graphics:mask_graphics_16,x:28.9,y:237.3029}).wait(1).to({graphics:mask_graphics_17,x:28.9,y:237.3041}).wait(1).to({graphics:mask_graphics_18,x:28.9,y:237.3054}).wait(1).to({graphics:mask_graphics_19,x:28.9,y:237.3066}).wait(1).to({graphics:mask_graphics_20,x:28.9,y:237.3079}).wait(1).to({graphics:mask_graphics_21,x:28.9,y:237.3091}).wait(1).to({graphics:mask_graphics_22,x:28.9,y:237.3104}).wait(1).to({graphics:mask_graphics_23,x:28.9,y:237.3116}).wait(1).to({graphics:mask_graphics_24,x:28.9,y:237.3128}).wait(1).to({graphics:mask_graphics_25,x:28.9,y:237.3141}).wait(1).to({graphics:mask_graphics_26,x:28.9,y:237.3153}).wait(1).to({graphics:mask_graphics_27,x:28.9,y:237.3166}).wait(1).to({graphics:mask_graphics_28,x:28.9,y:237.3178}).wait(1).to({graphics:mask_graphics_29,x:28.9,y:237.3191}).wait(1).to({graphics:mask_graphics_30,x:28.9,y:237.3203}).wait(1).to({graphics:mask_graphics_31,x:28.9,y:237.3216}).wait(1).to({graphics:mask_graphics_32,x:28.9,y:237.3228}).wait(1).to({graphics:mask_graphics_33,x:28.9,y:237.3241}).wait(1).to({graphics:mask_graphics_34,x:28.9,y:237.3253}).wait(1).to({graphics:mask_graphics_35,x:28.9,y:237.3266}).wait(1).to({graphics:mask_graphics_36,x:28.9,y:237.3278}).wait(1).to({graphics:mask_graphics_37,x:28.9,y:237.3291}).wait(1).to({graphics:mask_graphics_38,x:28.9,y:237.3303}).wait(1).to({graphics:mask_graphics_39,x:28.9,y:237.3316}).wait(1).to({graphics:mask_graphics_40,x:28.9,y:237.3328}).wait(1).to({graphics:mask_graphics_41,x:28.9,y:237.334}).wait(1).to({graphics:mask_graphics_42,x:28.9,y:237.3353}).wait(1).to({graphics:mask_graphics_43,x:28.9,y:237.3365}).wait(1).to({graphics:mask_graphics_44,x:28.9,y:237.3378}).wait(1).to({graphics:mask_graphics_45,x:28.9,y:237.339}).wait(1).to({graphics:mask_graphics_46,x:28.9,y:237.3403}).wait(1).to({graphics:mask_graphics_47,x:28.9,y:237.3415}).wait(1).to({graphics:mask_graphics_48,x:28.9,y:237.3428}).wait(1).to({graphics:mask_graphics_49,x:28.9,y:237.344}).wait(1).to({graphics:mask_graphics_50,x:28.9,y:237.3453}).wait(1).to({graphics:mask_graphics_51,x:28.9,y:237.3465}).wait(1).to({graphics:mask_graphics_52,x:28.9,y:237.3478}).wait(1).to({graphics:mask_graphics_53,x:28.9,y:237.349}).wait(1).to({graphics:mask_graphics_54,x:28.9,y:237.3503}).wait(1).to({graphics:mask_graphics_55,x:28.9,y:237.3515}).wait(1).to({graphics:mask_graphics_56,x:28.9,y:237.3527}).wait(1).to({graphics:mask_graphics_57,x:28.9,y:237.354}).wait(1).to({graphics:mask_graphics_58,x:28.9,y:237.3552}).wait(1).to({graphics:mask_graphics_59,x:28.9,y:237.3565}).wait(1).to({graphics:mask_graphics_60,x:28.9,y:237.3577}).wait(1).to({graphics:mask_graphics_61,x:28.9,y:237.359}).wait(1).to({graphics:mask_graphics_62,x:28.9,y:237.3602}).wait(1).to({graphics:mask_graphics_63,x:28.9,y:237.3615}).wait(1).to({graphics:mask_graphics_64,x:28.9,y:237.3627}).wait(1).to({graphics:mask_graphics_65,x:28.9,y:237.364}).wait(1).to({graphics:mask_graphics_66,x:28.9,y:237.3652}).wait(1).to({graphics:mask_graphics_67,x:28.9,y:237.3665}).wait(1).to({graphics:mask_graphics_68,x:28.9,y:237.3677}).wait(1).to({graphics:mask_graphics_69,x:28.9,y:237.369}).wait(1).to({graphics:mask_graphics_70,x:28.9,y:237.3702}).wait(1).to({graphics:mask_graphics_71,x:28.9,y:237.3714}).wait(1).to({graphics:mask_graphics_72,x:28.9,y:237.3727}).wait(1).to({graphics:mask_graphics_73,x:28.9,y:237.3739}).wait(1).to({graphics:mask_graphics_74,x:28.9,y:237.3752}).wait(1).to({graphics:mask_graphics_75,x:28.9,y:237.3764}).wait(1).to({graphics:mask_graphics_76,x:28.9,y:237.3777}).wait(1).to({graphics:mask_graphics_77,x:28.9,y:237.3789}).wait(1).to({graphics:mask_graphics_78,x:28.9,y:237.3802}).wait(1).to({graphics:mask_graphics_79,x:28.9,y:237.3814}).wait(1).to({graphics:mask_graphics_80,x:28.9,y:237.3827}).wait(1).to({graphics:mask_graphics_81,x:28.9,y:237.3839}).wait(1).to({graphics:mask_graphics_82,x:28.9,y:237.3852}).wait(1).to({graphics:mask_graphics_83,x:28.9,y:237.3864}).wait(1).to({graphics:mask_graphics_84,x:28.9,y:237.3877}).wait(1).to({graphics:mask_graphics_85,x:28.9,y:237.3889}).wait(1).to({graphics:mask_graphics_86,x:28.9,y:237.3901}).wait(1).to({graphics:mask_graphics_87,x:28.9,y:237.3914}).wait(1).to({graphics:mask_graphics_88,x:28.9,y:237.3926}).wait(1).to({graphics:mask_graphics_89,x:28.9,y:237.3939}).wait(1).to({graphics:mask_graphics_90,x:28.9,y:237.3951}).wait(1).to({graphics:mask_graphics_91,x:28.9,y:237.3964}).wait(1).to({graphics:mask_graphics_92,x:28.9,y:237.3976}).wait(1).to({graphics:mask_graphics_93,x:28.9,y:237.3989}).wait(1).to({graphics:mask_graphics_94,x:28.9,y:237.4001}).wait(1).to({graphics:mask_graphics_95,x:28.9,y:237.4014}).wait(1).to({graphics:mask_graphics_96,x:28.9,y:237.4026}).wait(1).to({graphics:mask_graphics_97,x:28.9,y:237.4039}).wait(1).to({graphics:mask_graphics_98,x:28.9,y:237.4051}).wait(1).to({graphics:mask_graphics_99,x:28.9,y:237.3969}).wait(1));

	// Слой_1
	this.instance = new lib.CachedBmp_128();

	this.instance_1 = new lib.CachedBmp_129();

	var maskedShapeInstanceList = [this.instance,this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},99).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,65,446);


(lib.tutShow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_125();
	this.instance.setTransform(-1.5,-1.5);

	this.instance_1 = new lib.CachedBmp_126();
	this.instance_1.setTransform(-1.5,-1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,34,34);


(lib.tutor = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.text = new cjs.Text("特殊塔为您提供特殊奖励（与您的金钱收益相乘）（金塔为GB收益提供奖励）", "bold 15px 'Arial'");
	this.text.lineHeight = 19;
	this.text.lineWidth = 307;
	this.text.parent = this;
	this.text.setTransform(552.35,658);

	this.text_1 = new cjs.Text("购买升级以加快进度", "bold 15px 'Arial'");
	this.text_1.lineHeight = 19;
	this.text_1.lineWidth = 170;
	this.text_1.parent = this;
	this.text_1.setTransform(1027.55,124.35);

	this.text_2 = new cjs.Text("获得1B钱解锁特别奖金", "bold 15px 'Arial'");
	this.text_2.lineHeight = 19;
	this.text_2.lineWidth = 141;
	this.text_2.parent = this;
	this.text_2.setTransform(136.9,135.3);

	this.text_3 = new cjs.Text("这是你的塔。 每个区块都会给你钱", "bold 15px 'Arial'");
	this.text_3.lineHeight = 19;
	this.text_3.lineWidth = 176;
	this.text_3.parent = this;
	this.text_3.setTransform(314.9,203.7);

	this.text_4 = new cjs.Text("点击硬币以获得更多的钱", "bold 15px 'Arial'");
	this.text_4.lineHeight = 19;
	this.text_4.lineWidth = 141;
	this.text_4.parent = this;
	this.text_4.setTransform(28.05,480);

	this.instance = new lib.CachedBmp_124();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text_4},{t:this.text_3},{t:this.text_2},{t:this.text_1},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,1286,721);


(lib.treeLOC = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.text = new cjs.Text("未解锁\n达到 1 Bil\n总\n金钱以解锁", "bold 7px 'Arial'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 10;
	this.text.lineWidth = 49;
	this.text.parent = this;
	this.text.setTransform(42,20.5,1.591,1.591);

	this.instance = new lib.CachedBmp_123();
	this.instance.setTransform(1.65,0,0.9752,0.9752);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.treeLOC, new cjs.Rectangle(0,0,84.6,117.1), null);


(lib.tb9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.timeline.addTween(cjs.Tween.get(this.lev).wait(5));

	// Слой_1
	this.instance = new lib.CachedBmp_118();
	this.instance.setTransform(2.95,-2);

	this.instance_1 = new lib.CachedBmp_119();
	this.instance_1.setTransform(2.95,-2);

	this.instance_2 = new lib.CachedBmp_120();
	this.instance_2.setTransform(2.95,-2);

	this.instance_3 = new lib.CachedBmp_121();
	this.instance_3.setTransform(2.95,-2);

	this.instance_4 = new lib.CachedBmp_122();
	this.instance_4.setTransform(2.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2,63.6,58);


(lib.tb8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.timeline.addTween(cjs.Tween.get(this.lev).wait(5));

	// Слой_1
	this.instance = new lib.CachedBmp_113();
	this.instance.setTransform(2.95,-2);

	this.instance_1 = new lib.CachedBmp_114();
	this.instance_1.setTransform(2.95,-2);

	this.instance_2 = new lib.CachedBmp_115();
	this.instance_2.setTransform(2.95,-2);

	this.instance_3 = new lib.CachedBmp_116();
	this.instance_3.setTransform(2.95,-2);

	this.instance_4 = new lib.CachedBmp_117();
	this.instance_4.setTransform(2.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2,63.6,58);


(lib.tb7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.timeline.addTween(cjs.Tween.get(this.lev).wait(5));

	// Слой_1
	this.instance = new lib.CachedBmp_108();
	this.instance.setTransform(2.95,-2);

	this.instance_1 = new lib.CachedBmp_109();
	this.instance_1.setTransform(2.95,-2);

	this.instance_2 = new lib.CachedBmp_110();
	this.instance_2.setTransform(2.95,-2);

	this.instance_3 = new lib.CachedBmp_111();
	this.instance_3.setTransform(2.95,-2);

	this.instance_4 = new lib.CachedBmp_112();
	this.instance_4.setTransform(2.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2,63.6,58);


(lib.tb6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.timeline.addTween(cjs.Tween.get(this.lev).wait(5));

	// Слой_1
	this.instance = new lib.CachedBmp_103();
	this.instance.setTransform(2.95,-2);

	this.instance_1 = new lib.CachedBmp_104();
	this.instance_1.setTransform(2.95,-2);

	this.instance_2 = new lib.CachedBmp_105();
	this.instance_2.setTransform(2.95,-2);

	this.instance_3 = new lib.CachedBmp_106();
	this.instance_3.setTransform(2.95,-2);

	this.instance_4 = new lib.CachedBmp_107();
	this.instance_4.setTransform(2.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2,63.6,58);


(lib.tb5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.timeline.addTween(cjs.Tween.get(this.lev).wait(5));

	// Слой_1
	this.instance = new lib.CachedBmp_98();
	this.instance.setTransform(2.95,-2);

	this.instance_1 = new lib.CachedBmp_99();
	this.instance_1.setTransform(2.95,-2);

	this.instance_2 = new lib.CachedBmp_100();
	this.instance_2.setTransform(2.95,-2);

	this.instance_3 = new lib.CachedBmp_101();
	this.instance_3.setTransform(2.95,-2);

	this.instance_4 = new lib.CachedBmp_102();
	this.instance_4.setTransform(2.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2,63.6,58);


(lib.tb4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.timeline.addTween(cjs.Tween.get(this.lev).wait(5));

	// Слой_1
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(2.95,-2);

	this.instance_1 = new lib.CachedBmp_94();
	this.instance_1.setTransform(2.95,-2);

	this.instance_2 = new lib.CachedBmp_95();
	this.instance_2.setTransform(2.95,-2);

	this.instance_3 = new lib.CachedBmp_96();
	this.instance_3.setTransform(2.95,-2);

	this.instance_4 = new lib.CachedBmp_97();
	this.instance_4.setTransform(2.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2,63.6,58);


(lib.tb3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.timeline.addTween(cjs.Tween.get(this.lev).wait(5));

	// Слой_1
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(2.95,-2);

	this.instance_1 = new lib.CachedBmp_89();
	this.instance_1.setTransform(2.95,-2);

	this.instance_2 = new lib.CachedBmp_90();
	this.instance_2.setTransform(2.95,-2);

	this.instance_3 = new lib.CachedBmp_91();
	this.instance_3.setTransform(2.95,-2);

	this.instance_4 = new lib.CachedBmp_92();
	this.instance_4.setTransform(2.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2,63.6,58);


(lib.tb2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.instance = new lib.CachedBmp_83();
	this.instance.setTransform(2.95,-2);

	this.instance_1 = new lib.CachedBmp_84();
	this.instance_1.setTransform(2.95,-2);

	this.instance_2 = new lib.CachedBmp_85();
	this.instance_2.setTransform(2.95,-2);

	this.instance_3 = new lib.CachedBmp_86();
	this.instance_3.setTransform(2.95,-2);

	this.instance_4 = new lib.CachedBmp_87();
	this.instance_4.setTransform(2.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.lev}]}).to({state:[{t:this.instance_1},{t:this.lev}]},1).to({state:[{t:this.instance_2},{t:this.lev}]},1).to({state:[{t:this.instance_3},{t:this.lev}]},1).to({state:[{t:this.instance_4},{t:this.lev}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2,63.6,58);


(lib.tb = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.lev = new cjs.Text("1000", "12px 'Verdana'", "#FFFFFF");
	this.lev.name = "lev";
	this.lev.textAlign = "center";
	this.lev.lineHeight = 17;
	this.lev.lineWidth = 31;
	this.lev.parent = this;
	this.lev.setTransform(31.8,14.25,1.827,1.827);

	this.instance = new lib.CachedBmp_73();
	this.instance.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_1 = new lib.CachedBmp_74();
	this.instance_1.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_2 = new lib.CachedBmp_75();
	this.instance_2.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_3 = new lib.CachedBmp_76();
	this.instance_3.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_4 = new lib.CachedBmp_77();
	this.instance_4.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_5 = new lib.CachedBmp_78();
	this.instance_5.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_6 = new lib.CachedBmp_79();
	this.instance_6.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_7 = new lib.CachedBmp_80();
	this.instance_7.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_8 = new lib.CachedBmp_81();
	this.instance_8.setTransform(3,-1.95,0.9555,0.9555);

	this.instance_9 = new lib.CachedBmp_82();
	this.instance_9.setTransform(3,-1.95,0.9555,0.9555);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.lev}]}).to({state:[{t:this.instance_1},{t:this.lev}]},1).to({state:[{t:this.instance_2},{t:this.lev}]},1).to({state:[{t:this.instance_3},{t:this.lev}]},1).to({state:[{t:this.instance_4},{t:this.lev}]},1).to({state:[{t:this.instance_5},{t:this.lev}]},1).to({state:[{t:this.instance_6},{t:this.lev}]},1).to({state:[{t:this.instance_7},{t:this.lev}]},1).to({state:[{t:this.instance_8},{t:this.lev}]},1).to({state:[{t:this.instance_9},{t:this.lev}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1.9,63.6,58.3);


(lib.speedUP_b = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_71();
	this.instance.setTransform(-28.75,-28.75);

	this.instance_1 = new lib.CachedBmp_72();
	this.instance_1.setTransform(-28.75,-28.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.7,-28.7,58,58);


(lib.specialStats = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.sp10 = new cjs.Text("黄金塔: x100,000", "bold 15px 'Arial'");
	this.sp10.name = "sp10";
	this.sp10.lineHeight = 19;
	this.sp10.lineWidth = 193;
	this.sp10.parent = this;
	this.sp10.setTransform(6.35,193.5);

	this.sp9 = new cjs.Text("黄金塔: x100,000", "bold 15px 'Arial'");
	this.sp9.name = "sp9";
	this.sp9.lineHeight = 19;
	this.sp9.lineWidth = 193;
	this.sp9.parent = this;
	this.sp9.setTransform(6.35,172.7);

	this.sp8 = new cjs.Text("黄金塔: x100,000", "bold 15px 'Arial'");
	this.sp8.name = "sp8";
	this.sp8.lineHeight = 19;
	this.sp8.lineWidth = 193;
	this.sp8.parent = this;
	this.sp8.setTransform(6.35,151.9);

	this.sp7 = new cjs.Text("乘数塔: x100,000", "bold 15px 'Arial'");
	this.sp7.name = "sp7";
	this.sp7.lineHeight = 19;
	this.sp7.lineWidth = 193;
	this.sp7.parent = this;
	this.sp7.setTransform(6.35,131.1);

	this.sp6 = new cjs.Text("黄金塔: x100,000", "bold 15px 'Arial'");
	this.sp6.name = "sp6";
	this.sp6.lineHeight = 19;
	this.sp6.lineWidth = 193;
	this.sp6.parent = this;
	this.sp6.setTransform(6.35,110.3);

	this.sp5 = new cjs.Text("黄金塔: x100,000", "bold 15px 'Arial'");
	this.sp5.name = "sp5";
	this.sp5.lineHeight = 19;
	this.sp5.lineWidth = 193;
	this.sp5.parent = this;
	this.sp5.setTransform(6.35,89.5);

	this.sp4 = new cjs.Text("批量塔: x100,000", "bold 15px 'Arial'");
	this.sp4.name = "sp4";
	this.sp4.lineHeight = 19;
	this.sp4.lineWidth = 193;
	this.sp4.parent = this;
	this.sp4.setTransform(6.35,68.7);

	this.sp3 = new cjs.Text("黄金塔: x100,000", "bold 15px 'Arial'");
	this.sp3.name = "sp3";
	this.sp3.lineHeight = 19;
	this.sp3.lineWidth = 193;
	this.sp3.parent = this;
	this.sp3.setTransform(6.35,47.9);

	this.sp2 = new cjs.Text("黄金塔: x100,000", "bold 15px 'Arial'");
	this.sp2.name = "sp2";
	this.sp2.lineHeight = 19;
	this.sp2.lineWidth = 193;
	this.sp2.parent = this;
	this.sp2.setTransform(6.35,27.1);

	this.sp1 = new cjs.Text("批量塔: x100,000", "bold 15px 'Arial'");
	this.sp1.name = "sp1";
	this.sp1.lineHeight = 19;
	this.sp1.lineWidth = 193;
	this.sp1.parent = this;
	this.sp1.setTransform(6.35,6.3);

	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.sp1},{t:this.sp2},{t:this.sp3},{t:this.sp4},{t:this.sp5},{t:this.sp6},{t:this.sp7},{t:this.sp8},{t:this.sp9},{t:this.sp10}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.specialStats, new cjs.Rectangle(-1,-1,210,220), null);


(lib.specialSee = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.text = new cjs.Text("特殊统计", "bold 10px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 13;
	this.text.lineWidth = 84;
	this.text.parent = this;
	this.text.setTransform(43.9,16.8);

	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(-1,-1);

	this.instance_1 = new lib.CachedBmp_68();
	this.instance_1.setTransform(-1,-1);

	this.instance_2 = new lib.CachedBmp_69();
	this.instance_2.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text,p:{x:43.9}}]}).to({state:[{t:this.instance_1},{t:this.text,p:{x:43.9}}]},1).to({state:[{t:this.instance_2},{t:this.text,p:{x:43.95}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,90,45);


(lib.spChances = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.chance10 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance10.name = "chance10";
	this.chance10.lineHeight = 17;
	this.chance10.lineWidth = 152;
	this.chance10.parent = this;
	this.chance10.setTransform(2,211);

	this.chance9 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance9.name = "chance9";
	this.chance9.lineHeight = 17;
	this.chance9.lineWidth = 152;
	this.chance9.parent = this;
	this.chance9.setTransform(2,190.2);

	this.chance8 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance8.name = "chance8";
	this.chance8.lineHeight = 17;
	this.chance8.lineWidth = 152;
	this.chance8.parent = this;
	this.chance8.setTransform(2,169.4);

	this.chance7 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance7.name = "chance7";
	this.chance7.lineHeight = 17;
	this.chance7.lineWidth = 152;
	this.chance7.parent = this;
	this.chance7.setTransform(2,148.6);

	this.chance6 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance6.name = "chance6";
	this.chance6.lineHeight = 17;
	this.chance6.lineWidth = 152;
	this.chance6.parent = this;
	this.chance6.setTransform(2,127.8);

	this.chance5 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance5.name = "chance5";
	this.chance5.lineHeight = 17;
	this.chance5.lineWidth = 152;
	this.chance5.parent = this;
	this.chance5.setTransform(2,107);

	this.chance4 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance4.name = "chance4";
	this.chance4.lineHeight = 17;
	this.chance4.lineWidth = 152;
	this.chance4.parent = this;
	this.chance4.setTransform(2,86.2);

	this.chance3 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance3.name = "chance3";
	this.chance3.lineHeight = 17;
	this.chance3.lineWidth = 152;
	this.chance3.parent = this;
	this.chance3.setTransform(2,65.4);

	this.chance2 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance2.name = "chance2";
	this.chance2.lineHeight = 17;
	this.chance2.lineWidth = 152;
	this.chance2.parent = this;
	this.chance2.setTransform(2,44.6);

	this.chance1 = new cjs.Text("Mult B: 100%", "bold 13px 'Arial'");
	this.chance1.name = "chance1";
	this.chance1.lineHeight = 17;
	this.chance1.lineWidth = 152;
	this.chance1.parent = this;
	this.chance1.setTransform(2,23.8);

	this.text = new cjs.Text("特殊几率", "bold 15px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 19;
	this.text.lineWidth = 152;
	this.text.parent = this;
	this.text.setTransform(77.8,2);

	this.instance = new lib.CachedBmp_66();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text},{t:this.chance1},{t:this.chance2},{t:this.chance3},{t:this.chance4},{t:this.chance5},{t:this.chance6},{t:this.chance7},{t:this.chance8},{t:this.chance9},{t:this.chance10}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.spChances, new cjs.Rectangle(-1,-1,158,240), null);


(lib.showChances = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_62();
	this.instance.setTransform(-1.5,-1.5);

	this.instance_1 = new lib.CachedBmp_63();
	this.instance_1.setTransform(-1.5,-1.5);

	this.instance_2 = new lib.CachedBmp_64();
	this.instance_2.setTransform(-1.5,-1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,60,60);


(lib.scroller = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_61();
	this.instance.setTransform(-0.95,-0.95,0.872,0.872);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.scroller, new cjs.Rectangle(-0.9,-0.9,27,38.3), null);


(lib.scrollBar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.scrollBar, new cjs.Rectangle(-1,-1,33,420), null);


(lib.sapphire = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_59();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sapphire, new cjs.Rectangle(-1,-1,39,42), null);


(lib.prestigeB = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.text = new cjs.Text("声望", "bold 7px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 10;
	this.text.lineWidth = 47;
	this.text.parent = this;
	this.text.setTransform(105.95,15.8,4.1465,4.1465);

	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(-0.35,-1.5);

	this.instance_1 = new lib.CachedBmp_57();
	this.instance_1.setTransform(-0.35,-1.5);

	this.instance_2 = new lib.CachedBmp_58();
	this.instance_2.setTransform(-0.35,-1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).to({state:[{t:this.instance_1},{t:this.text}]},1).to({state:[{t:this.instance_2},{t:this.text}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,-1.5,214,68);


(lib.noB = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(6.25,0);

	this.instance_1 = new lib.CachedBmp_50();
	this.instance_1.setTransform(-2,-1.35);

	this.instance_2 = new lib.CachedBmp_53();
	this.instance_2.setTransform(6.25,0);

	this.instance_3 = new lib.CachedBmp_52();
	this.instance_3.setTransform(-2,-1.35);

	this.instance_4 = new lib.CachedBmp_55();
	this.instance_4.setTransform(6.25,0);

	this.instance_5 = new lib.CachedBmp_54();
	this.instance_5.setTransform(-2,-1.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_5},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-1.3,52,36);


(lib.magnet = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.magnet, new cjs.Rectangle(-1,-1,56,57), null);


(lib.levShow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(-0.95,-0.95,0.8392,0.8392);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.levShow, new cjs.Rectangle(-0.9,-0.9,81.4,81.4), null);


(lib.hovering2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(0,0,0.7572,0.7572);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hovering2, new cjs.Rectangle(0,0,147.7,49.2), null);


(lib.hovering = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(0,0,0.7572,0.7572);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hovering, new cjs.Rectangle(0,0,147.7,49.2), null);


(lib.hoverBlock = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.inc = new cjs.Text("99,999 pts/s", "bold 7px 'Arial'", "#FFFFFF");
	this.inc.name = "inc";
	this.inc.textAlign = "center";
	this.inc.lineHeight = 10;
	this.inc.lineWidth = 54;
	this.inc.parent = this;
	this.inc.setTransform(41.3603,7.05,1.4238,1.4238);

	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(0.15,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.inc}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hoverBlock, new cjs.Rectangle(0,-1,83.2,28), null);


(lib.hover = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(0,0,0.8098,0.8098);

	this.instance_1 = new lib.CachedBmp_41();
	this.instance_1.setTransform(0,0,0.8098,0.8098);

	this.instance_2 = new lib.CachedBmp_42();
	this.instance_2.setTransform(0,0,0.8098,0.8098);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,192.8,74.5);


(lib.gtBG = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(-1.5,-1.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gtBG, new cjs.Rectangle(-1.5,-1.5,718,651), null);


(lib.goUP = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(-1.25,-1.25);

	this.instance_1 = new lib.CachedBmp_37();
	this.instance_1.setTransform(-1.25,-1.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.2,-1.2,33,38);


(lib.goldenTree = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.text = new cjs.Text("金色\n树", "bold 7px 'Arial'", "#806600");
	this.text.textAlign = "center";
	this.text.lineHeight = 10;
	this.text.lineWidth = 34;
	this.text.parent = this;
	this.text.setTransform(40.95,17.8,2.1622,2.1622);

	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-0.95,-0.95,0.9749,0.9749);

	this.instance_1 = new lib.CachedBmp_34();
	this.instance_1.setTransform(-0.95,-0.95,0.9749,0.9749);

	this.instance_2 = new lib.CachedBmp_35();
	this.instance_2.setTransform(-0.95,-0.95,0.9749,0.9749);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).to({state:[{t:this.instance_1},{t:this.text}]},1).to({state:[{t:this.instance_2},{t:this.text}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-0.9,84.80000000000001,117);


(lib.gCube = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gCube, new cjs.Rectangle(-1,-1,39,42), null);


(lib.frame_xp = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.frame_xp, new cjs.Rectangle(-1,-1,67,448), null);


(lib.frame = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.frame, new cjs.Rectangle(-1,-1,714,40), null);


(lib.emerald = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.emerald, new cjs.Rectangle(-1,-1,39,42), null);


(lib.coloring = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-1,-1);

	this.instance_1 = new lib.CachedBmp_25();
	this.instance_1.setTransform(-1,-1);

	this.instance_2 = new lib.CachedBmp_26();
	this.instance_2.setTransform(-1,-1);

	this.instance_3 = new lib.CachedBmp_27();
	this.instance_3.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,228,94);


(lib.coinClick = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_21();

	this.instance_1 = new lib.CachedBmp_22();

	this.instance_2 = new lib.CachedBmp_23();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,152,140);


(lib.coin = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.coin, new cjs.Rectangle(-1,-1,27,26), null);


(lib.clos_GT = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-1.5,-1.5);

	this.instance_1 = new lib.CachedBmp_18();
	this.instance_1.setTransform(-1.5,-1.5);

	this.instance_2 = new lib.CachedBmp_19();
	this.instance_2.setTransform(-1.5,-1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,49,51);


(lib.chipG = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(9,-10.2);

	this.instance_1 = new lib.CachedBmp_15();
	this.instance_1.setTransform(9,-10.2);

	this.instance_2 = new lib.CachedBmp_16();
	this.instance_2.setTransform(9,-10.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9,-10.2,128,117);


(lib.buyAmo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.amo = new cjs.Text("最大", "bold 12px 'Candara'", "#4C4C4C");
	this.amo.name = "amo";
	this.amo.textAlign = "center";
	this.amo.lineHeight = 17;
	this.amo.lineWidth = 29;
	this.amo.parent = this;
	this.amo.setTransform(18.8,3.1,1.1321,1.1321);

	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(0.1,-1.5);

	this.instance_1 = new lib.CachedBmp_13();
	this.instance_1.setTransform(0.1,-1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.amo,p:{color:"#4C4C4C"}}]}).to({state:[{t:this.instance_1},{t:this.amo,p:{color:"#FFFFFF"}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1.5,38.1,26);


(lib.box = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Растровоеизображение2();
	this.instance.setTransform(0,0,0.3487,0.2925);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.box, new cjs.Rectangle(0,0,267.8,168.5), null);


(lib.bar_progress = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AiipDIFFAAIAASHIlFAAg");
	var mask_graphics_1 = new cjs.Graphics().p("AjGpDIGNAAIAASHImNAAg");
	var mask_graphics_2 = new cjs.Graphics().p("AjqpDIHVAAIAASHInVAAg");
	var mask_graphics_3 = new cjs.Graphics().p("AkOpDIIdAAIAASHIodAAg");
	var mask_graphics_4 = new cjs.Graphics().p("AkzpDIJnAAIAASHIpnAAg");
	var mask_graphics_5 = new cjs.Graphics().p("AlXpDIKvAAIAASHIqvAAg");
	var mask_graphics_6 = new cjs.Graphics().p("Al7pDIL3AAIAASHIr3AAg");
	var mask_graphics_7 = new cjs.Graphics().p("AmfpDIM/AAIAASHIs/AAg");
	var mask_graphics_8 = new cjs.Graphics().p("AnDpDIOHAAIAASHIuHAAg");
	var mask_graphics_9 = new cjs.Graphics().p("AnnpDIPPAAIAASHIvPAAg");
	var mask_graphics_10 = new cjs.Graphics().p("AoLpDIQXAAIAASHIwXAAg");
	var mask_graphics_11 = new cjs.Graphics().p("AovpDIRfAAIAASHIxfAAg");
	var mask_graphics_12 = new cjs.Graphics().p("ApTpDISnAAIAASHIynAAg");
	var mask_graphics_13 = new cjs.Graphics().p("Ap3pDITvAAIAASHIzvAAg");
	var mask_graphics_14 = new cjs.Graphics().p("AqbpDIU3AAIAASHI03AAg");
	var mask_graphics_15 = new cjs.Graphics().p("Aq/pDIV/AAIAASHI1/AAg");
	var mask_graphics_16 = new cjs.Graphics().p("ArjpDIXHAAIAASHI3HAAg");
	var mask_graphics_17 = new cjs.Graphics().p("AsIpDIYRAAIAASHI4RAAg");
	var mask_graphics_18 = new cjs.Graphics().p("AsspDIZZAAIAASHI5ZAAg");
	var mask_graphics_19 = new cjs.Graphics().p("AtQpDIahAAIAASHI6hAAg");
	var mask_graphics_20 = new cjs.Graphics().p("At0pDIbpAAIAASHI7pAAg");
	var mask_graphics_21 = new cjs.Graphics().p("AuYpDIcxAAIAASHI8xAAg");
	var mask_graphics_22 = new cjs.Graphics().p("Au8pDId5AAIAASHI95AAg");
	var mask_graphics_23 = new cjs.Graphics().p("AvgpDIfBAAIAASHI/BAAg");
	var mask_graphics_24 = new cjs.Graphics().p("AwEpDMAgJAAAIAASHMggJAAAg");
	var mask_graphics_25 = new cjs.Graphics().p("AwopDMAhRAAAIAASHMghRAAAg");
	var mask_graphics_26 = new cjs.Graphics().p("AxMpDMAiZAAAIAASHMgiZAAAg");
	var mask_graphics_27 = new cjs.Graphics().p("AxwpDMAjhAAAIAASHMgjhAAAg");
	var mask_graphics_28 = new cjs.Graphics().p("AyUpDMAkpAAAIAASHMgkpAAAg");
	var mask_graphics_29 = new cjs.Graphics().p("Ay5pDMAlzAAAIAASHMglzAAAg");
	var mask_graphics_30 = new cjs.Graphics().p("AzdpDMAm7AAAIAASHMgm7AAAg");
	var mask_graphics_31 = new cjs.Graphics().p("A0BpDMAoDAAAIAASHMgoDAAAg");
	var mask_graphics_32 = new cjs.Graphics().p("A0lpDMApLAAAIAASHMgpLAAAg");
	var mask_graphics_33 = new cjs.Graphics().p("A1JpDMAqTAAAIAASHMgqTAAAg");
	var mask_graphics_34 = new cjs.Graphics().p("A1tpDMArbAAAIAASHMgrbAAAg");
	var mask_graphics_35 = new cjs.Graphics().p("A2RpDMAsjAAAIAASHMgsjAAAg");
	var mask_graphics_36 = new cjs.Graphics().p("A21pDMAtrAAAIAASHMgtrAAAg");
	var mask_graphics_37 = new cjs.Graphics().p("A3ZpDMAuzAAAIAASHMguzAAAg");
	var mask_graphics_38 = new cjs.Graphics().p("A39pDMAv7AAAIAASHMgv7AAAg");
	var mask_graphics_39 = new cjs.Graphics().p("A4hpDMAxDAAAIAASHMgxDAAAg");
	var mask_graphics_40 = new cjs.Graphics().p("A5FpDMAyLAAAIAASHMgyLAAAg");
	var mask_graphics_41 = new cjs.Graphics().p("A5ppDMAzTAAAIAASHMgzTAAAg");
	var mask_graphics_42 = new cjs.Graphics().p("A6OpDMA0dAAAIAASHMg0dAAAg");
	var mask_graphics_43 = new cjs.Graphics().p("A6ypDMA1lAAAIAASHMg1lAAAg");
	var mask_graphics_44 = new cjs.Graphics().p("A7WpDMA2tAAAIAASHMg2tAAAg");
	var mask_graphics_45 = new cjs.Graphics().p("A76pDMA31AAAIAASHMg31AAAg");
	var mask_graphics_46 = new cjs.Graphics().p("A8epDMA49AAAIAASHMg49AAAg");
	var mask_graphics_47 = new cjs.Graphics().p("A9CpDMA6FAAAIAASHMg6FAAAg");
	var mask_graphics_48 = new cjs.Graphics().p("A9mpDMA7NAAAIAASHMg7NAAAg");
	var mask_graphics_49 = new cjs.Graphics().p("A+KpDMA8VAAAIAASHMg8VAAAg");
	var mask_graphics_50 = new cjs.Graphics().p("A+upDMA9dAAAIAASHMg9dAAAg");
	var mask_graphics_51 = new cjs.Graphics().p("A/SpDMA+lAAAIAASHMg+lAAAg");
	var mask_graphics_52 = new cjs.Graphics().p("A/2pDMA/tAAAIAASHMg/tAAAg");
	var mask_graphics_53 = new cjs.Graphics().p("EggagJDMBA1AAAIAASHMhA1AAAg");
	var mask_graphics_54 = new cjs.Graphics().p("Egg+gJDMBB9AAAIAASHMhB9AAAg");
	var mask_graphics_55 = new cjs.Graphics().p("EghjgJDMBDHAAAIAASHMhDHAAAg");
	var mask_graphics_56 = new cjs.Graphics().p("EgiHgJDMBEPAAAIAASHMhEPAAAg");
	var mask_graphics_57 = new cjs.Graphics().p("EgirgJDMBFXAAAIAASHMhFXAAAg");
	var mask_graphics_58 = new cjs.Graphics().p("EgjPgJDMBGfAAAIAASHMhGfAAAg");
	var mask_graphics_59 = new cjs.Graphics().p("EgjzgJDMBHnAAAIAASHMhHnAAAg");
	var mask_graphics_60 = new cjs.Graphics().p("EgkXgJDMBIvAAAIAASHMhIvAAAg");
	var mask_graphics_61 = new cjs.Graphics().p("Egk7gJDMBJ3AAAIAASHMhJ3AAAg");
	var mask_graphics_62 = new cjs.Graphics().p("EglfgJDMBK/AAAIAASHMhK/AAAg");
	var mask_graphics_63 = new cjs.Graphics().p("EgmDgJDMBMHAAAIAASHMhMHAAAg");
	var mask_graphics_64 = new cjs.Graphics().p("EgmngJDMBNPAAAIAASHMhNPAAAg");
	var mask_graphics_65 = new cjs.Graphics().p("EgnLgJDMBOXAAAIAASHMhOXAAAg");
	var mask_graphics_66 = new cjs.Graphics().p("EgnvgJDMBPfAAAIAASHMhPfAAAg");
	var mask_graphics_67 = new cjs.Graphics().p("EgoTgJDMBQnAAAIAASHMhQnAAAg");
	var mask_graphics_68 = new cjs.Graphics().p("Ego4gJDMBRxAAAIAASHMhRxAAAg");
	var mask_graphics_69 = new cjs.Graphics().p("EgpcgJDMBS5AAAIAASHMhS5AAAg");
	var mask_graphics_70 = new cjs.Graphics().p("EgqAgJDMBUBAAAIAASHMhUBAAAg");
	var mask_graphics_71 = new cjs.Graphics().p("EgqkgJDMBVJAAAIAASHMhVJAAAg");
	var mask_graphics_72 = new cjs.Graphics().p("EgrIgJDMBWRAAAIAASHMhWRAAAg");
	var mask_graphics_73 = new cjs.Graphics().p("EgrsgJDMBXZAAAIAASHMhXZAAAg");
	var mask_graphics_74 = new cjs.Graphics().p("EgsQgJDMBYhAAAIAASHMhYhAAAg");
	var mask_graphics_75 = new cjs.Graphics().p("Egs0gJDMBZpAAAIAASHMhZpAAAg");
	var mask_graphics_76 = new cjs.Graphics().p("EgtYgJDMBaxAAAIAASHMhaxAAAg");
	var mask_graphics_77 = new cjs.Graphics().p("Egt8gJDMBb5AAAIAASHMhb5AAAg");
	var mask_graphics_78 = new cjs.Graphics().p("EguggJDMBdBAAAIAASHMhdBAAAg");
	var mask_graphics_79 = new cjs.Graphics().p("EgvEgJDMBeJAAAIAASHMheJAAAg");
	var mask_graphics_80 = new cjs.Graphics().p("EgvpgJDMBfTAAAIAASHMhfTAAAg");
	var mask_graphics_81 = new cjs.Graphics().p("EgwNgJDMBgbAAAIAASHMhgbAAAg");
	var mask_graphics_82 = new cjs.Graphics().p("EgwxgJDMBhjAAAIAASHMhhjAAAg");
	var mask_graphics_83 = new cjs.Graphics().p("EgxVgJDMBirAAAIAASHMhirAAAg");
	var mask_graphics_84 = new cjs.Graphics().p("Egx5gJDMBjzAAAIAASHMhjzAAAg");
	var mask_graphics_85 = new cjs.Graphics().p("EgydgJDMBk7AAAIAASHMhk7AAAg");
	var mask_graphics_86 = new cjs.Graphics().p("EgzBgJDMBmDAAAIAASHMhmDAAAg");
	var mask_graphics_87 = new cjs.Graphics().p("EgzlgJDMBnLAAAIAASHMhnLAAAg");
	var mask_graphics_88 = new cjs.Graphics().p("Eg0JgJDMBoTAAAIAASHMhoTAAAg");
	var mask_graphics_89 = new cjs.Graphics().p("Eg0tgJDMBpbAAAIAASHMhpbAAAg");
	var mask_graphics_90 = new cjs.Graphics().p("Eg1RgJDMBqjAAAIAASHMhqjAAAg");
	var mask_graphics_91 = new cjs.Graphics().p("Eg11gJDMBrrAAAIAASHMhrrAAAg");
	var mask_graphics_92 = new cjs.Graphics().p("Eg2ZgJDMBszAAAIAASHMhszAAAg");
	var mask_graphics_93 = new cjs.Graphics().p("Eg2+gJDMBt9AAAIAASHMht9AAAg");
	var mask_graphics_94 = new cjs.Graphics().p("Eg3igJDMBvFAAAIAASHMhvFAAAg");
	var mask_graphics_95 = new cjs.Graphics().p("Eg4GgJDMBwNAAAIAASHMhwNAAAg");
	var mask_graphics_96 = new cjs.Graphics().p("Eg4qgJDMBxVAAAIAASHMhxVAAAg");
	var mask_graphics_97 = new cjs.Graphics().p("Eg5OgJDMBydAAAIAASHMhydAAAg");
	var mask_graphics_98 = new cjs.Graphics().p("Eg5ygJDMBzlAAAIAASHMhzlAAAg");
	var mask_graphics_99 = new cjs.Graphics().p("Eg6WgJDMB0tAAAIAASHMh0tAAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-16.3022,y:24}).wait(1).to({graphics:mask_graphics_1,x:-12.6769,y:24}).wait(1).to({graphics:mask_graphics_2,x:-9.0516,y:24}).wait(1).to({graphics:mask_graphics_3,x:-5.4264,y:24}).wait(1).to({graphics:mask_graphics_4,x:-1.8011,y:24}).wait(1).to({graphics:mask_graphics_5,x:1.8242,y:24}).wait(1).to({graphics:mask_graphics_6,x:5.4495,y:24}).wait(1).to({graphics:mask_graphics_7,x:9.0747,y:24}).wait(1).to({graphics:mask_graphics_8,x:12.7,y:24}).wait(1).to({graphics:mask_graphics_9,x:16.3253,y:24}).wait(1).to({graphics:mask_graphics_10,x:19.9506,y:24}).wait(1).to({graphics:mask_graphics_11,x:23.5758,y:24}).wait(1).to({graphics:mask_graphics_12,x:27.2011,y:24}).wait(1).to({graphics:mask_graphics_13,x:30.8264,y:24}).wait(1).to({graphics:mask_graphics_14,x:34.4517,y:24}).wait(1).to({graphics:mask_graphics_15,x:38.0769,y:24}).wait(1).to({graphics:mask_graphics_16,x:41.7022,y:24}).wait(1).to({graphics:mask_graphics_17,x:45.3275,y:24}).wait(1).to({graphics:mask_graphics_18,x:48.9528,y:24}).wait(1).to({graphics:mask_graphics_19,x:52.578,y:24}).wait(1).to({graphics:mask_graphics_20,x:56.2033,y:24}).wait(1).to({graphics:mask_graphics_21,x:59.8286,y:24}).wait(1).to({graphics:mask_graphics_22,x:63.4539,y:24}).wait(1).to({graphics:mask_graphics_23,x:67.0791,y:24}).wait(1).to({graphics:mask_graphics_24,x:70.7044,y:24}).wait(1).to({graphics:mask_graphics_25,x:74.3297,y:24}).wait(1).to({graphics:mask_graphics_26,x:77.955,y:24}).wait(1).to({graphics:mask_graphics_27,x:81.5802,y:24}).wait(1).to({graphics:mask_graphics_28,x:85.2055,y:24}).wait(1).to({graphics:mask_graphics_29,x:88.8308,y:24}).wait(1).to({graphics:mask_graphics_30,x:92.4561,y:24}).wait(1).to({graphics:mask_graphics_31,x:96.0813,y:24}).wait(1).to({graphics:mask_graphics_32,x:99.7066,y:24}).wait(1).to({graphics:mask_graphics_33,x:103.3319,y:24}).wait(1).to({graphics:mask_graphics_34,x:106.9572,y:24}).wait(1).to({graphics:mask_graphics_35,x:110.5824,y:24}).wait(1).to({graphics:mask_graphics_36,x:114.2077,y:24}).wait(1).to({graphics:mask_graphics_37,x:117.833,y:24}).wait(1).to({graphics:mask_graphics_38,x:121.4583,y:24}).wait(1).to({graphics:mask_graphics_39,x:125.0835,y:24}).wait(1).to({graphics:mask_graphics_40,x:128.7088,y:24}).wait(1).to({graphics:mask_graphics_41,x:132.3341,y:24}).wait(1).to({graphics:mask_graphics_42,x:135.9594,y:24}).wait(1).to({graphics:mask_graphics_43,x:139.5846,y:24}).wait(1).to({graphics:mask_graphics_44,x:143.2099,y:24}).wait(1).to({graphics:mask_graphics_45,x:146.8352,y:24}).wait(1).to({graphics:mask_graphics_46,x:150.4605,y:24}).wait(1).to({graphics:mask_graphics_47,x:154.0857,y:24}).wait(1).to({graphics:mask_graphics_48,x:157.711,y:24}).wait(1).to({graphics:mask_graphics_49,x:161.3363,y:24}).wait(1).to({graphics:mask_graphics_50,x:164.9615,y:24}).wait(1).to({graphics:mask_graphics_51,x:168.5868,y:24}).wait(1).to({graphics:mask_graphics_52,x:172.2121,y:24}).wait(1).to({graphics:mask_graphics_53,x:175.8374,y:24}).wait(1).to({graphics:mask_graphics_54,x:179.4626,y:24}).wait(1).to({graphics:mask_graphics_55,x:183.0879,y:24}).wait(1).to({graphics:mask_graphics_56,x:186.7132,y:24}).wait(1).to({graphics:mask_graphics_57,x:190.3385,y:24}).wait(1).to({graphics:mask_graphics_58,x:193.9637,y:24}).wait(1).to({graphics:mask_graphics_59,x:197.589,y:24}).wait(1).to({graphics:mask_graphics_60,x:201.2143,y:24}).wait(1).to({graphics:mask_graphics_61,x:204.8396,y:24}).wait(1).to({graphics:mask_graphics_62,x:208.4648,y:24}).wait(1).to({graphics:mask_graphics_63,x:212.0901,y:24}).wait(1).to({graphics:mask_graphics_64,x:215.7154,y:24}).wait(1).to({graphics:mask_graphics_65,x:219.3407,y:24}).wait(1).to({graphics:mask_graphics_66,x:222.9659,y:24}).wait(1).to({graphics:mask_graphics_67,x:226.5912,y:24}).wait(1).to({graphics:mask_graphics_68,x:230.2165,y:24}).wait(1).to({graphics:mask_graphics_69,x:233.8418,y:24}).wait(1).to({graphics:mask_graphics_70,x:237.467,y:24}).wait(1).to({graphics:mask_graphics_71,x:241.0923,y:24}).wait(1).to({graphics:mask_graphics_72,x:244.7176,y:24}).wait(1).to({graphics:mask_graphics_73,x:248.3429,y:24}).wait(1).to({graphics:mask_graphics_74,x:251.9681,y:24}).wait(1).to({graphics:mask_graphics_75,x:255.5934,y:24}).wait(1).to({graphics:mask_graphics_76,x:259.2187,y:24}).wait(1).to({graphics:mask_graphics_77,x:262.844,y:24}).wait(1).to({graphics:mask_graphics_78,x:266.4692,y:24}).wait(1).to({graphics:mask_graphics_79,x:270.0945,y:24}).wait(1).to({graphics:mask_graphics_80,x:273.7198,y:24}).wait(1).to({graphics:mask_graphics_81,x:277.3451,y:24}).wait(1).to({graphics:mask_graphics_82,x:280.9703,y:24}).wait(1).to({graphics:mask_graphics_83,x:284.5956,y:24}).wait(1).to({graphics:mask_graphics_84,x:288.2209,y:24}).wait(1).to({graphics:mask_graphics_85,x:291.8462,y:24}).wait(1).to({graphics:mask_graphics_86,x:295.4714,y:24}).wait(1).to({graphics:mask_graphics_87,x:299.0967,y:24}).wait(1).to({graphics:mask_graphics_88,x:302.722,y:24}).wait(1).to({graphics:mask_graphics_89,x:306.3472,y:24}).wait(1).to({graphics:mask_graphics_90,x:309.9725,y:24}).wait(1).to({graphics:mask_graphics_91,x:313.5978,y:24}).wait(1).to({graphics:mask_graphics_92,x:317.2231,y:24}).wait(1).to({graphics:mask_graphics_93,x:320.8484,y:24}).wait(1).to({graphics:mask_graphics_94,x:324.4736,y:24}).wait(1).to({graphics:mask_graphics_95,x:328.0989,y:24}).wait(1).to({graphics:mask_graphics_96,x:331.7242,y:24}).wait(1).to({graphics:mask_graphics_97,x:335.3495,y:24}).wait(1).to({graphics:mask_graphics_98,x:338.9747,y:24}).wait(1).to({graphics:mask_graphics_99,x:340.85,y:24}).wait(1));

	// Слой_1
	this.instance = new lib.CachedBmp_10();

	this.instance_1 = new lib.CachedBmp_11();

	var maskedShapeInstanceList = [this.instance,this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},99).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,712,38);


(lib.adButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.text = new cjs.Text("观看广告即可免费获得\n5 分钟加速", "bold 21px 'Consolas'", "#003300");
	this.text.textAlign = "center";
	this.text.lineHeight = 27;
	this.text.parent = this;
	this.text.setTransform(81.2993,8.05,0.5797,0.5797);

	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-2,-2);

	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(-2,-2);

	this.instance_2 = new lib.CachedBmp_9();
	this.instance_2.setTransform(-2,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text,p:{color:"#003300"}}]}).to({state:[{t:this.instance_1},{t:this.text,p:{color:"#003300"}}]},1).to({state:[{t:this.instance_2},{t:this.text,p:{color:"#001F00"}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,167,48);


(lib.u1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.hover = new lib.hover();
	this.hover.name = "hover";
	this.hover.setTransform(95.4,36.1,1,1,0,0,0,96.4,37.1);
	this.hover.alpha = 0.1992;
	new cjs.ButtonHelper(this.hover, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.hover).wait(1));

	// Слой_1
	this.cost = new cjs.Text("成本: 100 $", "bold 10px 'Arial'");
	this.cost.name = "cost";
	this.cost.textAlign = "center";
	this.cost.lineHeight = 13;
	this.cost.lineWidth = 145;
	this.cost.parent = this;
	this.cost.setTransform(95.1,53,1.2759,1.2759);

	this.amo = new cjs.Text("0 / 30", "bold 10px 'Arial'");
	this.amo.name = "amo";
	this.amo.textAlign = "center";
	this.amo.lineHeight = 13;
	this.amo.lineWidth = 145;
	this.amo.parent = this;
	this.amo.setTransform(95.1,22.55,1.2759,1.2759);

	this.namee = new cjs.Text("+ 5% 产生速度", "bold 10px 'Arial'");
	this.namee.name = "namee";
	this.namee.textAlign = "center";
	this.namee.lineHeight = 13;
	this.namee.lineWidth = 145;
	this.namee.parent = this;
	this.namee.setTransform(95.1,2.9,1.2759,1.2759);

	this.instance = new lib.CachedBmp_127();
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.namee},{t:this.amo},{t:this.cost}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.u1, new cjs.Rectangle(-1,-1,193,74.5), null);


(lib.tBlock9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0rghJMBpXAAAMAAABCTMhpXAAAg");
	mask.setTransform(120.2188,-151.8232);

	// Слой_1
	this.tb = new lib.tb9();
	this.tb.name = "tb";
	this.tb.setTransform(-116.6,38.05,0.7468,0.7468,0,0,0,0.1,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock9, new cjs.Rectangle(-116.6,16.3,47.5,43.3), null);


(lib.tBlock8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0rghJMBpXAAAMAAABCTMhpXAAAg");
	mask.setTransform(120.2188,-151.8232);

	// Слой_1
	this.tb = new lib.tb8();
	this.tb.name = "tb";
	this.tb.setTransform(-116.6,38.05,0.7468,0.7468,0,0,0,0.1,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock8, new cjs.Rectangle(-116.6,16.3,47.5,43.3), null);


(lib.tBlock7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0rghJMBpXAAAMAAABCTMhpXAAAg");
	mask.setTransform(120.2188,-151.8232);

	// Слой_1
	this.tb = new lib.tb7();
	this.tb.name = "tb";
	this.tb.setTransform(-116.6,38.05,0.7468,0.7468,0,0,0,0.1,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock7, new cjs.Rectangle(-116.6,16.3,47.5,43.3), null);


(lib.tBlock6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0rghJMBpXAAAMAAABCTMhpXAAAg");
	mask.setTransform(120.2188,-151.8232);

	// Слой_1
	this.tb = new lib.tb6();
	this.tb.name = "tb";
	this.tb.setTransform(-116.6,38.05,0.7468,0.7468,0,0,0,0.1,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock6, new cjs.Rectangle(-116.6,16.3,47.5,43.3), null);


(lib.tBlock5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0rghJMBpXAAAMAAABCTMhpXAAAg");
	mask.setTransform(120.2188,-151.8232);

	// Слой_1
	this.tb = new lib.tb5();
	this.tb.name = "tb";
	this.tb.setTransform(-116.6,38.05,0.7468,0.7468,0,0,0,0.1,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock5, new cjs.Rectangle(-116.6,16.3,47.5,43.3), null);


(lib.tBlock4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0rghJMBpXAAAMAAABCTMhpXAAAg");
	mask.setTransform(120.2188,-151.8232);

	// Слой_1
	this.tb = new lib.tb4();
	this.tb.name = "tb";
	this.tb.setTransform(-116.6,38.05,0.7468,0.7468,0,0,0,0.1,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock4, new cjs.Rectangle(-116.6,16.3,47.5,43.3), null);


(lib.tBlock3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0rghJMBpXAAAMAAABCTMhpXAAAg");
	mask.setTransform(120.2188,-151.8232);

	// Слой_1
	this.tb = new lib.tb3();
	this.tb.name = "tb";
	this.tb.setTransform(-116.6,38.05,0.7468,0.7468,0,0,0,0.1,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock3, new cjs.Rectangle(-116.6,16.3,47.5,43.3), null);


(lib.tBlock2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0rghJMBpXAAAMAAABCTMhpXAAAg");
	mask.setTransform(120.2188,-151.8232);

	// Слой_1
	this.tb = new lib.tb2();
	this.tb.name = "tb";
	this.tb.setTransform(-116.6,38.05,0.7468,0.7468,0,0,0,0.1,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock2, new cjs.Rectangle(-116.6,16.3,47.5,43.3), null);


(lib.tBlock = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg00ghOMBppAAAMAAABCdMhppAAAg");
	mask.setTransform(121.0918,-151.2783);

	// Слой_1
	this.tb = new lib.tb();
	this.tb.name = "tb";
	this.tb.setTransform(0,28.45,1.0466,1.0466,0,0,0,0,27.2);

	var maskedShapeInstanceList = [this.tb];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.tb).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tBlock, new cjs.Rectangle(0,-2,66.6,61), null);


(lib.sky = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Растровоеизображение7();
	this.instance.setTransform(0,0,0.8723,1.0747);

	this.instance_1 = new lib.Растровоеизображение6();
	this.instance_1.setTransform(0,619,0.8731,1.1441);

	this.instance_2 = new lib.Растровоеизображение5();
	this.instance_2.setTransform(0,1278,0.8732,0.8732);

	this.instance_3 = new lib.Растровоеизображение4();
	this.instance_3.setTransform(0,1780,0.8741,1.1081);

	this.instance_4 = new lib.Растровоеизображение3();
	this.instance_4.setTransform(0,2415,0.8704,0.9046);

	this.box = new lib.box();
	this.box.name = "box";
	this.box.setTransform(0,2935,2.4996,2.3576);

	this.instance_5 = new lib.CachedBmp_65();
	this.instance_5.setTransform(0,3332.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.box},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sky, new cjs.Rectangle(0,0,671.3,3425.4), null);


(lib.midAd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.noB = new lib.noB();
	this.noB.name = "noB";
	this.noB.setTransform(39.35,64.3);
	new cjs.ButtonHelper(this.noB, 0, 1, 2);

	this.yesB = new lib.yesB();
	this.yesB.name = "yesB";
	this.yesB.setTransform(162.2,80.75,1,1,0,0,0,24.2,16.9);
	new cjs.ButtonHelper(this.yesB, 0, 1, 2);

	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(9.05,2.4);

	this.instance_1 = new lib.CachedBmp_48();
	this.instance_1.setTransform(-2,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.yesB},{t:this.noB}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.midAd, new cjs.Rectangle(-2,-2,223,115), null);


(lib.ground = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg0YAmQIAAt7IAFAAIAAnlIAAorIAAopIAAorIAAoqIAAjBIAAoqIAAorIJDAAIJDAAIJCAAIJDAAIJDAAIJCAAIJDAAIJDAAIJDAAIJCAAIJDAAIFIAAIAAHRIAAHQIAAFvIAAIHIAAIqIAAIqIAAIqIAAIPIAGAAIAAN7g");
	mask.setTransform(335.3,245.65);

	// Слой_1
	this.sky = new lib.sky();
	this.sky.name = "sky";
	this.sky.setTransform(335.3,-1222.3,1,1,0,0,0,335.3,1712.7);

	var maskedShapeInstanceList = [this.sky];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.sky).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ground, new cjs.Rectangle(0,0.9,670.6,489.5), null);


(lib.goldenUpgrade = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.instance = new lib.hover();
	this.instance.setTransform(0,0,1.1696,1.2349);
	this.instance.alpha = 0.1992;
	new cjs.ButtonHelper(this.instance, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Слой_1
	this.cost = new cjs.Text("100 GB", "bold 15px 'Arial'");
	this.cost.name = "cost";
	this.cost.textAlign = "center";
	this.cost.lineHeight = 19;
	this.cost.lineWidth = 219;
	this.cost.parent = this;
	this.cost.setTransform(113.95,71.5);

	this.amo = new cjs.Text("0 / 20", "bold 15px 'Arial'");
	this.amo.name = "amo";
	this.amo.textAlign = "center";
	this.amo.lineHeight = 19;
	this.amo.lineWidth = 219;
	this.amo.parent = this;
	this.amo.setTransform(113.95,51.3);

	this.namee = new cjs.Text("+ 1 最大生成时间升级", "bold 15px 'Arial'");
	this.namee.name = "namee";
	this.namee.textAlign = "center";
	this.namee.lineHeight = 19;
	this.namee.lineWidth = 219;
	this.namee.parent = this;
	this.namee.setTransform(113.8,4.9);

	this.isAvaible = new lib.coloring();
	this.isAvaible.name = "isAvaible";
	this.isAvaible.setTransform(112.8,45.9,1,1,0,0,0,112.8,45.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.isAvaible},{t:this.namee},{t:this.amo},{t:this.cost}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.goldenUpgrade, new cjs.Rectangle(-1,-1,228,94), null);


(lib.coin_ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.click = new lib.coinClick();
	this.click.name = "click";
	this.click.setTransform(76,70.2,1,1,0,0,0,76,70.2);
	new cjs.ButtonHelper(this.click, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.click).to({rotation:-6.9817,x:76.05,y:70.25},14).to({rotation:7.4814,x:76},15).to({rotation:0,y:70.2},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.4,-9.2,168.9,158.6);


(lib.cGamess = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Растровоеизображение16();
	this.instance.setTransform(0,0,0.2674,0.2674);

	this.instance_1 = new lib.hovering();
	this.instance_1.setTransform(0,0,1.0315,1.2176);
	this.instance_1.alpha = 0.3008;

	this.instance_2 = new lib.hovering2();
	this.instance_2.setTransform(0,0,1.0315,1.2176);
	this.instance_2.alpha = 0.3008;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).to({state:[{t:this.instance},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,152.3,60.2);


(lib.adButtont = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.adButton = new lib.adButton();
	this.adButton.name = "adButton";
	new cjs.ButtonHelper(this.adButton, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.adButton).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.adButtont, new cjs.Rectangle(-2,-2,167,48), null);


(lib.gu = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.gu32 = new lib.goldenUpgrade();
	this.gu32.name = "gu32";
	this.gu32.setTransform(173.65,2404.95);

	this.gu31 = new lib.goldenUpgrade();
	this.gu31.name = "gu31";
	this.gu31.setTransform(173.65,2286.25);

	this.gu30 = new lib.goldenUpgrade();
	this.gu30.name = "gu30";
	this.gu30.setTransform(173.65,2168.5);

	this.gu29 = new lib.goldenUpgrade();
	this.gu29.name = "gu29";
	this.gu29.setTransform(173.65,2050.05);

	this.gu28 = new lib.goldenUpgrade();
	this.gu28.name = "gu28";
	this.gu28.setTransform(360.45,1929.1);

	this.gu27 = new lib.goldenUpgrade();
	this.gu27.name = "gu27";
	this.gu27.setTransform(0,1929.1);

	this.gu26 = new lib.goldenUpgrade();
	this.gu26.name = "gu26";
	this.gu26.setTransform(360.45,1813.55);

	this.gu25 = new lib.goldenUpgrade();
	this.gu25.name = "gu25";
	this.gu25.setTransform(0,1813.55);

	this.gu24 = new lib.goldenUpgrade();
	this.gu24.name = "gu24";
	this.gu24.setTransform(360.45,1698);

	this.gu23 = new lib.goldenUpgrade();
	this.gu23.name = "gu23";
	this.gu23.setTransform(0,1698);

	this.gu22 = new lib.goldenUpgrade();
	this.gu22.name = "gu22";
	this.gu22.setTransform(360.45,1582.45);

	this.gu21 = new lib.goldenUpgrade();
	this.gu21.name = "gu21";
	this.gu21.setTransform(0,1582.45);

	this.gu20 = new lib.goldenUpgrade();
	this.gu20.name = "gu20";
	this.gu20.setTransform(360.45,1466.9);

	this.gu19 = new lib.goldenUpgrade();
	this.gu19.name = "gu19";
	this.gu19.setTransform(0,1466.9);

	this.gu18 = new lib.goldenUpgrade();
	this.gu18.name = "gu18";
	this.gu18.setTransform(173.65,1350.85);

	this.gu17 = new lib.goldenUpgrade();
	this.gu17.name = "gu17";
	this.gu17.setTransform(360.45,1228.3);

	this.gu16 = new lib.goldenUpgrade();
	this.gu16.name = "gu16";
	this.gu16.setTransform(0,1228.3);

	this.gu15 = new lib.goldenUpgrade();
	this.gu15.name = "gu15";
	this.gu15.setTransform(360.45,1109.6);

	this.gu14 = new lib.goldenUpgrade();
	this.gu14.name = "gu14";
	this.gu14.setTransform(0,1109.6);

	this.gu13 = new lib.goldenUpgrade();
	this.gu13.name = "gu13";
	this.gu13.setTransform(360.45,990.9);

	this.gu12 = new lib.goldenUpgrade();
	this.gu12.name = "gu12";
	this.gu12.setTransform(0,990.9);

	this.gu10 = new lib.goldenUpgrade();
	this.gu10.name = "gu10";
	this.gu10.setTransform(173.65,875.5);

	this.gu11 = new lib.goldenUpgrade();
	this.gu11.name = "gu11";
	this.gu11.setTransform(360.45,757.1);

	this.gu9 = new lib.goldenUpgrade();
	this.gu9.name = "gu9";
	this.gu9.setTransform(0,757.1);

	this.gu7 = new lib.goldenUpgrade();
	this.gu7.name = "gu7";
	this.gu7.setTransform(173.65,623.25);

	this.gu8 = new lib.goldenUpgrade();
	this.gu8.name = "gu8";
	this.gu8.setTransform(360.45,504.85);

	this.gu6 = new lib.goldenUpgrade();
	this.gu6.name = "gu6";
	this.gu6.setTransform(0,504.85);

	this.gu5 = new lib.goldenUpgrade();
	this.gu5.name = "gu5";
	this.gu5.setTransform(173.65,385.45);

	this.gu4 = new lib.goldenUpgrade();
	this.gu4.name = "gu4";
	this.gu4.setTransform(360.45,253.7);

	this.gu3 = new lib.goldenUpgrade();
	this.gu3.name = "gu3";
	this.gu3.setTransform(0,253.7);

	this.gu2 = new lib.goldenUpgrade();
	this.gu2.name = "gu2";
	this.gu2.setTransform(173.65,124.9);

	this.gu1 = new lib.goldenUpgrade();
	this.gu1.name = "gu1";
	this.gu1.setTransform(173.65,0);

	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(95.3,90.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.gu1},{t:this.gu2},{t:this.gu3},{t:this.gu4},{t:this.gu5},{t:this.gu6},{t:this.gu8},{t:this.gu7},{t:this.gu9},{t:this.gu11},{t:this.gu10},{t:this.gu12},{t:this.gu13},{t:this.gu14},{t:this.gu15},{t:this.gu16},{t:this.gu17},{t:this.gu18},{t:this.gu19},{t:this.gu20},{t:this.gu21},{t:this.gu22},{t:this.gu23},{t:this.gu24},{t:this.gu25},{t:this.gu26},{t:this.gu27},{t:this.gu28},{t:this.gu29},{t:this.gu30},{t:this.gu31},{t:this.gu32}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gu, new cjs.Rectangle(-1,-1,588.5,2499), null);


(lib.gbInner = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// maska (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Egx/AjdQh4AAAAh4MAAAhDJQAAh4B4AAMBj/AAAQB4AAAAB4MAAABDJQAAB4h4AAg");
	mask.setTransform(331.975,226.9);

	// upgrades
	this.gu = new lib.gu();
	this.gu.name = "gu";
	this.gu.setTransform(331.55,251.2,1,1,0,0,0,292.9,238.6);

	var maskedShapeInstanceList = [this.gu];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.gu).wait(1));

	// Слой_1
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(-1.5,-1.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gbInner, new cjs.Rectangle(-1.5,-1.5,667,457), null);


(lib.goldenW = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.saps = new cjs.Text(": 160,000", "bold 12px 'Arial'", "#00FFFF");
	this.saps.name = "saps";
	this.saps.lineHeight = 16;
	this.saps.lineWidth = 77;
	this.saps.parent = this;
	this.saps.setTransform(518.55,148.15,1.6571,1.6571);

	this.ems = new cjs.Text(": 160,000", "bold 12px 'Arial'", "#66FF66");
	this.ems.name = "ems";
	this.ems.lineHeight = 16;
	this.ems.lineWidth = 77;
	this.ems.parent = this;
	this.ems.setTransform(518.55,110.5,1.6571,1.6571);

	this.instance = new lib.sapphire();
	this.instance.setTransform(490.15,142.2,0.7398,0.7398);

	this.instance_1 = new lib.emerald();
	this.instance_1.setTransform(504,119.55,0.7398,0.7398,0,0,0,18.7,20.2);

	this.scroller = new lib.scroller();
	this.scroller.name = "scroller";
	this.scroller.setTransform(671.95,263.2,0.9538,0.8317,0,0,0,12.7,18.4);

	this.scrollBar = new lib.scrollBar();
	this.scrollBar.name = "scrollBar";
	this.scrollBar.setTransform(671,430.45,0.8317,0.8317,0,0,0,15.1,219.5);

	this.goDOWN = new lib.goUP();
	this.goDOWN.name = "goDOWN";
	this.goDOWN.setTransform(671.8,610.1,0.8317,0.8317,180,0,0,15.4,17.8);
	new cjs.ButtonHelper(this.goDOWN, 0, 1, 1);

	this.goUP = new lib.goUP();
	this.goUP.name = "goUP";
	this.goUP.setTransform(671.1,232.65,0.8317,0.8317,0,0,0,15.5,17.9);
	new cjs.ButtonHelper(this.goUP, 0, 1, 1);

	this.inner = new lib.gbInner();
	this.inner.name = "inner";
	this.inner.setTransform(361.95,420.2,0.8922,0.8922,0,0,0,331.9,226.9);

	this.GBAT = new cjs.Text("Alltime GB: 1,024", "bold 7px 'Arial'", "#FFFF99");
	this.GBAT.name = "GBAT";
	this.GBAT.textAlign = "center";
	this.GBAT.lineHeight = 10;
	this.GBAT.lineWidth = 173;
	this.GBAT.parent = this;
	this.GBAT.setTransform(354.2726,179.35,2.6003,2.6003);

	this.helpGB = new cjs.Text("1 总 GB -> +1% income", "bold 7px 'Arial'", "#FFFF99");
	this.helpGB.name = "helpGB";
	this.helpGB.textAlign = "center";
	this.helpGB.lineHeight = 10;
	this.helpGB.lineWidth = 36;
	this.helpGB.parent = this;
	this.helpGB.setTransform(61.1226,13.05,2.6003,2.6003);

	this.gbAP = new cjs.Text("声望后你会得到120", "bold 7px 'Arial'", "#FFFF99");
	this.gbAP.name = "gbAP";
	this.gbAP.textAlign = "center";
	this.gbAP.lineHeight = 10;
	this.gbAP.lineWidth = 173;
	this.gbAP.parent = this;
	this.gbAP.setTransform(354.6726,72.7,2.6003,2.6003);

	this.gbNow = new cjs.Text("你有 0 金色块", "bold 7px 'Arial'", "#FFFF99");
	this.gbNow.name = "gbNow";
	this.gbNow.textAlign = "center";
	this.gbNow.lineHeight = 10;
	this.gbNow.lineWidth = 116;
	this.gbNow.parent = this;
	this.gbNow.setTransform(357.3334,19.4,4.0548,4.0548);

	this.prestige = new lib.prestigeB();
	this.prestige.name = "prestige";
	this.prestige.setTransform(348.45,136.55,1,1,0,0,0,106.6,32.4);
	new cjs.ButtonHelper(this.prestige, 0, 1, 2);

	this.clos = new lib.clos_GT();
	this.clos.name = "clos";
	this.clos.setTransform(691.85,24.1,1,1,0,0,0,22.9,24.1);
	new cjs.ButtonHelper(this.clos, 0, 1, 2);

	this.instance_2 = new lib.gtBG();
	this.instance_2.setTransform(357.4,323.95,1,1,0,0,0,357.4,323.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.clos},{t:this.prestige},{t:this.gbNow},{t:this.gbAP},{t:this.helpGB},{t:this.GBAT},{t:this.inner},{t:this.goUP},{t:this.goDOWN},{t:this.scrollBar},{t:this.scroller},{t:this.instance_1},{t:this.instance},{t:this.ems},{t:this.saps}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.goldenW, new cjs.Rectangle(-1.5,-1.5,718,2459.2), null);


// stage content:
(lib.index = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var notation = 1;
		
		
		
		function nd(a) {
			return new Decimal(a);
		}
		
		
		function format3(num) {
			if (num < 10) {
				return Math.round(num*100)/100;
			}
			else if (num < 100) {
				return Math.round(num*10)/10;
			}
			else {
				return Math.round(num);
			}
		}
		
		function nullify(num) {
			if (num < 10) {
				return "00" + Math.floor(num);
			}
			else if (num < 100) {
				return "0" + Math.floor(num);
			}
			else {
				return Math.floor(num);
			}
		}
		
		
		function format(num) {
			if (notation == 1) {
				return format2(num);
			}
			else {
				if (num.lt(1000)) {
					return format3(num.toNumber());
				}
				else if (num.lt(100000)) {
					var num_ = num.toNumber;
					var fPart = Math.floor(num/1000);
					var sPart = (num%1000);
					return fPart + "," + nullify(sPart);
				}
				else {
					return format_short(num);
				}
			}
		}
		
		function format0(num) {
			if (notation == 1) {
				if (num.lt(1000)) {
					return format2(num.floor());
				}
				else {
					return format2(num);
				}
			}
		}
		
		
		function format2(num) {
			if (num.lt(1000)) {
				return format3(num.toNumber());
			}
			else if (num.lt(100000)) {
				var num_ = num.toNumber;
				var fPart = Math.floor(num/1000);
				var sPart = (num%1000);
				return fPart + "," + nullify(sPart);
			}
			else if (num.lt(1e6)) {
				return format3(num.div(1e3).toNumber()) + " K";
			}
			else if (num.lt(1e9)) {
				return format3(num.div(1e6).toNumber()) + " M";
			}
			else if (num.lt(1e12)) {
				return format3(num.div(1e9).toNumber()) + " B";
			}
			else if (num.lt(1e15)) {
				return format3(num.div(1e12).toNumber()) + " T";
			}
			else if (num.lt(1e18)) {
				return format3(num.div(1e15).toNumber()) + " Qa";
			}
			else if (num.lt(1e21)) {
				return format3(num.div(1e18).toNumber()) + " Qi";
			}
			else if (num.lt(1e24)) {
				return format3(num.div(1e21).toNumber()) + " Sx";
			}
			else if (num.lt(1e27)) {
				return format3(num.div(1e24).toNumber()) + " Sp";
			}
			else if (num.lt(1e30)) {
				return format3(num.div(1e27).toNumber()) + " Oc";
			}
			else if (num.lt(1e33)) {
				return format3(num.div(1e30).toNumber()) + " No";
			}
			else if (num.lt(1e36)) {
				return format3(num.div(1e33).toNumber()) + " Dc";
			}
			else if (num.lt(1e39)) {
				return format3(num.div(1e36).toNumber()) + " UD";
			}
			else if (num.lt(1e42)) {
				return format3(num.div(1e39).toNumber()) + " DD";
			}
			else if (num.lt(1e45)) {
				return format3(num.div(1e42).toNumber()) + " TD";
			}
			else if (num.lt(1e48)) {
				return format3(num.div(1e45).toNumber()) + " qD";
			}
			else if (num.lt(1e51)) {
				return format3(num.div(1e48).toNumber()) + " QD";
			}
			else if (num.lt(1e54)) {
				return format3(num.div(1e51).toNumber()) + " sD";
			}
			else if (num.lt(1e57)) {
				return format3(num.div(1e54).toNumber()) + " SD";
			}
			else if (num.lt(1e60)) {
				return format3(num.div(1e57).toNumber()) + " OD";
			}
			else if (num.lt(1e63)) {
				return format3(num.div(1e60).toNumber()) + " ND";
			}
			else if (num.lt(1e66)) {
				return format3(num.div(1e63).toNumber()) + " Vg";
			}
			else if (num.lt(1e69)) {
				return format3(num.div(1e66).toNumber()) + " UV";
			}
			else if (num.lt(1e72)) {
				return format3(num.div(1e69).toNumber()) + " DV";
			}
			else if (num.lt(1e75)) {
				return format3(num.div(1e72).toNumber()) + " TV";
			}
			else if (num.lt(1e78)) {
				return format3(num.div(1e75).toNumber()) + " qV";
			}
			else if (num.lt(1e81)) {
				return format3(num.div(1e78).toNumber()) + " QV";
			}
			else if (num.lt(1e84)) {
				return format3(num.div(1e81).toNumber()) + " sV";
			}
			else if (num.lt(1e87)) {
				return format3(num.div(1e84).toNumber()) + " SV";
			}
			else if (num.lt(1e90)) {
				return format3(num.div(1e87).toNumber()) + " OV";
			}
			else if (num.lt(1e93)) {
				return format3(num.div(1e90).toNumber()) + " NV";
			}
			else if (num.lt(1e96)) {
				return format3(num.div(1e93).toNumber()) + " Tg";
			}
			else if (num.lt(1e99)) {
				return format3(num.div(1e96).toNumber()) + " UT";
			}
			else if (num.lt(1e100)) {
				return format3(num.div(1e99).toNumber()) + " DT";
			}
			else if (num.lt(1e103)) {
				return format3(num.div(1e100).toNumber()) + " G";
			}
			else {
				return format_short(num);
			}
		}
		
		
		var curInf = new Decimal("ee30800");
		
		
		function exponentialFormat(num, precision) {
			let e = num.log10().floor()
			let m = num.div(Decimal.pow(10, e))
			if(m.toStringWithDecimalPlaces(precision) == 10) {
				m = new Decimal(1)
				e = e.add(1)
			}
			return m.toStringWithDecimalPlaces(precision)+"e"+e.toStringWithDecimalPlaces(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}
		
		function exponentialFormat2(num, precision) {
			let e = num.log10();
			let e2 = e.log10().floor();
			let m = e.div(Decimal.pow(10, e2));
		
			return "e"+m.toStringWithDecimalPlaces(precision)+"e"+e2.toStringWithDecimalPlaces(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}
		
		function commaFormat(num, precision) {
			if (num === null || num === undefined) return "NaN"
			if (num.mag < 0.001) return (0).toFixed(precision)
			return num.toStringWithDecimalPlaces(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}
		
		
		function regularFormat(num, precision) {
			if (num === null || num === undefined) return "NaN"
			if (num.mag < 0.001) return (0).toFixed(precision)
			return num.toStringWithDecimalPlaces(precision)
		}
		
		function fixValue(x, y = 0) {
			return x || new Decimal(y)
		}
		
		function sumValues(x) {
			x = Object.values(x)
			if (!x[0]) return new Decimal(0)
			return x.reduce((a, b) => Decimal.add(a, b))
		}
		
		
		function format_short(decimal, precision=1) {
			decimal = new Decimal(decimal)
			if (isNaN(decimal.sign)||isNaN(decimal.layer)||isNaN(decimal.mag)) {
				return "NaN"
			}
			if (decimal.sign<0) return "-"+format(decimal.neg(), precision)
			if (decimal.mag == Number.POSITIVE_INFINITY) return "R_INF";
			if (!decimal.gte("ee1000000")) {
				if (decimal.gte(curInf)) {
					var slog = decimal.slog()
					if (slog.gte(1e6)) return "F" + format(slog.floor())
					else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
				} else if (decimal.gte("1e1e6")) return exponentialFormat2(decimal, 3)
				else if (decimal.gte(1e4)) return exponentialFormat(decimal, 2)
				else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
				else return regularFormat(decimal, precision)
			}
			else return "INF";
		}
		
		function formatWhole(decimal) {
			decimal = new Decimal(decimal)
			if (decimal.gte(1e9)) return format(decimal, 2)
			if (decimal.lte(0.95) && !decimal.eq(0)) return format(decimal, 2)
			return format(decimal, 0)
		}
		
		function formatTime(s) {
			if (s<60) return format(s)+"s"
			else if (s<3600) return formatWhole(Math.floor(s/60))+"m "+format(s%60)+"s"
			else if (s<86400) return formatWhole(Math.floor(s/3600))+"h "+formatWhole(Math.floor(s/60)%60)+"m "+format(s%60)+"s"
			else return formatWhole(Math.floor(s/86400)) + "d "+formatWhole(Math.floor(s/3600)%24)+"h "+formatWhole(Math.floor(s/60)%60)+"m "+format(s%60)+"s"
		}
		
		function toPlaces(x, precision, maxAccepted) {
			x = new Decimal(x)
			let result = x.toStringWithDecimalPlaces(precision)
			if (new Decimal(result).gte(maxAccepted)) {
				result = new Decimal(maxAccepted-Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
			}
			return result
		}
		
		function absmin(a, b) {
			if (Math.abs(a) < Math.abs(b)) {
				return a;
			}
			else {
				return b;
			}
		}
		
		var mousePosX = 0;
		var mousePosY = 0;
		
		
		this.addEventListener("tick", main_fs.bind(this));
		function main_fs() {
		
			mousePosX = stage.mouseX / canvas.width * 1280;
			mousePosY = stage.mouseY / canvas.height * 720;
		
		}
		this.cGames.addEventListener("click", goCG.bind(this));
		function goCG() {
			window.open("http://crazygames.com/", "_blank");
		}
		
		const crazysdk = window.CrazyGames.CrazySDK.getInstance(); //Getting the SDK
		crazysdk.init();
		adRequested = false;
		
		var fullscreen = false;
		var elem = document.getElementById("animation_container");
		
		crazysdk.addEventListener('adStarted', adStarted.bind(this));
		crazysdk.addEventListener('adError', adError.bind(this));
		crazysdk.addEventListener('adFinished', adFinished.bind(this));
		
		
		var addedAd2 = false;
		
		var respawn = 60;
		
		
		this.addEventListener("tick", devSet.bind(this));
		function devSet() {
			
			
			if (this.helpSplash.alpha > 0) {
				this.helpSplash.alpha -= 1/12/fps*timeMult;
			}
			else if (this.helpSplash.alpha < 0) {
				this.helpSplash.alpha = 0;
			}
			
			if (respawn > 0) {
				this.adButton.visible = false;
				respawn -= 1/fps*timeMult;
			}
			else {
				this.adButton.visible = true;
			}
			d = new Date();
			time1_ib = d.getTime()/1000;
			
		}
		
		
		function adStarted() {
			fps = 100000000;
			fps2 = 100000000;
		
		}
		
		function adError() {
		    fps = 30;
			fps2 = 30;
			this.helpSplash.alpha = 1;
			this.helpSplash.text = "这是一个广告错误，但无论如何这里有 1.5 分钟的奖励时间给你 ;)";
			speedUPtime_ib += 90;
			respawn = 300;
		}
		
		function adFinished() {
		    fps = 30;
			fps2 = 30;
			this.helpSplash.alpha = 1;
			this.helpSplash.text = "非常感谢观看。 这是您的奖金 5 分钟！";
			speedUPtime_ib += 300;
			respawn = 300;
		}
		
		function adError2() {
		    fps = 30;
			fps2 = 30;
			
		}
		
		
		function adFinished2() {
		    fps = 30;
			fps2 = 30;
			
			var mGet = income.times(600);
			money = money.plus(mGet);
			totalMoney = totalMoney.plus(mGet);
			
			
			this.helpSplash.text = "你获得 " + format(mGet) + " $";
		}
		
		
		this.adButton.addEventListener("click", getAd2.bind(this));
		function getAd2() {
			if (!crazysdk.hasAdblock) {
				crazysdk.requestAd('rewarded');
				adDelay = 60;
			}
		}
		
		
		this.midAd.yesB.addEventListener("click", watchAd.bind(this));
		function watchAd() {
			this.midAd.visible = false;
			this.chipG.visible = false;
			if (!addedAd2) {
				crazysdk.addEventListener('adFinished', adFinished2.bind(this));
				addedAd2 = true;
			}
			if (!crazysdk.hasAdblock) {
				crazysdk.requestAd('rewarded');
				adDelay = 60;
			}
		}
		
		
		//ads
		
		
		var chipChance = 0.0005;
		var respawn = 10;
		
		
		this.chipG.visible = false
		this.midAd.visible = false
		
		
		
		this.addEventListener("tick", bonusbonus.bind(this));
		function bonusbonus() {
			
			respawn -= 1/fps;
			if (this.chipG.life > 0) {
				this.chipG.life -= 1/fps;
				this.chipG.alpha = this.chipG.life/10;
				if (this.chipG.alpha < 0) {
					this.chipG.alpha.visible = false;
				}
			}
			
			var chance = Math.random();
			if (chance <= 0.0008 && respawn <= 0) {
				this.chipG.visible = true;
				this.chipG.x = 261;
				this.chipG.y = 150;
				this.chipG.life = 15;
				respawn = 250;
			}
			
			if (this.midAd.visible) {
				stage.addChild(this.midAd);
			}
		}
		
		var respawn2 = 20;
		var yChange = 0;
		
		
		this.chipG.addEventListener("click", showAdd.bind(this));
		function showAdd() {
			this.midAd.visible = true;
			this.midAd.x = this.chipG.x + 40;
			this.midAd.y = this.chipG.y + 125;
		}
		
		this.midAd.noB.addEventListener("click", remChip.bind(this));
		function remChip() {
			this.midAd.visible = false;
			this.chipG.visible = false;
		}
		
		
		
		this.addEventListener("tick", spUP.bind(this));
		function spUP() {
			
			timeMult = 1 + (sActive*1);
			var dt = new Date();
			time2_ib = dt.getTime()/1000;
			
			if (speedUPtime_ib > 0) {
				this.speedUP_b.visible = true;
				this.spdUP.visible = true;
				this.spdTime.visible = true;
				this.spdUP.text = "加速 (x2, 最大 30m)";
				this.spdTime.text = Math.floor(speedUPtime_ib*10)/10 + "s";
				
				if (sActive == true) {
					this.speedUP_b.gotoAndStop(1);
					speedUPtime_ib -= 1/fps;
				}
				else {
					this.speedUP_b.gotoAndStop(0);
				}
			}
			else {
				this.speedUP_b.visible = false;
				this.spdUP.visible = false;
				this.spdTime.visible = false;
				sActive = false;
				this.adButton.visible = true;
			}
		}
		
		this.speedUP_b.addEventListener("click", makeActive.bind(this));
		function makeActive() {
			if (sActive == false) {
				sActive = true;
			}
			else {
				sActive = false;
			}
		}
		var tick = 0;
		var maxTick = 5;
		
		var firstBlock = null;
		var mLength = 0;
		
		
		var firstBlock2 = null;
		var mLength2 = 0;
		
		
		var firstBlock3 = null;
		var mLength3 = 0;
		
		
		var firstBlock4 = null;
		var mLength4 = 0;
		
		
		var firstBlock5 = null;
		var mLength5 = 0;
		
		
		var firstBlock6 = null;
		var mLength6 = 0;
		
		
		var firstBlock7 = null;
		var mLength7 = 0;
		
		
		var firstBlock8 = null;
		var mLength8 = 0;
		
		
		var firstBlock9 = null;
		var mLength9 = 0;
		
		var maxH = 5;
		
		var shiftY = 30;
		
		
		var money = nd(0);
		var totalMoney = nd(0);
		var totalGain = nd(0);
		
		var income = nd(0);
		
		
		var totalMult = nd(0); //special 1
		
		var gold = nd(0);
		var totalGold = nd(0);
		var gps = nd(0);
		
		var goldGain = nd(0);
		
		var emeralds = nd(0);
		var totalEmeralds = nd(0);
		var sapphires = nd(0);
		var totalSapphires = nd(0);
		
		var eps = nd(0);
		var sps = nd(0);
		
		var eps_t = nd(0);
		var sps_t = nd(0);
		
		
		var magnets = nd(0);
		var totalMagnets = nd(0);
		
		var spChance = 0;
		var mChance = 0;
		
		var level = 0;
		var xpNow = 0;
		var xpNext = 10;
		
		var fps = 30;
		var fps2 = 30;
		var speedUPtime_ib = 0;
		var sActive = false;
		var timeMult = 1;
		var speedUPtime_ib = 0;
		var sActive = false;
		
		var tutVis = true;
		
		var d = new Date();
		var timeStart_ib = d.getTime()/1000;
		var time1_ib = d.getTime()/1000;
		var time2_ib = d.getTime()/1000;
		
		window.setInterval(calculateFPS, 1000);
		window.setInterval(saving, 10000);
		function calculateFPS() {
			fps = Math.max(5, fps2);
			fps2 = 1;
		}
		
		var blockArray = [];
		var blockArray2 = [];
		var blockArray3 = [];
		var blockArray4 = [];
		var blockArray5 = [];
		var blockArray6 = [];
		var blockArray7 = [];
		var blockArray8 = [];
		var blockArray9 = [];
		var blockArray10 = [];
		var blockArray11 = [];
		
		
		
		var buyAmo = 1;
		var buyAmos = [1, 1, 1, 1, 1, 1, 1];
		
		
		
		function upgrade(maxL, baseCost, costI) {
			this.level = 0;
			this.maxLevel = maxL;
			this.baseCost = baseCost;
			this.costInc = costI;
			this.nowCost = baseCost;
			this.allCost = baseCost;
		}
		
		
		function goldenUpgrade(maxL, baseCost) {
			this.level = 0;
			this.maxLevel = maxL;
			this.baseCost = baseCost;
			this.allCost = baseCost;
		}
		
		var upgrades = [new upgrade(30, nd(100), nd(5)), new upgrade(9000, nd(1000), nd(5)),
						new upgrade(95, nd(100000), nd(1000)), new upgrade(999999, nd(1e6), nd(10)),
						new upgrade(100, nd(1e6), nd(1000)), new upgrade(999999, nd(1), nd(1)),
						new upgrade(100, nd(3), nd(3))
		];
		
		
		var gupgrades = [new goldenUpgrade(20, nd(100)), new goldenUpgrade(1, nd(500))
						, new goldenUpgrade(100, nd(10000)), new goldenUpgrade(9, nd(20000))
						, new goldenUpgrade(1, nd(1e7)), new goldenUpgrade(1, nd(1e12))
						, new goldenUpgrade(1, nd(1e13)), new goldenUpgrade(1, nd(1e14))
						, new goldenUpgrade(1, nd(1e15)), new goldenUpgrade(1, nd(1e15))
						, new goldenUpgrade(20, nd(1e15)), new goldenUpgrade(1, nd(1e16))
						, new goldenUpgrade(1, nd(1e16)), new goldenUpgrade(1, nd(1e16))
						, new goldenUpgrade(1, nd(1e16)), new goldenUpgrade(1, nd(1e17))
						, new goldenUpgrade(1, nd(1e17)), new goldenUpgrade(1, nd(1e18))
						, new goldenUpgrade(1, nd(1e20)), new goldenUpgrade(1, nd(1e20))
						, new goldenUpgrade(1, nd(100)), new goldenUpgrade(1, nd(100))
						, new goldenUpgrade(1, nd(1000)), new goldenUpgrade(1, nd(1000))
						, new goldenUpgrade(1, nd(2000)), new goldenUpgrade(1, nd(2000))
						, new goldenUpgrade(1, nd(12000)), new goldenUpgrade(1, nd(12000))
						, new goldenUpgrade(1, nd(1e25)), new goldenUpgrade(1, nd(1e33))
						, new goldenUpgrade(30, nd(1e36)), new goldenUpgrade(1, nd(1e42))];
		
		
		this.goldenW.visible = false;
		this.spChances.visible = false;
		this.specialStats.visible = false;
		
		var gupgShift = 0;
		
		
		function loading() {
			if (localStorage.getItem('towerIdle_money')) {
				tick = JSON.parse(localStorage.getItem('towerIdle_tick'));
				blockArray = JSON.parse(localStorage.getItem('towerIdle_blockArray'));
				
				for (var i = 0 ; i < blockArray.length ; ++i) {
					spawnBlock(blockArray[i]);
				}
				blockArray2 = JSON.parse(localStorage.getItem('towerIdle_blockArray2'));
				
				for (var i = 0 ; i < blockArray2.length ; ++i) {
					spawnS1Block(blockArray2[i]);
				}
				
				money = nd(JSON.parse(localStorage.getItem('towerIdle_money')));
				totalMoney = nd(JSON.parse(localStorage.getItem('towerIdle_totalMoney')));
				gold = nd(JSON.parse(localStorage.getItem('towerIdle_gold')));
				totalGold = nd(JSON.parse(localStorage.getItem('towerIdle_totalGold')));
				emeralds = nd(JSON.parse(localStorage.getItem('towerIdle_emeralds')));
				totalEmeralds = nd(JSON.parse(localStorage.getItem('towerIdle_totalEmeralds')));
				sapphires = nd(JSON.parse(localStorage.getItem('towerIdle_sapphires')));
				totalSapphires = nd(JSON.parse(localStorage.getItem('towerIdle_totalSapphires')));
				magnets = nd(JSON.parse(localStorage.getItem('towerIdle_magnets')));
				totalMagnets = nd(JSON.parse(localStorage.getItem('towerIdle_totalMagnets')));
			}
			if (localStorage.getItem('towerIdle_upgrades')) {
				upgrades = JSON.parse(localStorage.getItem('towerIdle_upgrades'));
		
				for (var i = 0 ; i < upgrades.length ; ++i) {
					upgrades[i].baseCost = nd(upgrades[i].baseCost);
					upgrades[i].costInc = nd(upgrades[i].costInc);
					upgrades[i].nowCost = nd(upgrades[i].nowCost);
					upgrades[i].allCost = nd(upgrades[i].allCost);
				}
			}
			if (localStorage.getItem('towerIdle_gupgrades')) {
				gupgrades = JSON.parse(localStorage.getItem('towerIdle_gupgrades'));
				
				//gupgrades[31] = new goldenUpgrade(1, nd(1e42));
				
				for (var i = 0 ; i < gupgrades.length ; ++i) {
					gupgrades[i].baseCost = nd(gupgrades[i].baseCost);
					gupgrades[i].allCost = nd(gupgrades[i].allCost);
				}
			}
			if (localStorage.getItem('towerIdle_blockArray3')) {
				blockArray3 = JSON.parse(localStorage.getItem('towerIdle_blockArray3'));
				
				for (var i = 0 ; i < blockArray3.length ; ++i) {
					spawnS2Block(blockArray3[i]);
				}
			}
			if (localStorage.getItem('towerIdle_blockArray4')) {
				blockArray4 = JSON.parse(localStorage.getItem('towerIdle_blockArray4'));
				
				for (var i = 0 ; i < blockArray4.length ; ++i) {
					spawnS3Block(blockArray4[i]);
				}
			}
			if (localStorage.getItem('towerIdle_level')) {
				level = JSON.parse(localStorage.getItem('towerIdle_level'));
				xpNow = JSON.parse(localStorage.getItem('towerIdle_xpNow'));
				
			}
			if (localStorage.getItem('towerIdle_blockArray5')) {
				blockArray5 = JSON.parse(localStorage.getItem('towerIdle_blockArray5'));
				
				for (var i = 0 ; i < blockArray5.length ; ++i) {
					spawnS4Block(blockArray5[i]);
				}
			}
			if (localStorage.getItem('towerIdle_blockArray6')) {
				blockArray6 = JSON.parse(localStorage.getItem('towerIdle_blockArray6'));
				
				for (var i = 0 ; i < blockArray6.length ; ++i) {
					spawnS5Block(blockArray6[i]);
				}
			}
			if (localStorage.getItem('towerIdle_blockArray7')) {
				blockArray7 = JSON.parse(localStorage.getItem('towerIdle_blockArray7'));
				
				for (var i = 0 ; i < blockArray7.length ; ++i) {
					spawnS6Block(blockArray7[i]);
				}
			}
			if (localStorage.getItem('towerIdle_blockArray8')) {
				blockArray8 = JSON.parse(localStorage.getItem('towerIdle_blockArray8'));
				
				for (var i = 0 ; i < blockArray8.length ; ++i) {
					spawnS7Block(blockArray8[i]);
				}
			}
			if (localStorage.getItem('towerIdle_blockArray9')) {
				blockArray9 = JSON.parse(localStorage.getItem('towerIdle_blockArray9'));
				
				for (var i = 0 ; i < blockArray9.length ; ++i) {
					spawnS8Block(blockArray9[i]);
				}
			}
			if (localStorage.getItem('towerIdle_time1_ib')) {
				time1_ib = JSON.parse(localStorage.getItem('towerIdle_time1_ib'));
				speedUPtime_ib = JSON.parse(localStorage.getItem('towerIdle_speedUPtime_ib'));
			}
			if (localStorage.getItem('towerIdle_tutVis')) {
				tutVis = JSON.parse(localStorage.getItem('towerIdle_tutVis'));
			}
			if (localStorage.getItem('towerIdle_buyAmo')) {
				buyAmo = JSON.parse(localStorage.getItem('towerIdle_buyAmo'));
			}
			
		}
		
		loading();
		
		
		var bonus = time2_ib - time1_ib;
		var bonus = bonus/20;
		var bonus = Math.pow(bonus, 0.69);
		
		if (bonus >= 2) {
			speedUPtime_ib += bonus;
		}
		if (speedUPtime_ib > 1800) {
			speedUPtime_ib = 1800;
		}
		
		function saving() {
			localStorage.setItem('towerIdle_tick', JSON.stringify(tick));
			
			blockArray = [];
			blockArray2 = [];
			blockArray3 = [];
			blockArray4 = [];
			blockArray5 = [];
			blockArray6 = [];
			blockArray7 = [];
			blockArray8 = [];
			blockArray9 = [];
			
			if (mLength > 0) {
				blockArray.push(firstBlock.level);
			}
			for (var i = 1 ; i < mLength ; ++i) {
				var thisBlock = getBlock(i);
				blockArray.push(thisBlock.level);
			}
			
			if (mLength2 > 0) {
				blockArray2.push(firstBlock2.level);
			}
			for (var i = 1 ; i < mLength2 ; ++i) {
				var thisBlock = getBlock2(i);
				blockArray2.push(thisBlock.level);
			}
			
			if (mLength3 > 0) {
				blockArray3.push(firstBlock3.level);
			}
			for (var i = 1 ; i < mLength3 ; ++i) {
				var thisBlock = getBlock3(i);
				blockArray3.push(thisBlock.level);
			}
			
			if (mLength4 > 0) {
				blockArray4.push(firstBlock4.level);
			}
			for (var i = 1 ; i < mLength4 ; ++i) {
				var thisBlock = getBlock4(i);
				blockArray4.push(thisBlock.level);
			}
			
			if (mLength5 > 0) {
				blockArray5.push(firstBlock5.level);
			}
			for (var i = 1 ; i < mLength5 ; ++i) {
				var thisBlock = getBlock5(i);
				blockArray5.push(thisBlock.level);
			}
			
			if (mLength6 > 0) {
				blockArray6.push(firstBlock6.level);
			}
			for (var i = 1 ; i < mLength6 ; ++i) {
				var thisBlock = getBlock6(i);
				blockArray6.push(thisBlock.level);
			}
			
			if (mLength7 > 0) {
				blockArray7.push(firstBlock7.level);
			}
			for (var i = 1 ; i < mLength7 ; ++i) {
				var thisBlock = getBlock7(i);
				blockArray7.push(thisBlock.level);
			}
			
			if (mLength8 > 0) {
				blockArray8.push(firstBlock8.level);
			}
			for (var i = 1 ; i < mLength8 ; ++i) {
				var thisBlock = getBlock8(i);
				blockArray8.push(thisBlock.level);
			}
			
			if (mLength9 > 0) {
				blockArray9.push(firstBlock9.level);
			}
			for (var i = 1 ; i < mLength9 ; ++i) {
				var thisBlock = getBlock9(i);
				blockArray9.push(thisBlock.level);
			}
			
			localStorage.setItem('towerIdle_blockArray', JSON.stringify(blockArray));
			localStorage.setItem('towerIdle_blockArray2', JSON.stringify(blockArray2));
			localStorage.setItem('towerIdle_blockArray3', JSON.stringify(blockArray3));
			localStorage.setItem('towerIdle_blockArray4', JSON.stringify(blockArray4));
			localStorage.setItem('towerIdle_blockArray5', JSON.stringify(blockArray5));
			localStorage.setItem('towerIdle_blockArray6', JSON.stringify(blockArray6));
			localStorage.setItem('towerIdle_blockArray7', JSON.stringify(blockArray7));
			localStorage.setItem('towerIdle_blockArray8', JSON.stringify(blockArray8));
			localStorage.setItem('towerIdle_blockArray9', JSON.stringify(blockArray9));
			localStorage.setItem('towerIdle_money', JSON.stringify(money));
			localStorage.setItem('towerIdle_totalMoney', JSON.stringify(totalMoney));
			localStorage.setItem('towerIdle_gold', JSON.stringify(gold));
			localStorage.setItem('towerIdle_totalGold', JSON.stringify(totalGold));
			localStorage.setItem('towerIdle_emeralds', JSON.stringify(emeralds));
			localStorage.setItem('towerIdle_totalEmeralds', JSON.stringify(totalEmeralds));
			localStorage.setItem('towerIdle_sapphires', JSON.stringify(sapphires));
			localStorage.setItem('towerIdle_totalSapphires', JSON.stringify(totalSapphires));
			localStorage.setItem('towerIdle_magnets', JSON.stringify(magnets));
			localStorage.setItem('towerIdle_totalMagnets', JSON.stringify(totalMagnets));
			localStorage.setItem('towerIdle_upgrades', JSON.stringify(upgrades));
			localStorage.setItem('towerIdle_gupgrades', JSON.stringify(gupgrades));
			localStorage.setItem('towerIdle_level', JSON.stringify(level));
			localStorage.setItem('towerIdle_xpNow', JSON.stringify(xpNow));
			localStorage.setItem('towerIdle_time1_ib', JSON.stringify(time1_ib));
			localStorage.setItem('towerIdle_speedUPtime_ib', JSON.stringify(speedUPtime_ib));
			localStorage.setItem('towerIdle_tutVis', JSON.stringify(tutVis));
			localStorage.setItem('towerIdle_buyAmo', JSON.stringify(buyAmo));
			
			
			console.log("GAME SAVED");
		}
		
		
		var goldenMult = nd(1);
		var levMult = nd(1);
		var lBlockMult = nd(1);
		var mBlockMult = nd(1);
		var rBlockMult = nd(1);
		var eBlockMult = nd(1);
		var sBlockMult = nd(1);
		var recBlockMult = nd(1);
		
		var magMult = nd(1);
		var magDCh = 0;
		
		var spTowerMult = nd(1);
		
		var emMult = nd(1);
		var sapMult = nd(1);
		var emMult2 = nd(1);
		var sapMult2 = nd(1);
		
		var emMult_s = nd(1);
		var sapMult_s = nd(1);
		var emMult2_s = nd(1);
		var sapMult2_s = nd(1);
		
		var levToEm = nd(1);
		var levToEm_s = nd(1);
		
		var GBToSap = nd(1);
		var GBToSap_s = nd(1);
		
		var xpRank = 1;
		
		this.addEventListener("tick", main.bind(this));
		function main() {
			++fps2;
			time1_ib = d.getTime()/1000;
			
			if (mLength < maxH) {
				tick += 1/fps*timeMult;
			}
			
			if (tick >= maxTick) {
				
				var ticks = Math.floor(tick/maxTick);
				tick %= maxTick;
				
				for (var i = 0 ; i < ticks ; ++i) {
					var ss = Math.random();
					
					
					if (ss > spChance) {
						if (mLength < maxH) {
							spawnBlock(1+upgrades[1].level);
						}
					}
					else {
						var chance = Math.random();
					
						if (chance < schances[0]) {
							spawnS1Block(1);
						}
						else if (chance < schances[0] + schances[1]) {
							spawnS2Block(1);
						}
						else if (chance < schances[0] + schances[1] + schances[2]) {
							spawnS3Block(1);
						}
						else if (chance < schances[0] + schances[1] + schances[2] + schances[3]) {
							spawnS4Block(1);
						}
						else if (chance < schances[0] + schances[1] + schances[2] + schances[3] + schances[4]) {
							spawnS5Block(1);
						}
						else if (chance < schances[0] + schances[1] + schances[2] + schances[3] + schances[4] + schances[5]) {
							spawnS6Block(1);
						}
						else if (chance < schances[0] + schances[1] + schances[2] + schances[3] + schances[4] + schances[5] + schances[6]) {
							spawnS7Block(1);
						}
						else if (chance < schances[0] + schances[1] + schances[2] + schances[3] + schances[4] + schances[5] + schances[6] + schances[7]) {
							spawnS8Block(1);
						}
					}
					
				}
			}
			
			maxTick = 5 * Math.pow(0.95, upgrades[0].level);
			
			
			totalGain = nd(0);
			
			xpNext = (level+1)*10;
			levMult = nd(1.1).pow(level);
			
			for (var i = 0 ; i < mLength ; ++i) {
				totalGain = totalGain.plus(getBlock(i).gain);
			}
			
			totalMult = nd(1);
			for (var i = 0 ; i < mLength2 ; ++i) {
				totalMult = totalMult.plus(getBlock2(i).gain);
			}
			
			lBlockMult = nd(1);
			for (var i = 0 ; i < mLength4 ; ++i) {
				lBlockMult = lBlockMult.plus(getBlock4(i).gain);
			}
			
			mBlockMult = nd(1);
			for (var i = 0 ; i < mLength5 ; ++i) {
				mBlockMult = mBlockMult.plus(getBlock5(i).gain);
			}
			
			rBlockMult = nd(1);
			for (var i = 0 ; i < mLength6 ; ++i) {
				rBlockMult = rBlockMult.plus(getBlock6(i).gain);
			}
			
			eBlockMult = nd(1);
			for (var i = 0 ; i < mLength7 ; ++i) {
				eBlockMult = eBlockMult.plus(getBlock7(i).gain);
			}
			
			sBlockMult = nd(1);
			for (var i = 0 ; i < mLength8 ; ++i) {
				sBlockMult = sBlockMult.plus(getBlock8(i).gain);
			}
			
			recBlockMult = nd(1);
			for (var i = 0 ; i < mLength9 ; ++i) {
				recBlockMult = recBlockMult.plus(getBlock9(i).gain);
			}
			
			goldenMult = nd(1);
			for (var i = 0 ; i < mLength3 ; ++i) {
				goldenMult = goldenMult.times(getBlock3(i).gain);
			}
			
			spTowerMult = nd(1);
			if (mLength2 > 0) {
				spTowerMult = spTowerMult.times(1.2);
			}
			if (mLength3 > 0) {
				spTowerMult = spTowerMult.times(1.2);
			}
			if (mLength4 > 0) {
				spTowerMult = spTowerMult.times(1.2);
			}
			
			var goldMult = nd(1).plus(totalGold.div(100).times(gupgrades[3].level+1));
			
			magMult = nd(1.05).pow(upgrades[5].level);
			mChance = upgrades[4].level/100;
			
			
			
			emMult_s = emeralds.pow(0.5).div(10).plus(1);
			sapMult_s = sapphires.pow(0.5).div(10).plus(1);
			
			emMult2_s = emeralds.pow(0.4).div(100).plus(1);
			sapMult2_s = sapphires.pow(0.4).div(100).plus(1);
			
			
			levToEm_s = Math.pow((level/30), 2) + 1;
			GBToSap_s = totalGold.log(10).div(3).plus(1).toNumber();
			
			
			if (gupgrades[20].level >= 1) {
				emMult = emMult_s;
			}
			else {
				emMult = nd(1);
			}
			
			if (gupgrades[21].level >= 1) {
				sapMult = sapMult_s;
			}
			else {
				sapMult = nd(1);
			}
			
			if (gupgrades[22].level >= 1) {
				emMult2 = emMult2_s;
			}
			else {
				emMult2 = nd(1);
			}
			
			if (gupgrades[23].level >= 1) {
				sapMult2 = sapMult2_s;
			}
			else {
				sapMult2 = nd(1);
			}
			
			if (gupgrades[24].level >= 1) {
				levToEm = levToEm_s;
			}
			else {
				levToEm = nd(1);
			}
			
			if (gupgrades[25].level >= 1) {
				GBToSap = GBToSap_s;
			}
			else {
				GBToSap = nd(1);
			}
			
			
			income = totalGain.times(totalMult).times(goldMult).times(levMult).times(lBlockMult).times(magMult).times(spTowerMult).times(mBlockMult).times(rBlockMult).times(emMult).times(sapMult).times(eBlockMult).times(sBlockMult).times(recBlockMult);
			
			xpRank = 1 + (firstBlock != null ? firstBlock.level/100 : 0);
			
			
			this.cps.text = "/秒: " + format(income);
			this.coins.text = ": " + format(money.floor());
		
			
			this.gps.text = "/秒: " + format(gps);
			this.golds.text = ": " + format(gold.floor());
			
			
			this.ems.text = ": " + format(emeralds.floor());
			this.saps.text = ": " + format(sapphires.floor());
			
			this.goldenW.ems.text = ": " + format(emeralds.floor());
			this.goldenW.saps.text = ": " + format(sapphires.floor());
			
			this.mags.text = ": " + format(magnets.floor());
			
			this.eps.text = "/秒: " + Math.round(eps*100)/100;
			this.sps.text = "/秒: " + Math.round(sps*100)/100;
			this.mch.text = "ch.: " + Math.round(mChance*10000)/100 + "%";
			
			this.maxH.text = "最大高度: " + Math.round(maxH);
			
			this.spChance.text = "特殊几率: " + Math.round(spChance*10000)/100 + "%";
			
			if (gupgrades[28].level >= 1) {
				spChance= 0.01;
			}
			else {
				spChance= 0;
			}
			
			
			
			this.bar.gotoAndStop(Math.floor(99*tick/maxTick));
			
			if (tick > 1) {
				this.barP.text = Math.round(tick*10)/10 + " / " + Math.round(maxTick*10)/10
			}
			else {
				this.barP.text = Math.round(tick*100)/100 + " / " + Math.round(maxTick*100)/100
			}
			
			
			
			eps_t = (firstBlock != null ? Math.pow((firstBlock.level/100), 2) : 0) * levToEm;
			sps_t = Math.pow((totalMagnets/1000), 0.9) * GBToSap;
			
			
			
			if (gupgrades[18].level >= 1) {
				eps = eps_t;
			}
			else {
				eps = 0;
			}
			
			if (gupgrades[19].level >= 1) {
				sps = sps_t;
			}
			else {
				sps = 0;
			}
			
			
			emeralds = emeralds.plus(eps/fps*timeMult);
			sapphires = sapphires.plus(sps/fps*timeMult);
			
			
			//upgrades
		
			for (var i = 0 ; i < upgrades.length ; ++i) {
				if (i == 5 || i == 6) {
					upgrades[i].nowCost = upgrades[i].baseCost.plus(upgrades[i].costInc.times(upgrades[i].level));
					upgrades[i].allCost = upgrades[i].nowCost.times(buyAmos[i]).plus(upgrades[i].costInc.times(buyAmos[i]).times(buyAmos[i]).div(2)).sub(upgrades[i].costInc.times(buyAmos[i]).div(2));
				}
				else {
					upgrades[i].nowCost = upgrades[i].baseCost.times(upgrades[i].costInc.pow(upgrades[i].level));
					upgrades[i].allCost = (Decimal.pow(upgrades[i].costInc, buyAmos[i]).sub(1)).div((upgrades[i].costInc).sub(1)).times(upgrades[i].nowCost);
				}
			}
			
			this.u1.namee.text = "+5% 产生速度";
			this.u1.amo.text = Math.round(upgrades[0].level) + " / " + Math.round(upgrades[0].maxLevel) + " (+" + buyAmos[0] + ")";
			
			upgrades[0].maxLevel = 30 + gupgrades[0].level + gupgrades[10].level + gupgrades[30].level;
			
			if (upgrades[0].level >= upgrades[0].maxLevel) {
				this.u1.cost.text = "最大等级!";
			}
			else {
				this.u1.cost.text = "成本: " + format(upgrades[0].allCost) + " $";
			}
			
			
			this.u2.namee.text = "+1 基础段位";
			this.u2.amo.text = Math.round(upgrades[1].level) + " / " + Math.round(upgrades[1].maxLevel) + " (+" + buyAmos[1] + ")";
			
			if (upgrades[1].level >= upgrades[1].maxLevel) {
				this.u2.cost.text = "最大等级!";
			}
			else {
				this.u2.cost.text = "成本: " + format(upgrades[1].allCost) + " $";
			}
			
			
			this.u3.namee.text = "+1 最大高度";
			this.u3.amo.text = Math.round(upgrades[2].level) + " / " + Math.round(upgrades[2].maxLevel) + " (+" + buyAmos[2] + ")";
			
			if (upgrades[2].level >= upgrades[2].maxLevel) {
				this.u3.cost.text = "最大等级!";
			}
			else {
				this.u3.cost.text = "成本: " + format(upgrades[2].allCost) + " $";
			}
			
			
			this.u4.namee.text = "购买特殊";
			this.u4.amo.text = Math.round(upgrades[3].level) + " / " + Math.round(upgrades[3].maxLevel) + " (+" + buyAmos[3] + ")";
			
			if (upgrades[3].level >= upgrades[3].maxLevel) {
				this.u4.cost.text = "最大等级!";
			}
			else {
				this.u4.cost.text = "成本: " + format(upgrades[3].allCost) + " $";
			}
			
			
			this.u5.namee.text = "幸运磁铁 +1%";
			this.u5.amo.text = Math.round(upgrades[4].level) + " / " + Math.round(upgrades[4].maxLevel) + " (+" + buyAmos[4] + ")";
			
			if (upgrades[4].level >= upgrades[4].maxLevel) {
				this.u5.cost.text = "最大等级!";
			}
			else {
				this.u5.cost.text = "成本: " + format(upgrades[4].allCost) + " $";
			}
			
			
			this.u6.namee.text = "获得乘数 x" + format(magMult);
			this.u6.amo.text = Math.round(upgrades[5].level) + " / " + Math.round(upgrades[5].maxLevel) + " (+" + buyAmos[5] + ")";
			
			if (upgrades[5].level >= upgrades[5].maxLevel) {
				this.u6.cost.text = "最大等级!";
			}
			else {
				this.u6.cost.text = "成本: " + format(upgrades[5].allCost) + " Mg";
			}
			
			
			this.u7.namee.text = "双倍磁铁几率 +1%";
			this.u7.amo.text = Math.round(upgrades[6].level) + " / " + Math.round(upgrades[6].maxLevel) + " (+" + buyAmos[6] + ")";
			
			if (upgrades[6].level >= upgrades[6].maxLevel) {
				this.u7.cost.text = "最大等级!";
			}
			else {
				this.u7.cost.text = "成本: " + format(upgrades[6].allCost) + " Mg";
			}
			
			
			
			
			this.leve.text = Math.round(level);
			
			if (gupgrades[4].level > 0) {
				this.xpxp.text = format(nd(xpNow)) + " / " + format(nd(xpNext)) + " xp";
			}
			else {
				this.xpxp.text = "未解锁";
			}
			
			this.levBonus.text = "x" + format(levMult) + " 到 $ 增益";
			
			this.xpBar.gotoAndStop(Math.floor(99*xpNow/xpNext));
			
			
			if (xpNow >= xpNext) {
				xpNow -= xpNext;
				level += 1;
			}
			
			
			
			maxH = 5 + upgrades[2].level;
			
			money = money.plus(income.div(fps).times(timeMult));
			totalMoney = totalMoney.plus(income.div(fps).times(timeMult));
			
			
			//remove downs
			for (var i = 0 ; i < mLength-1 ; ++i) {
				var thisB = getBlock(i);
				if (thisB.level < thisB.next.level) {
					thisB.level = thisB.next.level;
				}
			}
			
			
			if (money.gte(income.times(1000000))) {
				money = income.times(1000000);
			}
			
			if (totalMoney.gte(income.times(1000000))) {
				totalMoney = income.times(1000000);
			}
			
			
			if (tutVis) {
				this.tutor.visible = true;
				stage.addChild(this.tutor);
			}
			else {
				this.tutor.visible = false;
			}
			
			
			//merging blocks
			
			
			//common
			for (var i = 1 ; i < mLength ; ++i) {
				var thisB = getBlock(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength ; ++i) {
				var thisB = getBlock(i);
				thisB.x = 385;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 525;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock(j).fallp;
					}
					thisB.tb.y = 0 - i*55 + 55*thisB.fallp + allShifts*55 + shiftY;
					thisB.y = 525;	
				}
				
				if (1+upgrades[1].level > thisB.level) {
					thisB.level = 1+upgrades[1].level;
				}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+9%10);
				
				thisB.gain = nd(3).pow(thisB.level-1);
			}
			
			
			
			
			if (totalMoney.lt(1e9) && totalGold.lt(1)) {
				this.treeLOC.visible = true;
				this.goldenTree.visible = false;
			}
			else {
				this.treeLOC.visible = false;
				this.goldenTree.visible = true;
			}
			
			
			
			
			
			
			//special 1
			
			
			for (var i = 1 ; i < mLength2 ; ++i) {
				var thisB = getBlock2(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
						
						if (gupgrades[11].level >= 1) {
							xpNow += 2 * (gupgrades[17].level > 0 ? xpRank : 1);
						}
						
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength2 -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength2 ; ++i) {
				var thisB = getBlock2(i);
				thisB.x = 648;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 535;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock2(j).fallp;
					}
					thisB.tb.y = 0 - i*41 + 41*thisB.fallp + allShifts*41 + shiftY;
					thisB.y = 535;	
				}
				
				//if (1+upgrades[1].level > thisB.level) {
				//	thisB.level = 1+upgrades[1].level;
				//}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+4%5);
				
				thisB.gain = softcap(nd(1.2).plus(nd(thisB.level).div(100))).pow(nd(2).pow(thisB.level - 1)).sub(1);
			}
			
			
			if (mLength2 == 0) {
				this.sp1.text = "???";
			}
			else {
				this.sp1.text = "批量";	
			}
			
			
			//special 2
			
			for (var i = 1 ; i < mLength3 ; ++i) {
				var thisB = getBlock3(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
						
						if (gupgrades[11].level >= 1) {
							xpNow += 2 * (gupgrades[17].level > 0 ? xpRank : 1);
						}
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength3 -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength3 ; ++i) {
				var thisB = getBlock3(i);
				thisB.x = 690;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 535;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock3(j).fallp;
					}
					thisB.tb.y = 0 - i*41 + 41*thisB.fallp + allShifts*41 + shiftY;
					thisB.y = 535;	
				}
				
				//if (1+upgrades[1].level > thisB.level) {
				//	thisB.level = 1+upgrades[1].level;
				//}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+4%5);
				
				thisB.gain = softcap(nd(1.1).plus(nd(thisB.level).div(100))).pow(nd(2).pow(thisB.level - 1));
			}
			
			
			if (mLength3 == 0) {
				this.sp2.text = "???";
			}
			else {
				this.sp2.text = "黄金";	
			}
			
			
			
			//special 3
			
			for (var i = 1 ; i < mLength4 ; ++i) {
				var thisB = getBlock4(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
						
						if (gupgrades[11].level >= 1) {
							xpNow += 2 * (gupgrades[17].level > 0 ? xpRank : 1);
						}
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength4 -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength4 ; ++i) {
				var thisB = getBlock4(i);
				thisB.x = 732;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 535;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock4(j).fallp;
					}
					thisB.tb.y = 0 - i*41 + 41*thisB.fallp + allShifts*41 + shiftY;
					thisB.y = 535;	
				}
				
				//if (1+upgrades[1].level > thisB.level) {
				//	thisB.level = 1+upgrades[1].level;
				//}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+4%5);
				
				thisB.gain = softcap(nd(1.1).plus(nd(level).pow(0.5).div(100))).pow(nd(2).pow(thisB.level - 1)).sub(1);
			}
			
			
			if (mLength4 == 0) {
				this.sp3.text = "???";
			}
			else {
				this.sp3.text = "段位";	
			}
			
			
			
			//special 4
			
			for (var i = 1 ; i < mLength5 ; ++i) {
				var thisB = getBlock5(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
						
						if (gupgrades[11].level >= 1) {
							xpNow += 2 * (gupgrades[17].level > 0 ? xpRank : 1);
						}
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength5 -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength5 ; ++i) {
				var thisB = getBlock5(i);
				thisB.x = 774;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 535;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock5(j).fallp;
					}
					thisB.tb.y = 0 - i*41 + 41*thisB.fallp + allShifts*41 + shiftY;
					thisB.y = 535;	
				}
				
				//if (1+upgrades[1].level > thisB.level) {
				//	thisB.level = 1+upgrades[1].level;
				//}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+4%5);
				
				thisB.gain = softcap(nd(1.1).plus(totalMagnets.pow(0.3).div(100))).pow(nd(2).pow(thisB.level - 1)).sub(1);
			}
			
			
			if (mLength5 == 0) {
				this.sp4.text = "???";
			}
			else {
				this.sp4.text = "磁铁";	
			}
			
			
			
			//special 5
			
			for (var i = 1 ; i < mLength6 ; ++i) {
				var thisB = getBlock6(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
						
						if (gupgrades[11].level >= 1) {
							xpNow += 2 * (gupgrades[17].level > 0 ? xpRank : 1);
						}
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength6 -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength6 ; ++i) {
				var thisB = getBlock6(i);
				thisB.x = 816;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 535;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock6(j).fallp;
					}
					thisB.tb.y = 0 - i*41 + 41*thisB.fallp + allShifts*41 + shiftY;
					thisB.y = 535;	
				}
				
				//if (1+upgrades[1].level > thisB.level) {
				//	thisB.level = 1+upgrades[1].level;
				//}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+4%5);
				
				var fLevel = 1;
				
				if (firstBlock != null) {
					fLevel = firstBlock.level
				}
				
				
				thisB.gain = softcap(nd(1.1).plus(nd(fLevel).pow(0.9).div(1000))).pow(nd(2).pow(thisB.level - 1)).sub(1);
			}
			
			
			if (mLength6 == 0) {
				this.sp5.text = "???";
			}
			else {
				this.sp5.text = "段位";	
			}
			
			
			
			//special 6
			
			for (var i = 1 ; i < mLength7 ; ++i) {
				var thisB = getBlock7(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
						
						if (gupgrades[11].level >= 1) {
							xpNow += 2 * (gupgrades[17].level > 0 ? xpRank : 1);
						}
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength7 -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength7 ; ++i) {
				var thisB = getBlock7(i);
				thisB.x = 858;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 535;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock7(j).fallp;
					}
					thisB.tb.y = 0 - i*41 + 41*thisB.fallp + allShifts*41 + shiftY;
					thisB.y = 535;	
				}
				
				//if (1+upgrades[1].level > thisB.level) {
				//	thisB.level = 1+upgrades[1].level;
				//}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+4%5);
				
				
				thisB.gain = softcap(nd(1.1).plus(nd(emeralds).pow(0.85).div(100000))).pow(nd(2).pow(thisB.level - 1)).sub(1);
			}
			
			
			if (mLength7 == 0) {
				this.sp6.text = "???";
			}
			else {
				this.sp6.text = "名称";	
			}
			
			
			
			//special 7
			
			for (var i = 1 ; i < mLength8 ; ++i) {
				var thisB = getBlock8(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
						
						if (gupgrades[11].level >= 1) {
							xpNow += 2 * (gupgrades[17].level > 0 ? xpRank : 1);
						}
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength8 -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength8 ; ++i) {
				var thisB = getBlock8(i);
				thisB.x = 900;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 535;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock8(j).fallp;
					}
					thisB.tb.y = 0 - i*41 + 41*thisB.fallp + allShifts*41 + shiftY;
					thisB.y = 535;	
				}
				
				//if (1+upgrades[1].level > thisB.level) {
				//	thisB.level = 1+upgrades[1].level;
				//}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+4%5);
				
				
				
				thisB.gain = softcap(nd(1.1).plus(nd(sapphires).pow(0.85).div(100000))).pow(nd(2).pow(thisB.level - 1)).sub(1);
			}
			
			
			if (mLength8 == 0) {
				this.sp7.text = "???";
			}
			else {
				this.sp7.text = "蓝宝石";	
			}
			
			//special 8
			
			for (var i = 1 ; i < mLength9 ; ++i) {
				var thisB = getBlock9(i);
				if (thisB.level == thisB.prev.level && thisB.prev.fall == false) {
					thisB.fall = true;
				}
				if (thisB.fall == true) {
					if (thisB.fallp < 1) {
						thisB.fallp += thisB.grav;
						thisB.grav += 0.0025 / fps * timeMult * 30 * (1 + gupgrades[2].level*0.1) * (gupgrades[12].level >= 1 ? 2 : 1) * (gupgrades[31].level >= 1 ? 5 : 1);
					}
					else {
						thisB.fallp = 1;
					}
				}
				
				
				if (thisB.fallp >= 1) {
					thisB.prev.level += 1;
					if (gupgrades[4].level >= 1) {
						xpNow += 1 * (gupgrades[17].level > 0 ? xpRank : 1);
						
						if (gupgrades[11].level >= 1) {
							xpNow += 2 * (gupgrades[17].level > 0 ? xpRank : 1);
						}
					}
					
					var chanceofM = Math.random();
					var chanceofM2 = Math.random();
					if (chanceofM <= mChance) {
						magnets = magnets.plus(1);
						totalMagnets = totalMagnets.plus(1);
						if (chanceofM2 <= magDCh) {
							magnets = magnets.plus(1);
							totalMagnets = totalMagnets.plus(1);
						}
					}
					
					if (thisB.next != null) {
						thisB.next.prev = thisB.prev;
					}
					thisB.prev.next = thisB.next;
					stage.removeChild(thisB);
					mLength9 -= 1;
				}
				
			}
			
			for (var i = 0 ; i < mLength9 ; ++i) {
				var thisB = getBlock9(i);
				thisB.x = 943;
				if (i == 0) {
					thisB.tb.y = 0 + shiftY;
					thisB.y = 535;	
				}
				else {
					var allShifts = 0;
					for (var j = 0 ; j < i ; ++j) {
						allShifts += getBlock9(j).fallp;
					}
					thisB.tb.y = 0 - i*41 + 41*thisB.fallp + allShifts*41 + shiftY;
					thisB.y = 535;	
				}
				
				//if (1+upgrades[1].level > thisB.level) {
				//	thisB.level = 1+upgrades[1].level;
				//}
				
				thisB.tb.lev.text = "" + thisB.level;
				thisB.tb.gotoAndStop(thisB.level+4%5);
				
				
				
				thisB.gain = softcap(nd(1.1).plus(totalMoney.log(10).pow(0.9).div(100))).pow(nd(2).pow(thisB.level - 1)).sub(1);
			}
			
			
			if (mLength9 == 0) {
				this.sp8.text = "???";
			}
			else {
				this.sp8.text = "递归";	
			}
			
			
			
			
			
			this.ground.sky.y = -1225 + shiftY;
		
			
			
			if (goUPt) {
				if (shiftY < 2930) {
					shiftY += 20;
				}
				else {
					shiftY = 2930;
				}
			}
			
			if (goDOWNt) {
				if (shiftY > 30) {
					shiftY -= 20;
				}
				else {
					shiftY = 30;
				}
			}
			
			if (shiftY < 30) shiftY = 30;
			if (shiftY > 2930) shiftY = 2930;
			
			this.scroller.y = 594 - (shiftY-30)*0.133
			this.goldenW.scroller.y = 262 + (gupgShift)*0.133
			
			if (scrollmake) {
				shiftY = Math.max(30, Math.min((-mousePosY + 594)*7.45 + 30, 2930));
			}
			
			if (scrollmake2) {
				gupgShift = Math.max(0, Math.min((mousePosY - 262)*7.45, 2420));
			}
			
			if (blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = blockH.x + blockH.tb.x + 110;
				this.hoverBlock.y = blockH.y + blockH.tb.y;
				this.hoverBlock.inc.text = format(blockH.gain.times(totalMult).times(goldMult).times(levMult).times(lBlockMult).times(magMult).times(spTowerMult).times(mBlockMult).times(rBlockMult).times(emMult).times(sapMult).times(eBlockMult).times(sBlockMult).times(recBlockMult)) + " $/s";
				stage.addChild(this.hoverBlock);
			}
			else if (S1blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = S1blockH.x + S1blockH.tb.x + 110;
				this.hoverBlock.y = S1blockH.y + S1blockH.tb.y;
				this.hoverBlock.inc.text = "+" + format(S1blockH.gain) ;
				stage.addChild(this.hoverBlock);
			}
			else if (S2blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = S2blockH.x + S2blockH.tb.x + 110;
				this.hoverBlock.y = S2blockH.y + S2blockH.tb.y;
				this.hoverBlock.inc.text = "x" + format(S2blockH.gain) ;
				stage.addChild(this.hoverBlock);
			}
			else if (S3blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = S3blockH.x + S3blockH.tb.x + 110;
				this.hoverBlock.y = S3blockH.y + S3blockH.tb.y;
				this.hoverBlock.inc.text = "+" + format(S3blockH.gain) ;
				stage.addChild(this.hoverBlock);
			}
			else if (S4blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = S4blockH.x + S4blockH.tb.x + 110;
				this.hoverBlock.y = S4blockH.y + S4blockH.tb.y;
				this.hoverBlock.inc.text = "+" + format(S4blockH.gain) ;
				stage.addChild(this.hoverBlock);
			}
			else if (S5blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = S5blockH.x + S5blockH.tb.x + 110;
				this.hoverBlock.y = S5blockH.y + S5blockH.tb.y;
				this.hoverBlock.inc.text = "+" + format(S5blockH.gain) ;
				stage.addChild(this.hoverBlock);
			}
			else if (S6blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = S6blockH.x + S6blockH.tb.x + 110;
				this.hoverBlock.y = S6blockH.y + S6blockH.tb.y;
				this.hoverBlock.inc.text = "+" + format(S6blockH.gain) ;
				stage.addChild(this.hoverBlock);
			}
			else if (S7blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = S7blockH.x + S7blockH.tb.x + 110;
				this.hoverBlock.y = S7blockH.y + S7blockH.tb.y;
				this.hoverBlock.inc.text = "+" + format(S7blockH.gain) ;
				stage.addChild(this.hoverBlock);
			}
			else if (S8blockHovered) {
				this.hoverBlock.visible = true;
				this.hoverBlock.x = S8blockH.x + S8blockH.tb.x + 110;
				this.hoverBlock.y = S8blockH.y + S8blockH.tb.y;
				this.hoverBlock.inc.text = "+" + format(S8blockH.gain) ;
				stage.addChild(this.hoverBlock);
			}
			else {
				this.hoverBlock.visible = false;
			}
			
			this.goldenW.inner.gu.y = 252 - gupgShift;
			
			
			if (gupgrades[6].level < 1) {
				this.u5.visible = false;
				this.u6.visible = false;
				this.u7.visible = false;
			}
			else {
				this.u5.visible = true;
				this.u6.visible = true;
				this.u7.visible = true;
			}
			
		}
		
		
		var schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		
		
		
		this.addEventListener("tick", golden.bind(this));
		function golden() {
			
			if (this.goldenW.visible) {
				stage.addChild(this.goldenW);
			}
			
			goldGain = totalMoney.div(1e6).pow(0.3);
			
			//first softcap
			if (goldGain.gt(1e9)) {
				goldGain = goldGain.div(1e9).pow(0.5).times(1e9);
			}
			//second softcap
			if (goldGain.gt(1e12)) {
				goldGain = goldGain.div(1e12).pow(0.6).times(1e12);
			}
			
			goldGain = goldGain.times(goldenMult);
			if (gupgrades[7].level > 0) {
				goldGain = goldGain.times(1.5);
			}
			if (gupgrades[8].level > 0) {
				goldGain = goldGain.times(nd(1).plus(nd(level).times(0.05)));
			}
			if (gupgrades[9].level > 0) {
				goldGain = goldGain.times(nd(1).plus(totalMagnets.times(0.005)));
			}
			if (gupgrades[13].level > 0 && firstBlock != null) {
				goldGain = goldGain.times(nd(firstBlock.level/10 + 1));
			}
			goldGain = goldGain.times(emMult2).times(sapMult2);
			
			
			this.goldenW.gbNow.text = "你有 " + format(gold.floor()) + " 金色块";
			this.goldenW.gbAP.text = "你会获得 " + format(goldGain.floor()) + " 在声望后";
			this.goldenW.GBAT.text = "总计 GB: " + format(totalGold.floor()) + " (x" + format(nd(1).plus(totalGold.div(100).times(gupgrades[3].level+1))) + ")";
			
			
			//golden upgrades
			
			for (var i = 0 ; i < gupgrades.length ; ++i) {
				gupgrades[i].allCost = gupgrades[i].baseCost;
			}
			
			
			
			
			
			this.goldenW.inner.gu.gu1.namee.text = "+1 最大产生速度升级";
			this.goldenW.inner.gu.gu1.amo.text = Math.round(gupgrades[0].level) + " / " + Math.round(gupgrades[0].maxLevel) + " (+1)";
			
			if (gupgrades[0].level >= gupgrades[0].maxLevel) {
				this.goldenW.inner.gu.gu1.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu1.cost.text = "成本: " + format(gupgrades[0].allCost) + " GB";
			}
			
			this.goldenW.inner.gu.gu1.isAvaible.gotoAndStop(1);
			
			
			
			this.goldenW.inner.gu.gu2.namee.text = "解锁金色塔";
			this.goldenW.inner.gu.gu2.amo.text = Math.round(gupgrades[1].level) + " / " + Math.round(gupgrades[1].maxLevel) + " (+1)";
			
			if (gupgrades[1].level >= gupgrades[1].maxLevel) {
				this.goldenW.inner.gu.gu2.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu2.cost.text = "成本: " + format(gupgrades[1].allCost) + " GB";
			}
			
			if (gupgrades[0].level > 0) {
				this.goldenW.inner.gu.gu2.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu2.isAvaible.gotoAndStop(0);
			}
			
			
			
			this.goldenW.inner.gu.gu3.namee.text = "下降速度 +10%";
			this.goldenW.inner.gu.gu3.amo.text = Math.round(gupgrades[2].level) + " / " + Math.round(gupgrades[2].maxLevel) + " (+1)";
			
			if (gupgrades[2].level >= gupgrades[2].maxLevel) {
				this.goldenW.inner.gu.gu3.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu3.cost.text = "成本: " + format(gupgrades[2].allCost) + " GB";
			}
			
			if (gupgrades[1].level > 0) {
				this.goldenW.inner.gu.gu3.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu3.isAvaible.gotoAndStop(0);
			}
			
			
			
			this.goldenW.inner.gu.gu4.namee.text = "乘数 每 GB +1%";
			this.goldenW.inner.gu.gu4.amo.text = Math.round(gupgrades[3].level) + " / " + Math.round(gupgrades[3].maxLevel) + " (+1)";
			
			if (gupgrades[3].level >= gupgrades[3].maxLevel) {
				this.goldenW.inner.gu.gu4.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu4.cost.text = "成本: " + format(gupgrades[3].allCost) + " GB";
			}
			
			if (gupgrades[1].level > 0) {
				this.goldenW.inner.gu.gu4.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu4.isAvaible.gotoAndStop(0);
			}
			
			
			
			this.goldenW.inner.gu.gu5.namee.text = "解锁升级";
			this.goldenW.inner.gu.gu5.amo.text = Math.round(gupgrades[4].level) + " / " + Math.round(gupgrades[4].maxLevel) + " (+1)";
			
			if (gupgrades[4].level >= gupgrades[4].maxLevel) {
				this.goldenW.inner.gu.gu5.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu5.cost.text = "成本: " + format(gupgrades[4].allCost) + " GB";
			}
			
			if (gupgrades[2].level > 0 && gupgrades[3].level > 0) {
				this.goldenW.inner.gu.gu5.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu5.isAvaible.gotoAndStop(0);
			}
			
			
			
			this.goldenW.inner.gu.gu6.namee.text = "解锁升级块";
			this.goldenW.inner.gu.gu6.amo.text = Math.round(gupgrades[5].level) + " / " + Math.round(gupgrades[5].maxLevel) + " (+1)";
			
			if (gupgrades[5].level >= gupgrades[5].maxLevel) {
				this.goldenW.inner.gu.gu6.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu6.cost.text = "成本: " + format(gupgrades[5].allCost) + " GB";
			}
			
			if (gupgrades[4].level > 0) {
				this.goldenW.inner.gu.gu6.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu6.isAvaible.gotoAndStop(0);
			}
			
			
			
			this.goldenW.inner.gu.gu7.namee.text = "解锁磁铁和新升级";
			this.goldenW.inner.gu.gu7.amo.text = Math.round(gupgrades[6].level) + " / " + Math.round(gupgrades[6].maxLevel) + " (+1)";
			
			if (gupgrades[6].level >= gupgrades[6].maxLevel) {
				this.goldenW.inner.gu.gu7.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu7.cost.text = "成本: " + format(gupgrades[6].allCost) + " GB";
			}
			
			if (gupgrades[4].level > 0) {
				this.goldenW.inner.gu.gu7.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu7.isAvaible.gotoAndStop(0);
			}
			
			
			
			this.goldenW.inner.gu.gu8.namee.text = "金色块增益 +50%";
			this.goldenW.inner.gu.gu8.amo.text = Math.round(gupgrades[7].level) + " / " + Math.round(gupgrades[7].maxLevel) + " (+1)";
			
			if (gupgrades[7].level >= gupgrades[7].maxLevel) {
				this.goldenW.inner.gu.gu8.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu8.cost.text = "成本: " + format(gupgrades[7].allCost) + " GB";
			}
			
			if (gupgrades[4].level > 0) {
				this.goldenW.inner.gu.gu8.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu8.isAvaible.gotoAndStop(0);
			}
			
			
			
			this.goldenW.inner.gu.gu9.namee.text = "+GB 基于等级 (x" + format(nd(1).plus(nd(level).times(0.05))) + ")";
			this.goldenW.inner.gu.gu9.amo.text = Math.round(gupgrades[8].level) + " / " + Math.round(gupgrades[8].maxLevel) + " (+1)";
			
			if (gupgrades[8].level >= gupgrades[8].maxLevel) {
				this.goldenW.inner.gu.gu9.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu9.cost.text = "成本: " + format(gupgrades[8].allCost) + " GB";
			}
			
			if (gupgrades[5].level > 0) {
				this.goldenW.inner.gu.gu9.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu9.isAvaible.gotoAndStop(0);
			}
			
			
			
			
			this.goldenW.inner.gu.gu10.namee.text = "+GB 基于 t.Mg. (x" + format(nd(1).plus(totalMagnets.times(0.005))) + ")";
			this.goldenW.inner.gu.gu10.amo.text = Math.round(gupgrades[9].level) + " / " + Math.round(gupgrades[9].maxLevel) + " (+1)";
			
			if (gupgrades[9].level >= gupgrades[9].maxLevel) {
				this.goldenW.inner.gu.gu10.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu10.cost.text = "成本: " + format(gupgrades[9].allCost) + " GB";
			}
			
			if (gupgrades[6].level > 0) {
				this.goldenW.inner.gu.gu10.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu10.isAvaible.gotoAndStop(0);
			}
			
			
			
			this.goldenW.inner.gu.gu11.namee.text = "+1 最大产生速度升级";
			this.goldenW.inner.gu.gu11.amo.text = Math.round(gupgrades[10].level) + " / " + Math.round(gupgrades[10].maxLevel) + " (+1)";
			
			if (gupgrades[10].level >= gupgrades[10].maxLevel) {
				this.goldenW.inner.gu.gu11.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu11.cost.text = "成本: " + format(gupgrades[10].allCost) + " GB";
			}
			
			if (gupgrades[7].level > 0) {
				this.goldenW.inner.gu.gu11.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu11.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu12.namee.text = "特殊块合并给予 x3 经验";
			this.goldenW.inner.gu.gu12.amo.text = Math.round(gupgrades[11].level) + " / " + Math.round(gupgrades[11].maxLevel) + " (+1)";
			
			if (gupgrades[11].level >= gupgrades[11].maxLevel) {
				this.goldenW.inner.gu.gu12.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu12.cost.text = "成本: " + format(gupgrades[11].allCost) + " GB";
			}
			
			if (gupgrades[8].level > 0 && gupgrades[10].level > 0) {
				this.goldenW.inner.gu.gu12.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu12.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu13.namee.text = "下降速度 x2";
			this.goldenW.inner.gu.gu13.amo.text = Math.round(gupgrades[12].level) + " / " + Math.round(gupgrades[12].maxLevel) + " (+1)";
			
			if (gupgrades[12].level >= gupgrades[12].maxLevel) {
				this.goldenW.inner.gu.gu13.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu13.cost.text = "成本: " + format(gupgrades[12].allCost) + " GB";
			}
			
			if (gupgrades[9].level > 0 && gupgrades[10].level > 0) {
				this.goldenW.inner.gu.gu13.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu13.isAvaible.gotoAndStop(0);
			}
			
			if (firstBlock != null) {
				this.goldenW.inner.gu.gu14.namee.text = "GB 增益乘数基于最高段位: x" + format(nd(firstBlock.level/10 + 1));
			}
			else {
				this.goldenW.inner.gu.gu14.namee.text = "GB 增益乘数基于最高段位: x1";
			}
			this.goldenW.inner.gu.gu14.amo.text = Math.round(gupgrades[13].level) + " / " + Math.round(gupgrades[13].maxLevel) + " (+1)";
			
			if (gupgrades[13].level >= gupgrades[13].maxLevel) {
				this.goldenW.inner.gu.gu14.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu14.cost.text = "成本: " + format(gupgrades[13].allCost) + " GB";
			}
			
			if (gupgrades[11].level > 0) {
				this.goldenW.inner.gu.gu14.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu14.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu15.namee.text = "x1.2 到增益每个特殊塔";
			this.goldenW.inner.gu.gu15.amo.text = Math.round(gupgrades[14].level) + " / " + Math.round(gupgrades[14].maxLevel) + " (+1)";
			
			if (gupgrades[14].level >= gupgrades[14].maxLevel) {
				this.goldenW.inner.gu.gu15.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu15.cost.text = "成本: " + format(gupgrades[14].allCost) + " GB";
			}
			
			if (gupgrades[12].level > 0) {
				this.goldenW.inner.gu.gu15.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu15.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu16.namee.text = "解锁磁铁塔";
			this.goldenW.inner.gu.gu16.amo.text = Math.round(gupgrades[15].level) + " / " + Math.round(gupgrades[15].maxLevel) + " (+1)";
			
			if (gupgrades[15].level >= gupgrades[15].maxLevel) {
				this.goldenW.inner.gu.gu16.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu16.cost.text = "成本: " + format(gupgrades[15].allCost) + " GB";
			}
			
			if (gupgrades[13].level > 0) {
				this.goldenW.inner.gu.gu16.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu16.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu17.namee.text = "解锁段位塔";
			this.goldenW.inner.gu.gu17.amo.text = Math.round(gupgrades[16].level) + " / " + Math.round(gupgrades[16].maxLevel) + " (+1)";
			
			if (gupgrades[16].level >= gupgrades[16].maxLevel) {
				this.goldenW.inner.gu.gu17.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu17.cost.text = "成本: " + format(gupgrades[16].allCost) + " GB";
			}
			
			if (gupgrades[14].level > 0) {
				this.goldenW.inner.gu.gu17.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu17.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu18.namee.text = "更多经验基于段位: x" + Math.round(xpRank*100)/100;
			this.goldenW.inner.gu.gu18.amo.text = Math.round(gupgrades[17].level) + " / " + Math.round(gupgrades[17].maxLevel) + " (+1)";
			
			if (gupgrades[17].level >= gupgrades[17].maxLevel) {
				this.goldenW.inner.gu.gu18.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu18.cost.text = "成本: " + format(gupgrades[17].allCost) + " GB";
			}
			
			if (gupgrades[15].level > 0 && gupgrades[16].level > 0) {
				this.goldenW.inner.gu.gu18.isAvaible.gotoAndStop(1);
			}
			else {
				this.goldenW.inner.gu.gu18.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu19.namee.text = "翡翠/秒 基于最大层: " + Math.round(eps_t*100)/100 + "/s";
			this.goldenW.inner.gu.gu19.amo.text = Math.round(gupgrades[18].level) + " / " + Math.round(gupgrades[18].maxLevel) + " (+1)";
			
			if (gupgrades[18].level >= gupgrades[18].maxLevel) {
				this.goldenW.inner.gu.gu19.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu19.cost.text = "成本: " + format(gupgrades[18].allCost) + " GB";
			}
			
			if (gupgrades[17].level > 0) {
				this.goldenW.inner.gu.gu19.isAvaible.gotoAndStop(2);
			}
			else {
				this.goldenW.inner.gu.gu19.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu20.namee.text = "基于所有磁铁的蓝宝石/秒: " + Math.round(sps_t*100)/100 + "/s";
			this.goldenW.inner.gu.gu20.amo.text = Math.round(gupgrades[19].level) + " / " + Math.round(gupgrades[19].maxLevel) + " (+1)";
			
			if (gupgrades[19].level >= gupgrades[19].maxLevel) {
				this.goldenW.inner.gu.gu20.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu20.cost.text = "成本: " + format(gupgrades[19].allCost) + " GB";
			}
			
			if (gupgrades[17].level > 0) {
				this.goldenW.inner.gu.gu20.isAvaible.gotoAndStop(3); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu20.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu21.namee.text = "Emeralds boost $ gain: x" + format(emMult_s);
			this.goldenW.inner.gu.gu21.amo.text = Math.round(gupgrades[20].level) + " / " + Math.round(gupgrades[20].maxLevel) + " (+1)";
			
			if (gupgrades[20].level >= gupgrades[20].maxLevel) {
				this.goldenW.inner.gu.gu21.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu21.cost.text = "成本: " + format(gupgrades[20].allCost) + " E";
			}
			
			if (gupgrades[18].level > 0) {
				this.goldenW.inner.gu.gu21.isAvaible.gotoAndStop(2); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu21.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu22.namee.text = "蓝宝石提升 $ 增益: x" + format(sapMult_s);
			this.goldenW.inner.gu.gu22.amo.text = Math.round(gupgrades[21].level) + " / " + Math.round(gupgrades[21].maxLevel) + " (+1)";
			
			if (gupgrades[21].level >= gupgrades[21].maxLevel) {
				this.goldenW.inner.gu.gu22.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu22.cost.text = "成本: " + format(gupgrades[21].allCost) + " S";
			}
			
			if (gupgrades[19].level > 0) {
				this.goldenW.inner.gu.gu22.isAvaible.gotoAndStop(3); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu22.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu23.namee.text = "翡翠增加 GB 增益: x" + format(emMult2_s);
			this.goldenW.inner.gu.gu23.amo.text = Math.round(gupgrades[22].level) + " / " + Math.round(gupgrades[22].maxLevel) + " (+1)";
			
			if (gupgrades[22].level >= gupgrades[22].maxLevel) {
				this.goldenW.inner.gu.gu23.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu23.cost.text = "成本: " + format(gupgrades[22].allCost) + " E";
			}
			
			if (gupgrades[20].level > 0) {
				this.goldenW.inner.gu.gu23.isAvaible.gotoAndStop(2); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu23.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu24.namee.text = "蓝宝石提高 GB 增益: x" + format(sapMult2_s);
			this.goldenW.inner.gu.gu24.amo.text = Math.round(gupgrades[23].level) + " / " + Math.round(gupgrades[23].maxLevel) + " (+1)";
			
			if (gupgrades[23].level >= gupgrades[23].maxLevel) {
				this.goldenW.inner.gu.gu24.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu24.cost.text = "成本: " + format(gupgrades[23].allCost) + " S";
			}
			
			if (gupgrades[21].level > 0) {
				this.goldenW.inner.gu.gu24.isAvaible.gotoAndStop(3); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu24.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu25.namee.text = "等级提升翡翠增益: x" + format(nd(levToEm_s));
			this.goldenW.inner.gu.gu25.amo.text = Math.round(gupgrades[24].level) + " / " + Math.round(gupgrades[24].maxLevel) + " (+1)";
			
			if (gupgrades[24].level >= gupgrades[24].maxLevel) {
				this.goldenW.inner.gu.gu25.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu25.cost.text = "成本: " + format(gupgrades[24].allCost) + " E";
			}
			
			if (gupgrades[22].level > 0) {
				this.goldenW.inner.gu.gu25.isAvaible.gotoAndStop(2); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu25.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu26.namee.text = "GB 提升蓝宝石增益: x" + format(nd(GBToSap_s));
			this.goldenW.inner.gu.gu26.amo.text = Math.round(gupgrades[25].level) + " / " + Math.round(gupgrades[25].maxLevel) + " (+1)";
			
			if (gupgrades[25].level >= gupgrades[25].maxLevel) {
				this.goldenW.inner.gu.gu26.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu26.cost.text = "成本: " + format(gupgrades[25].allCost) + " S";
			}
			
			if (gupgrades[23].level > 0) {
				this.goldenW.inner.gu.gu26.isAvaible.gotoAndStop(3); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu26.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu27.namee.text = "Unlocks Emerald Tower";
			this.goldenW.inner.gu.gu27.amo.text = Math.round(gupgrades[24].level) + " / " + Math.round(gupgrades[24].maxLevel) + " (+1)";
			
			if (gupgrades[26].level >= gupgrades[26].maxLevel) {
				this.goldenW.inner.gu.gu27.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu27.cost.text = "成本: " + format(gupgrades[26].allCost) + " E";
			}
			
			if (gupgrades[24].level > 0) {
				this.goldenW.inner.gu.gu27.isAvaible.gotoAndStop(2); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu27.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu28.namee.text = "Unlocks Sapphire Tower";
			this.goldenW.inner.gu.gu28.amo.text = Math.round(gupgrades[27].level) + " / " + Math.round(gupgrades[27].maxLevel) + " (+1)";
			
			if (gupgrades[27].level >= gupgrades[27].maxLevel) {
				this.goldenW.inner.gu.gu28.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu28.cost.text = "成本: " + format(gupgrades[27].allCost) + " S";
			}
			
			if (gupgrades[25].level > 0) {
				this.goldenW.inner.gu.gu28.isAvaible.gotoAndStop(3); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu28.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu29.namee.text = "Special Chance = 1%";
			this.goldenW.inner.gu.gu29.amo.text = Math.round(gupgrades[28].level) + " / " + Math.round(gupgrades[28].maxLevel) + " (+1)";
			
			if (gupgrades[28].level >= gupgrades[28].maxLevel) {
				this.goldenW.inner.gu.gu29.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu29.cost.text = "成本: " + format(gupgrades[28].allCost) + " GB";
			}
			
			if (gupgrades[26].level > 0 && gupgrades[27].level > 0) {
				this.goldenW.inner.gu.gu29.isAvaible.gotoAndStop(1); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu29.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu30.namee.text = "Unlocks Recursion Tower";
			this.goldenW.inner.gu.gu30.amo.text = Math.round(gupgrades[29].level) + " / " + Math.round(gupgrades[29].maxLevel) + " (+1)";
			
			if (gupgrades[29].level >= gupgrades[29].maxLevel) {
				this.goldenW.inner.gu.gu30.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu30.cost.text = "成本: " + format(gupgrades[29].allCost) + " GB";
			}
			
			if (gupgrades[28].level > 0) {
				this.goldenW.inner.gu.gu30.isAvaible.gotoAndStop(1); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu30.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu31.namee.text = "+1 max spawn speed upgrade";
			this.goldenW.inner.gu.gu31.amo.text = Math.round(gupgrades[30].level) + " / " + Math.round(gupgrades[30].maxLevel) + " (+1)";
			
			if (gupgrades[30].level >= gupgrades[30].maxLevel) {
				this.goldenW.inner.gu.gu31.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu31.cost.text = "成本: " + format(gupgrades[30].allCost) + " GB";
			}
			
			if (gupgrades[29].level > 0) {
				this.goldenW.inner.gu.gu31.isAvaible.gotoAndStop(1); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu31.isAvaible.gotoAndStop(0);
			}
			
			
			this.goldenW.inner.gu.gu32.namee.text = "x5 falling speed";
			this.goldenW.inner.gu.gu32.amo.text = Math.round(gupgrades[31].level) + " / " + Math.round(gupgrades[31].maxLevel) + " (+1)";
			
			if (gupgrades[31].level >= gupgrades[31].maxLevel) {
				this.goldenW.inner.gu.gu32.cost.text = "最大等级！";
			}
			else {
				this.goldenW.inner.gu.gu32.cost.text = "成本: " + format(gupgrades[31].allCost) + " GB";
			}
			
			if (gupgrades[30].level > 0) {
				this.goldenW.inner.gu.gu32.isAvaible.gotoAndStop(1); //1-gold 2-emerald 3-sapphire
			}
			else {
				this.goldenW.inner.gu.gu32.isAvaible.gotoAndStop(0);
			}
			
			
			calculateChances();
			
			
			if (mLength2 < 1) {
				this.spChances.chance1.text = "???: " + Math.round(schances[0]*10000)/100 + "%";
				this.specialStats.sp1.text = "??? Tower: x1";
			}
			else {
				this.spChances.chance1.text = "Mult: " + Math.round(schances[0]*10000)/100 + "%";
				this.specialStats.sp1.text = "Mult Tower: x" + format(totalMult);
			}
			
			if (mLength3 < 1) {
				this.spChances.chance2.text = "???: " + Math.round(schances[1]*10000)/100 + "%";
				this.specialStats.sp2.text = "??? Tower: x1";
			}
			else {
				this.spChances.chance2.text = "Gold: " + Math.round(schances[1]*10000)/100 + "%";
				this.specialStats.sp2.text = "Gold Tower: x" + format(goldenMult);
			}
			
			if (mLength4 < 1) {
				this.spChances.chance3.text = "???: " + Math.round(schances[2]*10000)/100 + "%";
				this.specialStats.sp3.text = "??? Tower: x1";
			}
			else {
				this.spChances.chance3.text = "Lvl: " + Math.round(schances[2]*10000)/100 + "%";
				this.specialStats.sp3.text = "Lvl Tower: x" + format(lBlockMult);
			}
			
			if (mLength5 < 1) {
				this.spChances.chance4.text = "???: " + Math.round(schances[3]*10000)/100 + "%";
				this.specialStats.sp4.text = "??? Tower: x1";
			}
			else {
				this.spChances.chance4.text = "Magnet: " + Math.round(schances[3]*10000)/100 + "%";
				this.specialStats.sp4.text = "Magnet Tower: x" + format(mBlockMult);
			}
			
			if (mLength6 < 1) {
				this.spChances.chance5.text = "???: " + Math.round(schances[4]*10000)/100 + "%";
				this.specialStats.sp5.text = "??? Tower: x1";
			}
			else {
				this.spChances.chance5.text = "Rank: " + Math.round(schances[4]*10000)/100 + "%";
				this.specialStats.sp5.text = "Rank Tower: x" + format(rBlockMult);
			}
			
			if (mLength7 < 1) {
				this.spChances.chance6.text = "???: " + Math.round(schances[5]*10000)/100 + "%";
				this.specialStats.sp6.text = "??? Tower: x1";
			}
			else {
				this.spChances.chance6.text = "Emerald: " + Math.round(schances[5]*10000)/100 + "%";
				this.specialStats.sp6.text = "Emerald Tower: x" + format(eBlockMult);
			}
			
			if (mLength8 < 1) {
				this.spChances.chance7.text = "???: " + Math.round(schances[6]*10000)/100 + "%";
				this.specialStats.sp7.text = "??? Tower: x1";
			}
			else {
				this.spChances.chance7.text = "蓝宝石: " + Math.round(schances[6]*10000)/100 + "%";
				this.specialStats.sp7.text = "蓝宝石塔: x" + format(sBlockMult);
			}
			
			if (mLength9 < 1) {
				this.spChances.chance8.text = "???: " + Math.round(schances[7]*10000)/100 + "%";
				this.specialStats.sp8.text = "??? Tower: x1";
			}
			else {
				this.spChances.chance8.text = "递归: " + Math.round(schances[7]*10000)/100 + "%";
				this.specialStats.sp8.text = "递归塔: x" + format(recBlockMult);
			}
			
			
			this.spChances.chance9.text = "???: " + Math.round(schances[8]*10000)/100 + "%";
			this.spChances.chance10.text = "???: " + Math.round(schances[9]*10000)/100 + "%";
			
			
			this.specialStats.sp9.text = "??? 塔: x1";
			this.specialStats.sp10.text = "??? 塔: x1";
			
		
			
			this.goldenW.helpGB.text = "1 总 GB -> +" + Math.round(gupgrades[3].level+1) + "% income";
			
		}
		
		
		function calculateChances() {
			
			if (gupgrades[1].level < 1) {
				schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			}
			else if (gupgrades[5].level < 1) {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
			}
			else if (gupgrades[15].level < 1 && gupgrades[16].level < 1) {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 10) {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else {
					schances = [1/3, 1/3, 1/3, 0, 0, 0, 0, 0, 0, 0];
				}
			}
			else if (gupgrades[15].level >= 1 && gupgrades[16].level < 1) {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 10) {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 20) {
					schances = [1/3, 1/3, 1/3, 0, 0, 0, 0, 0, 0, 0];
				}
				else {
					schances = [1/4, 1/4, 1/4, 1/4, 0, 0, 0, 0, 0, 0];
				}
			}
			else if (gupgrades[15].level < 1 && gupgrades[16].level >= 1) {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 10) {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 20) {
					schances = [1/3, 1/3, 1/3, 0, 0, 0, 0, 0, 0, 0];
				}
				else {
					schances = [1/4, 1/4, 1/4, 0, 1/4, 0, 0, 0, 0, 0];
				}
			}
			else if (gupgrades[26].level < 1 && gupgrades[27].level < 1) {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 10) {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 20) {
					schances = [1/3, 1/3, 1/3, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 30) {
					schances = [1/4, 1/4, 1/4, 1/4, 0, 0, 0, 0, 0, 0];
				}
				else {
					schances = [1/5, 1/5, 1/5, 1/5, 1/5, 0, 0, 0, 0, 0];
				}
			}
			else if (gupgrades[26].level >= 1 && gupgrades[27].level < 1) {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 10) {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 20) {
					schances = [1/3, 1/3, 1/3, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 30) {
					schances = [1/4, 1/4, 1/4, 1/4, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 40) {
					schances = [1/5, 1/5, 1/5, 1/5, 1/5, 0, 0, 0, 0, 0];
				}
				else {
					schances = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6, 0, 0, 0, 0];
				}
			}
			else if (gupgrades[26].level < 1 && gupgrades[27].level >= 1) {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 10) {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 20) {
					schances = [1/3, 1/3, 1/3, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 30) {
					schances = [1/4, 1/4, 1/4, 1/4, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 40) {
					schances = [1/5, 1/5, 1/5, 1/5, 1/5, 0, 0, 0, 0, 0];
				}
				else {
					schances = [1/6, 1/6, 1/6, 1/6, 1/6, 0, 1/6, 0, 0, 0];
				}
			}
			else if (gupgrades[29].level < 1) {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 10) {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 20) {
					schances = [1/3, 1/3, 1/3, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 30) {
					schances = [1/4, 1/4, 1/4, 1/4, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 40) {
					schances = [1/5, 1/5, 1/5, 1/5, 1/5, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 50) {
					schances = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6, 0, 0, 0, 0];
				}
				else {
					schances = [1/7, 1/7, 1/7, 1/7, 1/7, 1/7, 1/7, 0, 0, 0];
				}
			}
			else {
				if (upgrades[3].level < 5) {
					schances = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 10) {
					schances = [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 20) {
					schances = [1/3, 1/3, 1/3, 0, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 30) {
					schances = [1/4, 1/4, 1/4, 1/4, 0, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 40) {
					schances = [1/5, 1/5, 1/5, 1/5, 1/5, 0, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 50) {
					schances = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6, 0, 0, 0, 0];
				}
				else if (upgrades[3].level < 75) {
					schances = [1/7, 1/7, 1/7, 1/7, 1/7, 1/7, 1/7, 0, 0, 0];
				}
				else {
					schances = [1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 0, 0];
				}
			}
		}
		
		
		
		function makePrestige() {
			gold = gold.plus(goldGain);
			totalGold = totalGold.plus(goldGain);
			killBlocks();
			money = nd(0);
			totalMoney = nd(0);
			totalGain = nd(0);
		
			magnets = nd(0);
			totalMagnets = nd(0);
			
			level = 0;
			xpNow = 0;
			xpNext = 10;
		
			spChance = 0;
			mChance = 0;
			upgrades = [new upgrade(30, nd(100), nd(5)), new upgrade(9000, nd(1000), nd(5)),
						new upgrade(95, nd(100000), nd(1000)), new upgrade(999999, nd(1e6), nd(10)),
						new upgrade(100, nd(1e6), nd(1000)), new upgrade(999999, nd(1), nd(1)),
						new upgrade(100, nd(3), nd(3))];
			
			
		}
		
		
		
		function killBlocks() {
			var mL = mLength;
			for (var i = 0 ; i < mL ; ++i) {
				if (mLength > 1) {
					var thisBlock = getBlock(mLength - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength -= 1;
				}
				else {
					var thisBlock = firstBlock;
					stage.removeChild(thisBlock);
					firstBlock = null;
					mLength -= 1;
				}
			}
			var mL2 = mLength2;
			for (var i = 0 ; i < mL2 ; ++i) {
				if (mLength2 > 1) {
					var thisBlock = getBlock2(mLength2 - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength2 -= 1;
				}
				else {
					var thisBlock = firstBlock2;
					stage.removeChild(thisBlock);
					firstBlock2 = null;
					mLength2 -= 1;
				}
			}
			var mL3 = mLength3;
			for (var i = 0 ; i < mL3 ; ++i) {
				if (mLength3 > 1) {
					var thisBlock = getBlock3(mLength3 - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength3 -= 1;
				}
				else {
					var thisBlock = firstBlock3;
					stage.removeChild(thisBlock);
					firstBlock3 = null;
					mLength3 -= 1;
				}
			}
			var mL4 = mLength4;
			for (var i = 0 ; i < mL4 ; ++i) {
				if (mLength4 > 1) {
					var thisBlock = getBlock4(mLength4 - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength4 -= 1;
				}
				else {
					var thisBlock = firstBlock4;
					stage.removeChild(thisBlock);
					firstBlock4 = null;
					mLength4 -= 1;
				}
			}
			var mL5 = mLength5;
			for (var i = 0 ; i < mL5 ; ++i) {
				if (mLength5 > 1) {
					var thisBlock = getBlock5(mLength5 - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength5 -= 1;
				}
				else {
					var thisBlock = firstBlock5;
					stage.removeChild(thisBlock);
					firstBlock5 = null;
					mLength5 -= 1;
				}
			}
			var mL6 = mLength6;
			for (var i = 0 ; i < mL6 ; ++i) {
				if (mLength6 > 1) {
					var thisBlock = getBlock6(mLength6 - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength6 -= 1;
				}
				else {
					var thisBlock = firstBlock6;
					stage.removeChild(thisBlock);
					firstBlock6 = null;
					mLength6 -= 1;
				}
			}
			var mL7 = mLength7;
			for (var i = 0 ; i < mL7 ; ++i) {
				if (mLength7 > 1) {
					var thisBlock = getBlock7(mLength7 - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength7 -= 1;
				}
				else {
					var thisBlock = firstBlock7;
					stage.removeChild(thisBlock);
					firstBlock7 = null;
					mLength7 -= 1;
				}
			}
			var mL8 = mLength8;
			for (var i = 0 ; i < mL8 ; ++i) {
				if (mLength8 > 1) {
					var thisBlock = getBlock8(mLength8 - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength8 -= 1;
				}
				else {
					var thisBlock = firstBlock8;
					stage.removeChild(thisBlock);
					firstBlock8 = null;
					mLength8 -= 1;
				}
			}
			var mL9 = mLength9;
			for (var i = 0 ; i < mL9 ; ++i) {
				if (mLength9 > 1) {
					var thisBlock = getBlock9(mLength9 - 1);
					thisBlock.prev.next = null;
					stage.removeChild(thisBlock);
					mLength9 -= 1;
				}
				else {
					var thisBlock = firstBlock9;
					stage.removeChild(thisBlock);
					firstBlock9 = null;
					mLength9 -= 1;
				}
			}
		}
		
		
		var goUPt = false;
		var goDOWNt = false;
		
		function spawnBlock(lv) {
			var block;
			block = new lib.tBlock();
			
			block.level = lv;
			if (mLength > 1) {
				block.prev = getBlockLvLast(lv);
				block.next = getBlockLvLast(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast(lv).next = block;
				mLength += 1;
			}
			else if (mLength == 1) {
				if (block.level > firstBlock.level) {
					block.next = firstBlock;
					firstBlock.prev = block;
					firstBlock = block;
				}
				else {
					firstBlock.next = block;
					block.prev = firstBlock;
				}
				mLength += 1;
			}
			else {
				firstBlock = block;
				mLength += 1;
			}
			
			block.x = 385;
			block.y = 525;
			block.tb.y = 0 - mLength*55 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
			
			block.gain = nd(3).pow(block.level-1);
			
			block.tb.gotoAndStop(block.level+9%10);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', hoverBlock1);
			block.addEventListener('mouseout', hoverBlock2);
		}
		
		
		var blockHovered = false;
		var blockH = null;
		
		function hoverBlock1(e) {
			var block = e.currentTarget;
			blockH = block;
			blockHovered = true;
		}
		
		function hoverBlock2(e) {
			var block = e.currentTarget;
			blockHovered = false;
			blockH = null;
		}
		
		
		var S1blockHovered = false;
		var S1blockH = null;
		
		
		function S1hoverBlock1(e) {
			var block = e.currentTarget;
			S1blockH = block;
			S1blockHovered = true;
		}
		
		function S1hoverBlock2(e) {
			var block = e.currentTarget;
			S1blockHovered = false;
			S1blockH = null;
		}
		
		var S2blockHovered = false;
		var S2blockH = null;
		
		function S2hoverBlock1(e) {
			var block = e.currentTarget;
			S2blockH = block;
			S2blockHovered = true;
		}
		
		function S2hoverBlock2(e) {
			var block = e.currentTarget;
			S2blockHovered = false;
			S2blockH = null;
		}
		
		var S3blockHovered = false;
		var S3blockH = null;
		
		function S3hoverBlock1(e) {
			var block = e.currentTarget;
			S3blockH = block;
			S3blockHovered = true;
		}
		
		function S3hoverBlock2(e) {
			var block = e.currentTarget;
			S3blockHovered = false;
			S3blockH = null;
		}
		
		var S4blockHovered = false;
		var S4blockH = null;
		
		function S4hoverBlock1(e) {
			var block = e.currentTarget;
			S4blockH = block;
			S4blockHovered = true;
		}
		
		function S4hoverBlock2(e) {
			var block = e.currentTarget;
			S4blockHovered = false;
			S4blockH = null;
		}
		
		var S5blockHovered = false;
		var S5blockH = null;
		
		function S5hoverBlock1(e) {
			var block = e.currentTarget;
			S5blockH = block;
			S5blockHovered = true;
		}
		
		function S5hoverBlock2(e) {
			var block = e.currentTarget;
			S5blockHovered = false;
			S5blockH = null;
		}
		
		var S6blockHovered = false;
		var S6blockH = null;
		
		function S6hoverBlock1(e) {
			var block = e.currentTarget;
			S6blockH = block;
			S6blockHovered = true;
		}
		
		function S6hoverBlock2(e) {
			var block = e.currentTarget;
			S6blockHovered = false;
			S6blockH = null;
		}
		
		var S7blockHovered = false;
		var S7blockH = null;
		
		function S7hoverBlock1(e) {
			var block = e.currentTarget;
			S7blockH = block;
			S7blockHovered = true;
		}
		
		function S7hoverBlock2(e) {
			var block = e.currentTarget;
			S7blockHovered = false;
			S7blockH = null;
		}
		
		var S8blockHovered = false;
		var S8blockH = null;
		
		function S8hoverBlock1(e) {
			var block = e.currentTarget;
			S8blockH = block;
			S8blockHovered = true;
		}
		
		function S8hoverBlock2(e) {
			var block = e.currentTarget;
			S8blockHovered = false;
			S8blockH = null;
		}
		
		
		function spawnS1Block(lv) {
			var block;
			block = new lib.tBlock2();
			
			block.level = lv;
			if (mLength2 > 1) {
				block.prev = getBlockLvLast2(lv);
				block.next = getBlockLvLast2(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast2(lv).next = block;
				mLength2 += 1;
			}
			else if (mLength2 == 1) {
				if (block.level > firstBlock2.level) {
					block.next = firstBlock2;
					firstBlock2.prev = block;
					firstBlock2 = block;
				}
				else {
					firstBlock2.next = block;
					block.prev = firstBlock2;
				}
				mLength2 += 1;
			}
			else {
				firstBlock2 = block;
				mLength2 += 1;
			}
			
			block.x = 648;
			block.y = 535;
			block.tb.y = 0 - mLength*41 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
			
			block.gain = softcap(nd(1.2).plus(nd(block.level).div(100))).pow(nd(2).pow(block.level - 1)).sub(1);
			
			
			
			
			block.tb.gotoAndStop(block.level+4%5);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', S1hoverBlock1);
			block.addEventListener('mouseout', S1hoverBlock2);
		}
		
		
		function spawnS2Block(lv) {
			var block;
			block = new lib.tBlock3();
			
			block.level = lv;
			if (mLength3 > 1) {
				block.prev = getBlockLvLast3(lv);
				block.next = getBlockLvLast3(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast3(lv).next = block;
				mLength3 += 1;
			}
			else if (mLength3 == 1) {
				if (block.level > firstBlock3.level) {
					block.next = firstBlock3;
					firstBlock3.prev = block;
					firstBlock3 = block;
				}
				else {
					firstBlock3.next = block;
					block.prev = firstBlock3;
				}
				mLength3 += 1;
			}
			else {
				firstBlock3 = block;
				mLength3 += 1;
			}
			
			block.x = 690;
			block.y = 535;
			block.tb.y = 0 - mLength*41 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
			
			block.gain = softcap(nd(1.1).plus(nd(block.level).div(100))).pow(nd(2).pow(block.level - 1));
			
			block.tb.gotoAndStop(block.level+4%5);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', S2hoverBlock1);
			block.addEventListener('mouseout', S2hoverBlock2);
		}
		
		
		function spawnS3Block(lv) {
			var block;
			block = new lib.tBlock4();
			
			block.level = lv;
			if (mLength4 > 1) {
				block.prev = getBlockLvLast4(lv);
				block.next = getBlockLvLast4(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast4(lv).next = block;
				mLength4 += 1;
			}
			else if (mLength4 == 1) {
				if (block.level > firstBlock4.level) {
					block.next = firstBlock4;
					firstBlock4.prev = block;
					firstBlock4 = block;
				}
				else {
					firstBlock4.next = block;
					block.prev = firstBlock4;
				}
				mLength4 += 1;
			}
			else {
				firstBlock4 = block;
				mLength4 += 1;
			}
			
			block.x = 732;
			block.y = 535;
			block.tb.y = 0 - mLength*41 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
			
			block.gain = softcap(nd(1.1).plus(nd(level).pow(0.5).div(100))).pow(nd(2).pow(block.level - 1)).sub(1);
			
			block.tb.gotoAndStop(block.level+4%5);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', S3hoverBlock1);
			block.addEventListener('mouseout', S3hoverBlock2);
		}
		
		
		function spawnS4Block(lv) {
			var block;
			block = new lib.tBlock5();
			
			block.level = lv;
			if (mLength5 > 1) {
				block.prev = getBlockLvLast5(lv);
				block.next = getBlockLvLast5(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast5(lv).next = block;
				mLength5 += 1;
			}
			else if (mLength5 == 1) {
				if (block.level > firstBlock5.level) {
					block.next = firstBlock5;
					firstBlock5.prev = block;
					firstBlock5 = block;
				}
				else {
					firstBlock5.next = block;
					block.prev = firstBlock5;
				}
				mLength5 += 1;
			}
			else {
				firstBlock5 = block;
				mLength5 += 1;
			}
			
			block.x = 774;
			block.y = 535;
			block.tb.y = 0 - mLength*41 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
			
			block.gain = softcap(nd(1.1).plus(totalMagnets.pow(0.3).div(100))).pow(nd(2).pow(block.level - 1)).sub(1);
			
			block.tb.gotoAndStop(block.level+4%5);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', S4hoverBlock1);
			block.addEventListener('mouseout', S4hoverBlock2);
		}
		
		
		function spawnS5Block(lv) {
			var block;
			block = new lib.tBlock6();
			
			block.level = lv;
			if (mLength6 > 1) {
				block.prev = getBlockLvLast6(lv);
				block.next = getBlockLvLast6(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast6(lv).next = block;
				mLength6 += 1;
			}
			else if (mLength6 == 1) {
				if (block.level > firstBlock6.level) {
					block.next = firstBlock6;
					firstBlock6.prev = block;
					firstBlock6 = block;
				}
				else {
					firstBlock6.next = block;
					block.prev = firstBlock6;
				}
				mLength6 += 1;
			}
			else {
				firstBlock6 = block;
				mLength6 += 1;
			}
			
			block.x = 816;
			block.y = 535;
			block.tb.y = 0 - mLength*41 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
			
			var fLevel = 1;
				
			if (firstBlock != null) {
				fLevel = firstBlock.level
			}
				
			block.gain = softcap(nd(1.1).plus(nd(fLevel).pow(0.9).div(1000))).pow(nd(2).pow(block.level - 1)).sub(1);
			
			block.tb.gotoAndStop(block.level+4%5);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', S5hoverBlock1);
			block.addEventListener('mouseout', S5hoverBlock2);
		}
		
		
		function spawnS6Block(lv) {
			var block;
			block = new lib.tBlock7();
			
			block.level = lv;
			if (mLength7 > 1) {
				block.prev = getBlockLvLast7(lv);
				block.next = getBlockLvLast7(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast7(lv).next = block;
				mLength7 += 1;
			}
			else if (mLength7 == 1) {
				if (block.level > firstBlock7.level) {
					block.next = firstBlock7;
					firstBlock7.prev = block;
					firstBlock7 = block;
				}
				else {
					firstBlock7.next = block;
					block.prev = firstBlock7;
				}
				mLength7 += 1;
			}
			else {
				firstBlock7 = block;
				mLength7 += 1;
			}
			
			block.x = 858;
			block.y = 535;
			block.tb.y = 0 - mLength*41 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
				
			block.gain = softcap(nd(1.1).plus(nd(emeralds).pow(0.95).div(100000))).pow(nd(2).pow(block.level - 1)).sub(1);
			
			block.tb.gotoAndStop(block.level+4%5);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', S6hoverBlock1);
			block.addEventListener('mouseout', S6hoverBlock2);
		}
		
		
		function spawnS7Block(lv) {
			var block;
			block = new lib.tBlock8();
			
			block.level = lv;
			if (mLength8 > 1) {
				block.prev = getBlockLvLast8(lv);
				block.next = getBlockLvLast8(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast8(lv).next = block;
				mLength8 += 1;
			}
			else if (mLength8 == 1) {
				if (block.level > firstBlock8.level) {
					block.next = firstBlock8;
					firstBlock8.prev = block;
					firstBlock8 = block;
				}
				else {
					firstBlock8.next = block;
					block.prev = firstBlock8;
				}
				mLength8 += 1;
			}
			else {
				firstBlock8 = block;
				mLength8 += 1;
			}
			
			block.x = 900;
			block.y = 535;
			block.tb.y = 0 - mLength*41 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
				
			block.gain = softcap(nd(1.1).plus(nd(sapphires).pow(0.95).div(100000))).pow(nd(2).pow(block.level - 1)).sub(1);
			
			block.tb.gotoAndStop(block.level+4%5);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', S7hoverBlock1);
			block.addEventListener('mouseout', S7hoverBlock2);
		}
		
		
		function spawnS8Block(lv) {
			var block;
			block = new lib.tBlock9();
			
			block.level = lv;
			if (mLength9 > 1) {
				block.prev = getBlockLvLast9(lv);
				block.next = getBlockLvLast9(lv).next;
				if (block.next != null) {
					block.next.prev = block;
				}
				getBlockLvLast9(lv).next = block;
				mLength9 += 1;
			}
			else if (mLength9 == 1) {
				if (block.level > firstBlock9.level) {
					block.next = firstBlock9;
					firstBlock9.prev = block;
					firstBlock9 = block;
				}
				else {
					firstBlock9.next = block;
					block.prev = firstBlock9;
				}
				mLength9 += 1;
			}
			else {
				firstBlock9 = block;
				mLength9 += 1;
			}
			
			block.x = 943;
			block.y = 535;
			block.tb.y = 0 - mLength*41 + shiftY;
			
			block.fall = false;
			block.fallp = 0;
			block.grav = 0;
				
			block.gain = softcap(nd(1.1).plus(totalMoney.log(10).pow(0.9).div(100))).pow(nd(2).pow(block.level - 1)).sub(1);
			
			block.tb.gotoAndStop(block.level+4%5);
			
			block.tb.lev.text = "" + block.level;
			
			stage.addChild(block);
			block.addEventListener('mouseover', S8hoverBlock1);
			block.addEventListener('mouseout', S8hoverBlock2);
		}
		
		
		
		
		function softcap(t) {
			if (t.gte(1.2)) {
				t = t.div(1.2).pow(0.1).times(1.2);
			}
			return t;
		}
		
		
		
		
		function getBlock(pos) {
			var thisB = firstBlock;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		
		
		function getBlock2(pos) {
			var thisB = firstBlock2;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		
		function getBlock3(pos) {
			var thisB = firstBlock3;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		
		function getBlock4(pos) {
			var thisB = firstBlock4;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		function getBlock5(pos) {
			var thisB = firstBlock5;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		function getBlock6(pos) {
			var thisB = firstBlock6;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		function getBlock7(pos) {
			var thisB = firstBlock7;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		function getBlock8(pos) {
			var thisB = firstBlock8;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		function getBlock9(pos) {
			var thisB = firstBlock9;
			for (var i = 0 ; i < pos ; ++i) {
				if (thisB.next != null) {
					thisB = thisB.next;
				}
			}
			return thisB;
		}
		
		function getBlockLvLast(lev) {
			var thisB = firstBlock;
			for (var i = 0 ; i < mLength ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength;
				}
			}
			return thisB;
		}
		
		
		function getBlockLvLast2(lev) {
			var thisB = firstBlock2;
			for (var i = 0 ; i < mLength2 ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength2;
				}
			}
			return thisB;
		}
		
		
		function getBlockLvLast3(lev) {
			var thisB = firstBlock3;
			for (var i = 0 ; i < mLength3 ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength3;
				}
			}
			return thisB;
		}
		
		
		function getBlockLvLast4(lev) {
			var thisB = firstBlock4;
			for (var i = 0 ; i < mLength4 ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength4;
				}
			}
			return thisB;
		}
		
		
		function getBlockLvLast5(lev) {
			var thisB = firstBlock5;
			for (var i = 0 ; i < mLength5 ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength5;
				}
			}
			return thisB;
		}
		
		
		function getBlockLvLast6(lev) {
			var thisB = firstBlock6;
			for (var i = 0 ; i < mLength6 ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength6;
				}
			}
			return thisB;
		}
		
		
		function getBlockLvLast7(lev) {
			var thisB = firstBlock7;
			for (var i = 0 ; i < mLength7 ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength7;
				}
			}
			return thisB;
		}
		
		
		function getBlockLvLast8(lev) {
			var thisB = firstBlock8;
			for (var i = 0 ; i < mLength8 ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength8;
				}
			}
			return thisB;
		}
		
		
		function getBlockLvLast9(lev) {
			var thisB = firstBlock9;
			for (var i = 0 ; i < mLength9 ; ++i) {
				if (thisB.next != null && thisB.next.level >= lev) {
					thisB = thisB.next;
				}
				else {
					i = mLength9;
				}
			}
			return thisB;
		}
		
		
		
		
		this.goUP.addEventListener("mousedown", goUPtt.bind(this));
		function goUPtt() {
			goUPt = true;
		}
		
		
		
		this.goUP.addEventListener("mouseout", goUPtt2.bind(this));
		function goUPtt2() {
			goUPt = false;
		}
		
		this.goDOWN.addEventListener("mousedown", goDOWNtt.bind(this));
		function goDOWNtt() {
			goDOWNt = true;
		}
		
		this.goDOWN.addEventListener("mouseout", goDOWNtt2.bind(this));
		function goDOWNtt2() {
			goDOWNt = false;
		}
		
		var scrollmake = false;
		var scrollmake2 = false;
		
		this.scroller.addEventListener("mousedown", scr1.bind(this));
		function scr1() {
			scrollmake = true;
		}
		
		this.goldenW.scroller.addEventListener("mousedown", scr12.bind(this));
		function scr12() {
			scrollmake2 = true;
		}
		
		window.addEventListener("mouseup", scr2.bind(this));
		function scr2() {
			scrollmake = false;
			scrollmake2 = false;
			goUPt = false;
			goDOWNt = false;
		}
		
		
		this.scrollBar.addEventListener("click", scr3.bind(this));
		function scr3() {
			shiftY = Math.max(30, Math.min((-mousePosY + 594)*7.45 + 30, 2930));
		}
		
		this.goldenW.scrollBar.addEventListener("click", gscr3.bind(this));
		function gscr3() {
			gupgShift = Math.max(0, Math.min((mousePosY - 262)*7.45, 2420));
		}
		
		this.goldenTree.addEventListener("click", showPrestige.bind(this));
		function showPrestige() {
			this.goldenW.visible = true;
		}
		
		
		this.goldenW.clos.addEventListener("click", remPrestige.bind(this));
		function remPrestige() {
			this.goldenW.visible = false;
		}
		
		this.goldenW.prestige.addEventListener("click", makePP.bind(this));
		function makePP() {
			makePrestige();
		}
		
		
		//buy upgrades
		
		this.u1.addEventListener("click", buyFirst.bind(this));
		function buyFirst() {
			if (money.gte(upgrades[0].allCost) && upgrades[0].level < upgrades[0].maxLevel) {
				money = money.sub(upgrades[0].allCost);
				upgrades[0].level += buyAmos[0];
			}
		}
		
		this.u2.addEventListener("click", buySecond.bind(this));
		function buySecond() {
			if (money.gte(upgrades[1].allCost) && upgrades[1].level < upgrades[1].maxLevel) {
				money = money.sub(upgrades[1].allCost);
				upgrades[1].level += buyAmos[1];
			}
		}
		
		this.u3.addEventListener("click", buyThird.bind(this));
		function buyThird() {
			if (money.gte(upgrades[2].allCost) && upgrades[2].level < upgrades[2].maxLevel) {
				money = money.sub(upgrades[2].allCost);
				upgrades[2].level += buyAmos[2];
			}
		}
		
		this.u4.addEventListener("click", buyFourth.bind(this));
		function buyFourth() {
			if (money.gte(upgrades[3].allCost) && upgrades[3].level < upgrades[3].maxLevel) {
				money = money.sub(upgrades[3].allCost);
				
				for (var i = 0 ; i < buyAmos[3] ; ++i) {
					upgrades[3].level += 1;
					calculateChances()
					var chance = Math.random();
					
					if (chance < schances[0]) {
						spawnS1Block(1);
					}
					else if (chance < schances[0] + schances[1]) {
						spawnS2Block(1);
					}
					else if (chance < schances[0] + schances[1] + schances[2]) {
						spawnS3Block(1);
					}
					else if (chance < schances[0] + schances[1] + schances[2] + schances[3]) {
						spawnS4Block(1);
					}
					else if (chance < schances[0] + schances[1] + schances[2] + schances[3] + schances[4]) {
						spawnS5Block(1);
					}
					else if (chance < schances[0] + schances[1] + schances[2] + schances[3] + schances[4] + schances[5]) {
						spawnS6Block(1);
					}
					else if (chance < schances[0] + schances[1] + schances[2] + schances[3] + schances[4] + schances[5] + schances[6]) {
						spawnS7Block(1);
					}
					else if (chance < schances[0] + schances[1] + schances[2] + schances[3] + schances[4] + schances[5] + schances[6] + schances[7]) {
						spawnS8Block(1);
					}
					
				}
			}
		}
		
		
		this.u5.addEventListener("click", buyFifth.bind(this));
		function buyFifth() {
			if (money.gte(upgrades[4].allCost) && upgrades[4].level < upgrades[4].maxLevel) {
				money = money.sub(upgrades[4].allCost);
				upgrades[4].level += buyAmos[4];
			}
		}
		
		
		this.u6.addEventListener("click", buySixth.bind(this));
		function buySixth() {
			if (magnets.gte(upgrades[5].allCost) && upgrades[5].level < upgrades[5].maxLevel) {
				magnets = magnets.sub(upgrades[5].allCost);
				upgrades[5].level += buyAmos[5];
			}
		}
		
		
		this.u7.addEventListener("click", buySeventh.bind(this));
		function buySeventh() {
			if (magnets.gte(upgrades[6].allCost) && upgrades[6].level < upgrades[6].maxLevel) {
				magnets = magnets.sub(upgrades[6].allCost);
				upgrades[6].level += buyAmos[6];
			}
		}
		
		
		
		
		this.goldenW.inner.gu.gu1.addEventListener("click", buyGFirst.bind(this));
		function buyGFirst() {
			if (gold.gte(gupgrades[0].allCost) && gupgrades[0].level < gupgrades[0].maxLevel) {
				gold = gold.sub(gupgrades[0].allCost);
				gupgrades[0].level += 1;
			}
		}
		
		
		
		this.goldenW.inner.gu.gu2.addEventListener("click", buyGSecond.bind(this));
		function buyGSecond() {
			if (gold.gte(gupgrades[1].allCost) && gupgrades[1].level < gupgrades[1].maxLevel && gupgrades[0].level > 0) {
				gold = gold.sub(gupgrades[1].allCost);
				gupgrades[1].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu3.addEventListener("click", buyGThird.bind(this));
		function buyGThird() {
			if (gold.gte(gupgrades[2].allCost) && gupgrades[2].level < gupgrades[2].maxLevel && gupgrades[1].level > 0) {
				gold = gold.sub(gupgrades[2].allCost);
				gupgrades[2].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu4.addEventListener("click", buyGFourth.bind(this));
		function buyGFourth() {
			if (gold.gte(gupgrades[3].allCost) && gupgrades[3].level < gupgrades[3].maxLevel && gupgrades[1].level > 0) {
				gold = gold.sub(gupgrades[3].allCost);
				gupgrades[3].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu5.addEventListener("click", buyGFifth.bind(this));
		function buyGFifth() {
			if (gold.gte(gupgrades[4].allCost) && gupgrades[4].level < gupgrades[4].maxLevel && gupgrades[2].level > 0 && gupgrades[3].level > 0) {
				gold = gold.sub(gupgrades[4].allCost);
				gupgrades[4].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu6.addEventListener("click", buyGSixth.bind(this));
		function buyGSixth() {
			if (gold.gte(gupgrades[5].allCost) && gupgrades[5].level < gupgrades[5].maxLevel && gupgrades[4].level > 0) {
				gold = gold.sub(gupgrades[5].allCost);
				gupgrades[5].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu7.addEventListener("click", buyGSeventh.bind(this));
		function buyGSeventh() {
			if (gold.gte(gupgrades[6].allCost) && gupgrades[6].level < gupgrades[6].maxLevel && gupgrades[4].level > 0) {
				gold = gold.sub(gupgrades[6].allCost);
				gupgrades[6].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu8.addEventListener("click", buyGEighth.bind(this));
		function buyGEighth() {
			if (gold.gte(gupgrades[7].allCost) && gupgrades[7].level < gupgrades[7].maxLevel && gupgrades[4].level > 0) {
				gold = gold.sub(gupgrades[7].allCost);
				gupgrades[7].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu9.addEventListener("click", buyGNinth.bind(this));
		function buyGNinth() {
			if (gold.gte(gupgrades[8].allCost) && gupgrades[8].level < gupgrades[8].maxLevel && gupgrades[5].level > 0) {
				gold = gold.sub(gupgrades[8].allCost);
				gupgrades[8].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu10.addEventListener("click", buyGTenth.bind(this));
		function buyGTenth() {
			if (gold.gte(gupgrades[9].allCost) && gupgrades[9].level < gupgrades[9].maxLevel && gupgrades[6].level > 0) {
				gold = gold.sub(gupgrades[9].allCost);
				gupgrades[9].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu11.addEventListener("click", buyGEleventh.bind(this));
		function buyGEleventh() {
			if (gold.gte(gupgrades[10].allCost) && gupgrades[10].level < gupgrades[10].maxLevel && gupgrades[7].level > 0) {
				gold = gold.sub(gupgrades[10].allCost);
				gupgrades[10].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu12.addEventListener("click", buyGTwelfth.bind(this));
		function buyGTwelfth() {
			if (gold.gte(gupgrades[11].allCost) && gupgrades[11].level < gupgrades[11].maxLevel && gupgrades[8].level > 0 && gupgrades[10].level > 0) {
				gold = gold.sub(gupgrades[11].allCost);
				gupgrades[11].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu13.addEventListener("click", buyG13.bind(this));
		function buyG13() {
			if (gold.gte(gupgrades[12].allCost) && gupgrades[12].level < gupgrades[12].maxLevel && gupgrades[9].level > 0 && gupgrades[10].level > 0) {
				gold = gold.sub(gupgrades[12].allCost);
				gupgrades[12].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu14.addEventListener("click", buyG14.bind(this));
		function buyG14() {
			if (gold.gte(gupgrades[13].allCost) && gupgrades[13].level < gupgrades[13].maxLevel && gupgrades[11].level > 0) {
				gold = gold.sub(gupgrades[13].allCost);
				gupgrades[13].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu15.addEventListener("click", buyG15.bind(this));
		function buyG15() {
			if (gold.gte(gupgrades[14].allCost) && gupgrades[14].level < gupgrades[14].maxLevel && gupgrades[12].level > 0) {
				gold = gold.sub(gupgrades[14].allCost);
				gupgrades[14].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu16.addEventListener("click", buyG16.bind(this));
		function buyG16() {
			if (gold.gte(gupgrades[15].allCost) && gupgrades[15].level < gupgrades[15].maxLevel && gupgrades[13].level > 0) {
				gold = gold.sub(gupgrades[15].allCost);
				gupgrades[15].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu17.addEventListener("click", buyG17.bind(this));
		function buyG17() {
			if (gold.gte(gupgrades[16].allCost) && gupgrades[16].level < gupgrades[16].maxLevel && gupgrades[14].level > 0) {
				gold = gold.sub(gupgrades[16].allCost);
				gupgrades[16].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu18.addEventListener("click", buyG18.bind(this));
		function buyG18() {
			if (gold.gte(gupgrades[17].allCost) && gupgrades[17].level < gupgrades[17].maxLevel && gupgrades[15].level > 0 && gupgrades[16].level > 0) {
				gold = gold.sub(gupgrades[17].allCost);
				gupgrades[17].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu19.addEventListener("click", buyG19.bind(this));
		function buyG19() {
			if (gold.gte(gupgrades[18].allCost) && gupgrades[18].level < gupgrades[18].maxLevel && gupgrades[17].level > 0) {
				gold = gold.sub(gupgrades[18].allCost);
				gupgrades[18].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu20.addEventListener("click", buyG20.bind(this));
		function buyG20() {
			if (gold.gte(gupgrades[19].allCost) && gupgrades[19].level < gupgrades[19].maxLevel && gupgrades[17].level > 0) {
				gold = gold.sub(gupgrades[19].allCost);
				gupgrades[19].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu21.addEventListener("click", buyG21.bind(this));
		function buyG21() {
			if (emeralds.gte(gupgrades[20].allCost) && gupgrades[20].level < gupgrades[20].maxLevel && gupgrades[18].level > 0) {
				emeralds = emeralds.sub(gupgrades[20].allCost);
				gupgrades[20].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu22.addEventListener("click", buyG22.bind(this));
		function buyG22() {
			if (sapphires.gte(gupgrades[21].allCost) && gupgrades[21].level < gupgrades[21].maxLevel && gupgrades[19].level > 0) {
				sapphires = sapphires.sub(gupgrades[21].allCost);
				gupgrades[21].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu23.addEventListener("click", buyG23.bind(this));
		function buyG23() {
			if (emeralds.gte(gupgrades[22].allCost) && gupgrades[22].level < gupgrades[22].maxLevel && gupgrades[20].level > 0) {
				emeralds = emeralds.sub(gupgrades[22].allCost);
				gupgrades[22].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu24.addEventListener("click", buyG24.bind(this));
		function buyG24() {
			if (sapphires.gte(gupgrades[23].allCost) && gupgrades[23].level < gupgrades[23].maxLevel && gupgrades[21].level > 0) {
				sapphires = sapphires.sub(gupgrades[23].allCost);
				gupgrades[23].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu25.addEventListener("click", buyG25.bind(this));
		function buyG25() {
			if (emeralds.gte(gupgrades[24].allCost) && gupgrades[24].level < gupgrades[24].maxLevel && gupgrades[22].level > 0) {
				emeralds = emeralds.sub(gupgrades[24].allCost);
				gupgrades[24].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu26.addEventListener("click", buyG26.bind(this));
		function buyG26() {
			if (sapphires.gte(gupgrades[25].allCost) && gupgrades[25].level < gupgrades[25].maxLevel && gupgrades[23].level > 0) {
				sapphires = sapphires.sub(gupgrades[25].allCost);
				gupgrades[25].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu27.addEventListener("click", buyG27.bind(this));
		function buyG27() {
			if (emeralds.gte(gupgrades[26].allCost) && gupgrades[26].level < gupgrades[26].maxLevel && gupgrades[24].level > 0) {
				emeralds = emeralds.sub(gupgrades[26].allCost);
				gupgrades[26].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu28.addEventListener("click", buyG28.bind(this));
		function buyG28() {
			if (sapphires.gte(gupgrades[27].allCost) && gupgrades[27].level < gupgrades[27].maxLevel && gupgrades[25].level > 0) {
				sapphires = sapphires.sub(gupgrades[27].allCost);
				gupgrades[27].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu29.addEventListener("click", buyG29.bind(this));
		function buyG29() {
			if (gold.gte(gupgrades[28].allCost) && gupgrades[28].level < gupgrades[28].maxLevel && gupgrades[26].level > 0 && gupgrades[27].level > 0) {
				gold = gold.sub(gupgrades[28].allCost);
				gupgrades[28].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu30.addEventListener("click", buyG30.bind(this));
		function buyG30() {
			if (gold.gte(gupgrades[29].allCost) && gupgrades[29].level < gupgrades[29].maxLevel && gupgrades[28].level > 0) {
				gold = gold.sub(gupgrades[29].allCost);
				gupgrades[29].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu31.addEventListener("click", buyG31.bind(this));
		function buyG31() {
			if (gold.gte(gupgrades[30].allCost) && gupgrades[30].level < gupgrades[30].maxLevel && gupgrades[29].level > 0) {
				gold = gold.sub(gupgrades[30].allCost);
				gupgrades[30].level += 1;
			}
		}
		
		
		this.goldenW.inner.gu.gu32.addEventListener("click", buyG32.bind(this));
		function buyG32() {
			if (gold.gte(gupgrades[31].allCost) && gupgrades[31].level < gupgrades[31].maxLevel && gupgrades[30].level > 0) {
				gold = gold.sub(gupgrades[31].allCost);
				gupgrades[31].level += 1;
			}
		}
		
		
		
		this.showChances.addEventListener("mouseover", showChance.bind(this));
		function showChance() {
			this.spChances.visible = true;
		}
		
		this.showChances.addEventListener("mouseout", hideChance.bind(this));
		function hideChance() {
			this.spChances.visible = false;
		}
		
		
		
		this.spec.addEventListener("mouseover", showSps.bind(this));
		function showSps() {
			this.specialStats.visible = true;
		}
		
		this.spec.addEventListener("mouseout", hideSps.bind(this));
		function hideSps() {
			this.specialStats.visible = false;
		}
		
		
		
		this.coin.addEventListener("click", getMoney.bind(this));
		function getMoney() {
			money = money.plus(income.div(2));
			totalMoney = totalMoney.plus(income.div(2));
		}
		
		
		this.tutor.addEventListener("click", hideTutor.bind(this));
		function hideTutor() {
			tutVis = false;
		}
		
		
		this.tutShow.addEventListener("click", showTutor.bind(this));
		function showTutor() {
			tutVis = true;
		}
		
		
		this.addEventListener("tick", setAmos.bind(this));
		function setAmos() {
			
			
			this.buy1.amo.text = "1";
			this.buy10.amo.text = "10";
			this.buy100.amo.text = "100";
			this.buymax.amo.text = "MAX";
			
			if (buyAmo == 1) {
				this.buy1.gotoAndStop(1);
				this.buy10.gotoAndStop(0);
				this.buy100.gotoAndStop(0);
				this.buymax.gotoAndStop(0);
				
				buyAmos[0] = 1;
				buyAmos[1] = 1;
				buyAmos[2] = 1;
				buyAmos[3] = 1;
				buyAmos[4] = 1;
				buyAmos[5] = 1;
				buyAmos[6] = 1;
			}
			else if (buyAmo == 2) {
				this.buy1.gotoAndStop(0);
				this.buy10.gotoAndStop(1);
				this.buy100.gotoAndStop(0);
				this.buymax.gotoAndStop(0);
				
				buyAmos[0] = 10;
				buyAmos[1] = 10;
				buyAmos[2] = 10;
				buyAmos[3] = 10;
				buyAmos[4] = 10;
				buyAmos[5] = 10;
				buyAmos[6] = 10;
			}
			else if (buyAmo == 3) {
				this.buy1.gotoAndStop(0);
				this.buy10.gotoAndStop(0);
				this.buy100.gotoAndStop(1);
				this.buymax.gotoAndStop(0);
				
				buyAmos[0] = 100;
				buyAmos[1] = 100;
				buyAmos[2] = 100;
				buyAmos[3] = 100;
				buyAmos[4] = 100;
				buyAmos[5] = 100;
				buyAmos[6] = 100;
			}
			else if (buyAmo == 4) {
				this.buy1.gotoAndStop(0);
				this.buy10.gotoAndStop(0);
				this.buy100.gotoAndStop(0);
				this.buymax.gotoAndStop(1);
				
				buyAmos[0] = Decimal.floor(Decimal.log(money.div(upgrades[0].nowCost).times(upgrades[0].costInc.sub(1)).plus(1), nd(2)).div(Decimal.log(upgrades[0].costInc, nd(2)))).toNumber();
				buyAmos[1] = Decimal.floor(Decimal.log(money.div(upgrades[1].nowCost).times(upgrades[1].costInc.sub(1)).plus(1), nd(2)).div(Decimal.log(upgrades[1].costInc, nd(2)))).toNumber();
				buyAmos[2] = Decimal.floor(Decimal.log(money.div(upgrades[2].nowCost).times(upgrades[2].costInc.sub(1)).plus(1), nd(2)).div(Decimal.log(upgrades[2].costInc, nd(2)))).toNumber();
				buyAmos[3] = Decimal.floor(Decimal.log(money.div(upgrades[3].nowCost).times(upgrades[3].costInc.sub(1)).plus(1), nd(2)).div(Decimal.log(upgrades[3].costInc, nd(2)))).toNumber();
				buyAmos[3] = Math.min(buyAmos[3], 100);
				buyAmos[4] = Decimal.floor(Decimal.log(money.div(upgrades[4].nowCost).times(upgrades[4].costInc.sub(1)).plus(1), nd(2)).div(Decimal.log(upgrades[4].costInc, nd(2)))).toNumber();
				buyAmos[5] = Decimal.floor((upgrades[5].costInc.sub(upgrades[5].nowCost.times(nd(2))).plus(Decimal.sqrt(nd(4).times(upgrades[5].nowCost).times(upgrades[5].nowCost).plus(upgrades[5].costInc.times(upgrades[5].costInc)).sub(nd(4).times(upgrades[5].nowCost).times(upgrades[5].costInc)).plus(nd(8).times(upgrades[5].costInc).times(magnets))))).div(nd(2).times(upgrades[5].costInc))).toNumber();
				buyAmos[6] = Decimal.floor((upgrades[6].costInc.sub(upgrades[6].nowCost.times(nd(2))).plus(Decimal.sqrt(nd(4).times(upgrades[6].nowCost).times(upgrades[6].nowCost).plus(upgrades[6].costInc.times(upgrades[6].costInc)).sub(nd(4).times(upgrades[6].nowCost).times(upgrades[6].costInc)).plus(nd(8).times(upgrades[6].costInc).times(magnets))))).div(nd(2).times(upgrades[6].costInc))).toNumber();
			}
			
			buyAmos[0] = Math.max(buyAmos[0], 1);
			buyAmos[1] = Math.max(buyAmos[1], 1);
			buyAmos[2] = Math.max(buyAmos[2], 1);
			buyAmos[3] = Math.max(buyAmos[3], 1);
			buyAmos[4] = Math.max(buyAmos[4], 1);
			buyAmos[5] = Math.max(buyAmos[5], 1);
			buyAmos[6] = Math.max(buyAmos[6], 1);
			
			buyAmos[0] = Math.min(buyAmos[0], upgrades[0].maxLevel - upgrades[0].level);
			buyAmos[1] = Math.min(buyAmos[1], upgrades[1].maxLevel - upgrades[1].level);
			buyAmos[2] = Math.min(buyAmos[2], upgrades[2].maxLevel - upgrades[2].level);
			buyAmos[3] = Math.min(buyAmos[3], upgrades[3].maxLevel - upgrades[3].level);
			buyAmos[4] = Math.min(buyAmos[4], upgrades[4].maxLevel - upgrades[4].level);
			buyAmos[5] = Math.min(buyAmos[5], upgrades[5].maxLevel - upgrades[5].level);
			buyAmos[6] = Math.min(buyAmos[6], upgrades[6].maxLevel - upgrades[6].level);
			
		}
		
		
		this.buy1.addEventListener("click", setA1.bind(this));
		function setA1() {
			buyAmo = 1;
		}
		
		this.buy10.addEventListener("click", setA10.bind(this));
		function setA10() {
			buyAmo = 2;
		}
		
		this.buy100.addEventListener("click", setA100.bind(this));
		function setA100() {
			buyAmo = 3;
		}
		
		this.buymax.addEventListener("click", setAmax.bind(this));
		function setAmax() {
			buyAmo = 4;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// tutor
	this.tutor = new lib.tutor();
	this.tutor.name = "tutor";
	this.tutor.setTransform(641.9,359.4,1,1,0,0,0,641.9,359.4);
	new cjs.ButtonHelper(this.tutor, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.tutor).wait(1));

	// format
	this.cGames = new lib.cGamess();
	this.cGames.name = "cGames";
	this.cGames.setTransform(10.95,92.1,1.0847,1.0847,0,0,0,0.4,60.3);
	new cjs.ButtonHelper(this.cGames, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.cGames).wait(1));

	// goldenTree
	this.goldenW = new lib.goldenW();
	this.goldenW.name = "goldenW";
	this.goldenW.setTransform(627.55,323.35,1,1,0,0,0,357.4,323.9);

	this.timeline.addTween(cjs.Tween.get(this.goldenW).wait(1));

	// special_stats
	this.specialStats = new lib.specialStats();
	this.specialStats.name = "specialStats";
	this.specialStats.setTransform(836.95,229.1,1,1,0,0,0,104.1,109.2);

	this.timeline.addTween(cjs.Tween.get(this.specialStats).wait(1));

	// helps
	this.sp8 = new cjs.Text("???", "bold 7px 'Arial'", "#FFFFFF");
	this.sp8.name = "sp8";
	this.sp8.textAlign = "center";
	this.sp8.lineHeight = 10;
	this.sp8.lineWidth = 28;
	this.sp8.parent = this;
	this.sp8.setTransform(845.55,616.3966,2.1822,2.2964,-90);

	this.sp7 = new cjs.Text("???", "bold 7px 'Arial'", "#FFFFFF");
	this.sp7.name = "sp7";
	this.sp7.textAlign = "center";
	this.sp7.lineHeight = 10;
	this.sp7.lineWidth = 28;
	this.sp7.parent = this;
	this.sp7.setTransform(801.85,616.0966,2.1822,2.2964,-90);

	this.sp6 = new cjs.Text("???", "bold 7px 'Arial'", "#FFFFFF");
	this.sp6.name = "sp6";
	this.sp6.textAlign = "center";
	this.sp6.lineHeight = 10;
	this.sp6.lineWidth = 28;
	this.sp6.parent = this;
	this.sp6.setTransform(759.15,616.0466,2.1822,2.2964,-90);

	this.sp5 = new cjs.Text("???", "bold 7px 'Arial'", "#FFFFFF");
	this.sp5.name = "sp5";
	this.sp5.textAlign = "center";
	this.sp5.lineHeight = 10;
	this.sp5.lineWidth = 28;
	this.sp5.parent = this;
	this.sp5.setTransform(716.6,616.2966,2.1822,2.2964,-90);

	this.sp4 = new cjs.Text("???", "bold 7px 'Arial'", "#FFFFFF");
	this.sp4.name = "sp4";
	this.sp4.textAlign = "center";
	this.sp4.lineHeight = 10;
	this.sp4.lineWidth = 28;
	this.sp4.parent = this;
	this.sp4.setTransform(673.9,616.2466,2.1822,2.2964,-90);

	this.sp3 = new cjs.Text("???", "bold 7px 'Arial'", "#FFFFFF");
	this.sp3.name = "sp3";
	this.sp3.textAlign = "center";
	this.sp3.lineHeight = 10;
	this.sp3.lineWidth = 28;
	this.sp3.parent = this;
	this.sp3.setTransform(631.7,616.1966,2.1822,2.2964,-90);

	this.sp2 = new cjs.Text("???", "bold 7px 'Arial'", "#FFFFFF");
	this.sp2.name = "sp2";
	this.sp2.textAlign = "center";
	this.sp2.lineHeight = 10;
	this.sp2.lineWidth = 28;
	this.sp2.parent = this;
	this.sp2.setTransform(588.45,616.0966,2.1822,2.2964,-90);

	this.sp1 = new cjs.Text("???", "bold 7px 'Arial'", "#FFFFFF");
	this.sp1.name = "sp1";
	this.sp1.textAlign = "center";
	this.sp1.lineHeight = 10;
	this.sp1.lineWidth = 28;
	this.sp1.parent = this;
	this.sp1.setTransform(545.2,615.9966,2.1822,2.2964,-90);

	this.scroller = new lib.scroller();
	this.scroller.name = "scroller";
	this.scroller.setTransform(967.55,592.55,1.1468,1,0,0,0,12.6,18.3);

	this.scrollBar = new lib.scrollBar();
	this.scrollBar.name = "scrollBar";
	this.scrollBar.setTransform(966.95,413.6,1,1,0,0,0,15.1,219.5);

	this.text = new cjs.Text("主", "bold 7px 'Arial'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 10;
	this.text.lineWidth = 22;
	this.text.parent = this;
	this.text.setTransform(407.3,615.9,3.4009,3.5789,-90);

	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(282,580.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text},{t:this.scrollBar},{t:this.scroller},{t:this.sp1},{t:this.sp2},{t:this.sp3},{t:this.sp4},{t:this.sp5},{t:this.sp6},{t:this.sp7},{t:this.sp8}]}).wait(1));

	// cgames
	this.barkCns = new cjs.Text("+ 100,000 BC", "16px 'Bahnschrift'", "#FFCC00");
	this.barkCns.name = "barkCns";
	this.barkCns.textAlign = "right";
	this.barkCns.lineHeight = 21;
	this.barkCns.lineWidth = 100;
	this.barkCns.parent = this;
	this.barkCns.setTransform(-97.1,473.1,1.8913,1.8913);

	this.helpSplash = new cjs.Text(":)", "bold 10px 'Arial'");
	this.helpSplash.name = "helpSplash";
	this.helpSplash.textAlign = "center";
	this.helpSplash.lineHeight = 13;
	this.helpSplash.lineWidth = 95;
	this.helpSplash.parent = this;
	this.helpSplash.setTransform(38.0755,635.2,1.0635,1.0607);

	this.adButton = new lib.adButtont();
	this.adButton.name = "adButton";
	this.adButton.setTransform(131.7,644.9,0.7735,0.7715,0,0,0,81.7,22.6);

	this.speedUP_b = new lib.speedUP_b();
	this.speedUP_b.name = "speedUP_b";
	this.speedUP_b.setTransform(45.9,607.25,0.7258,0.7239,0,0,0,0.1,0.1);

	this.spdTime = new cjs.Text("1h 30m 59s", "bold 18px 'Consolas'");
	this.spdTime.name = "spdTime";
	this.spdTime.textAlign = "center";
	this.spdTime.lineHeight = 23;
	this.spdTime.lineWidth = 161;
	this.spdTime.parent = this;
	this.spdTime.setTransform(129.3,605.65,0.7879,0.7858);

	this.spdUP = new cjs.Text("加速 (x2, max 1h)", "bold 18px 'Consolas'");
	this.spdUP.name = "spdUP";
	this.spdUP.textAlign = "center";
	this.spdUP.lineHeight = 23;
	this.spdUP.lineWidth = 208;
	this.spdUP.parent = this;
	this.spdUP.setTransform(130.3574,590.35,0.6023,0.6007);

	this.midAd = new lib.midAd();
	this.midAd.name = "midAd";
	this.midAd.setTransform(-142.7,227.3,1,1,0,0,0,109.7,55.5);

	this.chipG = new lib.chipG();
	this.chipG.name = "chipG";
	this.chipG.setTransform(-204.15,5.9,1,1,0,0,0,9,-10.2);
	new cjs.ButtonHelper(this.chipG, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.chipG},{t:this.midAd},{t:this.spdUP},{t:this.spdTime},{t:this.speedUP_b},{t:this.adButton},{t:this.helpSplash},{t:this.barkCns}]}).wait(1));

	// main
	this.buymax = new lib.buyAmo();
	this.buymax.name = "buymax";
	this.buymax.setTransform(976.35,100.7,0.9197,0.9197,0,0,0,18.9,11.7);

	this.buy100 = new lib.buyAmo();
	this.buy100.name = "buy100";
	this.buy100.setTransform(976.35,73.4,0.9197,0.9197,0,0,0,18.9,11.7);

	this.buy10 = new lib.buyAmo();
	this.buy10.name = "buy10";
	this.buy10.setTransform(976.35,46,0.9197,0.9197,0,0,0,18.9,11.7);

	this.buy1 = new lib.buyAmo();
	this.buy1.name = "buy1";
	this.buy1.setTransform(958.95,8.15,0.9197,0.9197);

	this.tutShow = new lib.tutShow();
	this.tutShow.name = "tutShow";
	this.tutShow.setTransform(1261.7,17.9,1,1,0,0,0,15.3,15.3);
	new cjs.ButtonHelper(this.tutShow, 0, 1, 2);

	this.gameMade = new cjs.Text("游戏作者 denisolenison.\nInspired by ducdat0507's TPT mod.", "bold 12px 'Arial'");
	this.gameMade.name = "gameMade";
	this.gameMade.textAlign = "center";
	this.gameMade.lineHeight = 16;
	this.gameMade.lineWidth = 135;
	this.gameMade.parent = this;
	this.gameMade.setTransform(111.45,457.25,1.4924,1.4924);

	this.helpClick = new cjs.Text("+50% $/s / 点击", "bold 15px 'Arial'");
	this.helpClick.name = "helpClick";
	this.helpClick.textAlign = "center";
	this.helpClick.lineHeight = 19;
	this.helpClick.lineWidth = 135;
	this.helpClick.parent = this;
	this.helpClick.setTransform(112.65,255.75,1.4924,1.4924);

	this.coin = new lib.coin_();
	this.coin.name = "coin";
	this.coin.setTransform(118.2,357.85,1,1,0,0,0,76,70.2);

	this.tBlock9 = new lib.tBlock9();
	this.tBlock9.name = "tBlock9";
	this.tBlock9.setTransform(746.35,768.45,1,1,0,0,0,-116.7,17.8);

	this.tBlock8 = new lib.tBlock8();
	this.tBlock8.name = "tBlock8";
	this.tBlock8.setTransform(683.55,768.45,1,1,0,0,0,-116.7,17.8);

	this.tBlock7 = new lib.tBlock7();
	this.tBlock7.name = "tBlock7";
	this.tBlock7.setTransform(621.75,768.45,1,1,0,0,0,-116.7,17.8);

	this.tBlock6 = new lib.tBlock6();
	this.tBlock6.name = "tBlock6";
	this.tBlock6.setTransform(561.65,768.45,1,1,0,0,0,-116.7,17.8);

	this.tBlock5 = new lib.tBlock5();
	this.tBlock5.name = "tBlock5";
	this.tBlock5.setTransform(502.8,768.45,1,1,0,0,0,-116.7,17.8);

	this.spChances = new lib.spChances();
	this.spChances.name = "spChances";
	this.spChances.setTransform(1191.85,476.95,1,1,0,0,0,77.8,119.1);
	this.spChances.visible = false;

	this.u7 = new lib.u1();
	this.u7.name = "u7";
	this.u7.setTransform(1108.05,573.5,1,1,0,0,0,95.4,36.1);

	this.u6 = new lib.u1();
	this.u6.name = "u6";
	this.u6.setTransform(1108.05,486,1,1,0,0,0,95.4,36.1);

	this.u5 = new lib.u1();
	this.u5.name = "u5";
	this.u5.setTransform(1108.05,401.7,1,1,0,0,0,95.4,36.1);

	this.tBlock4 = new lib.tBlock4();
	this.tBlock4.name = "tBlock4";
	this.tBlock4.setTransform(438.1,768.45,1,1,0,0,0,-116.7,17.8);

	this.xpxp = new cjs.Text("0 / 10 合并", "bold 12px 'Arial'");
	this.xpxp.name = "xpxp";
	this.xpxp.textAlign = "center";
	this.xpxp.lineHeight = 16;
	this.xpxp.lineWidth = 100;
	this.xpxp.parent = this;
	this.xpxp.setTransform(235.2,441,2.2269,2.2269,-90);

	this.levBonus = new cjs.Text("x200,000 到 $ 增益", "bold 12px 'Arial'");
	this.levBonus.name = "levBonus";
	this.levBonus.textAlign = "center";
	this.levBonus.lineHeight = 16;
	this.levBonus.lineWidth = 127;
	this.levBonus.parent = this;
	this.levBonus.setTransform(93.1454,153.55,1.4102,1.4102);

	this.leve = new cjs.Text("1234", "bold 12px 'Arial'");
	this.leve.name = "leve";
	this.leve.textAlign = "center";
	this.leve.lineHeight = 16;
	this.leve.lineWidth = 29;
	this.leve.parent = this;
	this.leve.setTransform(231.6,146.4,3.3867,3.3867);

	this.instance_1 = new lib.levShow();
	this.instance_1.setTransform(280.65,122.55,1.1917,1.1917,0,0,0,79,4);

	this.instance_2 = new lib.frame_xp();
	this.instance_2.setTransform(248.65,427.4,1,1,0,0,0,32.5,222.8);

	this.xpBar = new lib.xpBar();
	this.xpBar.name = "xpBar";
	this.xpBar.setTransform(248.65,427.4,1,1,0,0,0,32.5,222.8);

	this.tBlock3 = new lib.tBlock3();
	this.tBlock3.name = "tBlock3";
	this.tBlock3.setTransform(496.75,750.65);

	this.treeLOC = new lib.treeLOC();
	this.treeLOC.name = "treeLOC";
	this.treeLOC.setTransform(227.8,59.85,1.0247,1.0254,0,0,0,42.1,58.5);

	this.goldenTree = new lib.goldenTree();
	this.goldenTree.name = "goldenTree";
	this.goldenTree.setTransform(228.75,118.6,1,1.0257,0,0,0,41.5,114.6);
	new cjs.ButtonHelper(this.goldenTree, 0, 1, 2);

	this.hoverBlock = new lib.hoverBlock();
	this.hoverBlock.name = "hoverBlock";
	this.hoverBlock.setTransform(311.65,843.25,1,1,0,0,0,41.5,13.2);

	this.showChances = new lib.showChances();
	this.showChances.name = "showChances";
	this.showChances.setTransform(1240.15,316.25,1,1,0,0,0,28.6,28.6);
	new cjs.ButtonHelper(this.showChances, 0, 1, 2);

	this.u4 = new lib.u1();
	this.u4.name = "u4";
	this.u4.setTransform(1108.05,316.3,1,1,0,0,0,95.4,36.1);

	this.tBlock2 = new lib.tBlock2();
	this.tBlock2.name = "tBlock2";
	this.tBlock2.setTransform(438,750.65);

	this.u3 = new lib.u1();
	this.u3.name = "u3";
	this.u3.setTransform(1108.05,228.8,1,1,0,0,0,95.4,36.1);

	this.u2 = new lib.u1();
	this.u2.name = "u2";
	this.u2.setTransform(1108.05,144.5,1,1,0,0,0,95.4,36.1);

	this.u1 = new lib.u1();
	this.u1.name = "u1";
	this.u1.setTransform(1108.05,59.1,1,1,0,0,0,95.4,36.1);

	this.ground = new lib.ground();
	this.ground.name = "ground";
	this.ground.setTransform(617.3,402.2,1,1,0,0,0,335.3,245.2);

	this.instance_3 = new lib.frame();
	this.instance_3.setTransform(626.35,-1065.3,1,1,0,0,0,356.2,-1185.2);

	this.barP = new cjs.Text("0/5", "bold 10px 'Arial'");
	this.barP.name = "barP";
	this.barP.textAlign = "center";
	this.barP.lineHeight = 13;
	this.barP.lineWidth = 236;
	this.barP.parent = this;
	this.barP.setTransform(625.1819,124.45,2.9545,2.9545);

	this.bar = new lib.bar_progress();
	this.bar.name = "bar";
	this.bar.setTransform(626.35,138.8,1,1,0,0,0,356.2,18.9);

	this.spec = new lib.specialSee();
	this.spec.name = "spec";
	this.spec.setTransform(897.15,98.45,1,1,0,0,0,43.9,21.4);
	new cjs.ButtonHelper(this.spec, 0, 1, 2);

	this.mch = new cjs.Text("ch.: 99.99%", "bold 10px 'Arial'");
	this.mch.name = "mch";
	this.mch.lineHeight = 13;
	this.mch.lineWidth = 59;
	this.mch.parent = this;
	this.mch.setTransform(766.1,94.75,1.4043,1.4043);

	this.instance_4 = new lib.magnet();
	this.instance_4.setTransform(749.65,99.25,0.4928,0.4928,0,0,0,27,27.6);

	this.mags = new cjs.Text(": 160,000", "bold 12px 'Arial'");
	this.mags.name = "mags";
	this.mags.lineHeight = 16;
	this.mags.lineWidth = 72;
	this.mags.parent = this;
	this.mags.setTransform(835.55,52.75,1.4043,1.4043);

	this.instance_5 = new lib.magnet();
	this.instance_5.setTransform(819.1,59.05,0.4928,0.4928,0,0,0,27,27.6);

	this.spChance = new cjs.Text("Special Chance: 10.99%", "bold 9px 'Arial'");
	this.spChance.name = "spChance";
	this.spChance.textAlign = "center";
	this.spChance.lineHeight = 12;
	this.spChance.lineWidth = 100;
	this.spChance.parent = this;
	this.spChance.setTransform(363.35,83.85,1.5734,1.5734);

	this.maxH = new cjs.Text("最大高度: 10", "bold 11px 'Arial'");
	this.maxH.name = "maxH";
	this.maxH.textAlign = "center";
	this.maxH.lineHeight = 15;
	this.maxH.lineWidth = 100;
	this.maxH.parent = this;
	this.maxH.setTransform(363.35,50.9,1.7613,1.7613);

	this.sps = new cjs.Text("/s : 160,000", "bold 11px 'Arial'");
	this.sps.name = "sps";
	this.sps.lineHeight = 15;
	this.sps.lineWidth = 64;
	this.sps.parent = this;
	this.sps.setTransform(638,94.25,1.4043,1.4043);

	this.instance_6 = new lib.sapphire();
	this.instance_6.setTransform(624.5,101.05,0.6467,0.6467,0,0,0,18.7,20.2);

	this.eps = new cjs.Text("/s : 160,000", "bold 12px 'Arial'");
	this.eps.name = "eps";
	this.eps.lineHeight = 16;
	this.eps.lineWidth = 83;
	this.eps.parent = this;
	this.eps.setTransform(676.25,52.75,1.4043,1.4043);

	this.instance_7 = new lib.emerald();
	this.instance_7.setTransform(662.75,59.55,0.6467,0.6467,0,0,0,18.7,20.2);

	this.saps = new cjs.Text(": 160,000", "bold 12px 'Arial'");
	this.saps.name = "saps";
	this.saps.lineHeight = 16;
	this.saps.lineWidth = 77;
	this.saps.parent = this;
	this.saps.setTransform(801.65,11.8,1.6571,1.6571);

	this.ems = new cjs.Text(": 160,000", "bold 12px 'Arial'");
	this.ems.name = "ems";
	this.ems.lineHeight = 16;
	this.ems.lineWidth = 77;
	this.ems.parent = this;
	this.ems.setTransform(631.75,11.8,1.6571,1.6571);

	this.instance_8 = new lib.sapphire();
	this.instance_8.setTransform(784.05,20.4,0.7398,0.7398,0,0,0,18.6,20.2);

	this.instance_9 = new lib.emerald();
	this.instance_9.setTransform(617.2,20.85,0.7398,0.7398,0,0,0,18.7,20.2);

	this.golds = new cjs.Text(": 160,000", "bold 12px 'Arial'");
	this.golds.name = "golds";
	this.golds.lineHeight = 16;
	this.golds.lineWidth = 77;
	this.golds.parent = this;
	this.golds.setTransform(457.05,11.8,1.6571,1.6571);

	this.gps = new cjs.Text("/s: 160,000", "bold 12px 'Arial'");
	this.gps.name = "gps";
	this.gps.lineHeight = 16;
	this.gps.lineWidth = 71;
	this.gps.parent = this;
	this.gps.setTransform(496.95,92.35,1.5269,1.5269);

	this.instance_10 = new lib.gCube();
	this.instance_10.setTransform(477.8,98.2,0.813,0.813,0,0,0,18.4,19.9);

	this.instance_11 = new lib.gCube();
	this.instance_11.setTransform(438.75,21.4,0.813,0.813,0,0,0,18.4,19.9);

	this.cps = new cjs.Text("/s: 160,000", "bold 12px 'Arial'");
	this.cps.name = "cps";
	this.cps.lineHeight = 16;
	this.cps.lineWidth = 95;
	this.cps.parent = this;
	this.cps.setTransform(494.75,50.55,1.5269,1.5269);

	this.instance_12 = new lib.coin();
	this.instance_12.setTransform(477.55,58.6,1,1,0,0,0,12.5,12.2);

	this.instance_13 = new lib.coin();
	this.instance_13.setTransform(288,20,1,1,0,0,0,12.5,12.2);

	this.coins = new cjs.Text(":", "bold 12px 'Arial'");
	this.coins.name = "coins";
	this.coins.lineHeight = 14;
	this.coins.lineWidth = 82;
	this.coins.parent = this;
	this.coins.setTransform(306.65,14.2,1.3201,1.3201);

	this.goDOWN = new lib.goUP();
	this.goDOWN.name = "goDOWN";
	this.goDOWN.setTransform(968.45,629.6,1,1,180,0,0,15.5,17.8);
	new cjs.ButtonHelper(this.goDOWN, 0, 1, 1);

	this.goUP = new lib.goUP();
	this.goUP.name = "goUP";
	this.goUP.setTransform(967.1,175.65,1,1,0,0,0,15.5,17.8);
	new cjs.ButtonHelper(this.goUP, 0, 1, 1);

	this.tBlock = new lib.tBlock();
	this.tBlock.name = "tBlock";
	this.tBlock.setTransform(158.6,733.1);

	this.instance_14 = new lib.CachedBmp_2();
	this.instance_14.setTransform(0.05,-1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.tBlock},{t:this.goUP},{t:this.goDOWN},{t:this.coins},{t:this.instance_13},{t:this.instance_12},{t:this.cps},{t:this.instance_11},{t:this.instance_10},{t:this.gps},{t:this.golds},{t:this.instance_9},{t:this.instance_8},{t:this.ems},{t:this.saps},{t:this.instance_7},{t:this.eps},{t:this.instance_6},{t:this.sps},{t:this.maxH},{t:this.spChance},{t:this.instance_5},{t:this.mags},{t:this.instance_4},{t:this.mch},{t:this.spec},{t:this.bar},{t:this.barP},{t:this.instance_3},{t:this.ground},{t:this.u1},{t:this.u2},{t:this.u3},{t:this.tBlock2},{t:this.u4},{t:this.showChances},{t:this.hoverBlock},{t:this.goldenTree},{t:this.treeLOC},{t:this.tBlock3},{t:this.xpBar},{t:this.instance_2},{t:this.instance_1},{t:this.leve},{t:this.levBonus},{t:this.xpxp},{t:this.tBlock4},{t:this.u5},{t:this.u6},{t:this.u7},{t:this.spChances},{t:this.tBlock5},{t:this.tBlock6},{t:this.tBlock7},{t:this.tBlock8},{t:this.tBlock9},{t:this.coin},{t:this.helpClick},{t:this.gameMade},{t:this.tutShow},{t:this.buy1},{t:this.buy10},{t:this.buy100},{t:this.buymax}]}).wait(1));

	// bg
	this.instance_15 = new lib.Растровоеизображение12();

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(350,-2418,970.5,4875.2);
// library properties:
lib.properties = {
	id: 'E062DD079119F64C8B948FDFFBBA7402',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFCC",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_129.png?1634031625707", id:"CachedBmp_129"},
		{src:"images/CachedBmp_128.png?1634031625707", id:"CachedBmp_128"},
		{src:"images/CachedBmp_60.png?1634031625707", id:"CachedBmp_60"},
		{src:"images/CachedBmp_65.png?1634031625707", id:"CachedBmp_65"},
		{src:"images/CachedBmp_29.png?1634031625707", id:"CachedBmp_29"},
		{src:"images/CachedBmp_30.png?1634031625707", id:"CachedBmp_30"},
		{src:"images/CachedBmp_10.png?1634031625707", id:"CachedBmp_10"},
		{src:"images/CachedBmp_11.png?1634031625707", id:"CachedBmp_11"},
		{src:"images/Растровоеизображение16.png?1634031625707", id:"Растровоеизображение16"},
		{src:"images/Растровоеизображение2.png?1634031625707", id:"Растровоеизображение2"},
		{src:"images/Растровоеизображение3.png?1634031625707", id:"Растровоеизображение3"},
		{src:"images/Растровоеизображение6.png?1634031625707", id:"Растровоеизображение6"},
		{src:"images/Растровоеизображение4.png?1634031625707", id:"Растровоеизображение4"},
		{src:"images/Растровоеизображение7.png?1634031625707", id:"Растровоеизображение7"},
		{src:"images/Растровоеизображение5.png?1634031625707", id:"Растровоеизображение5"},
		{src:"images/Растровоеизображение12.png?1634031625707", id:"Растровоеизображение12"},
		{src:"images/CachedBmp_6.png?1634031625707", id:"CachedBmp_6"},
		{src:"images/CachedBmp_1.png?1634031625707", id:"CachedBmp_1"},
		{src:"images/CachedBmp_31.png?1634031625707", id:"CachedBmp_31"},
		{src:"images/CachedBmp_4.png?1634031625707", id:"CachedBmp_4"},
		{src:"images/CachedBmp_38.png?1634031625707", id:"CachedBmp_38"},
		{src:"images/CachedBmp_124.png?1634031625707", id:"CachedBmp_124"},
		{src:"images/CachedBmp_2.png?1634031625707", id:"CachedBmp_2"},
		{src:"images/CachedBmp_39.png?1634031625707", id:"CachedBmp_39"},
		{src:"images/index_atlas_1.png?1634031625597", id:"index_atlas_1"},
		{src:"images/index_atlas_2.png?1634031625597", id:"index_atlas_2"},
		{src:"images/index_atlas_3.png?1634031625597", id:"index_atlas_3"},
		{src:"images/index_atlas_4.png?1634031625597", id:"index_atlas_4"},
		{src:"images/index_atlas_5.png?1634031625597", id:"index_atlas_5"},
		{src:"images/index_atlas_6.png?1634031625597", id:"index_atlas_6"},
		{src:"images/index_atlas_7.png?1634031625597", id:"index_atlas_7"},
		{src:"images/index_atlas_8.png?1634031625598", id:"index_atlas_8"},
		{src:"images/index_atlas_9.png?1634031625598", id:"index_atlas_9"},
		{src:"images/index_atlas_10.png?1634031625598", id:"index_atlas_10"},
		{src:"images/index_atlas_11.png?1634031625598", id:"index_atlas_11"},
		{src:"images/index_atlas_12.png?1634031625598", id:"index_atlas_12"},
		{src:"images/index_atlas_13.png?1634031625598", id:"index_atlas_13"},
		{src:"images/index_atlas_14.png?1634031625598", id:"index_atlas_14"},
		{src:"images/index_atlas_15.png?1634031625598", id:"index_atlas_15"},
		{src:"images/index_atlas_16.png?1634031625599", id:"index_atlas_16"},
		{src:"images/index_atlas_17.png?1634031625599", id:"index_atlas_17"},
		{src:"images/index_atlas_18.png?1634031625599", id:"index_atlas_18"},
		{src:"images/index_atlas_19.png?1634031625600", id:"index_atlas_19"},
		{src:"images/index_atlas_20.png?1634031625600", id:"index_atlas_20"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['E062DD079119F64C8B948FDFFBBA7402'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;