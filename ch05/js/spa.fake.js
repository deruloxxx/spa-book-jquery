/*
 * spa.fake.js
 * Fake module
 */

/*jslint         browser : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global $, spa */

spa.fake = (function () {
  'use strict';
  var getPeopleList, fakeIdSerial, makeFakeId, mockSio;

  fakeIdSerial = 5;

  makeFakeId = function() {
    return 'id_' + String(fakeIdSerial++);
  }

  getPeopleList = function() {
    return [
      {
        name: 'Bety',
        _id: 'id_01',
        css_map: {
          top: 20,
          left: 20,
          'background-color': 'rgb( 128, 128, 128)'
        }
      },
      {
        name: 'Make',
        _id: 'id_02',
        css_map: {
          top: 60,
          left: 20,
          'background-color': 'rgb( 128, 255, 128)'
        }
      },
      {
        name: 'Pabbles',
        _id: 'id_03',
        css_map: {
          top: 100,
          left: 20,
          'background-color': 'rgb( 128, 192, 192)'
        }
      },
      {
        name: 'Wilma',
        _id: 'id_04',
        css_map: {
          top: 140,
          left: 20,
          'background-color': 'rgb( 192, 128, 192)'
        }
      },
    ];
  };

  mockSio = (function() {
    var on_sio, emit_sio, callback_map = {};

    on_sio = function(msg_type, callback) {
      callback_map[msg_type] = callback;
    };

    emit_sio = function(msg_type,data) {
      if(msg_type === 'adduser' && callback_map.userupdate) {
        setTimeout(function() {
          callback_map.userupdate(
            [{
              _id: makeFakeId(),
              name: data.name,
              css_map: data.css_map
            }]
          );
        }, 3000);
      }
    };
    return {emit: emit_sio, on:on_sio};
  }());

  return {
    getPeopleList: getPeopleList,
    mockSio: mockSio
  };
}());
