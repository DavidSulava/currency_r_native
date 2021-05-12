import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header          from '../components/Header';
import ConverterScreen from '../screens/ConverterScreen';
import {useTheme}      from '@react-navigation/native';

const Stack = createStackNavigator();

// home stack navigator screens
const ConverterStack = ({ navigation })=>{

		const {colors, stl_t} = useTheme();

		const titleText = 'Converter';


		return (
				<Stack.Navigator initialRouteName="Home"
												 screenOptions={{
														 headerStyle: {
																 backgroundColor: colors.card,
																 ...stl_t.shadow,
														 },
												 }}
				>
						<Stack.Screen
								name="Home"
								component={ConverterScreen}
								options={{ headerTitle: ()=><Header navigation={navigation} titleText={titleText}/> }}
						/>
				</Stack.Navigator>
		)
}

export default ConverterStack;
