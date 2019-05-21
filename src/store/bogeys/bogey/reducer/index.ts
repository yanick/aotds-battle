// @format
import _ from 'lodash';
import u from 'updeep';
import { combineReducers } from 'redux';
import Redactor from '../../../../reducer/redactor';
import { orders_upreducer } from '../orders/reducer';
import { Action } from '../../../../reducer/types';
import { combineUpReducers } from '../../../../reducer/utils';
import { bogey_movement, bogey_firecon_orders } from '../../../../actions/bogey';
import { BogeyState } from '../types';
import { firecons_upreducer } from '../weaponry/firecons/reducer';

const redactor = new Redactor({} as BogeyState, undefined, 'aotds:reducer:bogeys:bogey');

export const bogey_reducer = redactor.asReducer;
export const bogey_upreducer = redactor.asUpReducer;
export default bogey_reducer;

const default_upreducer = combineUpReducers({
    orders: orders_upreducer,
});

redactor.for('*', default_upreducer);

redactor.for(bogey_movement, ({ payload: { navigation } }) => u({ navigation }));

redactor.for(bogey_firecon_orders, action => u.updateIn('weaponry.firecons', firecons_upreducer(action)));
