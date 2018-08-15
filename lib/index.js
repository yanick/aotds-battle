'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.arcs = undefined;

var _redux = require('redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fp = require('lodash/fp');

var _fp2 = _interopRequireDefault(_fp);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _schemas = require('./schemas');

var _schemas2 = _interopRequireDefault(_schemas);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('aotds:battle');

let schemas = new _schemas2.default();

const arcs = exports.arcs = {
    F: [[-1, 1]],
    FS: [[1, 3]],
    AS: [[3, 5]],
    A: [[5, 6], [-6, -5]],
    AP: [[-5, -3]],
    FP: [[-3, -1]]
};

let Battle = class Battle {

    constructor(state = {}) {

        this.store = (0, _redux.createStore)(_reducer2.default, state, (0, _redux.applyMiddleware)(..._middlewares2.default));

        // this.store.subscribe( () => {
        //      schemas.validate(
        //          { '$ref': 'http://aotds.babyl.ca/battle/game_turn'},
        //          this.state
        //      )
        // });
    }

    get state() {
        return this.store.getState();
    }

    get name() {
        return _fp2.default.get('game.name')(this.state);
    }
    get turn() {
        return _fp2.default.get('game.name')(this.state);
    }

    dispatch(action) {
        return this.store.dispatch(action);
    }

    init_game(message) {
        return this.store.dispatch(_actions2.default.init_game(message));
    }

    set_orders(ship, orders) {
        return this.store.dispatch(_actions2.default.set_orders(ship, orders));
    }

    play_turn(force = false) {
        return this.store.dispatch(_actions2.default.play_turn(force));
    }

};
exports.default = Battle;
;

/**
 * build middlewares for only certain types of actions
 * @param actions list of action types the middleware should be invoked for
 */
/*
function for_actions(...actions) {
    return store => next => action => {
        if (  actions.indexOf( action.type ) > -1 ) {
            this(store)(next)(action);
        }
        else {
            next(action);
        }
    };
}

const MW_firecons_fire = ( store => next => action => {
    let state = store.getState();

    next(action);

    _( _(state.objects).find({ id: action.object_id }) )
        .get( 'firecons', [] )
        .filter( f => f.target_id )
        .forEach( f => {
            let a = Action.firecon_fire({ object_id: action.object_id, firecon_id: f.id });
            console.log( 'a', a );
            store.dispatch(a);
        });
} ) ::for_actions( Action.FIRECONS_FIRE );

const MW_firecon_fire = ( store => next => action => {
    let state = store.getState();

    next(action);

    let ship = _.find( state.objects, { id: action.object_id } );

    let firecon = _.find( ship.firecons, { id: action.firecon_id } );

     _.get( ship, 'weapons', [] )
        .filter( f => f.firecon_id === firecon.id )
        .forEach( f => {
            let a = Action.weapon_fire({ object_id: action.object_id, weapon_id: f.id, target_id: firecon.target_id });
            store.dispatch(a);
        });
} ) ::for_actions( Action.FIRECON_FIRE );

function percolate_action() {
    return  store => next => action => {
        next(action);
        this(store)(next)(action);
    };
}

const find_object  = function(id) { return _.find( this.objects,  { id } ) };
const find_firecon = function(id) { return _.find( this.firecons, { id } ) };
const find_weapon  = function(id) { return _.find( this.weapons,  { id } ) };


let middlewares = [
    MW_firecons_fire,
    MW_firecon_fire,
];

import createSagaMiddleware from 'redux-saga';
import battle_saga from './saga';



*/