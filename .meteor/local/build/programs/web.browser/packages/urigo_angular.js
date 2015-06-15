//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var ObserveSequence = Package['observe-sequence'].ObserveSequence;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/lib/angular-hash-key-copier.js                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
(function( ng ) {                                                                                                    // 1
	"use strict";                                                                                                       // 2
                                                                                                                     // 3
	// We're going to package this as its own module. Not sure how else to distribute                                   // 4
	// an AngularJS class since it depends on an actual application name at the code-                                   // 5
	// time of the class definition.                                                                                    // 6
	var module = ng.module( "hashKeyCopier", [] );                                                                      // 7
                                                                                                                     // 8
	// Define the injectable. We're using "value" because the result is a construtor,                                   // 9
	// NOT the result of a constructor instantiation.                                                                   // 10
	module.value( "HashKeyCopier", HashKeyCopier );                                                                     // 11
                                                                                                                     // 12
	// I am the constructor.                                                                                            // 13
	function HashKeyCopier( source, destination, uniqueIdentifiers ) {                                                  // 14
                                                                                                                     // 15
		// ---                                                                                                             // 16
		// INITIALIZATION.                                                                                                 // 17
		// ---                                                                                                             // 18
                                                                                                                     // 19
                                                                                                                     // 20
		// I am the key that AngularJS uses to store the expando property.                                                 // 21
		var hashKeyPropertyName = "$$hashKey";                                                                             // 22
                                                                                                                     // 23
		// I am the index of hashKeys in the source object. This provides a pseudo-                                        // 24
		// location of each hashKey value based on the structure of the source object.                                     // 25
		var hashKeyIndex = {};                                                                                             // 26
                                                                                                                     // 27
		// I am a collection of keys used to determine the identity of an object at a                                      // 28
		// given location within the source / destination targets. It is one of these                                      // 29
		// keys that will be used to determine if two objects are logically equivalent;                                    // 30
		// and therefore, should have the same hashKey.                                                                    // 31
		//                                                                                                                 // 32
		// If nothing is provided, default to the most common - ID.                                                        // 33
		if ( ! uniqueIdentifiers ) {                                                                                       // 34
                                                                                                                     // 35
			uniqueIdentifiers = [ "id" ];                                                                                     // 36
                                                                                                                     // 37
		}                                                                                                                  // 38
                                                                                                                     // 39
		// I am the RegEx pattern that determins if a given string represents a proprietary                                // 40
		// AngularJS name - they all being with "$". We don't need to waste our time                                       // 41
		// looking at these properties when it comes to iterating over our targets.                                        // 42
		var angularJSPropertyPattern = /^$/i;                                                                              // 43
                                                                                                                     // 44
                                                                                                                     // 45
		// ---                                                                                                             // 46
		// PUBLIC METDHODS.                                                                                                // 47
		// ---                                                                                                             // 48
                                                                                                                     // 49
                                                                                                                     // 50
		// I execute the copy operation from the source object to the destination object.                                  // 51
		function copyHashKeys() {	                                                                                         // 52
                                                                                                                     // 53
			// If either the existing or the source objects are empty, there's nothing to                                     // 54
			// do - just return the destination.                                                                              // 55
			if ( isTargetEmpty( source ) || isTargetEmpty( destination ) ) {                                                  // 56
				                                                                                                                 // 57
				return( destination );                                                                                           // 58
                                                                                                                     // 59
			}                                                                                                                 // 60
                                                                                                                     // 61
			// Reset the hash key index for the copy operation.                                                               // 62
			hashKeyIndex = {};                                                                                                // 63
                                                                                                                     // 64
			// Build and apply the hashkey index.                                                                             // 65
			buildHashKeyIndexFromSource();                                                                                    // 66
			applyHashKeyIndexToDestination();                                                                                 // 67
                                                                                                                     // 68
			return( destination );                                                                                            // 69
                                                                                                                     // 70
		}                                                                                                                  // 71
                                                                                                                     // 72
                                                                                                                     // 73
		// ---                                                                                                             // 74
		// PRIVATE METDHODS.                                                                                               // 75
		// ---                                                                                                             // 76
                                                                                                                     // 77
                                                                                                                     // 78
		// I apply the hashkey index to the current destination.                                                           // 79
		function applyHashKeyIndexToDestination() {                                                                        // 80
                                                                                                                     // 81
			if ( ng.isArray( destination ) ) {                                                                                // 82
                                                                                                                     // 83
				applyHashKeyIndexToArray( "[]", destination );                                                                   // 84
                                                                                                                     // 85
			} else if ( ng.isObject( destination ) ) {                                                                        // 86
                                                                                                                     // 87
				applyHashKeyIndexToObject( ".", destination );                                                                   // 88
                                                                                                                     // 89
			}                                                                                                                 // 90
                                                                                                                     // 91
		}                                                                                                                  // 92
                                                                                                                     // 93
                                                                                                                     // 94
		// I apply the hashkey index to the given Array.                                                                   // 95
		function applyHashKeyIndexToArray( path, target ) {                                                                // 96
                                                                                                                     // 97
			for ( var i = 0, length = target.length ; i < length ; i++ ) {                                                    // 98
                                                                                                                     // 99
				var targetItem = target[ i ];                                                                                    // 100
                                                                                                                     // 101
				if ( ng.isArray( targetItem ) ) {                                                                                // 102
                                                                                                                     // 103
					applyHashKeyIndexToArray( ( path + "[]" ), targetItem );                                                        // 104
                                                                                                                     // 105
				} else if ( ng.isObject( targetItem ) ) {                                                                        // 106
                                                                                                                     // 107
					applyHashKeyIndexToObject( ( path + "." ), targetItem );                                                        // 108
                                                                                                                     // 109
				}                                                                                                                // 110
                                                                                                                     // 111
			}                                                                                                                 // 112
                                                                                                                     // 113
		}                                                                                                                  // 114
                                                                                                                     // 115
                                                                                                                     // 116
		// I apply the hasheky index to the given Object.                                                                  // 117
		function applyHashKeyIndexToObject( path, target ) {                                                               // 118
                                                                                                                     // 119
			var identifier = getUniqueIdentifierForObject( target );                                                          // 120
                                                                                                                     // 121
			if ( identifier ) {                                                                                               // 122
                                                                                                                     // 123
				var hashKeyPath = ( path + target[ identifier ] );                                                               // 124
                                                                                                                     // 125
				if ( hashKeyIndex.hasOwnProperty( hashKeyPath ) ) {                                                              // 126
                                                                                                                     // 127
					target[ hashKeyPropertyName ] = hashKeyIndex[ hashKeyPath ];                                                    // 128
                                                                                                                     // 129
				}                                                                                                                // 130
				                                                                                                                 // 131
			}                                                                                                                 // 132
                                                                                                                     // 133
			for ( var key in target ) {                                                                                       // 134
                                                                                                                     // 135
				if ( target.hasOwnProperty( key ) && isUserDefinedProperty( key ) ) {                                            // 136
                                                                                                                     // 137
					var targetItem = target[ key ];                                                                                 // 138
                                                                                                                     // 139
					if ( ng.isArray( targetItem ) ) {                                                                               // 140
                                                                                                                     // 141
						applyHashKeyIndexToArray( ( path + key + "[]" ), targetItem );                                                 // 142
                                                                                                                     // 143
					} else if ( ng.isObject( targetItem ) ) {                                                                       // 144
                                                                                                                     // 145
						applyHashKeyIndexToObject( ( path + key + "." ), targetItem );                                                 // 146
                                                                                                                     // 147
					}                                                                                                               // 148
                                                                                                                     // 149
				}                                                                                                                // 150
                                                                                                                     // 151
			}                                                                                                                 // 152
                                                                                                                     // 153
		}                                                                                                                  // 154
                                                                                                                     // 155
                                                                                                                     // 156
		// I build the hashkey index from the current source object.                                                       // 157
		function buildHashKeyIndexFromSource() {                                                                           // 158
                                                                                                                     // 159
			if ( ng.isArray( source ) ) {                                                                                     // 160
                                                                                                                     // 161
				buildHashKeyIndexFromArray( "[]", source );                                                                      // 162
                                                                                                                     // 163
			} else if ( ng.isObject( source ) ) {                                                                             // 164
                                                                                                                     // 165
				buildHashKeyIndexFromObject( ".", source );                                                                      // 166
                                                                                                                     // 167
			}                                                                                                                 // 168
                                                                                                                     // 169
		}                                                                                                                  // 170
                                                                                                                     // 171
                                                                                                                     // 172
		// I build the hashkey index from the given Array.                                                                 // 173
		function buildHashKeyIndexFromArray( path, target ) {                                                              // 174
                                                                                                                     // 175
			for ( var i = 0, length = target.length ; i < length ; i++ ) {                                                    // 176
                                                                                                                     // 177
				var targetItem = target[ i ];                                                                                    // 178
                                                                                                                     // 179
				if ( ng.isArray( targetItem ) ) {                                                                                // 180
                                                                                                                     // 181
					buildHashKeyIndexFromArray( ( path + "[]" ), targetItem );                                                      // 182
                                                                                                                     // 183
				} else if ( ng.isObject( targetItem ) ) {                                                                        // 184
                                                                                                                     // 185
					buildHashKeyIndexFromObject( ( path + "." ), targetItem );                                                      // 186
                                                                                                                     // 187
				}                                                                                                                // 188
                                                                                                                     // 189
			}                                                                                                                 // 190
                                                                                                                     // 191
		}                                                                                                                  // 192
                                                                                                                     // 193
                                                                                                                     // 194
		// I build the hashkey index from the given Object.                                                                // 195
		function buildHashKeyIndexFromObject( path, target ) {                                                             // 196
                                                                                                                     // 197
			if ( target.hasOwnProperty( hashKeyPropertyName ) ) {                                                             // 198
                                                                                                                     // 199
				var identifier = getUniqueIdentifierForObject( target );                                                         // 200
                                                                                                                     // 201
				if ( identifier ) {                                                                                              // 202
                                                                                                                     // 203
					hashKeyIndex[ path + target[ identifier ] ] = target[ hashKeyPropertyName ];                                    // 204
					                                                                                                                // 205
				}                                                                                                                // 206
                                                                                                                     // 207
			}                                                                                                                 // 208
                                                                                                                     // 209
			for ( var key in target ) {                                                                                       // 210
                                                                                                                     // 211
				if ( target.hasOwnProperty( key ) && isUserDefinedProperty( key ) ) {                                            // 212
                                                                                                                     // 213
					var targetItem = target[ key ];                                                                                 // 214
                                                                                                                     // 215
					if ( ng.isArray( targetItem ) ) {                                                                               // 216
                                                                                                                     // 217
						buildHashKeyIndexFromArray( ( path + key + "[]" ), targetItem );                                               // 218
                                                                                                                     // 219
					} else if ( ng.isObject( targetItem ) ) {                                                                       // 220
                                                                                                                     // 221
						buildHashKeyIndexFromObject( ( path + key + "." ) , targetItem );                                              // 222
                                                                                                                     // 223
					}                                                                                                               // 224
                                                                                                                     // 225
				}                                                                                                                // 226
                                                                                                                     // 227
			}                                                                                                                 // 228
                                                                                                                     // 229
		}                                                                                                                  // 230
                                                                                                                     // 231
                                                                                                                     // 232
		// I return the unique identifier for the given object; returns null if none of the                                // 233
		// keys match any of the defined identifiers.                                                                      // 234
		function getUniqueIdentifierForObject( target ) {                                                                  // 235
                                                                                                                     // 236
			for ( var i = 0, length = uniqueIdentifiers.length ; i < length ; i++ ) {                                         // 237
                                                                                                                     // 238
				var identifier = uniqueIdentifiers[ i ];                                                                         // 239
                                                                                                                     // 240
				if ( target.hasOwnProperty( identifier ) ) {                                                                     // 241
                                                                                                                     // 242
					return( identifier );                                                                                           // 243
                                                                                                                     // 244
				}                                                                                                                // 245
                                                                                                                     // 246
			}                                                                                                                 // 247
                                                                                                                     // 248
			return( null );                                                                                                   // 249
                                                                                                                     // 250
		}                                                                                                                  // 251
                                                                                                                     // 252
                                                                                                                     // 253
		// I check to see if the given object is locigally empty.                                                          // 254
		function isTargetEmpty( target ) {                                                                                 // 255
                                                                                                                     // 256
			// If the object is a falsey, determine it as empty.                                                              // 257
			if ( ! target ) {                                                                                                 // 258
                                                                                                                     // 259
				return( true );                                                                                                  // 260
                                                                                                                     // 261
			}                                                                                                                 // 262
                                                                                                                     // 263
			// If the value is an array, check its length.                                                                    // 264
			if ( ng.isArray( target ) ) {                                                                                     // 265
                                                                                                                     // 266
				return( target.length === 0 );                                                                                   // 267
                                                                                                                     // 268
			}                                                                                                                 // 269
                                                                                                                     // 270
			// If the value is an object, consider to to be non-empty.                                                        // 271
			if ( ng.isObject( target ) ) {                                                                                    // 272
                                                                                                                     // 273
				return( false );                                                                                                 // 274
                                                                                                                     // 275
			}                                                                                                                 // 276
			                                                                                                                  // 277
			// If the value was neither an array nor an object, consider it empty for the                                     // 278
			// purposes of our copy operation.                                                                                // 279
			return( true );                                                                                                   // 280
                                                                                                                     // 281
		}                                                                                                                  // 282
                                                                                                                     // 283
                                                                                                                     // 284
		// I determine if the given property name is one defined by the user (or more                                      // 285
		// specifically, one that is NOT defined by the AngularJS framework).                                              // 286
		function isUserDefinedProperty( name ) {                                                                           // 287
                                                                                                                     // 288
			return( ! angularJSPropertyPattern.test( name ) );                                                                // 289
                                                                                                                     // 290
		}                                                                                                                  // 291
                                                                                                                     // 292
                                                                                                                     // 293
		// ---                                                                                                             // 294
		// RETURN PUBLIC API.                                                                                              // 295
		// ---                                                                                                             // 296
                                                                                                                     // 297
                                                                                                                     // 298
		return({                                                                                                           // 299
			copyHashKeys: copyHashKeys                                                                                        // 300
		});                                                                                                                // 301
                                                                                                                     // 302
	}                                                                                                                   // 303
                                                                                                                     // 304
	// I provide a "static" method that encapsulates the proper instantation and                                        // 305
	// execution of the copy operation.                                                                                 // 306
	HashKeyCopier.copyHashKeys = function( source, destination, uniqueIdentifiers ) {                                   // 307
                                                                                                                     // 308
		var copier = new HashKeyCopier( source, destination, uniqueIdentifiers );                                          // 309
                                                                                                                     // 310
		copier.copyHashKeys();                                                                                             // 311
                                                                                                                     // 312
		return( destination );                                                                                             // 313
                                                                                                                     // 314
	};                                                                                                                  // 315
                                                                                                                     // 316
})( angular );                                                                                                       // 317
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/lib/diff-array.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
                                                                                                                     // 2
