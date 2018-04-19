import React, { Component } from "react";
import { Text, Header, Right, Left, Body, Button, Icon, Item, Title, Container, Content, List, ListItem, Picker, Segment, Separator, Switch } from "native-base";
import PropTypes from "prop-types";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      student: true
    };
  }

  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }

  render() {
    return (
      <Container>
        <Header iosBarStyle="light-content" backgroundColor="#3f51b5" androidStatusBarColor="#3f51b5" Left hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Ustawienia</Title>
          </Body>
          <Right />
        </Header>
        <Segment>
          <Button first active={this.state.student} onPress={() => this.setState({ student: true })}>
            <Text>student</Text>
          </Button>
          <Button last active={!this.state.student} onPress={() => this.setState({ student: false })}>
            <Text>prowadzący</Text>
          </Button>
        </Segment>
        <Content>
          {this.state.student ? (
            <List>
              <ListItem icon>
                <Left>
                  <Text note>Tryb prowadzącego:</Text>
                </Left>
                <Body />
                <Right>
                  <Switch value={!this.state.student} onValueChange={() => this.setState({ student: !this.state.student })} />
                </Right>
              </ListItem>

              <Separator>
                <Text>Wybór grupy:</Text>
              </Separator>

              <ListItem icon>
                <Left>
                  <Text>Wydział:</Text>
                </Left>
                <Body />
                <Right>
                  <Picker mode="dropdown" selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)} style={{ width: 140 }}>
                    <Item label="WZIM" value="key0" />
                    <Item label="Leśny" value="key1" />
                  </Picker>
                </Right>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Text>Kierunek:</Text>
                </Left>
                <Body />
                <Right>
                  <Picker mode="dropdown" selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)} style={{ width: 140 }}>
                    <Item label="Informatyka" value="key0" />
                    <Item label="To i Owo" value="key1" />
                  </Picker>
                </Right>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Text>Stopień:</Text>
                </Left>
                <Body />
                <Right>
                  <Picker mode="dropdown" selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)} style={{ width: 140 }}>
                    <Item label="inż" value="key0" />
                    <Item label="mgr" value="key1" />
                    <Item label="doc" value="key2" />
                  </Picker>
                </Right>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Text>Semestr:</Text>
                </Left>
                <Body />
                <Right>
                  <Picker mode="dropdown" selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)} style={{ width: 140 }}>
                    <Item label="1" value="key0" />
                    <Item label="2" value="key1" />
                    <Item label="3" value="key2" />
                  </Picker>
                </Right>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Text>Grupa:</Text>
                </Left>
                <Body />
                <Right>
                  <Picker mode="dropdown" selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)} style={{ width: 140 }}>
                    <Item label="1" value="key0" />
                    <Item label="4" value="key1" />
                    <Item label="B" value="key2" />
                  </Picker>
                </Right>
              </ListItem>

              <Separator>
                <Text>Inne:</Text>
              </Separator>

              <ListItem>
                <Left>
                  <Text>Szybka zmiana grupy</Text>
                </Left>
                <Body />
                <Switch value={this.state.fast} onValueChange={() => this.setState({ fast: !this.state.fast })} />
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem icon>
                <Left>
                  <Text note>Tryb prowadzącego:</Text>
                </Left>
                <Body />
                <Right>
                  <Switch value={!this.state.student} onValueChange={() => this.setState({ student: !this.state.student })} />
                </Right>
              </ListItem>

              <ListItem icon>
                <Left />
                <Text>Kto?</Text>
                <Body />
                <Right>
                  <Picker mode="dropdown" selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)}>
                    <Item label="Adek" value="key0" />
                    <Item label="ktoś inny" value="key1" />
                  </Picker>
                </Right>
              </ListItem>
            </List>
          )}
        </Content>
      </Container>
    );
  }
}

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default Settings;
