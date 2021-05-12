
import React                   from 'react';
import type {Node}             from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import {
    createDrawerNavigator,
}                           from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icons                from 'react-native-vector-icons/FontAwesome';
import {
    Provider,
    useSelector,
}                                                from 'react-redux';
import thunk                                     from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'

import HomeStack from './routes/HomeStack';


// ---[ Reducers ]---
import rootReducer    from './store/reducers/rootReducer';
import ConverterStack from './routes/ConverterStack';
import CustomDrawer from './components/customDrawer';
import {appTheme}   from './styles/appThemes';


const store = createStore( rootReducer,  compose( applyMiddleware(thunk) ) );

const Drawer = createDrawerNavigator();

const NavContainer = ()=>{
    //--Variables
    const isDarkMode =  useSelector(state => state.isDarkMode);
    const theme      = isDarkMode ? appTheme.dark : appTheme.light;

    const homeDrawerText      = 'Home';
    const converterDrawerText = 'Converter';


    //--Functions
    const iconOptions = (name, themeColors)=>{

        return {
            drawerIcon: ({focused, size}) => (
                <Icons
                    name={name}
                    size={size}
                    color={focused ?  themeColors.primary : themeColors.icon}
                />
            ),
        }
    }


    return (

        <SafeAreaProvider>
            <NavigationContainer theme={theme}>
                <Drawer.Navigator initialRouteName={homeDrawerText} drawerContent={props => <CustomDrawer {...props} theme={theme}/>}>
                    <Drawer.Screen name={homeDrawerText} component={HomeStack} options={iconOptions('home', theme.colors)}/>
                    <Drawer.Screen name={converterDrawerText} component={ConverterStack} options={iconOptions('refresh', theme.colors)}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>

    );

}

const App: () => Node = () => {

    return (
        <Provider store={store}>
          <NavContainer/>
        </Provider>
    );
};

export default App;
