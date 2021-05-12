export const setThemeMode = (mode_boolean)=> {

		return async ( dispatch , getState )=>{
				dispatch({ 'type': 'SET_THEME_MODE', 'mode': mode_boolean });
		}

}