var module = angular.module('diffArray', []);                                                                        // 3
                                                                                                                     // 4
var idStringify = LocalCollection._idStringify;                                                                      // 5
var idParse = LocalCollection._idParse;                                                                              // 6
                                                                                                                     // 7
// Calculates the differences between `lastSeqArray` and                                                             // 8
// `seqArray` and calls appropriate functions from `callbacks`.                                                      // 9
// Reuses Minimongo's diff algorithm implementation.                                                                 // 10
var diffArray = function (lastSeqArray, seqArray, callbacks) {                                                       // 11
  var diffFn = Package.minimongo.LocalCollection._diffQueryOrderedChanges;                                           // 12
  var oldIdObjects = [];                                                                                             // 13
  var newIdObjects = [];                                                                                             // 14
  var posOld = {}; // maps from idStringify'd ids                                                                    // 15
  var posNew = {}; // ditto                                                                                          // 16
  var posCur = {};                                                                                                   // 17
  var lengthCur = lastSeqArray.length;                                                                               // 18
                                                                                                                     // 19
  _.each(seqArray, function (doc, i) {                                                                               // 20
    newIdObjects.push({_id: doc._id});                                                                               // 21
    posNew[idStringify(doc._id)] = i;                                                                                // 22
  });                                                                                                                // 23
  _.each(lastSeqArray, function (doc, i) {                                                                           // 24
    oldIdObjects.push({_id: doc._id});                                                                               // 25
    posOld[idStringify(doc._id)] = i;                                                                                // 26
    posCur[idStringify(doc._id)] = i;                                                                                // 27
  });                                                                                                                // 28
                                                                                                                     // 29
  // Arrays can contain arbitrary objects. We don't diff the                                                         // 30
  // objects. Instead we always fire 'changedAt' callback on every                                                   // 31
  // object. The consumer of `observe-sequence` should deal with                                                     // 32
  // it appropriately.                                                                                               // 33
  diffFn(oldIdObjects, newIdObjects, {                                                                               // 34
    addedBefore: function (id, doc, before) {                                                                        // 35
      var position = before ? posCur[idStringify(before)] : lengthCur;                                               // 36
                                                                                                                     // 37
      _.each(posCur, function (pos, id) {                                                                            // 38
        if (pos >= position)                                                                                         // 39
          posCur[id]++;                                                                                              // 40
      });                                                                                                            // 41
                                                                                                                     // 42
      lengthCur++;                                                                                                   // 43
      posCur[idStringify(id)] = position;                                                                            // 44
                                                                                                                     // 45
      callbacks.addedAt(                                                                                             // 46
        id,                                                                                                          // 47
        seqArray[posNew[idStringify(id)]],                                                                           // 48
        position,                                                                                                    // 49
        before);                                                                                                     // 50
    },                                                                                                               // 51
    movedBefore: function (id, before) {                                                                             // 52
      var prevPosition = posCur[idStringify(id)];                                                                    // 53
      var position = before ? posCur[idStringify(before)] : lengthCur - 1;                                           // 54
                                                                                                                     // 55
      _.each(posCur, function (pos, id) {                                                                            // 56
        if (pos >= prevPosition && pos <= position)                                                                  // 57
          posCur[id]--;                                                                                              // 58
        else if (pos <= prevPosition && pos >= position)                                                             // 59
          posCur[id]++;                                                                                              // 60
      });                                                                                                            // 61
                                                                                                                     // 62
      posCur[idStringify(id)] = position;                                                                            // 63
                                                                                                                     // 64
      callbacks.movedTo(                                                                                             // 65
        id,                                                                                                          // 66
        seqArray[posNew[idStringify(id)]],                                                                           // 67
        prevPosition,                                                                                                // 68
        position,                                                                                                    // 69
        before);                                                                                                     // 70
    },                                                                                                               // 71
    removed: function (id) {                                                                                         // 72
      var prevPosition = posCur[idStringify(id)];                                                                    // 73
                                                                                                                     // 74
      _.each(posCur, function (pos, id) {                                                                            // 75
        if (pos >= prevPosition)                                                                                     // 76
          posCur[id]--;                                                                                              // 77
      });                                                                                                            // 78
                                                                                                                     // 79
      delete posCur[idStringify(id)];                                                                                // 80
      lengthCur--;                                                                                                   // 81
                                                                                                                     // 82
      callbacks.removedAt(                                                                                           // 83
        id,                                                                                                          // 84
        lastSeqArray[posOld[idStringify(id)]],                                                                       // 85
        prevPosition);                                                                                               // 86
    }                                                                                                                // 87
  });                                                                                                                // 88
                                                                                                                     // 89
  _.each(posNew, function (pos, idString) {                                                                          // 90
    var id = idParse(idString);                                                                                      // 91
                                                                                                                     // 92
    if (_.has(posOld, idString)) {                                                                                   // 93
      var newItem = seqArray[pos];                                                                                   // 94
      var oldItem = lastSeqArray[posOld[idString]];                                                                  // 95
      var setDiff = diffObjectChanges(oldItem, newItem);                                                             // 96
      var unsetDiff = diffObjectRemovals(oldItem, newItem);                                                          // 97
                                                                                                                     // 98
      if (setDiff)                                                                                                   // 99
        setDiff._id = newItem._id;                                                                                   // 100
                                                                                                                     // 101
      if (unsetDiff)                                                                                                 // 102
        unsetDiff._id = newItem._id;                                                                                 // 103
                                                                                                                     // 104
      if (setDiff || unsetDiff)                                                                                      // 105
        callbacks.changedAt(id, setDiff, unsetDiff, pos, oldItem);                                                   // 106
    }                                                                                                                // 107
  });                                                                                                                // 108
};                                                                                                                   // 109
                                                                                                                     // 110
// Takes an object and returns a shallow copy, ie. with all keys at                                                  // 111
// a one-level depth. Transforms the name of each key using dot notation                                             // 112
var flattenObject = function (object, parentKey) {                                                                   // 113
  var flattened = {};                                                                                                // 114
                                                                                                                     // 115
  angular.forEach(object, function (value, key) {                                                                    // 116
    if (isActualObject(value)) {                                                                                     // 117
      angular.extend(flattened, flattenObject(value, key));                                                          // 118
    } else {                                                                                                         // 119
      var dotNotedKey = (parentKey) ? parentKey + "." + key : key;                                                   // 120
      flattened[dotNotedKey] = value;                                                                                // 121
    }                                                                                                                // 122
  });                                                                                                                // 123
                                                                                                                     // 124
  return flattened;                                                                                                  // 125
};                                                                                                                   // 126
                                                                                                                     // 127
// Can tell whether a value is an object and not an array                                                            // 128
var isActualObject = function (value) {                                                                              // 129
  return angular.isObject(value) && !angular.isArray(value);                                                         // 130
};                                                                                                                   // 131
                                                                                                                     // 132
// Diffs two objects and returns the keys that have been added or changed.                                           // 133
// Can be used to construct a Mongo {$set: {}} modifier                                                              // 134
var diffObjectChanges = function (oldItem, newItem) {                                                                // 135
  var result = {};                                                                                                   // 136
                                                                                                                     // 137
  angular.forEach(newItem, function (value, key) {                                                                   // 138
    if (oldItem && angular.equals(value, oldItem[key]))                                                              // 139
      return;                                                                                                        // 140
                                                                                                                     // 141
    if (isActualObject(value)) {                                                                                     // 142
      var diff = diffObjectChanges(oldItem[key], value);                                                             // 143
      if (diff) result[key] = diff;                                                                                  // 144
    } else {                                                                                                         // 145
      result[key] = value;                                                                                           // 146
    }                                                                                                                // 147
                                                                                                                     // 148
    // If a nested object is identical between newItem and oldItem, it                                               // 149
    // is initially attached as an empty object. Here we remove it from                                              // 150
    // the result if it was not empty from the beginning.                                                            // 151
    if (isActualObject(result[key]) && _.keys(result[key]).length === 0) {                                           // 152
      if (_.keys(value).length !== 0)                                                                                // 153
        delete result[key];                                                                                          // 154
    }                                                                                                                // 155
  });                                                                                                                // 156
                                                                                                                     // 157
  if (!(_.keys(result).length > 0 && !(_.keys(result).length === 1 && result.$$hashKey)))                            // 158
    return undefined;                                                                                                // 159
  else                                                                                                               // 160
    return flattenObject(result);                                                                                    // 161
};                                                                                                                   // 162
                                                                                                                     // 163
// Diffs two objects and returns the keys that have been removed.                                                    // 164
// Can be used to construct a Mongo {$unset: {}} modifier                                                            // 165
var diffObjectRemovals = function (oldItem, newItem) {                                                               // 166
  if (newItem == null)                                                                                               // 167
    return true;                                                                                                     // 168
                                                                                                                     // 169
  var oldItemKeys = _.keys(oldItem);                                                                                 // 170
  var newItemKeys = _.keys(newItem);                                                                                 // 171
  var result = {};                                                                                                   // 172
                                                                                                                     // 173
  angular.forEach(oldItemKeys, function (key) {                                                                      // 174
    if (!_.contains(newItemKeys, key))                                                                               // 175
      result[key] = true;                                                                                            // 176
                                                                                                                     // 177
    if (isActualObject(oldItem[key])) {                                                                              // 178
      var diff = diffObjectRemovals(oldItem[key], newItem[key]);                                                     // 179
      if (diff) result[key] = diff;                                                                                  // 180
    }                                                                                                                // 181
  });                                                                                                                // 182
                                                                                                                     // 183
  if (_.keys(result).length === 0)                                                                                   // 184
    return undefined;                                                                                                // 185
  else                                                                                                               // 186
    return flattenObject(result);                                                                                    // 187
};                                                                                                                   // 188
                                                                                                                     // 189
