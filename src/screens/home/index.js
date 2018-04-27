import React, { Component } from "react";
import { Card, CardItem, Container, Content, Button, Body, Header, Icon, Tab, Tabs, Title, Right, Left, Text } from "native-base";
import { AppState } from "react-native";
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log("Home Page Loaded");
    this.state = {
      appState: AppState.currentState,
    };
        
  }
 
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
    
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
    
      _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
      }

      
    
      render() {
        return (
          <Container>
            <Header hasTabs>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate("DrawerOpen")}
                >
                  <Icon name="md-menu" />
                </Button>
              </Left>
              <Body>
                <Text style={{width: "150%"}}><Title>Plan zajęć WZIM</Title></Text>
              </Body>
              <Right />
            </Header>
            <Content>
              <Tabs initialPage={1}>
                <Tab heading="Tab1">
                  <Card>
                    <CardItem header>
                      <Text>NativeBase</Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est.
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem footer>
                      <Text>Lorem ipsum</Text>
                    </CardItem>
                  </Card>
                  <Card>
                    <CardItem header>
                      <Text>NativeBase</Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est.
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem footer>
                      <Text>Lorem ipsum</Text>
                    </CardItem>
                  </Card>
                </Tab>
                <Tab heading="Tab2">
                  <Text>lorem ipsum</Text>
                </Tab>
                <Tab heading="Tab3">
                  <Text>lorem ipsum</Text>
                </Tab>
              </Tabs>
              
            </Content>
          </Container>
        );
      }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
