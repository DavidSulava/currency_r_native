export const getCurrencyAction = ()=> {

		return async ( dispatch , getState )=>{

				const API = 'https://www.cbr-xml-daily.ru/daily_json.js';

				const headers = {
						method : 'GET',
				};

				try {
						const response  = await fetch( API, headers );
						let data        = await response.json();

						if( !data.Valute )
								dispatch({ 'type': 'SET_VALUTE', 'valute': {} });

						dispatch({ 'type': 'SET_VALUTE', 'valute': Object.values(data.Valute) });

				} catch (error) {
						console.log(error);
				}

		}

}