// Diffs two objects and returns the keys that have been added or changed.                                           // 190
// Can be used to construct a Mongo {$set: {}} modifier                                                              // 191
var deepCopyObjectChanges = function (oldItem, newItem) {                                                            // 192
                                                                                                                     // 193
  angular.forEach(newItem, function (value, key) {                                                                   // 194
    if (oldItem && angular.equals(value, oldItem[key]))                                                              // 195
      return;                                                                                                        // 196
                                                                                                                     // 197
    if (isActualObject(value)) {                                                                                     // 198
      if (!oldItem[key])                                                                                             // 199
        oldItem[key] = value;                                                                                        // 200
      else                                                                                                           // 201
        deepCopyObjectChanges(oldItem[key], value);                                                                  // 202
    } else {                                                                                                         // 203
      oldItem[key] = value;                                                                                          // 204
    }                                                                                                                // 205
  });                                                                                                                // 206
};                                                                                                                   // 207
                                                                                                                     // 208
var deepCopyObjectRemovals = function (oldItem, newItem) {                                                           // 209
  var oldItemKeys = _.keys(oldItem);                                                                                 // 210
  var newItemKeys = _.keys(newItem);                                                                                 // 211
                                                                                                                     // 212
  angular.forEach(oldItemKeys, function (key) {                                                                      // 213
    if (!_.contains(newItemKeys, key) ||                                                                             // 214
        !newItem[key] ||                                                                                             // 215
        newItem[key] == null)                                                                                        // 216
      delete oldItem[key];                                                                                           // 217
    else {                                                                                                           // 218
      if (isActualObject(oldItem[key])) {                                                                            // 219
        deepCopyObjectRemovals(oldItem[key], newItem[key]);                                                          // 220
      }                                                                                                              // 221
    }                                                                                                                // 222
  });                                                                                                                // 223
};                                                                                                                   // 224
                                                                                                                     // 225
module.value('diffArray', diffArray);                                                                                // 226
module.value('deepCopyChanges', deepCopyObjectChanges);                                                              // 227
module.value('deepCopyRemovals', deepCopyObjectRemovals);                                                            // 228
                                                                                                                     // 229
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-subscribe.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
var angularMeteorSubscribe = angular.module('angular-meteor.subscribe', []);                                         // 2
                                                                                                                     // 3
angularMeteorSubscribe.service('$meteorSubscribe', ['$q',                                                            // 4
  function ($q) {                                                                                                    // 5
    var self = this;                                                                                                 // 6
                                                                                                                     // 7
    this._subscribe = function(scope, deferred, args) {                                                              // 8
      var subscription = null;                                                                                       // 9
                                                                                                                     // 10
      args.push({                                                                                                    // 11
        onReady: function() {                                                                                        // 12
          deferred.resolve(subscription);                                                                            // 13
        },                                                                                                           // 14
        onError: function(err) {                                                                                     // 15
          deferred.reject(err);                                                                                      // 16
        }                                                                                                            // 17
      });                                                                                                            // 18
                                                                                                                     // 19
      subscription =  Meteor.subscribe.apply(scope, args);                                                           // 20
                                                                                                                     // 21
      return subscription;                                                                                           // 22
    };                                                                                                               // 23
                                                                                                                     // 24
    this.subscribe = function(){                                                                                     // 25
      var deferred = $q.defer();                                                                                     // 26
      var args = Array.prototype.slice.call(arguments);                                                              // 27
      var subscription = null;                                                                                       // 28
                                                                                                                     // 29
      self._subscribe(this, deferred, args);                                                                         // 30
                                                                                                                     // 31
      return deferred.promise;                                                                                       // 32
    };                                                                                                               // 33
  }]);                                                                                                               // 34
                                                                                                                     // 35
angularMeteorSubscribe.run(['$rootScope', '$q', '$meteorSubscribe',                                                  // 36
  function($rootScope, $q, $meteorSubscribe) {                                                                       // 37
    Object.getPrototypeOf($rootScope).$meteorSubscribe = function() {                                                // 38
      var deferred = $q.defer();                                                                                     // 39
      var args = Array.prototype.slice.call(arguments);                                                              // 40
                                                                                                                     // 41
      var subscription = $meteorSubscribe._subscribe(this, deferred, args);                                          // 42
                                                                                                                     // 43
      this.$on('$destroy', function() {                                                                              // 44
        subscription.stop();                                                                                         // 45
      });                                                                                                            // 46
                                                                                                                     // 47
      return deferred.promise;                                                                                       // 48
    };                                                                                                               // 49
}]);                                                                                                                 // 50
                                                                                                                     // 51
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-collections.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
var angularMeteorCollections = angular.module('angular-meteor.collections', ['angular-meteor.subscribe', 'hashKeyCopier']);
                                                                                                                     // 3
var AngularMeteorCollection = function (collection, $q, selector, options) {                                         // 4
  var self = collection.find(selector, options).fetch();                                                             // 5
                                                                                                                     // 6
  self.__proto__ = AngularMeteorCollection.prototype;                                                                // 7
  self.__proto__.$q = $q;                                                                                            // 8
  self.$$collection = collection;                                                                                    // 9
                                                                                                                     // 10
  return self;                                                                                                       // 11
};                                                                                                                   // 12
                                                                                                                     // 13
AngularMeteorCollection.prototype = []; // Allows inheritance of native Array methods.                               // 14
                                                                                                                     // 15
AngularMeteorCollection.prototype.save = function save(docs) {                                                       // 16
  var self = this,                                                                                                   // 17
    collection = self.$$collection,                                                                                  // 18
    $q = self.$q,                                                                                                    // 19
    promises = []; // To store all promises.                                                                         // 20
                                                                                                                     // 21
  /*                                                                                                                 // 22
   * The upsertObject function will either update an object if the _id exists                                        // 23
   * or insert an object if the _id is not set in the collection.                                                    // 24
   * Returns a promise.                                                                                              // 25
   */                                                                                                                // 26
  function upsertObject(item, $q) {                                                                                  // 27
    var deferred = $q.defer();                                                                                       // 28
                                                                                                                     // 29
    item = angular.copy(item);                                                                                       // 30
    delete item.$$hashKey;                                                                                           // 31
    for (var property in item) {                                                                                     // 32
      delete property.$$hashKey;                                                                                     // 33
    }                                                                                                                // 34
                                                                                                                     // 35
    if (item._id) { // Performs an update if the _id property is set.                                                // 36
      var item_id = item._id; // Store the _id in temporary variable                                                 // 37
      delete item._id; // Remove the _id property so that it can be $set using update.                               // 38
      var objectId = (item_id._str) ? new Meteor.Collection.ObjectID(item_id._str) : item_id;                        // 39
      collection.update(objectId, {$set: item}, function (error) {                                                   // 40
        if (error) {                                                                                                 // 41
          deferred.reject(error);                                                                                    // 42
        } else {                                                                                                     // 43
          deferred.resolve({_id: objectId, action: "updated"});                                                      // 44
        }                                                                                                            // 45
      });                                                                                                            // 46
    } else { // Performs an insert if the _id property isn't set.                                                    // 47
      collection.insert(item, function (error, result) {                                                             // 48
        if (error) {                                                                                                 // 49
          deferred.reject(error);                                                                                    // 50
        } else {                                                                                                     // 51
          deferred.resolve({_id: result, action: "inserted"});                                                       // 52
        }                                                                                                            // 53
      });                                                                                                            // 54
    }                                                                                                                // 55
                                                                                                                     // 56
    return deferred.promise;                                                                                         // 57
  }                                                                                                                  // 58
                                                                                                                     // 59
  /*                                                                                                                 // 60
   * How to update the collection depending on the 'docs' argument passed.                                           // 61
   */                                                                                                                // 62
  if (docs) { // Checks if a 'docs' argument was passed.                                                             // 63
    if (angular.isArray(docs)) { // If an array of objects were passed.                                              // 64
      angular.forEach(docs, function (doc) {                                                                         // 65
        this.push(upsertObject(doc, $q));                                                                            // 66
      }, promises);                                                                                                  // 67
    } else { // If a single object was passed.                                                                       // 68
      promises.push(upsertObject(docs, $q));                                                                         // 69
    }                                                                                                                // 70
  } else { // If no 'docs' argument was passed, save the entire collection.                                          // 71
    angular.forEach(self, function (doc) {                                                                           // 72
      this.push(upsertObject(doc, $q));                                                                              // 73
    }, promises);                                                                                                    // 74
  }                                                                                                                  // 75
                                                                                                                     // 76
  return $q.all(promises); // Returns all promises when they're resolved.                                            // 77
};                                                                                                                   // 78
                                                                                                                     // 79
AngularMeteorCollection.prototype.remove = function remove(keys) {                                                   // 80
  var self = this,                                                                                                   // 81
    collection = self.$$collection,                                                                                  // 82
    $q = self.$q,                                                                                                    // 83
    promises = []; // To store all promises.                                                                         // 84
                                                                                                                     // 85
  /*                                                                                                                 // 86
   * The removeObject function will delete an object with the _id property                                           // 87
   * equal to the specified key.                                                                                     // 88
   * Returns a promise.                                                                                              // 89
   */                                                                                                                // 90
  function removeObject(key, $q) {                                                                                   // 91
    var deferred = $q.defer();                                                                                       // 92
                                                                                                                     // 93
    if (key) { // Checks if 'key' argument is set.                                                                   // 94
      if(key._id) {                                                                                                  // 95
        key = key._id;                                                                                               // 96
      }                                                                                                              // 97
      var objectId = (key._str) ? new Meteor.Collection.ObjectID(key._str) : key;                                    // 98
      collection.remove(objectId, function (error) {                                                                 // 99
        if (error) {                                                                                                 // 100
          deferred.reject(error);                                                                                    // 101
        } else {                                                                                                     // 102
          deferred.resolve({_id: objectId, action: "removed"});                                                      // 103
        }                                                                                                            // 104
      });                                                                                                            // 105
    } else {                                                                                                         // 106
      deferred.reject("key cannot be null");                                                                         // 107
    }                                                                                                                // 108
                                                                                                                     // 109
    return deferred.promise;                                                                                         // 110
  }                                                                                                                  // 111
                                                                                                                     // 112
  /*                                                                                                                 // 113
   * What to remove from collection depending on the 'keys' argument passed.                                         // 114
   */                                                                                                                // 115
  if (keys) { // Checks if a 'keys' argument was passed.                                                             // 116
    if (angular.isArray(keys)) { // If an array of keys were passed.                                                 // 117
      angular.forEach(keys, function (key) {                                                                         // 118
        this.push(removeObject(key, $q));                                                                            // 119
      }, promises);                                                                                                  // 120
    } else { // If a single key was passed.                                                                          // 121
      promises.push(removeObject(keys, $q));                                                                         // 122
    }                                                                                                                // 123
  } else { // If no 'keys' argument was passed, save the entire collection.                                          // 124
    angular.forEach(self, function (doc) {                                                                           // 125
      this.push(removeObject(doc._id, $q));                                                                          // 126
    }, promises);                                                                                                    // 127
  }                                                                                                                  // 128
                                                                                                                     // 129
  return $q.all(promises); // Returns all promises when they're resolved.                                            // 130
};                                                                                                                   // 131
                                                                                                                     // 132
var updateAngularCollection = function (newArray, oldArray) {                                                        // 133
  if (!newArray || !oldArray) return newArray;                                                                       // 134
                                                                                                                     // 135
  for (var i = 0; i < newArray.length; i++) {                                                                        // 136
    for (var j = 0; j < oldArray.length; j++) {                                                                      // 137
      if (angular.equals(newArray[i], oldArray[j])) {                                                                // 138
        newArray[i] = oldArray[j];                                                                                   // 139
        break;                                                                                                       // 140
      }                                                                                                              // 141
    }                                                                                                                // 142
  }                                                                                                                  // 143
                                                                                                                     // 144
  return newArray;                                                                                                   // 145
};                                                                                                                   // 146
                                                                                                                     // 147
