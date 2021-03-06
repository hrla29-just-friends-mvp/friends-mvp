import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Avatar, Button, Card, Divider, ListItem, Rating, AirbnbRating } from 'react-native-elements';
import UserDummyData from '../../data/dummyData/viewOneUser.json';
import PostsDummyData from '../../data/dummyData/getAllPosts.json';
import axios from 'axios';
import url from '../../conf.js';

const userID = 12;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      participating: [],
      description: ''
    }

    this.handleLoadData = this.handleLoadData.bind(this);
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.handleUserParticipatingActivity = this.handleUserParticipatingActivity.bind(this);
  }

  componentDidMount() {
    this.handleLoadData();
  }

  handleLoadData = () => {
    let { profilePic, description, rating } = UserDummyData;

    //   .then(data => this.setState({ user: JSON.parse(data) }, () => console.log(this.state, '===== MY NAME ====', this.state.user.name)))
    //   .then(() => this.setState({ description, user: { profilePic } }))
    //   .catch(error => console.log("Error AsyncStorage retrieve:", error))
    
    // testing: this should work but it doesn't
    // AsyncStorage.getItem('id')
    //   .then(data => console.log('YEOGI ITTDAAAAA', data))
    //   .catch(err => console.log(err))

    axios
      .get(`${url}/api/user/${userID}`)
      .then(({ data }) => this.setState({
        user: data
      }, console.log('THIS IS DATA====== ', data)))
      .catch(err => console.log('DATA FETCH ERROR =====', err))
        

    // this.setState({ description, user: { id, name, gender, age, profilePic, rating } })

    this.handleUserParticipatingActivity();
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  };

  handleUserParticipatingActivity() {
    axios
      .get(`${url}/api/post`)
      .then(({data}) => {
        this.setState({ participating: data });
      })
      .catch(err => console.error(err));
  }

  logoutAsync = async () => {
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <ScrollView 
        style={styles.container} 
        // contentContainerStyle={styles.contentContainer}
        >
        
        <Card
          title={this.state.user.name}
        >
          <View style={styles.avatarContainer}>
            <Avatar
              size="xlarge"
              rounded
              source={{ uri: this.state.user.profilePic, }}
              // style={styles.welcomeImage}
            />
          </View>

          <Divider style={{ marginTop: 5, marginBottom: 5 }}/>

          <View style={styles.buttonContainer}>
            {/* <Button 
              title='Edit Profile'
              style={styles.editButton}
            />  */}
            <Button 
              onPress={this.logoutAsync}
              title='Logout'
              style={styles.logoutButton} 
            />
          </View>

          <Divider style={{ marginTop: 5, marginBottom: 5 }}/>

          {/* <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
            <Rating
              type='heart'
              defaultRating={this.state.user.rating}
              ratingCount={5}
              imageSize={25}
              showRating
              onFinishRating={this.ratingCompleted}
            />
          </View> */}

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{this.state.user.description}</Text>
          </View>
        </Card>

        {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.nameText}>List of Active Activities</Text>
        </View> */}

        <Card 
          // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          title='List of Participating Activities'
        >
          {
            this.state.participating.map((post, i) => {
              return (
                <Card 
                  // containerStyle={{padding: 0}} 
                  key={i}
                  title={post.title}
                >
                  <View style={{ marginHorizontal: 5, marginBottom: 5 }}>
                    <Text>City: {post.locationCity}</Text>
                    <Text>Attendees: {post.currentAttendees === null ? 
                                  0 : post.currentAttendees}/{post.maxAttendees}</Text>
                    <Text>Created at {post.created_at}</Text>
                  </View>
                </Card>
              )
            })
          }
        </Card>
      </ScrollView>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    marginHorizontal: 10,
  },
  logoutButton: {
    marginHorizontal: 10,
  },
  nameText: {
    fontSize: 18,
    textAlign: 'center',
  },
  descriptionText: {
    marginTop: 10,
    marginBottom: 10,
    // color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  descriptionContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});