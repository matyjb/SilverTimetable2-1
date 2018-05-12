import * as types from "../actions/action-types";

export const loadTimetableRequest = () => ({ type: types.LOAD_TIMETABLE_REQUEST });

export const loadTimetableFailure = () => ({ type: types.LOAD_TIMETABLE_FAILURE });

export const loadTimetableSuccess = (timetable) => ({
  type: types.LOAD_TIMETABLE_SUCCESS, payload: timetable,
});

export const loadConfiguration = (configuration) => ({
  type: types.LOAD_CONFIGURATION, payload: configuration,
});

export const changeFilter = (name, value) =>
  ({ type: types.CHANGE_FILTER, payload: { name, value } });

export const changeConfigurationOption = (name, value) => ({
  type: types.CHANGE_CONFIGURATION_OPTION, payload: { name, value },
});

export const setDay = (value) => ({
  type: types.SET_DAY, payload: value,
});

export const setFiltersOK = (value) => ({
  type: types.FILTERS_OK, payload: value,
});