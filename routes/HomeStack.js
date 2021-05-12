import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Header     from '../components/Header';
import {useTheme} from '@react-navigation/native';

const Stack = createStackNavigator();

// home stack navigator screens
const HomeStack = ({ navigation })=>{

    const {colors,stl_t} = useTheme();

    const titleText= 'Home';


    return (
        <Stack.Navigator
             initialRouteName="Home"
             screenOptions={{
                 headerStyle: {
                     backgroundColor: colors.card,
                     ...stl_t.shadow,
                 },
             }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: ()=><Header navigation={navigation} titleText={titleText}/> }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack;
