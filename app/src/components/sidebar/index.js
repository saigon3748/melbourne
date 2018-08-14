import { connect } from 'react-redux';
import State from './state';
import Actions from './actions';
import View from './view';

export default connect(State, Actions)(View);
