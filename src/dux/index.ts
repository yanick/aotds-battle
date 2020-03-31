import Updux, { coduxes, dux, DuxState } from 'updux';
import fp from 'lodash/fp';
import u from 'updeep';
import { action, empty, payload } from 'ts-action';

import { metaTimestampDux } from './metaTimestamp';
import actionId, { actionIdEffect } from './game/actionId';
import subactions from './subactions';
import playPhases from './playPhases';
import bogeys, { inflateBogeys } from './bogeys';
import log from './log';
import game from './game';

type State = {
    game: {
        next_action_id: number;
    };
};

type GameInitPayload = {};

const init_game = action('init_game', payload<GameInitPayload>());

const battleDux = new Updux({
    initial: {} as State,
    ...coduxes(metaTimestampDux, playPhases),
    subduxes: {
        game,
        bogeys,
        log,
    },
    actions: { init_game },
    effects: [['*', actionIdEffect(state => state?.game?.next_action_id)]],
});

export function inflateBattle( shorthand: any ) {
    return u({
        bogeys: inflateBogeys
    }, shorthand)
}

battleDux.addMutation( init_game,
    initState => u(inflateBattle(initState)) );

export type BattleState = DuxState< typeof battleDux >;

export default battleDux.asDux;