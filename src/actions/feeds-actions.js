import { createAction } from 'redux-actions';

import * as feedService from '../services/feeds-service';

export const fetchFeed = createAction('FETCH_FEED', feedService.fetchFeed);




