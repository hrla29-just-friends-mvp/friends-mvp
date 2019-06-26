import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dummyData from '../../../data/dummyData/getAllPosts.json';
import { SearchBar, Header } from 'react-native-elements';
import moment from 'moment';

export default class AllPosts extends React.Component {
  constructor() {
    super()
    this.state={
      data: dummyData,
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render () {
    const { search } = this.state;

    return (
      <ScrollView>
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>
        {this.state.data.map((item, i) => {
          return (
            <View key={i} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.itemLocation}>
                <Text>Location: </Text><Text>{item.locationCity}</Text>
              </View>
              <Text>Attendees: {item.currentAttendees === null ? 
                                0 : item.currentAttendees}/{item.maxAttendees}</Text>
              <Text>Schedule: {new Date(item.schedule).toString()}</Text>
              <Text>Posted {moment(item.created_at).fromNow()}</Text>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

// HomeScreen.navigationOptions = {
//   title: 'Meet Friends',
// };

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    flex: 1
  }, 
  itemTitle: {
    color: '#00A2E5',
    fontWeight: 'bold'
  }, 
  itemLocation: {
    flexDirection:'row', 
    flexWrap:'wrap'
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  outerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    padding: 15,
    height: 70,
  }
})