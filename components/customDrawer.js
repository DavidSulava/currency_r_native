import React from 'react';
import {
		DrawerContentScrollView,
		DrawerItemList,
}                          from '@react-navigation/drawer';
import ToggleDrawerContent from './toggleDrawerContent';



const CustomDrawer = (props)=> {
		return (
				<DrawerContentScrollView {...props}>
						<DrawerItemList {...props} />
						<ToggleDrawerContent {...props } />
				</DrawerContentScrollView>
		);
}


export default CustomDrawer
