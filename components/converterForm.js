import React          from 'react';
import 'react-native-gesture-handler';
import {
		StyleSheet,
		Text,
		View,
		TextInput,
}                         from 'react-native';
import {globStyles}       from '../styles/global';
import {useTheme}         from '@react-navigation/native';
import Icons              from 'react-native-vector-icons/FontAwesome';
import PickSelect         from './pickSelect';


const ConverterForm = ({options, formData, setForm, setFormData, inputChange, editable})=>{

		const { stl_t, colors } = useTheme();

		const iconArrow = <Icons name="sort-down"  color="gray" style={stl.icon} />;


		return (
				<View style={[stl.form, globStyles.borderShadow, stl_t.formContainer]}>
						{/*--Title--*/}
						<Text style={stl.label}>{formData.label}</Text>
						<View style={stl.formInputWrapper}>
								{/*--Select Currency--*/}
								<View style={stl.pickerWrapper}>
										<PickSelect
												styleInput={{inputColor:stl_t.text}}
												styleDrDown={{textColor:stl_t.text, textSelected:stl_t.selected, background:stl_t.formContainer }}
												icon={iconArrow}
												onValueChange={ (value) => setFormData(value, setForm) }
												items={ options.map( (val)=> ({ label: val, value: val }) ) }
										/>

								</View>
								{/* --Number Enter-- */}
								<TextInput
										onChangeText={ (val)=>inputChange(val, setForm) }
										keyboardType="numeric"
										value={`${formData.input}`}
										placeholder={`${formData.input}`}
										editable={editable}
										style={[stl.input, stl_t.text, editable? stl_t.formInput: stl_t.formContainer  ] }
								/>

						</View>

				</View>
		)
}

const stl = StyleSheet.create({
		formInputWrapper:{
				flexDirection:'row',
				justifyContent:'center',
				alignItems:'center',
		},
		label:{
				color:'rgb(105,103,103)',
				paddingLeft: 12,
				marginTop:5,
		},
		form:{
				width:'80%',
				maxWidth:320,
				borderRadius:5,
				justifyContent:'center',
				alignItems:'flex-start',
				padding:5,
		},
		pickerWrapper:{
				width:140,
				padding:5,
		},
		picker:{
				color:'#f6f8f5',
				backgroundColor:'#677260',
		},
		icon:{
				position:'absolute',
				zIndex : 1,
				fontSize:18,
				right:17,
				bottom:12,
		},
		input:{
				fontSize: 15,
				borderRadius: 4,
				padding: 4,
				paddingLeft:8,
				width: '55%',
		},
});

export default  ConverterForm
