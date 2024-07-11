import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#222425',
    // padding: 20,
    position: 'relative',
  },
  defualtContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#1F2021',
  },
  primaryColor: {
    color: '#FF8B49',
  },
  secondaryColor: {
    color: '#F9F9F9',
  },
  secondaryDarkColor: {
    color: '#F4F4F4',
  },
  secondaryFontColor: {
    color: '#707171',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inlineStyle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineStyleText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    marginLeft: 5,
  },
});
