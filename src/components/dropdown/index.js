import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, I18nManager ,TouchableOpacity ,ScrollView , Pressable} from 'react-native';
import {CheckBox} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

//
import I18n from '../../lang/I18n';
import Button from '../button';
import Style from './styles';

const {width , height} = Dimensions.get('screen');

const Dropdown = ({...props}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const submitModal = (item, index) => {
    props.onChangeValue(item.id);
    setSelectedValue(item.id);
    setActiveItem(index);
    setShowModal(false);
  };

  useEffect(() => setSelectedValue(selectedValue), []);

  const DropDownModal = () => {
    const [activeSelectedItem, setActiveSelectedItem] = useState(activeItem);
    const selectItem = (item, index) => setActiveSelectedItem(index)

    return <Modal 
              isVisible={showModal} 
              animationType = "slide"
              transparent= {true}
              backdropOpacity={.2} >
              <View style={[Style.modalContainer]}>
                <View style={Style.header}>
                  {
                    props.isConfirmable &&
                    <View></View>
                  }
                  <Text style={Style.title}>
                    {I18n.t('select')} {props.name}
                  </Text>
                  <TouchableOpacity activeOpacity={.5}
                                    onPress={()=>{setShowModal(false)}}>
                    <FastImage source={require('../../assets/icons/down-arrow.png')}  
                              style={{width: 20 , height : 20}}/>
                  </TouchableOpacity>
                </View>
                <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
                        {
                           props?.items.map((item,index)=>{
                              return  <TouchableOpacity key={index}
                                                        style={[Style.itemContainer , 
                                                               {backgroundColor: props.isConfirmable && activeSelectedItem == index  ? '#012647' : '#F8F8F8',} ]} 
                                                        onPress={()=>{props.isConfirmable ? selectItem(item,index) : submitModal(item,index)}} >
                                 <CheckBox
                                    style={{marginEnd: 20, borderRadius: 10}}
                                    color='#13314F'
                                    checked={activeSelectedItem == index }
                                    onPress={()=>{props.isConfirmable ? selectItem(item,index) : submitModal(item,index)}} />
                                 <Text style={[Style.itemText, 
                                              { color: (
                                                 props.isConfirmable ?
                                                   ( activeSelectedItem == index  ? '#FFF' : '#000') :
                                                   activeItem == index ? '#012647' : '#000' )
                                              }]}>
                                    {I18nManager.isRTL ? item.name : item.name_en}
                                 </Text>
                              </TouchableOpacity>
                           })
                        }
                        {
                           props.isConfirmable && 
                           <Button 
                            isModal
                            label={'save'}
                            labelColor={'#FFF'}
                            onPress={() => {}}
                            style={{width : '100%' , padding : 15}} />
                        }
              </ScrollView>
            </View>  
          </Modal>
  }

  return  <Animatable.View style={[Style.container, props.style]}>
                <View style = {
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginEnd: 20,
                  }}>
                  {
                    props.name &&
                    <Text style={[Style.placeholderText,{fontWeight : '700'}]}>
                      {props.name}
                    </Text>
                  }
                </View>
                {
                  <BorderlessButton onPress={()=> setShowModal(true)}
                              style={{borderRadius : 8,justifyContent:'center'}}>
                     <View style={Style.dropdown}> 
                        <Text style={Style.placeholderText}>
                           { I18nManager.isRTL ? props?.items[activeItem]?.name : props?.items[activeItem]?.name_en }
                        </Text>
                            <FastImage source={require('../../assets/icons/down-arrow.png')}  
                                        style={{width: 15 , height : 15}}/>
                     </View>
                  </BorderlessButton>
                }
      <DropDownModal />
    </Animatable.View>
};

export default Dropdown;
