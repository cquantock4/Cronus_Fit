import { createContext, useReducer } from 'react';


const ThemeContext = createContext('DARKMODE');

const initialState = { 
  darkMode: false,
  userid: ''
};


const themeReducer = (state, action) => {

    let temp_theme = ''

    console.log(action.type)
    let temp_user = {}

    if (action.type == "LIGHTMODE") {
      temp_theme = false;
    } else if (action.type == "DARKMODE") {
      temp_theme = true;
    }


    if (action.type == "LIGHTMODE" || action.type == "DARKMODE")
      return { darkMode: temp_theme, userid: state.userid};
    else if (action.userid != '')
      return { darkMode: state.darkMode, userid: action.userid};
    else
      return state;


};



export function ThemeProvider(props) {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</ThemeContext.Provider>;
}




export default ThemeContext