angularMeteorCollections.factory('$collection', ['$q', 'HashKeyCopier', '$meteorSubscribe',                          // 148
  function ($q, HashKeyCopier, $meteorSubscribe) {                                                                   // 149
    return function (collection, selector, options) {                                                                // 150
      if (!selector) selector = {};                                                                                  // 151
      if (!(collection instanceof Meteor.Collection)) {                                                              // 152
        throw new TypeError("The first argument of $collection must be a Meteor.Collection object.");                // 153
      }                                                                                                              // 154
      return {                                                                                                       // 155
                                                                                                                     // 156
        bindOne: function(scope, model, id, auto, publisher) {                                                       // 157
          Tracker.autorun(function(self) {                                                                           // 158
            scope[model] = collection.findOne(id, options);                                                          // 159
            if (!scope.$root.$$phase) scope.$apply(); // Update bindings in scope.                                   // 160
            scope.$on('$destroy', function () {                                                                      // 161
              self.stop(); // Stop computation if scope is destroyed.                                                // 162
            });                                                                                                      // 163
          });                                                                                                        // 164
                                                                                                                     // 165
          if (auto) { // Deep watches the model and performs autobind.                                               // 166
            scope.$watch(model, function (newItem, oldItem) {                                                        // 167
              if (newItem)                                                                                           // 168
                if (newItem._id)                                                                                     // 169
                  collection.update({_id: newItem._id}, { $set: _.omit(newItem, '_id') });                           // 170
            }, true);                                                                                                // 171
          }                                                                                                          // 172
                                                                                                                     // 173
          var deferred = $q.defer();                                                                                 // 174
                                                                                                                     // 175
          if (publisher) {  // Subscribe to a publish method                                                         // 176
            var publishName = null;                                                                                  // 177
            if (publisher === true)                                                                                  // 178
              publishName = collection._name;                                                                        // 179
            else                                                                                                     // 180
              publishName = publisher;                                                                               // 181
                                                                                                                     // 182
            $meteorSubscribe.subscribe(publishName).then(function(){                                                 // 183
              deferred.resolve(scope[model]);                                                                        // 184
            });                                                                                                      // 185
                                                                                                                     // 186
          } else { // If no subscription, resolve immediately                                                        // 187
            deferred.resolve(scope[model]);                                                                          // 188
          }                                                                                                          // 189
                                                                                                                     // 190
          return deferred.promise;                                                                                   // 191
        },                                                                                                           // 192
                                                                                                                     // 193
        bind: function (scope, model, auto, publisher, paginate) {                                                   // 194
          auto = auto || false; // Sets default binding type.                                                        // 195
          if (!(typeof auto === 'boolean')) { // Checks if auto is a boolean.                                        // 196
            throw new TypeError("The third argument of bind must be a boolean.");                                    // 197
          }                                                                                                          // 198
                                                                                                                     // 199
          var unregisterWatch = null;                                                                                // 200
                                                                                                                     // 201
          var rebind = function(){                                                                                   // 202
            Tracker.autorun(function (self) {                                                                        // 203
                                                                                                                     // 204
              if (paginate){                                                                                         // 205
                options = {                                                                                          // 206
                  limit: parseInt(scope.perPage),                                                                    // 207
                  skip: (parseInt(scope.page) - 1) * parseInt(scope.perPage)                                         // 208
                };                                                                                                   // 209
                if (scope.sort) { options.sort = scope.sort; }                                                       // 210
              }                                                                                                      // 211
                                                                                                                     // 212
              var ngCollection = new AngularMeteorCollection(collection, $q, selector, options);                     // 213
                                                                                                                     // 214
              // Bind collection to model in scope. Transfer $$hashKey based on _id.                                 // 215
              var newArray = HashKeyCopier.copyHashKeys(scope[model], ngCollection, ["_id"]);                        // 216
              scope[model] = updateAngularCollection(newArray, scope[model]);                                        // 217
                                                                                                                     // 218
              if (!scope.$root.$$phase) scope.$apply(); // Update bindings in scope.                                 // 219
              scope.$on('$destroy', function () {                                                                    // 220
                self.stop(); // Stop computation if scope is destroyed.                                              // 221
              });                                                                                                    // 222
            });                                                                                                      // 223
                                                                                                                     // 224
            if (auto) { // Deep watches the model and performs autobind.                                             // 225
              unregisterWatch = scope.$watch(model, function (newItems, oldItems) {                                  // 226
                // Remove items that don't exist in the collection anymore.                                          // 227
                angular.forEach(oldItems, function (oldItem) {                                                       // 228
                  var index = newItems.map(function (item) {                                                         // 229
                    return item._id;                                                                                 // 230
                  }).indexOf(oldItem._id);                                                                           // 231
                  if (index == -1) { // To here get all objects that pushed or spliced                               // 232
                    var localIndex;                                                                                  // 233
                    if (!oldItem._id)                                                                                // 234
                      localIndex = -1;                                                                               // 235
                    else if (oldItem._id && !oldItem._id._str)                                                       // 236
                      localIndex = -1;                                                                               // 237
                    else {                                                                                           // 238
                      localIndex = newItems.map(function (item) {                                                    // 239
                        if (item._id)                                                                                // 240
                          return item._id._str;                                                                      // 241
                      }).indexOf(oldItem._id._str);                                                                  // 242
                    }                                                                                                // 243
                    if (localIndex == -1){                                                                           // 244
                      if (oldItem._id) { // This is a check to get only the spliced objects                          // 245
                        newItems.remove(oldItem._id);                                                                // 246
                      }                                                                                              // 247
                    }                                                                                                // 248
                  }                                                                                                  // 249
                });                                                                                                  // 250
                newItems.save(); // Saves all items.                                                                 // 251
              }, auto);                                                                                              // 252
            }                                                                                                        // 253
          };                                                                                                         // 254
          rebind();                                                                                                  // 255
                                                                                                                     // 256
          if (paginate){                                                                                             // 257
            scope.$watchGroup(['page', 'sort'], function(newValues, oldValues){                                      // 258
              if (!newValues)                                                                                        // 259
                return;                                                                                              // 260
                                                                                                                     // 261
              if (newValues[0] == oldValues[0] &&                                                                    // 262
                newValues[1] == oldValues[1])                                                                        // 263
                return;                                                                                              // 264
                                                                                                                     // 265
              if (unregisterWatch)                                                                                   // 266
                unregisterWatch();                                                                                   // 267
                                                                                                                     // 268
              rebind();                                                                                              // 269
            });                                                                                                      // 270
          }                                                                                                          // 271
                                                                                                                     // 272
          var deferred = $q.defer();                                                                                 // 273
                                                                                                                     // 274
          if (publisher) {  // Subscribe to a publish method                                                         // 275
            var publishName = null;                                                                                  // 276
            if (publisher === true)                                                                                  // 277
              publishName = collection._name;                                                                        // 278
            else                                                                                                     // 279
              publishName = publisher;                                                                               // 280
                                                                                                                     // 281
            $meteorSubscribe.subscribe(publishName).then(function(){                                                 // 282
              deferred.resolve(scope[model]);                                                                        // 283
            });                                                                                                      // 284
                                                                                                                     // 285
          } else { // If no subscription, resolve immediately                                                        // 286
            deferred.resolve(scope[model]);                                                                          // 287
          }                                                                                                          // 288
                                                                                                                     // 289
          return deferred.promise;                                                                                   // 290
        }                                                                                                            // 291
      };                                                                                                             // 292
    }                                                                                                                // 293
  }                                                                                                                  // 294
]);                                                                                                                  // 295
                                                                                                                     // 296
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-meteorCollection.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
                                                                                                                     // 2
var angularMeteorCollections = angular.module('angular-meteor.meteor-collection',                                    // 3
  ['angular-meteor.subscribe', 'angular-meteor.utils', 'diffArray']);                                                // 4
                                                                                                                     // 5
