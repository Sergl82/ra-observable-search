import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
  map,
  tap,
  retry,
  filter,
  debounceTime,
  switchMap,
  catchError,
  takeUntil,
} from 'rxjs/operators';
import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_CANCELLED,
} from '../actions/actionTypes';
import {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
} from '../actions/actionCreators';
import { of } from 'rxjs';

export const changeSearchEpic = (action$, _state$) =>
  action$.pipe(
    ofType(CHANGE_SEARCH_FIELD),
    map((o) => o.payload.search.trim()),
    filter((o) => o !== ''),
    debounceTime(100),
    map((o) => searchSkillsRequest(o))
  );

export const searchSkillsEpic = (action$, _state$) =>
  action$.pipe(
    ofType(SEARCH_SKILLS_REQUEST),
    map((o) => o.payload.search),
    map((o) => new URLSearchParams({ q: o })),
    switchMap((o) =>
      ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL_BUILD}?${o}`).pipe(
        retry(3),
        tap((o) => console.log(o)),
        map((o) => searchSkillsSuccess(o)),
        takeUntil(action$.pipe(ofType(SEARCH_SKILLS_CANCELLED))),
        catchError((e) => of(searchSkillsFailure(e)))
      )
    )
  );
