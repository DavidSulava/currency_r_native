import {
		DarkTheme,
		DefaultTheme,
} from '@react-navigation/native';

export const appTheme = {
		light: {
				...DefaultTheme,
				colors: {
						...DefaultTheme.colors,
						primary: 'rgb(128,125,125)',
						card: 'rgb(246,245,245)',
						text: '#5b5a5a',
						icon: '#aba7a7',
				},
				stl_t:{
						text:{
								color: '#5b5a5a',
						},
						screen:{
								backgroundColor:'rgb(226,223,223)',
						},
						formContainer:{
								backgroundColor:'#fcfbfb',
						},
						formInput:{
								backgroundColor:'#e7e5e5',
						},
						selected:{
								color:'#b3afaf',
						},
						shadow:{
								shadowColor: "#000",
								shadowOffset: {
										width: 0,
										height: 1,
								},
								shadowOpacity: 0.22,
								shadowRadius: 2.22,

								elevation: 3,
						},

				}
		},
		dark: {
				...DarkTheme,
				colors: {
						...DarkTheme.colors,
						text: '#e2dfdf',
						primary: 'rgb(231,228,228)',
						icon: '#aba7a7',
				},
				stl_t:{
						text:{
								color: '#e2dfdf',
						},
						screen:{
								backgroundColor:'#393636',
						},
						formContainer:{
								backgroundColor:'#0a0a0a',
						},
						formInput:{
								backgroundColor:'#1d1c1c',
						},
						selected:{
								color:'#9f9a9a',
						},
						shadow:{
								shadowColor: "#070303",
								shadowOffset: {
										width: 0,
										height: 1,
								},
								shadowOpacity: 0.22,
								shadowRadius: 2.22,

								elevation: 3,
						},
				}
		},
};
