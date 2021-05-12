import React, {
		useEffect,
		useState,
} from 'react';
import {
		Switch,
		TouchableWithoutFeedback,
}                          from 'react-native-gesture-handler';
import {
		StyleSheet,
		Text,
		View,
}                          from 'react-native';
import {useTheme}          from '@react-navigation/native';
import {useDispatch}       from 'react-redux';
import {setThemeMode}      from '../store/actions/setThemeMode';


const ToggleDrawerContent = (props)=>{

		const dispatch = useDispatch();

		const title = 'Dark Theme';
		const label = 'Preferences';

		const [isDarkTheme, setIsDarkTheme] = useState(false);

		const {stl_t} = useTheme()


		useEffect(()=>{

				if( isDarkTheme ){
						dispatch(setThemeMode(true));
				}else {
						dispatch(setThemeMode(false));
				}
		},[isDarkTheme]);

		const toggleTheme = ()=>{
				setIsDarkTheme(!isDarkTheme);
		}

		return (
				<View style={stl.container}>

						<Text style={stl.label}>{label}</Text>
						<TouchableWithoutFeedback onPress={toggleTheme} >

								<View style={stl.actionWrapper}>

										<Text style={[stl_t.text, stl.actionText]}>{title}</Text>
										<View pointerEvents='none'>
												<Switch value={isDarkTheme}/>
										</View>

								</View>

						</TouchableWithoutFeedback>

				</View>
		);
}

const stl = StyleSheet.create({
		container:{
				marginTop: 50,
				paddingTop: 15,
				paddingBottom: 20,
				borderTopColor:'#bfbdbd',
				borderBottomColor:'#bfbdbd',
				borderTopWidth: 1,
				borderBottomWidth: 1,
		},
		label:{
				color:'#918f8f',
				paddingLeft:5,
		},
		actionWrapper:{
				flexDirection:'row',
				justifyContent:'space-between',
				alignItems:'center',
				paddingHorizontal:20,
				paddingVertical:10,
				marginTop:10,
		},
		actionText:{
				paddingTop:5,
		},

});

export default ToggleDrawerContent
