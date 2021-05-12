import React                    from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView }         from 'react-native-safe-area-context';


export default function CurrencyItem(item, stl_t){
    //--Variables
    let delta = item.Value - item.Previous;
        delta = delta.toPrecision(4);
    let deltaColor = delta>0? {'color':'green'}:{'color':'red'};

    const arrowUp   = <Text style={[deltaColor, stl.bold] }>&#x2191;</Text>;
    const arrowDown = <Text style={[deltaColor, stl.bold] }>&#x2193;</Text>;


    return (
        <SafeAreaView style={[stl.cContainer, stl_t.formContainer, stl_t.shadow]}>

            <Text style={[stl_t.formContainer, stl.cItemTitle]}>{item.Name}</Text>

            <View style={[stl.row]}>

                <View style={[stl.cItem]}>

                    <Text style={stl_t.text}>{item.Nominal+' '+item.CharCode}</Text>

                    <View style={stl.beArrow_w}>
                        <Text style={[stl.bold, stl.beArrow, stl_t.text]}>&#8596;</Text>
                    </View>

                    <Text style={stl_t.text}>{item.Value} RUB</Text>

                </View>

                <View style={stl.cDelta}>
                    { delta>0? arrowUp: arrowDown}
                    <Text style={[deltaColor, stl.lMargin]}>{delta}</Text>
                </View>

            </View>

        </SafeAreaView>

    );
};

const stl = StyleSheet.create({
    cContainer:{
        flex: 1,
        padding: 15,
        marginBottom:5,
        marginHorizontal:5,
        borderRadius:5,
    },
    cItemTitle:{
        color:"#69696b",
    },
    row:{
        flexDirection:"row",
        alignItems:'center',
        paddingTop:5,
    },
    cItem:{
        flexDirection:"row",
        width:'70%',
        alignItems:'center',
    },
    beArrow_w:{
        alignItems:'center',
        paddingHorizontal:5,
    },
    beArrow:{
        // marginBottom : 5,
    },
    cDelta:{
        flexDirection:"row",
        justifyContent:'flex-end',
        paddingLeft:5,
        width:'30%',
    },
    bold:{
        fontWeight:'bold',
    },
    lMargin:{
        marginLeft:3,
    }
});
