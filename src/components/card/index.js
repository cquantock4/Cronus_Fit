import React, {useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from "@react-native-material/core";
import Ionicons from 'react-native-vector-icons/Ionicons';
//Themes
import ThemeContext from '../ThemeContext';
import { colors } from '../../../assets/styles/themes';

const Card = ({
  title,
  subtitle,
  content,
  showArrow = false,
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
      <View style={[styles.cardContainer, {backgroundColor: activeColors.primary_bg, borderColor: activeColors.secondary_text}]}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, {color: activeColors.secondary_text}]}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {content && (
          <View style={styles.contentContainer}>
            <Text style={styles.content}>{content}</Text>
          </View>
        )}
        {showArrow && (
          <View style={styles.arrowContainer}>
            <IconButton
              icon={<Ionicons name="arrow-forward-outline" size={20} style={{color: activeColors.secondary_text}}/>}
              onPress={onPress}
            />
          </View>
        )}
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
});

export default Card;
