import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface LoginTagProps {
  tagName: string;
  bgColor: string;
  light: boolean;
  isBig: boolean;
  transform?: string;
}

const LoginTag: React.FC<LoginTagProps> = ({ tagName, bgColor, light, isBig, transform }) => {
  const animatedStyle = useAnimatedStyle(() => {
    let rotation = '0deg';
    let originX = 0;
    if (transform === 'clockwise') {
      rotation = '20deg';
      originX = isBig ? -45 : 75; // Adjust based on the width of the tag
    } else if (transform === 'anti-clockwise') {
      rotation = '-10deg';
      originX = isBig ? -85 : 30; // Adjust based on the width of the tag
    }
    return {
      transform: [
        { rotate: rotation },
        { translateX: originX },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: bgColor, width: isBig ? 170 : 150 }]}>
      <Text style={{ ...styles.text, color: light ? '#eee' : '#000' }}>{tagName}</Text>
    </Animated.View>
  );
};

export default LoginTag;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    elevation: 5,
    borderRadius: 35,
    margin: 2,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Manrope_500Medium',
  },
});