import { createStore } from "redux";
import rootReducer from "../reducers";

export const initialState = {
  timetable: {
    isLoaded: false,
    isError: false,
    data: null,
  },
  configuration: {
    filters: {
      department: null,
      fieldOfStudy: null,
      degree: null,
      mode: null,
      semester: null,
      group: null,
      academicYear: null,
    },
    notifyAboutUpdates: true,
    allowQuickGroupChange: true,
    lecturerMode: false,
  },
};

const store = createStore(rootReducer, initialState);

export default store;