// The reason angular meteor collection is a factory function and not something                                      // 6
// that inherit from array comes from here: http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
// We went with the direct extensions approach                                                                       // 8
angularMeteorCollections.factory('AngularMeteorCollection', ['$q', '$meteorSubscribe', '$meteorUtils', '$rootScope', // 9
  '$timeout', 'deepCopyChanges', 'deepCopyRemovals', 'diffArray',                                                    // 10
  function($q, $meteorSubscribe, $meteorUtils, $rootScope, $timeout, deepCopyChanges, deepCopyRemovals, diffArray) { // 11
    var AngularMeteorCollection = {};                                                                                // 12
                                                                                                                     // 13
    AngularMeteorCollection.subscribe = function () {                                                                // 14
      $meteorSubscribe.subscribe.apply(this, arguments);                                                             // 15
      return this;                                                                                                   // 16
    };                                                                                                               // 17
                                                                                                                     // 18
    AngularMeteorCollection.save = function save(docs, useUnsetModifier) {                                           // 19
      var self = this,                                                                                               // 20
        collection = self.$$collection,                                                                              // 21
        promises = []; // To store all promises.                                                                     // 22
                                                                                                                     // 23
      /*                                                                                                             // 24
       * The upsertObject function will either update an object if the _id exists                                    // 25
       * or insert an object if the _id is not set in the collection.                                                // 26
       * Returns a promise.                                                                                          // 27
       */                                                                                                            // 28
      function upsertObject(item, $q) {                                                                              // 29
        var deferred = $q.defer();                                                                                   // 30
                                                                                                                     // 31
        // delete $$hashkey                                                                                          // 32
        if (!item instanceof File)                                                                                   // 33
          item = angular.copy(item);                                                                                 // 34
                                                                                                                     // 35
        if (item._id) { // Performs an update if the _id property is set.                                            // 36
          var item_id = item._id; // Store the _id in temporary variable                                             // 37
          delete item._id; // Remove the _id property so that it can be $set using update.                           // 38
          var objectId = (item_id._str) ? new Meteor.Collection.ObjectID(item_id._str) : item_id;                    // 39
          var modifier = (useUnsetModifier) ? {$unset: item} : {$set: item};                                         // 40
                                                                                                                     // 41
          collection.update(objectId, modifier, function (error) {                                                   // 42
            if (error) {                                                                                             // 43
              deferred.reject(error);                                                                                // 44
            } else {                                                                                                 // 45
              deferred.resolve({_id: objectId, action: "updated"});                                                  // 46
            }                                                                                                        // 47
          });                                                                                                        // 48
        } else { // Performs an insert if the _id property isn't set.                                                // 49
          collection.insert(item, function (error, result) {                                                         // 50
            if (error) {                                                                                             // 51
              deferred.reject(error);                                                                                // 52
            } else {                                                                                                 // 53
              deferred.resolve({_id: result, action: "inserted"});                                                   // 54
            }                                                                                                        // 55
          });                                                                                                        // 56
        }                                                                                                            // 57
        return deferred.promise;                                                                                     // 58
      }                                                                                                              // 59
                                                                                                                     // 60
      /*                                                                                                             // 61
       * How to update the collection depending on the 'docs' argument passed.                                       // 62
       */                                                                                                            // 63
      if (docs) { // Checks if a 'docs' argument was passed.                                                         // 64
        if (angular.isArray(docs)) { // If an array of objects were passed.                                          // 65
          angular.forEach(docs, function (doc) {                                                                     // 66
            this.push(upsertObject(doc, $q));                                                                        // 67
          }, promises);                                                                                              // 68
        } else { // If a single object was passed.                                                                   // 69
          promises.push(upsertObject(docs, $q));                                                                     // 70
        }                                                                                                            // 71
      } else { // If no 'docs' argument was passed, save the entire collection.                                      // 72
        angular.forEach(self, function (doc) {                                                                       // 73
          this.push(upsertObject(doc, $q));                                                                          // 74
        }, promises);                                                                                                // 75
      }                                                                                                              // 76
                                                                                                                     // 77
      return $q.all(promises); // Returns all promises when they're resolved.                                        // 78
    };                                                                                                               // 79
                                                                                                                     // 80
    AngularMeteorCollection.remove = function remove(keys) {                                                         // 81
      var self = this,                                                                                               // 82
        collection = self.$$collection,                                                                              // 83
        promises = []; // To store all promises.                                                                     // 84
                                                                                                                     // 85
      /*                                                                                                             // 86
       * The removeObject function will delete an object with the _id property                                       // 87
       * equal to the specified key.                                                                                 // 88
       * Returns a promise.                                                                                          // 89
       */                                                                                                            // 90
      function removeObject(key, $q) {                                                                               // 91
        var deferred = $q.defer();                                                                                   // 92
                                                                                                                     // 93
        if (key) { // Checks if 'key' argument is set.                                                               // 94
          if (key._id) {                                                                                             // 95
            key = key._id;                                                                                           // 96
          }                                                                                                          // 97
          var objectId = (key._str) ? new Meteor.Collection.ObjectID(key._str) : key;                                // 98
                                                                                                                     // 99
          collection.remove(objectId, function (error) {                                                             // 100
            if (error) {                                                                                             // 101
              deferred.reject(error);                                                                                // 102
            } else {                                                                                                 // 103
              deferred.resolve({_id: objectId, action: "removed"});                                                  // 104
            }                                                                                                        // 105
          });                                                                                                        // 106
        } else {                                                                                                     // 107
          deferred.reject("key cannot be null");                                                                     // 108
        }                                                                                                            // 109
                                                                                                                     // 110
        return deferred.promise;                                                                                     // 111
      }                                                                                                              // 112
                                                                                                                     // 113
      /*                                                                                                             // 114
       * What to remove from collection depending on the 'keys' argument passed.                                     // 115
       */                                                                                                            // 116
      if (keys) { // Checks if a 'keys' argument was passed.                                                         // 117
        if (angular.isArray(keys)) { // If an array of keys were passed.                                             // 118
          angular.forEach(keys, function (key) {                                                                     // 119
            this.push(removeObject(key, $q));                                                                        // 120
          }, promises);                                                                                              // 121
        } else { // If a single key was passed.                                                                      // 122
          promises.push(removeObject(keys, $q));                                                                     // 123
        }                                                                                                            // 124
      } else { // If no 'keys' argument was passed, save the entire collection.                                      // 125
        // When removing all, we do not use collection.remove({}) because Meteor doesn't give the client side that permissions
        // http://stackoverflow.com/a/15465286/1426570                                                               // 127
        var originalSelf = angular.copy(self);                                                                       // 128
        angular.forEach(originalSelf, function (doc) {                                                               // 129
          this.push(removeObject(doc._id, $q));                                                                      // 130
        }, promises);                                                                                                // 131
      }                                                                                                              // 132
                                                                                                                     // 133
      return $q.all(promises); // Returns all promises when they're resolved.                                        // 134
    };                                                                                                               // 135
                                                                                                                     // 136
    AngularMeteorCollection.updateCursor = function (cursor) {                                                       // 137
      var self = this;                                                                                               // 138
                                                                                                                     // 139
      var promise;                                                                                                   // 140
      // Function applies async to combine multiple operations (savings, deletions etc)                              // 141
      // in one processing.                                                                                          // 142
      function safeApply() {                                                                                         // 143
        if (promise) {                                                                                               // 144
          $timeout.cancel(promise);                                                                                  // 145
          promise = null;                                                                                            // 146
        }                                                                                                            // 147
        // Clearing the watch is needed so no updates are sent to server                                             // 148
        // while handling updates from the server.                                                                   // 149
        if (!self.UPDATING_FROM_SERVER) {                                                                            // 150
          self.UPDATING_FROM_SERVER = true;                                                                          // 151
          if (!$rootScope.$$phase) $rootScope.$apply();                                                              // 152
        }                                                                                                            // 153
        promise = $timeout(function () {                                                                             // 154
          // Saves changes happened within the previous update from server.                                          // 155
          updateCollection(self, self._serverBackup, diffArray);                                                     // 156
          self.UPDATING_FROM_SERVER = false;                                                                         // 157
          $rootScope.$apply();                                                                                       // 158
        }, 0, false);                                                                                                // 159
      }                                                                                                              // 160
                                                                                                                     // 161
      // XXX - consider adding an option for a non-orderd result                                                     // 162
      // for faster performance                                                                                      // 163
      if (self.observeHandle) {                                                                                      // 164
        self.observeHandle.stop();                                                                                   // 165
      }                                                                                                              // 166
                                                                                                                     // 167
      self.observeHandle = cursor.observe({                                                                          // 168
        addedAt: function (document, atIndex) {                                                                      // 169
          self.splice(atIndex, 0, document);                                                                         // 170
          self._serverBackup.splice(atIndex, 0, document);                                                           // 171
          safeApply();                                                                                               // 172
        },                                                                                                           // 173
        changedAt: function (document, oldDocument, atIndex) {                                                       // 174
          deepCopyChanges(self[atIndex], document);                                                                  // 175
          deepCopyRemovals(self[atIndex], document);                                                                 // 176
          self._serverBackup[atIndex] = self[atIndex];                                                               // 177
          safeApply();                                                                                               // 178
        },                                                                                                           // 179
        movedTo: function (document, fromIndex, toIndex) {                                                           // 180
          self.splice(fromIndex, 1);                                                                                 // 181
          self.splice(toIndex, 0, document);                                                                         // 182
          self._serverBackup.splice(fromIndex, 1);                                                                   // 183
          self._serverBackup.splice(toIndex, 0, document);                                                           // 184
          safeApply();                                                                                               // 185
        },                                                                                                           // 186
        removedAt: function (oldDocument) {                                                                          // 187
          function findRemoveInd(col, doc) {                                                                         // 188
              var removedObj;                                                                                        // 189
              // No _.findIndex in underscore 1.5.x                                                                  // 190
              if (doc._id._str) {                                                                                    // 191
                removedObj = _.find(col, function(obj) {                                                             // 192
                  return obj._id._str == doc._id._str;                                                               // 193
                });                                                                                                  // 194
              }                                                                                                      // 195
              else {                                                                                                 // 196
                removedObj = _.findWhere(col, {_id: doc._id});                                                       // 197
              }                                                                                                      // 198
              return _.indexOf(col, removedObj);                                                                     // 199
          }                                                                                                          // 200
                                                                                                                     // 201
          var removeInd = findRemoveInd(self, oldDocument);                                                          // 202
          if (removeInd != -1) {                                                                                     // 203
            self.splice(removeInd, 1);                                                                               // 204
            self._serverBackup.splice(removeInd, 1);                                                                 // 205
            safeApply();                                                                                             // 206
          } else {                                                                                                   // 207
            // If it's been removed on client then it's already not in collection                                    // 208
            // itself but still is in the _serverBackup.                                                             // 209
            removeInd = findRemoveInd(self._serverBackup, oldDocument);                                              // 210
            if (removeInd != -1) {                                                                                   // 211
              self._serverBackup.splice(removeInd, 1);                                                               // 212
            }                                                                                                        // 213
          }                                                                                                          // 214
        }                                                                                                            // 215
      });                                                                                                            // 216
    };                                                                                                               // 217
                                                                                                                     // 218
    AngularMeteorCollection.stop = function () {                                                                     // 219
      if (this.unregisterAutoBind)                                                                                   // 220
        this.unregisterAutoBind();                                                                                   // 221
                                                                                                                     // 222
      if (this.observeHandle)                                                                                        // 223
        this.observeHandle.stop();                                                                                   // 224
                                                                                                                     // 225
      while (this.length > 0) {                                                                                      // 226
        this.pop();                                                                                                  // 227
        this._serverBackup.pop();                                                                                    // 228
      }                                                                                                              // 229
    };                                                                                                               // 230
                                                                                                                     // 231
    var createAngularMeteorCollection = function (cursor, collection) {                                              // 232
      var data = [];                                                                                                 // 233
      data._serverBackup = [];                                                                                       // 234
                                                                                                                     // 235
      data.$$collection = angular.isDefined(collection) ? collection : $meteorUtils.getCollectionByName(cursor.collection.name);
                                                                                                                     // 237
      angular.extend(data, AngularMeteorCollection);                                                                 // 238
                                                                                                                     // 239
      return data;                                                                                                   // 240
    };                                                                                                               // 241
                                                                                                                     // 242
    return createAngularMeteorCollection;                                                                            // 243
}]);                                                                                                                 // 244
                                                                                                                     // 245
angularMeteorCollections.factory('$meteorCollection', ['AngularMeteorCollection', '$rootScope', 'diffArray',         // 246
  function (AngularMeteorCollection, $rootScope, diffArray) {                                                        // 247
    return function (reactiveFunc, auto, collection) {                                                               // 248
      // Validate parameters                                                                                         // 249
      if (!reactiveFunc) {                                                                                           // 250
        throw new TypeError("The first argument of $meteorCollection is undefined.");                                // 251
      }                                                                                                              // 252
      if (!(typeof reactiveFunc == "function" || angular.isFunction(reactiveFunc.find))) {                           // 253
        throw new TypeError("The first argument of $meteorCollection must be a function or a have a find function property.");
      }                                                                                                              // 255
      auto = auto !== false;                                                                                         // 256
                                                                                                                     // 257
      if (!(typeof reactiveFunc == "function")) {                                                                    // 258
        var cursorFunc = reactiveFunc.find;                                                                          // 259
        collection = angular.isDefined(collection) ? collection : reactiveFunc;                                      // 260
        var originalCollection = reactiveFunc;                                                                       // 261
        reactiveFunc = function() {                                                                                  // 262
          return cursorFunc.apply(originalCollection, [{}]);                                                         // 263
        }                                                                                                            // 264
      }                                                                                                              // 265
                                                                                                                     // 266
      var ngCollection = new AngularMeteorCollection(reactiveFunc(), collection);                                    // 267
                                                                                                                     // 268
      function setAutoBind() {                                                                                       // 269
        if (auto) { // Deep watches the model and performs autobind.                                                 // 270
          ngCollection.unregisterAutoBind = $rootScope.$watch(function () {                                          // 271
            if (ngCollection.UPDATING_FROM_SERVER) {                                                                 // 272
              return 'UPDATING_FROM_SERVER';                                                                         // 273
            }                                                                                                        // 274
            return angular.copy(_.without(ngCollection, 'UPDATING_FROM_SERVER'));                                    // 275
          }, function (newItems, oldItems) {                                                                         // 276
            if (newItems === 'UPDATING_FROM_SERVER' ||                                                               // 277
                oldItems === 'UPDATING_FROM_SERVER')                                                                 // 278
              return;                                                                                                // 279
                                                                                                                     // 280
            if (newItems !== oldItems) {                                                                             // 281
              ngCollection.unregisterAutoBind();                                                                     // 282
                                                                                                                     // 283
              updateCollection(ngCollection, oldItems, diffArray);                                                   // 284
                                                                                                                     // 285
              setAutoBind();                                                                                         // 286
            }                                                                                                        // 287
          }, true);                                                                                                  // 288
        }                                                                                                            // 289
      }                                                                                                              // 290
                                                                                                                     // 291
      /**                                                                                                            // 292
       * Fetches the latest data from Meteor and update the data variable.                                           // 293
       */                                                                                                            // 294
      Tracker.autorun(function () {                                                                                  // 295
        // When the reactive func gets recomputated we need to stop any previous                                     // 296
        // observeChanges                                                                                            // 297
        Tracker.onInvalidate(function () {                                                                           // 298
          ngCollection.stop();                                                                                       // 299
        });                                                                                                          // 300
        ngCollection.updateCursor(reactiveFunc());                                                                   // 301
        setAutoBind();                                                                                               // 302
      });                                                                                                            // 303
                                                                                                                     // 304
      return ngCollection;                                                                                           // 305
    }                                                                                                                // 306
  }]);                                                                                                               // 307
                                                                                                                     // 308
// Finds changes between two collections and saves difference into first one.                                        // 309
function updateCollection(newCollection, oldCollection, diffMethod) {                                                // 310
  var addedCount = 0;                                                                                                // 311
  diffMethod(oldCollection, newCollection, {                                                                         // 312
    addedAt: function (id, item, index) {                                                                            // 313
      var newValue = newCollection.splice( index - addedCount, 1 ).pop();                                            // 314
      newCollection.save(newValue);                                                                                  // 315
      addedCount++;                                                                                                  // 316
    },                                                                                                               // 317
    removedAt: function (id, item, index) {                                                                          // 318
      newCollection.remove(id);                                                                                      // 319
    },                                                                                                               // 320
    changedAt: function (id, setDiff, unsetDiff, index, oldItem) {                                                   // 321
                                                                                                                     // 322
      if (setDiff)                                                                                                   // 323
        newCollection.save(setDiff);                                                                                 // 324
                                                                                                                     // 325
      if (unsetDiff)                                                                                                 // 326
        newCollection.save(unsetDiff, true);                                                                         // 327
    },                                                                                                               // 328
    movedTo: function (id, item, fromIndex, toIndex) {                                                               // 329
      // XXX do we need this?                                                                                        // 330
    }                                                                                                                // 331
  });                                                                                                                // 332
}                                                                                                                    // 333
                                                                                                                     // 334
