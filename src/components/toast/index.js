import { WToast } from 'react-native-smart-tip';

const Toast = ({text, position, type}) => {
  const ToastOpts = {
    data: text ?? '',
    position: position ?? WToast.position.BOTTOM,
    duration: WToast.duration.LONG,
    textColor: '#FFF',
    backgroundColor: type && type === 'success' ? '#13314F' : '#891623',
    actionClick: () => {},
       //    icon: type && type  == 'success' ? 
       //         <Image style={{height:27, width:27}} resizeMode={'contain'} 
       //                source={require('../assets/icons/toast-success.png')}/> : 
       //         <Icon name="alert-octagon" size={19} color={"#FFF"}/> ,
  };

  return WToast.show(ToastOpts);
};

export default Toast;
