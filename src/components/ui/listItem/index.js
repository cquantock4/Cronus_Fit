import React, {useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from "@react-native-material/core";
import Ionicons from 'react-native-vector-icons/Ionicons';
//Themes
import ThemeContext from '../../ThemeContext';
import { colors } from '../../../../assets/styles/themes';

const ListItem = ({
  title,
  subtitle,
  date,
  navtext,
  onPress
}) => {

  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }
  

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.resultsItemContainer, {backgroundColor: activeColors.primary_bg}]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <Text style={{fontSize: 20, color: activeColors.primary_text}}>{title}</Text>
          <Text style={{fontSize: 15, color: activeColors.primary_text}}>{date}</Text>
        </View>
        
        <Text style={{fontSize: 14, marginBottom: 10, fontWeight: '300', color: activeColors.primary_text}}>{subtitle.slice(0,75)}...</Text>
        <Text style={{fontSize: 12, justifyContent: 'flex-end', color: activeColors.accent_text}}>{navtext}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  contentContainer: {
    flex: 2,
    marginLeft: 16,
  },
  content: {
    fontSize: 16,
  },
  arrowContainer: {},
  resultsItemContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    
  },
});

export default ListItem;
