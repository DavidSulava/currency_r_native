
import React, {useEffect, useState}                from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import 'react-native-gesture-handler';
import {
    Button,
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator,
    DevSettings,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import CurrencyItem        from '../components/currencyListItem';
import {getCurrencyAction} from '../store/actions/getCurrency';
import {useTheme}          from '@react-navigation/native';


const HomeScreen = () => {
    const dispatch = useDispatch();
    //--Variables
    const valute                      = useSelector(state => state.valute, shallowEqual );
    const [isFetching, setIsFetching] = useState(false);
    const [netStatus, setNetStatus]   = useState({isConnected: false})
    const { stl_t, dark } = useTheme()


    //--Watchers
    useEffect(() => {

        dispatch( getCurrencyAction() );

        // Subscribe for Internet Connection Status
        const unsubscribe = NetInfo.addEventListener(state => {

            setNetStatus({
                isConnected:  state.isConnected,
            })
        });

        return ()=> unsubscribe()

    }, [dispatch]);

    //If there is no Data in the Store && Internet Connection changed to true, get Data From Api
    useEffect(()=>{
        if( netStatus.isConnected && !valute.length )
            dispatch( getCurrencyAction() );
    },[netStatus])


    //--Functions
    const refreshData = ()=>{
        setIsFetching(true)
        dispatch( getCurrencyAction() ).then(()=>setIsFetching(false))
    }


    return (
        <View style={[stl_t.screen, stl.container]}>
            {/*<Button title="Reload" onPress={() => DevSettings.reload()} />*/}
            {
                valute.length ?
                    <FlatList
                        data={valute}
                        extraData={dark}
                        renderItem={( {item} )=>CurrencyItem(item, stl_t)}
                        onRefresh={ () => refreshData() }
                        refreshing={isFetching}
                        keyExtractor={item => item.ID}
                    />
                    :
                    <View style={stl.loadingContainer}>
                        <ActivityIndicator  size="large" color="#2CA8D7"/>
                    </View>

            }
        </View>
    );
};

const stl = StyleSheet.create({
    container:{
        padding:10,
        paddingTop:10,
        height: '100%',
    },
    loadingContainer:{
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
});

export default HomeScreen;
