import React                                from 'react';
import {StyleSheet,  Pressable, Text, View} from 'react-native';
import { SafeAreaView }                     from 'react-native-safe-area-context';
import Icons                                from 'react-native-vector-icons/FontAwesome';
import {useTheme}                           from '@react-navigation/native';

const Header = ({ navigation, titleText })=>{

    const {stl_t} = useTheme();

    return (
        <SafeAreaView style={stl.sectionContainer}>
            <Pressable onPress={()=>navigation.openDrawer()} style={ ({ pressed })=>[{opacity: pressed? 0.5:1}, stl.barIconW] }>
                <Icons name="bars" style={[ stl_t.text, stl.barIcon ]}/>
            </Pressable>
            <View style={stl.titleW}>
                <Text style={[ stl_t.text, stl.title ]}>{ titleText }</Text>
            </View>
        </SafeAreaView>
    )
}

const stl = StyleSheet.create({
    sectionContainer: {
        padding:2,
        flexDirection:'row',
        justifyContent: 'flex-start',
    },
    barIconW:{
        width: 30,
    },
    barIcon:{
        fontSize:30,
    },
    titleW:{
        width:'90%',
        marginLeft:20,
        justifyContent: 'center',
    },
    title:{
        fontWeight:'bold',
        fontSize: 18,
    },
});

export default Header;
