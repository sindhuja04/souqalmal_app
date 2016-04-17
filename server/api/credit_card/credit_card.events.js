/**
 * CreditCard model events
 */

'use strict';

import {EventEmitter} from 'events';
import CreditCard from './credit_card.model';
var CreditCardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CreditCardEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CreditCard.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CreditCardEvents.emit(event + ':' + doc._id, doc);
    CreditCardEvents.emit(event, doc);
  }
}

export default CreditCardEvents;