angularMeteorCollections.run(['$rootScope', '$q', '$meteorCollection', '$meteorSubscribe',                           // 335
  function($rootScope, $q, $meteorCollection, $meteorSubscribe) {                                                    // 336
    Object.getPrototypeOf($rootScope).$meteorCollection = function() {                                               // 337
      var args = Array.prototype.slice.call(arguments);                                                              // 338
      var collection = $meteorCollection.apply(this, args);                                                          // 339
      var subscription = null;                                                                                       // 340
                                                                                                                     // 341
      collection.subscribe = function () {                                                                           // 342
        var args = Array.prototype.slice.call(arguments);                                                            // 343
        subscription = $meteorSubscribe._subscribe(this, $q.defer(), args);                                          // 344
        return collection;                                                                                           // 345
      };                                                                                                             // 346
                                                                                                                     // 347
      this.$on('$destroy', function() {                                                                              // 348
        collection.stop();                                                                                           // 349
        if (subscription)                                                                                            // 350
          subscription.stop();                                                                                       // 351
	    });                                                                                                             // 352
                                                                                                                     // 353
      return collection;                                                                                             // 354
	};                                                                                                                  // 355
  }]);                                                                                                               // 356
                                                                                                                     // 357
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-object.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var angularMeteorObject = angular.module('angular-meteor.object', ['angular-meteor.utils', 'angular-meteor.subscribe']);
                                                                                                                     // 2
angularMeteorObject.factory('AngularMeteorObject', ['$q', '$meteorSubscribe', function($q, $meteorSubscribe) {       // 3
  var AngularMeteorObject = {};                                                                                      // 4
                                                                                                                     // 5
  AngularMeteorObject.getRawObject = function () {                                                                   // 6
    var self = this;                                                                                                 // 7
                                                                                                                     // 8
    return angular.copy(_.omit(self, self.$$internalProps));                                                         // 9
  };                                                                                                                 // 10
                                                                                                                     // 11
  AngularMeteorObject.subscribe = function () {                                                                      // 12
    $meteorSubscribe.subscribe.apply(this, arguments);                                                               // 13
    return this;                                                                                                     // 14
  };                                                                                                                 // 15
                                                                                                                     // 16
  AngularMeteorObject.save = function save(docs) {                                                                   // 17
    var self = this,                                                                                                 // 18
      collection = self.$$collection;                                                                                // 19
                                                                                                                     // 20
    var deferred = $q.defer();                                                                                       // 21
                                                                                                                     // 22
    if (self)                                                                                                        // 23
      if (self._id){                                                                                                 // 24
        var updates = docs? docs : angular.copy(_.omit(self, '_id', self.$$internalProps));                          // 25
        collection.update(                                                                                           // 26
          {_id: self._id},                                                                                           // 27
          { $set: updates },                                                                                         // 28
          function(error, numberOfDocs){                                                                             // 29
            if (error) {                                                                                             // 30
              deferred.reject(error);                                                                                // 31
            } else {                                                                                                 // 32
              deferred.resolve(numberOfDocs);                                                                        // 33
            }                                                                                                        // 34
          }                                                                                                          // 35
        );                                                                                                           // 36
      }                                                                                                              // 37
                                                                                                                     // 38
    return deferred.promise;                                                                                         // 39
  };                                                                                                                 // 40
                                                                                                                     // 41
  AngularMeteorObject.reset = function reset() {                                                                     // 42
    var self = this,                                                                                                 // 43
      collection = self.$$collection,                                                                                // 44
      options = self.$$options,                                                                                      // 45
      id = self.$$id;                                                                                                // 46
                                                                                                                     // 47
    if (collection){                                                                                                 // 48
      var serverValue = collection.findOne(id, options);                                                             // 49
      var prop;                                                                                                      // 50
      if (serverValue) {                                                                                             // 51
        angular.extend(Object.getPrototypeOf(self), Object.getPrototypeOf(serverValue));                             // 52
        for (prop in serverValue) {                                                                                  // 53
          if (serverValue.hasOwnProperty(prop)) {                                                                    // 54
            self[prop] = serverValue[prop];                                                                          // 55
          }                                                                                                          // 56
        }                                                                                                            // 57
      } else {                                                                                                       // 58
        for (prop in _.omit(self, self.$$internalProps)) {                                                           // 59
          delete self[prop];                                                                                         // 60
        }                                                                                                            // 61
      }                                                                                                              // 62
    }                                                                                                                // 63
  };                                                                                                                 // 64
                                                                                                                     // 65
  AngularMeteorObject.stop = function stop() {                                                                       // 66
    if (this.unregisterAutoDestroy) {                                                                                // 67
      this.unregisterAutoDestroy();                                                                                  // 68
    }                                                                                                                // 69
    this.unregisterAutoDestroy = null;                                                                               // 70
                                                                                                                     // 71
    if (this.unregisterAutoBind) {                                                                                   // 72
      this.unregisterAutoBind();                                                                                     // 73
    }                                                                                                                // 74
    this.unregisterAutoBind = null;                                                                                  // 75
                                                                                                                     // 76
    if (this.autorunComputation && this.autorunComputation.stop) {                                                   // 77
      this.autorunComputation.stop();                                                                                // 78
    }                                                                                                                // 79
    this.autorunComputation = null;                                                                                  // 80
  };                                                                                                                 // 81
                                                                                                                     // 82
// A list of internals properties to not watch for, nor pass to the Document on update and etc.                      // 83
  AngularMeteorObject.$$internalProps = [                                                                            // 84
    'save', 'reset', '$$collection', '$$options', '$$id', '$$hashkey', '$$internalProps', 'subscribe', 'stop', 'autorunComputation', 'unregisterAutoBind', 'unregisterAutoDestroy', 'getRawObject',
    'collection', '_eventEmitter'                                                                                    // 86
  ];                                                                                                                 // 87
                                                                                                                     // 88
  var createAngularMeteorObject = function(collection, id, options){                                                 // 89
    // Make data not be an object so we can extend it to preserve                                                    // 90
    // Collection Helpers and the like                                                                               // 91
    var data = new function SubObject() {};                                                                          // 92
    angular.extend(data, collection.findOne(id, options));                                                           // 93
                                                                                                                     // 94
    data.$$collection = collection;                                                                                  // 95
    data.$$options = options;                                                                                        // 96
    data.$$id = id;                                                                                                  // 97
                                                                                                                     // 98
    angular.extend(data, AngularMeteorObject);                                                                       // 99
                                                                                                                     // 100
    return data;                                                                                                     // 101
  };                                                                                                                 // 102
                                                                                                                     // 103
  return createAngularMeteorObject;                                                                                  // 104
}]);                                                                                                                 // 105
                                                                                                                     // 106
                                                                                                                     // 107
angularMeteorObject.factory('$meteorObject', ['$rootScope', '$meteorUtils', 'AngularMeteorObject',                   // 108
  function($rootScope, $meteorUtils, AngularMeteorObject) {                                                          // 109
    return function(collection, id, auto, options) {                                                                 // 110
      // Validate parameters                                                                                         // 111
      if (!collection) {                                                                                             // 112
        throw new TypeError("The first argument of $meteorCollection is undefined.");                                // 113
      }                                                                                                              // 114
      if (!angular.isFunction(collection.findOne)) {                                                                 // 115
        throw new TypeError("The first argument of $meteorCollection must be a function or a have a findOne function property.");
      }                                                                                                              // 117
                                                                                                                     // 118
      auto = auto !== false; // Making auto default true - http://stackoverflow.com/a/15464208/1426570               // 119
                                                                                                                     // 120
      var data = new AngularMeteorObject(collection, id, options);                                                   // 121
                                                                                                                     // 122
      data.autorunComputation = $meteorUtils.autorun($rootScope, function() {                                        // 123
        data.reset();                                                                                                // 124
      });                                                                                                            // 125
                                                                                                                     // 126
      if (auto) { // Deep watches the model and performs autobind.                                                   // 127
        data.unregisterAutoBind = $rootScope.$watch(function(){                                                      // 128
          return _.omit(data, data.$$internalProps);                                                                 // 129
        }, function (newItem, oldItem) {                                                                             // 130
          if (newItem !== oldItem && newItem) {                                                                      // 131
            var newItemId = newItem._id;                                                                             // 132
            if (newItemId && !_.isEmpty(newItem = _.omit(angular.copy(newItem), '_id'))) {                           // 133
              collection.update({_id: newItemId}, {$set: newItem});                                                  // 134
            }                                                                                                        // 135
          }                                                                                                          // 136
        }, true);                                                                                                    // 137
      }                                                                                                              // 138
                                                                                                                     // 139
      data.unregisterAutoDestroy = $rootScope.$on('$destroy', function() {                                           // 140
        if (data && data.stop) {                                                                                     // 141
          data.stop();                                                                                               // 142
        }                                                                                                            // 143
        data = undefined;                                                                                            // 144
      });                                                                                                            // 145
                                                                                                                     // 146
      return data;                                                                                                   // 147
    };                                                                                                               // 148
  }]);                                                                                                               // 149
                                                                                                                     // 150
angularMeteorObject.run(['$rootScope', '$q', '$meteorObject', '$meteorSubscribe',                                    // 151
  function($rootScope, $q, $meteorObject, $meteorSubscribe) {                                                        // 152
    Object.getPrototypeOf($rootScope).$meteorObject = function() {                                                   // 153
      var args = Array.prototype.slice.call(arguments);                                                              // 154
      var object = $meteorObject.apply(this, args);                                                                  // 155
      var subscription = null;                                                                                       // 156
                                                                                                                     // 157
      object.subscribe = function () {                                                                               // 158
        var args = Array.prototype.slice.call(arguments);                                                            // 159
        subscription = $meteorSubscribe._subscribe(this, $q.defer(), args);                                          // 160
        return object;                                                                                               // 161
      };                                                                                                             // 162
                                                                                                                     // 163
      this.$on('$destroy', function() {                                                                              // 164
        object.stop();                                                                                               // 165
        if (subscription)                                                                                            // 166
          subscription.stop();                                                                                       // 167
	  });                                                                                                               // 168
                                                                                                                     // 169
      return object;                                                                                                 // 170
	};                                                                                                                  // 171
  }]);                                                                                                               // 172
                                                                                                                     // 173
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-template.js                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var angularMeteorTemplate = angular.module('angular-meteor.template', []);                                           // 1
                                                                                                                     // 2
angularMeteorTemplate.run(['$templateCache',                                                                         // 3
  function ($templateCache) {                                                                                        // 4
    angular.forEach(Template, function (template, name) {                                                            // 5
      if (                                                                                                           // 6
        name.charAt(0) != "_"  &&                                                                                    // 7
        name != "prototype"  &&                                                                                      // 8
        name != "loginButtons" &&                                                                                    // 9
        name != "instance"  &&                                                                                       // 10
        name != "currentData"  &&                                                                                    // 11
        name != "parentData"  &&                                                                                     // 12
        name != "body"  &&                                                                                           // 13
        name != "registerHelper") { // Ignores templates with names starting with "_"                                // 14
                                                                                                                     // 15
          $templateCache.put(name, '<ng-template name="' + name + '"></ng-template>');                               // 16
      }                                                                                                              // 17
    });                                                                                                              // 18
  }                                                                                                                  // 19
]);                                                                                                                  // 20
                                                                                                                     // 21
