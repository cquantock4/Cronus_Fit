import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import {
    VStack,
    HStack,
    Surface,
    Flex,
    Box,
    Text,
    Button,
    Spacer,
    Stack,
    Pressable,
    Provider,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
  } from "@react-native-material/core";
  import { SafeAreaView } from 'react-native-safe-area-context';

  import Ionicons from 'react-native-vector-icons/Ionicons';

  //Themes
import ThemeContext from '../../ThemeContext';
import { colors } from '../../../../assets/styles/themes';

const Header = ({ title, searchable, searchMode, onSearch, onCancelSearch, messenger, searchtitle="..." }) => {
    const [searchText, setSearchText] = useState('');


    //Theme
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode;

    let activeColors = ''

    if (darkMode) {
        activeColors = colors['dark'];
    } else {
        activeColors = colors['light'];
    }


    const handleSearchPress = () => {
        onSearch(searchText);
    };
    
    const handleCancelPress = () => {
        onCancelSearch();
        setSearchText('');
    };

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        onSearch(text);
    };

    const handleMessengerPress = () => {
        console.log('go to messenger')
    };

    const search_placeholder = "Search " + searchtitle

    return (
        <View style={styles.container}>
            {!searchMode && (
                <View style={styles.left}>
                    <Text style={[styles.title, {color: activeColors.primary_text}]}>{title}</Text>
                </View>
            )}
            {searchable && !searchMode && (
                <TouchableOpacity style={styles.right} onPress={handleSearchPress}>
                    <Ionicons name="search-outline" size={24} style={{ color: activeColors.primary_text }} />
                </TouchableOpacity>
            )}

            {searchMode && (
                <View style={[styles.searchContainer, {backgroundColor: activeColors.searchbox_bg}]}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={search_placeholder}
                        placeholderTextColor={activeColors.primary_text}
                        color={activeColors.searchbox_text}
                        value={searchText}
                        onChangeText={handleSearchTextChange}
                    />
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
                        <Text style={[styles.cancelButtonText, {color: activeColors.primary_text}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
            {messenger && (
                <TouchableOpacity style={styles.right} onPress={handleMessengerPress}>
                    <Ionicons name="chatbox-outline" size={24} style={{ color: activeColors.primary_text }} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
},
left: {},
right: {},
title: {
    fontSize: 18,
    fontWeight: '500',
},
searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 8,
},
searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
},
cancelButton: {
    marginLeft: 8,
},
cancelButtonText: {
    fontSize: 14,
},
});

export default Header;