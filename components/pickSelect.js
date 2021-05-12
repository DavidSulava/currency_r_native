import React, {
		useEffect,
		useRef,
		useState,
} from 'react';
import 'react-native-gesture-handler';
import {
		StyleSheet,
		Text,
		View,
		FlatList,
		Modal,
}                         from 'react-native';
import Icons              from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Pressable          from 'react-native/Libraries/Components/Pressable/Pressable';
import {DefaultTheme}     from '@react-navigation/native';


const PickSelect = ({ items, icon, styleInput, styleDrDown, onValueChange, placeholder })=>{
		//--Variables
		const Icon = icon || <Icons name="sort-down"  color="gray" style={stl.icon} />
		//-Set Editable Styles
		const inputColor  = styleInput && styleInput.inputColor || stlEditable.inputColor;
		const inputFSize  = styleInput && styleInput.fontSize || stlEditable.fSize;
		const drDownColor = styleDrDown && styleDrDown.textColor || stlEditable.inputColor;
		const drDownFSize = styleDrDown && styleDrDown.fontSize || stlEditable.fSize;
		const txtSelected = styleDrDown && styleDrDown.textSelected || stlEditable.selected;
		const font 				= styleDrDown && styleDrDown.font || stlEditable.font;
		const drBackColor = styleDrDown && styleDrDown.background || stlEditable.dropDownBackground;
		const dtItemHeight= inputFSize.fontSize + 25;

		const [selectItems] 				= useState( items || [{ label: placeholder || '', value: '' }] );
		const [initVal, setInitVal] = useState( selectItems[0] );
		const [showDropD, setShowD] = useState(false);

		const flatListRef = useRef(null);

		//--Watchers
		//-Execute the onValueChange callback
		useEffect(()=>{
				if( onValueChange ) onValueChange(initVal.value)
		},[initVal])
		//-Auto Scroll
		useEffect(()=>{
				if( showDropD &&  flatListRef && initVal.value){
						let index = getIndex(selectItems, initVal.value);
						flatListRef.current.scrollToIndex({
								animated: true,
								index:index,
						});
				}
		},[showDropD])

		//--Functions
		const setInput = (item)=>{
				setInitVal(item);
				setShowD(false);
		}
		const getIndex = (selectItems, value)=>{
				return selectItems.findIndex((item, index)=>{
						return value === item.value;
				})
		}


		return(
				<View >
						{/*--Input*/}
						<TouchableOpacity style={stl.inputWrap} onPress={()=>setShowD(!showDropD)}>

								{
										initVal.value ?
											<Text style={[inputColor, font, inputFSize]}>{ initVal.label }</Text>
												:
											<Text
													numberOfLines={1}
													ellipsizeMode='tail'
													style={[txtSelected, font, inputFSize]}
											>
													{ initVal.label }
											</Text>

								}
								{Icon}

						</TouchableOpacity>
						{/*--Drop Down*/}
						<Modal visible={showDropD}  animationType="slide" transparent={true}>
								<View style={[stl.dropDownC]}>
									<View style={[stl.dropDownW, drBackColor, stl.shadow]}>
										<FlatList
												ref={ flatListRef }
												data={selectItems}
												getItemLayout={(data, index) => { return {length: dtItemHeight, index, offset: dtItemHeight * index} }}
												renderItem={ ( {item} )=>{
														let colorText = item.value === initVal.value ? txtSelected : drDownColor;
														return (
																<View style={{height:dtItemHeight}}>
																		<Pressable onPress={()=>setInput(item)}
																							 android_ripple={{color:'#bec1c1', borderless: false, }}
																							 style={(isPressed)=>({opacity:isPressed? 0.9:1 })}
																		>
																				<Text style={[ colorText, drBackColor, font, drDownFSize, stl.itemW]}>{item.value}</Text>
																		</Pressable>
																</View>
														)
												}}
												keyExtractor={item => item.value}
										/>
								</View>
								</View>
						</Modal>

				</View>
		)
}


const stlEditable = StyleSheet.create({
		dropDownC:{
				backgroundColor:'rgba(45,43,43,0.5)',
		},
		inputColor:{
				color: DefaultTheme.colors.text,
		},
		font:{
				fontFamily:'Arial',
				fontWeight:'bold',
		},
		fSize:{
				fontSize : 15,
		},
		selected:{
				color: DefaultTheme.colors.primary,
		},
		dropDownBackground:{
				backgroundColor: DefaultTheme.colors.card,
		},

})
const stl = StyleSheet.create({
		inputWrap:{
				justifyContent:'center',
				padding: 8,
				paddingRight:'25%',
				borderRadius: 5,
		},
		dropDownC:{
				backgroundColor:'rgba(45,43,43,0.5)',
				justifyContent : 'center',
				alignItems:'center',
				height:'100%',
		},
		dropDownW:{
				flexDirection:'column',
				width:'90%',
				height:'95%',
				borderRadius:5,
				padding:1,
		},
		itemW:{
				padding : 8,
		},
		icon:{
				position:'absolute',
				fontSize:14,
				right:17,
				bottom:14
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
});

export default PickSelect