angularMeteorTemplate.directive('ngTemplate', [                                                                      // 22
  function () {                                                                                                      // 23
    return {                                                                                                         // 24
      restrict: 'E',                                                                                                 // 25
      scope: false,                                                                                                  // 26
      template: function (element, attributes) {                                                                     // 27
        return Blaze.toHTML(Template[attributes.name]);                                                              // 28
      },                                                                                                             // 29
      link: function (scope, element, attributes) {                                                                  // 30
        var name = attributes.name,                                                                                  // 31
          template = Template[name];                                                                                 // 32
                                                                                                                     // 33
        /**                                                                                                          // 34
         * Includes the templates event maps.                                                                        // 35
         * Attaching events using selectors is not the recommended approach taken by AngularJS.                      // 36
         * That being said, the template event maps are included to maintain flexibility in the Meteor + Angular integration.
         * It is not angular-meteor's role to dictate which approach a developer should take,                        // 38
         * so angular-meteor has left it up to the user to decide which approach they prefer when developing.        // 39
         **/                                                                                                         // 40
        angular.forEach(template._events, function (eventObj) {                                                      // 41
          var eventType = eventObj.events,                                                                           // 42
            eventSelector = eventObj.selector,                                                                       // 43
            eventHandler = eventObj.handler;                                                                         // 44
                                                                                                                     // 45
          // Test all eventType to see if there is an equivalent in jQuery.                                          // 46
                                                                                                                     // 47
          $('ng-template[name="' + name + '"] ' + eventSelector + '').bind(eventType, eventHandler);                 // 48
        });                                                                                                          // 49
                                                                                                                     // 50
      }                                                                                                              // 51
    };                                                                                                               // 52
  }                                                                                                                  // 53
]);                                                                                                                  // 54
                                                                                                                     // 55
angularMeteorTemplate.directive('meteorInclude', [                                                                   // 56
  '$compile',                                                                                                        // 57
  function ($compile) {                                                                                              // 58
    return {                                                                                                         // 59
      restrict: 'AE',                                                                                                // 60
      scope: false,                                                                                                  // 61
      link: function (scope, element, attributes) {                                                                  // 62
        var name = attributes.meteorInclude || attributes.src;                                                       // 63
        if (name && Template[name]) {                                                                                // 64
          var template = Template[name];                                                                             // 65
          var viewHandler = Blaze.renderWithData(template, scope, element[0]);                                       // 66
          $compile(element.contents())(scope);                                                                       // 67
          scope.$on('$destroy', function() {                                                                         // 68
            Blaze.remove(viewHandler);                                                                               // 69
          });                                                                                                        // 70
        } else {                                                                                                     // 71
          console.error("meteorTemplate: There is no template with the name '" + name + "'");                        // 72
        }                                                                                                            // 73
      }                                                                                                              // 74
    };                                                                                                               // 75
  }                                                                                                                  // 76
]);                                                                                                                  // 77
                                                                                                                     // 78
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-user.js                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var angularMeteorUser = angular.module('angular-meteor.user', ['angular-meteor.utils']);                             // 1
                                                                                                                     // 2
angularMeteorUser.run(['$rootScope', '$meteorUtils', function($rootScope, $meteorUtils){                             // 3
                                                                                                                     // 4
  $meteorUtils.autorun($rootScope, function(){                                                                       // 5
    if (Meteor.user) {                                                                                               // 6
      $rootScope.currentUser = Meteor.user();                                                                        // 7
      $rootScope.loggingIn = Meteor.loggingIn();                                                                     // 8
    }                                                                                                                // 9
  });                                                                                                                // 10
}]);                                                                                                                 // 11
                                                                                                                     // 12
angularMeteorUser.service('$meteorUser', ['$rootScope', '$meteorUtils', '$q',                                        // 13
  function($rootScope, $meteorUtils, $q){                                                                            // 14
    var self = this;                                                                                                 // 15
                                                                                                                     // 16
    this.waitForUser = function(){                                                                                   // 17
                                                                                                                     // 18
      var deferred = $q.defer();                                                                                     // 19
                                                                                                                     // 20
      $meteorUtils.autorun($rootScope, function(){                                                                   // 21
        if ( !Meteor.loggingIn() )                                                                                   // 22
          deferred.resolve( Meteor.user() );                                                                         // 23
      });                                                                                                            // 24
                                                                                                                     // 25
      return deferred.promise;                                                                                       // 26
    };                                                                                                               // 27
                                                                                                                     // 28
    this.requireUser = function(){                                                                                   // 29
                                                                                                                     // 30
      var deferred = $q.defer();                                                                                     // 31
                                                                                                                     // 32
      $meteorUtils.autorun($rootScope, function(){                                                                   // 33
        if ( !Meteor.loggingIn() ) {                                                                                 // 34
          if ( Meteor.user() == null)                                                                                // 35
            deferred.reject("AUTH_REQUIRED");                                                                        // 36
          else                                                                                                       // 37
            deferred.resolve( Meteor.user() );                                                                       // 38
        }                                                                                                            // 39
      });                                                                                                            // 40
                                                                                                                     // 41
      return deferred.promise;                                                                                       // 42
    };                                                                                                               // 43
                                                                                                                     // 44
    this.requireValidUser = function(validatorFn) {                                                                  // 45
      return self.requireUser().then(function(user){                                                                 // 46
        var valid = validatorFn( user );                                                                             // 47
                                                                                                                     // 48
        if ( valid === true )                                                                                        // 49
          return user;                                                                                               // 50
        else if ( typeof valid === "string" )                                                                        // 51
          return $q.reject( valid );                                                                                 // 52
        else                                                                                                         // 53
          return $q.reject( "FORBIDDEN" );                                                                           // 54
	  });                                                                                                               // 55
	};                                                                                                                  // 56
                                                                                                                     // 57
    this.loginWithPassword = function(user, password){                                                               // 58
                                                                                                                     // 59
      var deferred = $q.defer();                                                                                     // 60
                                                                                                                     // 61
      Meteor.loginWithPassword(user, password, function(err){                                                        // 62
        if (err)                                                                                                     // 63
          deferred.reject(err);                                                                                      // 64
        else                                                                                                         // 65
          deferred.resolve();                                                                                        // 66
      });                                                                                                            // 67
                                                                                                                     // 68
      return deferred.promise;                                                                                       // 69
    };                                                                                                               // 70
                                                                                                                     // 71
    this.createUser = function(options){                                                                             // 72
                                                                                                                     // 73
      var deferred = $q.defer();                                                                                     // 74
                                                                                                                     // 75
      Accounts.createUser(options, function(err){                                                                    // 76
        if (err)                                                                                                     // 77
          deferred.reject(err);                                                                                      // 78
        else                                                                                                         // 79
          deferred.resolve();                                                                                        // 80
      });                                                                                                            // 81
                                                                                                                     // 82
      return deferred.promise;                                                                                       // 83
    };                                                                                                               // 84
                                                                                                                     // 85
    this.changePassword = function(oldPassword, newPassword){                                                        // 86
                                                                                                                     // 87
      var deferred = $q.defer();                                                                                     // 88
                                                                                                                     // 89
      Accounts.changePassword(oldPassword, newPassword, function(err){                                               // 90
        if (err)                                                                                                     // 91
          deferred.reject(err);                                                                                      // 92
        else                                                                                                         // 93
          deferred.resolve();                                                                                        // 94
      });                                                                                                            // 95
                                                                                                                     // 96
      return deferred.promise;                                                                                       // 97
    };                                                                                                               // 98
                                                                                                                     // 99
    this.forgotPassword = function(options){                                                                         // 100
                                                                                                                     // 101
      var deferred = $q.defer();                                                                                     // 102
                                                                                                                     // 103
      Accounts.forgotPassword(options, function(err){                                                                // 104
        if (err)                                                                                                     // 105
          deferred.reject(err);                                                                                      // 106
        else                                                                                                         // 107
          deferred.resolve();                                                                                        // 108
      });                                                                                                            // 109
                                                                                                                     // 110
      return deferred.promise;                                                                                       // 111
    };                                                                                                               // 112
                                                                                                                     // 113
    this.resetPassword = function(token, newPassword){                                                               // 114
                                                                                                                     // 115
      var deferred = $q.defer();                                                                                     // 116
                                                                                                                     // 117
      Accounts.resetPassword(token, newPassword, function(err){                                                      // 118
        if (err)                                                                                                     // 119
          deferred.reject(err);                                                                                      // 120
        else                                                                                                         // 121
          deferred.resolve();                                                                                        // 122
      });                                                                                                            // 123
                                                                                                                     // 124
      return deferred.promise;                                                                                       // 125
    };                                                                                                               // 126
                                                                                                                     // 127
    this.verifyEmail = function(token){                                                                              // 128
                                                                                                                     // 129
      var deferred = $q.defer();                                                                                     // 130
                                                                                                                     // 131
      Accounts.verifyEmail(token, function(err){                                                                     // 132
        if (err)                                                                                                     // 133
          deferred.reject(err);                                                                                      // 134
        else                                                                                                         // 135
          deferred.resolve();                                                                                        // 136
      });                                                                                                            // 137
                                                                                                                     // 138
      return deferred.promise;                                                                                       // 139
    };                                                                                                               // 140
                                                                                                                     // 141
    this.logout = function(){                                                                                        // 142
                                                                                                                     // 143
      var deferred = $q.defer();                                                                                     // 144
                                                                                                                     // 145
      Meteor.logout(function(err){                                                                                   // 146
          if (err)                                                                                                   // 147
            deferred.reject(err);                                                                                    // 148
          else                                                                                                       // 149
            deferred.resolve();                                                                                      // 150
        });                                                                                                          // 151
                                                                                                                     // 152
      return deferred.promise;                                                                                       // 153
    };                                                                                                               // 154
                                                                                                                     // 155
    this.logoutOtherClients = function(){                                                                            // 156
                                                                                                                     // 157
      var deferred = $q.defer();                                                                                     // 158
                                                                                                                     // 159
      Meteor.logoutOtherClients(function(err){                                                                       // 160
        if (err)                                                                                                     // 161
          deferred.reject(err);                                                                                      // 162
        else                                                                                                         // 163
          deferred.resolve();                                                                                        // 164
      });                                                                                                            // 165
                                                                                                                     // 166
      return deferred.promise;                                                                                       // 167
    };                                                                                                               // 168
                                                                                                                     // 169
    this.loginWithFacebook = function(options){                                                                      // 170
                                                                                                                     // 171
      var deferred = $q.defer();                                                                                     // 172
                                                                                                                     // 173
      Meteor.loginWithFacebook(options, function(err){                                                               // 174
        if (err)                                                                                                     // 175
          deferred.reject(err);                                                                                      // 176
        else                                                                                                         // 177
          deferred.resolve();                                                                                        // 178
      });                                                                                                            // 179
                                                                                                                     // 180
      return deferred.promise;                                                                                       // 181
    };                                                                                                               // 182
                                                                                                                     // 183
    this.loginWithTwitter = function(options){                                                                       // 184
                                                                                                                     // 185
      var deferred = $q.defer();                                                                                     // 186
                                                                                                                     // 187
      Meteor.loginWithTwitter(options, function(err){                                                                // 188
        if (err)                                                                                                     // 189
          deferred.reject(err);                                                                                      // 190
        else                                                                                                         // 191
          deferred.resolve();                                                                                        // 192
      });                                                                                                            // 193
                                                                                                                     // 194
      return deferred.promise;                                                                                       // 195
    };                                                                                                               // 196
                                                                                                                     // 197
    this.loginWithGoogle = function(options){                                                                        // 198
                                                                                                                     // 199
      var deferred = $q.defer();                                                                                     // 200
                                                                                                                     // 201
      Meteor.loginWithGoogle(options, function(err){                                                                 // 202
        if (err)                                                                                                     // 203
          deferred.reject(err);                                                                                      // 204
        else                                                                                                         // 205
          deferred.resolve();                                                                                        // 206
      });                                                                                                            // 207
                                                                                                                     // 208
      return deferred.promise;                                                                                       // 209
    };                                                                                                               // 210
                                                                                                                     // 211
    this.loginWithGithub = function(options){                                                                        // 212
                                                                                                                     // 213
      var deferred = $q.defer();                                                                                     // 214
                                                                                                                     // 215
      Meteor.loginWithGithub(options, function(err){                                                                 // 216
        if (err)                                                                                                     // 217
          deferred.reject(err);                                                                                      // 218
        else                                                                                                         // 219
          deferred.resolve();                                                                                        // 220
      });                                                                                                            // 221
                                                                                                                     // 222
      return deferred.promise;                                                                                       // 223
    };                                                                                                               // 224
                                                                                                                     // 225
    this.loginWithMeteorDeveloperAccount = function(options){                                                        // 226
                                                                                                                     // 227
      var deferred = $q.defer();                                                                                     // 228
                                                                                                                     // 229
      Meteor.loginWithMeteorDeveloperAccount(options, function(err){                                                 // 230
        if (err)                                                                                                     // 231
          deferred.reject(err);                                                                                      // 232
        else                                                                                                         // 233
          deferred.resolve();                                                                                        // 234
      });                                                                                                            // 235
                                                                                                                     // 236
      return deferred.promise;                                                                                       // 237
    };                                                                                                               // 238
                                                                                                                     // 239
    this.loginWithMeetup = function(options){                                                                        // 240
                                                                                                                     // 241
      var deferred = $q.defer();                                                                                     // 242
                                                                                                                     // 243
      Meteor.loginWithMeetup(options, function(err){                                                                 // 244
        if (err)                                                                                                     // 245
          deferred.reject(err);                                                                                      // 246
        else                                                                                                         // 247
          deferred.resolve();                                                                                        // 248
      });                                                                                                            // 249
                                                                                                                     // 250
      return deferred.promise;                                                                                       // 251
    };                                                                                                               // 252
                                                                                                                     // 253
    this.loginWithWeibo = function(options){                                                                         // 254
                                                                                                                     // 255
      var deferred = $q.defer();                                                                                     // 256
                                                                                                                     // 257
      Meteor.loginWithWeibo(options, function(err){                                                                  // 258
        if (err)                                                                                                     // 259
          deferred.reject(err);                                                                                      // 260
        else                                                                                                         // 261
          deferred.resolve();                                                                                        // 262
      });                                                                                                            // 263
                                                                                                                     // 264
      return deferred.promise;                                                                                       // 265
    };                                                                                                               // 266
  }]);                                                                                                               // 267
                                                                                                                     // 268
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-methods.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
var angularMeteorMethods = angular.module('angular-meteor.methods', []);                                             // 2
                                                                                                                     // 3
