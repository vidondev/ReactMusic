import { TOGGLE_DRAWER, TOGGLE_MODAL, TOGGLE_SEARCH_PANEL } from '../constants/ActionTypes';

const initialState = {
  drawer: {
    isOpen: true
  },
  modal: {
    isOpen: false  
  },
  search_panel: {
    isOpen: false,
    type: 'hot'//hot || suggest
  }
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, drawer: { isOpen: action.drawer.isOpen } }
     case TOGGLE_MODAL:
       return { ...state, modal: { isOpen: action.modal.isOpen } }
     case TOGGLE_SEARCH_PANEL:
       return { ...state, search_panel: { isOpen: action.search_panel.isOpen, type: action.search_panel.type || 'hot' } }
    default:
      return state;
  }
};

export default ui;
