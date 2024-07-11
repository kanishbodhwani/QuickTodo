import React, { useState, useEffect, useCallback } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { storeData } from '../../utils/asyncStorage';
import { AntDesign } from '@expo/vector-icons';
import { navigate } from '../../navigation/NavigationService';
import { globalStyles } from '../../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withDelay } from 'react-native-reanimated';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import {
  useFonts as useFonts2,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold
} from '@expo-google-fonts/manrope';
import LoginTag from '../../components/LoginTag';

const StartScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [showContent, setShowContent] = useState(false);
  const navigation = useNavigation();

  const iconScale = useSharedValue(1);
  const backgroundColor = useSharedValue('black');

  const tag1Position = useSharedValue(-1000);
  const tag2Position = useSharedValue(-1000);
  const tag3Position = useSharedValue(-1000);
  const tag4Position = useSharedValue(-1000);
  const tag5Position = useSharedValue(-1000);

  const [poppins] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [Manrope] = useFonts2({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold
  })

  useEffect(() => {
    const checkUser = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        // navigation.navigate('Home');
      }
    };
    checkUser();
  }, [navigation]);

  const handleIconPress = useCallback(() => {
    iconScale.value = withTiming(100, { duration: 700 });
    backgroundColor.value = withDelay(0, withTiming('white', { duration: 0 }));

    setTimeout(() => {
      setShowContent(true);
      tag1Position.value = withDelay(0, withTiming(0, { duration: 300 }));
      tag2Position.value = withDelay(200, withTiming(0, { duration: 300 }));
      tag3Position.value = withDelay(400, withTiming(0, { duration: 300 }));
      tag4Position.value = withDelay(600, withTiming(0, { duration: 300 }));
      tag5Position.value = withDelay(800, withTiming(0, { duration: 300 }));
    }, 700);
  }, [iconScale, backgroundColor, tag1Position, tag2Position, tag3Position, tag4Position, tag5Position]);

  const handleStart = async () => {
    if (username) {
      const userId = uuid.v4();
      await storeData('username', username);
      await storeData('userId', userId);
      navigate('Tabs');
    }
  };

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
    backgroundColor: '#eee',
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const tagStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: tag1Position.value }],
  }));

  const tagStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: tag2Position.value }],
  }));

  const tagStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: tag3Position.value }],
  }));

  const tagStyle4 = useAnimatedStyle(() => ({
    transform: [{ translateY: tag4Position.value }],
  }));

  const tagStyle5 = useAnimatedStyle(() => ({
    transform: [{ translateY: tag5Position.value }],
  }));

  if (!poppins || !Manrope) return null;
  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      {!showContent && (
        <Pressable onPress={handleIconPress} style={styles.iconContainer}>
          <Animated.View style={[styles.icon, iconStyle]}>
            <Text style={styles.iconText}>Q</Text>
          </Animated.View>
        </Pressable>
      )}
      {showContent && (
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Quick Todo</Text>
          </View>
          <View style={styles.loginTags}>
            <Animated.View style={[styles.tagContainer, tagStyle1]}>
              <LoginTag bgColor='#CDAEF4' isBig={false} light={true} tagName='Notes' />
            </Animated.View>
            <Animated.View style={[styles.tagContainer, tagStyle2]}>
              <LoginTag bgColor='#BCFFB1' isBig={true} light={false} tagName='Reminders' />
            </Animated.View>
            <Animated.View style={[styles.tagContainer, tagStyle3]}>
              <LoginTag bgColor='#39A3E8' isBig={false} light={true} tagName='Meetings' />
            </Animated.View>
            <Animated.View style={[styles.tagContainer, tagStyle4, {
              right: -30
            }]}>
              <LoginTag bgColor='#FFDBA1' isBig={true} light={false} tagName='Write ups' transform={'clockwise'}/>
            </Animated.View>
            <Animated.View style={[styles.tagContainer, tagStyle5, {
              left: -30
            }]}>
              <LoginTag bgColor='#B6DEF7' isBig={false} light={false} tagName='Todos' transform={'anti-clockwise'}/>
            </Animated.View>
          </View>

          <View style={styles.mainHeadingContainer}>
            <Text style={styles.mainHeading}>
              Weave Your Time, Make Notes Define 
            </Text>
            <Text style={styles.subHeading}>
              A Todo/Note taking app
            </Text>
          </View>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue with Love
            </Text>
            <AntDesign name="arrowright" size={18} color="#eee" />
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 50
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Manrope_600SemiBold',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#000',
    fontSize: 30,
    fontFamily: 'Poppins_700Bold',
    marginTop: 1,
  },
  contentContainer: {
    ...globalStyles.container,
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loginTags: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '93%',
  },
  tagContainer: {
    width: '48%',
    marginBottom: 3,
  },
  mainHeadingContainer: {
    display: 'flex'
  },
  mainHeading: {
    fontSize: 54,
    fontFamily: 'Manrope_500Medium',
    marginTop: 10
  },
  subHeading: {
    fontSize: 15,
    fontFamily: 'Manrope_500Medium',
    marginTop: 5,
    marginLeft: 4,
    color: '#A1A1A1'
  },
  continueButton: {
    backgroundColor: '#222425',
    padding: 20,
    paddingHorizontal: 25,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueButtonText: {
    color: '#eee',
    fontSize: 18,
    fontFamily: 'Manrope_500Medium'
  }
});

export default StartScreen;