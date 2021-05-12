
const initState = { valute: {} }


function rootReducer( state = initState, action ){
		switch (action.type){
				case 'SET_VALUTE':{
						return { ...state, 'valute': action.valute   }
				}
				case 'SET_THEME_MODE':{
						return { ...state, 'isDarkMode': action.mode  }
				}

				default:
						return state
		}
}


export default rootReducer;
