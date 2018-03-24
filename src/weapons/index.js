import fp from 'lodash/fp';
import u from 'updeep';

import { roll_dice } from '../dice';

const debug = require('debug')('aotds:test');


export
function relative_coords(ship, target ) {
    let result = {};
    let relative = fp.pipe([
        fp.map(fp.get('navigation.coords')),
        fp.zipAll,
        fp.map( x => x[1]-x[0] )
    ])([ship,target]);

    result.angle = Math.atan2(relative[0], relative[1])
        * 6 / Math.PI;

    result.bearing = result.angle - ship.navigation.heading;

    result.distance = Math.sqrt(
        fp.sum( relative.map(function (x) { return Math.pow(x, 2); }) )
    );

    return result;
}

const arc_range = {
    F:  [[ 11, 12 ],[ 0, 1 ]],
    FS: [[ 1, 3 ]],
    AS: [[ 3, 5 ]],
    A:  [[ 5, 7 ]],
    AP: [[ 7, 9 ]],
    FP: [[ 9, 11 ]],
};

export function fire_weapon( attacker, target, weapon ) {
    let result = { weapon };

    result = u(relative_coords(attacker, target))(result);

    let in_range = fp.pipe([
        fp.getOr([],'arcs'),
        fp.map( arc => arc_range[arc] ),
        fp.flatten,
        x => { debug(x); return x},
        fp.some( range => { debug(range, " ", result.bearing); 
            return fp.inRange(...range)(result.bearing) } )
    ])(weapon);

    if(!in_range) {
        return u({ no_firing_arc: true })(result);
    }

    var nbr_dice = weapon.class - Math.trunc( result.distance / 12);

    if (nbr_dice <= 0) {
        return u({ out_of_range: true })(result);
    }

    let damage_dice = roll_dice(nbr_dice);
    debug(">>>",damage_dice);
    let penetrating_damage_dice = roll_dice( damage_dice.filter( x => x == 6 ).length, { reroll: [ 6] } );

    result = u(fp.pickBy( v => v.length )({ damage_dice, penetrating_damage_dice }))(result);

    return result;

}



//     // split the damage calculation apart?

//     var table = { 4: 1, 5: 1, 6: 2 };
//     var damage = _.sum(dice.map(function (d) { return table[d] || 0; }));
//     if (damage > 0) {
//         yield {
//             type: 'DAMAGE',
//             object_id: target.id,
//             damage
//         };
//     }
//     damage = _.sum(penetrating.map(function (d) { return table[d] || 0; }));
//     if (damage > 0) {
//         yield {
//             type: 'DAMAGE',
//             is_penetrating: true,
//             object_id: target.id,
//             damage
//         };
//     }
// }