angularMeteorMethods.service('$meteorMethods', ['$q',                                                                // 4
  function ($q) {                                                                                                    // 5
    this.call = function(){                                                                                          // 6
                                                                                                                     // 7
      var deferred = $q.defer();                                                                                     // 8
                                                                                                                     // 9
      Array.prototype.push.call(arguments, function (err, data) {                                                    // 10
        if (err)                                                                                                     // 11
          deferred.reject(err);                                                                                      // 12
        else                                                                                                         // 13
          deferred.resolve(data);                                                                                    // 14
      });                                                                                                            // 15
      Meteor.call.apply(this, arguments);                                                                            // 16
                                                                                                                     // 17
      return deferred.promise;                                                                                       // 18
    };                                                                                                               // 19
  }]);                                                                                                               // 20
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-session.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
var angularMeteorSession = angular.module('angular-meteor.session', ['angular-meteor.utils']);                       // 2
                                                                                                                     // 3
angularMeteorSession.factory('$meteorSession', ['$meteorUtils',                                                      // 4
  function ($meteorUtils) {                                                                                          // 5
    return function (session) {                                                                                      // 6
                                                                                                                     // 7
      return {                                                                                                       // 8
                                                                                                                     // 9
        bind: function(scope, model) {                                                                               // 10
          $meteorUtils.autorun(scope, function() {                                                                   // 11
            scope[model] = Session.get(session);                                                                     // 12
          });                                                                                                        // 13
                                                                                                                     // 14
          scope.$watch(model, function (newItem, oldItem) {                                                          // 15
            Session.set(session, scope[model]);                                                                      // 16
          }, true);                                                                                                  // 17
                                                                                                                     // 18
        }                                                                                                            // 19
      };                                                                                                             // 20
    }                                                                                                                // 21
  }                                                                                                                  // 22
]);                                                                                                                  // 23
                                                                                                                     // 24
                                                                                                                     // 25
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-reactive-scope.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  // 1
 * Created by netanel on 29/12/14.                                                                                   // 2
 */                                                                                                                  // 3
var angularMeteorReactiveScope = angular.module('angular-meteor.reactive-scope', []);                                // 4
                                                                                                                     // 5
angularMeteorReactiveScope.run(['$rootScope', '$parse', function($rootScope, $parse) {                               // 6
  Object.getPrototypeOf($rootScope).getReactively = function(property, objectEquality) {                             // 7
    var self = this;                                                                                                 // 8
    var getValue = $parse(property);                                                                                 // 9
    objectEquality = !!objectEquality;                                                                               // 10
                                                                                                                     // 11
    if (!self.hasOwnProperty('$$trackerDeps')) {                                                                     // 12
      self.$$trackerDeps = {};                                                                                       // 13
    }                                                                                                                // 14
                                                                                                                     // 15
    if (!self.$$trackerDeps[property]) {                                                                             // 16
      self.$$trackerDeps[property] = new Tracker.Dependency();                                                       // 17
                                                                                                                     // 18
      self.$watch(function() {                                                                                       // 19
        return getValue(self)                                                                                        // 20
      }, function(newVal, oldVal) {                                                                                  // 21
        if (newVal !== oldVal) {                                                                                     // 22
          self.$$trackerDeps[property].changed();                                                                    // 23
        }                                                                                                            // 24
      }, objectEquality);                                                                                            // 25
    }                                                                                                                // 26
                                                                                                                     // 27
    self.$$trackerDeps[property].depend();                                                                           // 28
                                                                                                                     // 29
    return getValue(self);                                                                                           // 30
  };                                                                                                                 // 31
}]);                                                                                                                 // 32
                                                                                                                     // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-utils.js                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
var angularMeteorUtils = angular.module('angular-meteor.utils', []);                                                 // 2
                                                                                                                     // 3
angularMeteorUtils.service('$meteorUtils', [ '$timeout',                                                             // 4
  function ($timeout) {                                                                                              // 5
    var self = this;                                                                                                 // 6
    this.getCollectionByName = function(string){                                                                     // 7
      return Mongo.Collection.get(string);                                                                           // 8
    };                                                                                                               // 9
    this.autorun = function(scope, fn) {                                                                             // 10
      // wrapping around Deps.autorun                                                                                // 11
      var comp = Tracker.autorun(function(c) {                                                                       // 12
        fn(c);                                                                                                       // 13
                                                                                                                     // 14
        // this is run immediately for the first call                                                                // 15
        // but after that, we need to $apply to start Angular digest                                                 // 16
        if (!c.firstRun) $timeout(angular.noop, 0);                                                                  // 17
      });                                                                                                            // 18
      // stop autorun when scope is destroyed                                                                        // 19
      scope.$on('$destroy', function() {                                                                             // 20
        comp.stop();                                                                                                 // 21
      });                                                                                                            // 22
      // return autorun object so that it can be stopped manually                                                    // 23
      return comp;                                                                                                   // 24
    };                                                                                                               // 25
  }]);                                                                                                               // 26
                                                                                                                     // 27
angularMeteorUtils.run(['$rootScope', '$meteorUtils',                                                                // 28
  function($rootScope, $meteorUtils) {                                                                               // 29
    Object.getPrototypeOf($rootScope).$meteorAutorun = function(fn) {                                                // 30
      return $meteorUtils.autorun(this, fn);                                                                         // 31
    };                                                                                                               // 32
}]);                                                                                                                 // 33
                                                                                                                     // 34
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/modules/angular-meteor-camera.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
var angularMeteorUtils = angular.module('angular-meteor.camera', []);                                                // 2
                                                                                                                     // 3
angularMeteorUtils.service('$meteorCamera', ['$q',                                                                   // 4
  function ($q) {                                                                                                    // 5
    this.getPicture = function(options){                                                                             // 6
      if (!options)                                                                                                  // 7
        options = {};                                                                                                // 8
                                                                                                                     // 9
      var deferred = $q.defer();                                                                                     // 10
                                                                                                                     // 11
      MeteorCamera.getPicture(options, function (error, data) {                                                      // 12
        if (error)                                                                                                   // 13
          deferred.reject(err);                                                                                      // 14
                                                                                                                     // 15
        if (data)                                                                                                    // 16
          deferred.resolve(data);                                                                                    // 17
      });                                                                                                            // 18
                                                                                                                     // 19
      return deferred.promise;                                                                                       // 20
    };                                                                                                               // 21
  }]);                                                                                                               // 22
                                                                                                                     // 23
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/urigo:angular/angular-meteor.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Define angular-meteor and its dependencies                                                                        // 1
var angularMeteor = angular.module('angular-meteor', [                                                               // 2
  'angular-meteor.subscribe',                                                                                        // 3
  'angular-meteor.collections',                                                                                      // 4
  'angular-meteor.meteor-collection',                                                                                // 5
  'angular-meteor.object',                                                                                           // 6
  'angular-meteor.template',                                                                                         // 7
  'angular-meteor.user',                                                                                             // 8
  'angular-meteor.methods',                                                                                          // 9
  'angular-meteor.session',                                                                                          // 10
  'angular-meteor.reactive-scope',                                                                                   // 11
  'angular-meteor.utils',                                                                                            // 12
  'angular-meteor.camera',                                                                                           // 13
  'hashKeyCopier'                                                                                                    // 14
]);                                                                                                                  // 15
                                                                                                                     // 16
angularMeteor.run(['$compile', '$document', '$rootScope', function ($compile, $document, $rootScope) {               // 17
    // Recompile after iron:router builds page                                                                       // 18
    if(typeof Router != 'undefined') {                                                                               // 19
      var appLoaded = false;                                                                                         // 20
      Router.onAfterAction(function(req, res, next) {                                                                // 21
        Tracker.afterFlush(function() {                                                                              // 22
          if (!appLoaded) {                                                                                          // 23
            $compile($document)($rootScope);                                                                         // 24
            if (!$rootScope.$$phase) $rootScope.$apply();                                                            // 25
            appLoaded = true;                                                                                        // 26
          }                                                                                                          // 27
        })                                                                                                           // 28
      });                                                                                                            // 29
    }                                                                                                                // 30
  }]);                                                                                                               // 31
                                                                                                                     // 32
// Putting all services under $meteor service for syntactic sugar                                                    // 33
angularMeteor.service('$meteor', ['$meteorCollection', '$meteorObject', '$meteorMethods', '$meteorSession', '$meteorSubscribe', '$meteorUtils', '$meteorCamera', '$meteorUser',
  function($meteorCollection, $meteorObject, $meteorMethods, $meteorSession, $meteorSubscribe, $meteorUtils, $meteorCamera, $meteorUser){
    this.collection = $meteorCollection;                                                                             // 36
    this.object = $meteorObject;                                                                                     // 37
    this.subscribe = $meteorSubscribe.subscribe;                                                                     // 38
    this.call = $meteorMethods.call;                                                                                 // 39
    this.loginWithPassword = $meteorUser.loginWithPassword;                                                          // 40
    this.requireUser = $meteorUser.requireUser;                                                                      // 41
    this.requireValidUser = $meteorUser.requireValidUser;                                                            // 42
    this.waitForUser = $meteorUser.waitForUser;                                                                      // 43
    this.createUser = $meteorUser.createUser;                                                                        // 44
    this.changePassword = $meteorUser.changePassword;                                                                // 45
    this.forgotPassword = $meteorUser.forgotPassword;                                                                // 46
    this.resetPassword = $meteorUser.resetPassword;                                                                  // 47
    this.verifyEmail = $meteorUser.verifyEmail;                                                                      // 48
    this.loginWithMeteorDeveloperAccount = $meteorUser.loginWithMeteorDeveloperAccount;                              // 49
    this.loginWithFacebook = $meteorUser.loginWithFacebook;                                                          // 50
    this.loginWithGithub = $meteorUser.loginWithGithub;                                                              // 51
    this.loginWithGoogle = $meteorUser.loginWithGoogle;                                                              // 52
    this.loginWithMeetup = $meteorUser.loginWithMeetup;                                                              // 53
    this.loginWithTwitter = $meteorUser.loginWithTwitter;                                                            // 54
    this.loginWithWeibo = $meteorUser.loginWithWeibo;                                                                // 55
    this.logout = $meteorUser.logout;                                                                                // 56
    this.logoutOtherClients = $meteorUser.logoutOtherClients;                                                        // 57
    this.session = $meteorSession;                                                                                   // 58
    this.autorun = $meteorUtils.autorun;                                                                             // 59
    this.getCollectionByName = $meteorUtils.getCollectionByName;                                                     // 60
    this.getPicture = $meteorCamera.getPicture;                                                                      // 61
}]);                                                                                                                 // 62
                                                                                                                     // 63
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['urigo:angular'] = {};

})();
