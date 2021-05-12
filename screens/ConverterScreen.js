import React, {useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import 'react-native-gesture-handler';
import {
		StyleSheet,
		View,
		Pressable,
		ActivityIndicator,
}                          from 'react-native';
import Icons               from 'react-native-vector-icons/FontAwesome';
import {getCurrencyAction} from '../store/actions/getCurrency';
import ConverterForm       from '../components/converterForm';
import {useTheme}          from '@react-navigation/native';
import {globStyles}        from '../styles/global';


const ConverterScreen = () => {
		//--Variables
		const dispatch = useDispatch();
		const valute   = useSelector(state => state.valute);

		let [options, setOptions] = useState(['EUR', 'AUD', 'GBP']);

		let [form1, setForm1] = useState({
				label: '',
				input: 1,
				nominal: 1,
				select: 'EUR',
				value: '',
		});
		let [form2, setForm2] = useState({
				label: '',
				input: 1,
				nominal: 1,
				select: 'AUD',
				value: '',
		});

		const { stl_t } = useTheme();

		//--Watchers
		//Make First Call to the API
		useEffect(() => {
				if ( !valute.length ) {
						dispatch(getCurrencyAction());
				}
		}, [dispatch]);
		//Populate Data
		useEffect(() => {
				if (valute.length) {

						let keys = valute.map((val)=>val.CharCode);

						setOptions(keys);

						setForm1({
								label: valute[0].Name,
								input: valute[0].Nominal,
								nominal: valute[0].Nominal,
								select: valute[0].CharCode,
								value: valute[0].Value,
						});
						setForm2({
								label: valute[1].Name,
								input: valute[1].Nominal,
								nominal: valute[1].Nominal,
								select: valute[1].CharCode,
								value: valute[1].Value,
						});
				}
		}, [valute]);
		//Convert Input Value
		useEffect(() => {
				if (form1.input)
						convert();
		}, [form1.select, form2.select, form1.input]);

		//--Functions
		const setFormData = (value, setForm)=>{

				let selected = valute.filter(el=>el.CharCode === value)[0];

				if ( selected && selected.Name ){

						setForm( prev=>({
								input  : prev.input,
								select : selected.CharCode,
								label  : selected.Name,
								nominal: selected.Nominal,
								value  : selected.Value
						}));
				}
		}
		const reverseForms=()=>{
				let form_1  = form1;
				let form_2  = form2;
				let input_1 = parseInt( form_2.input, 10 ) ;
				let input_2 = input_1 === 0 ? 0 : form_1.input;

				setForm1({ ...form_2, input: input_1 });
				setForm2({ ...form_1, input: input_2 });
		}
		const inputChange =(val, formSet)=>{

				let intVal = parseInt(val, 10)||1;
						intVal.toFixed(2);

				formSet((prev)=>({...prev, input: intVal}));
		}
		const convert = ()=>{

				if( isNaN(form1.input) ) return;

				let index = form1.value / form2.value;

				let result =  form1.input*index;
						result = result.toFixed(2);

				setForm2( prev =>({...prev, input: result }) );
		}

		return (
				<View style={[stl_t.screen ,stl.sectionContainer]}>

						{
								form1.label ? (
										//--Converter Component
										<View style={stl.sectionContainer}>

												<ConverterForm options={options} formData={form1} setForm={setForm1} setFormData={setFormData} inputChange={inputChange} editable={true}/>

												<Pressable onPress={reverseForms}  style={ ({ pressed })=>[{opacity: pressed? 0.5:1}, stl.convertButton, stl_t.formContainer, stl_t.shadow ] }>
														<Icons name="refresh"  style={stl.icon}/>
												</Pressable>

												<ConverterForm options={options} formData={form2} setForm={setForm2} setFormData={setFormData} inputChange={inputChange} editable={false} />

										</View>
								):(
										//--Loading Component
										<View style={stl.loadingContainer}>
												<ActivityIndicator  size="large" color="#2CA8D7"/>
										</View>
								)
						}

				</View>
		);

};

const stl = StyleSheet.create({
		sectionContainer: {
				alignItems:'center',
				height:'100%',
				paddingTop:20,
		},
		convertButton:{
				height: 40,
				width:40,
				justifyContent: 'center',
				alignItems:'center',
				padding:5,
				borderRadius:30,
				marginVertical: 20,
		},
		icon:{
				fontSize:25,
				color:'rgb(33,169,241)',
		},
		loadingContainer:{
				height:'100%',
				alignItems:'center',
				justifyContent:'center',
		},
});

export default ConverterScreen;
