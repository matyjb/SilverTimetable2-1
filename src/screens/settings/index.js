import React, { Component } from "react";
import {
  Text,
  Header,
  Right,
  Left,
  Body,
  Button,
  Icon,
  Item,
  Title,
  Container,
  Content,
  List,
  ListItem,
  Picker,
  Segment,
  Separator,
  Switch,
  Form,
  Label
} from "native-base";
import PropTypes from "prop-types";
// import SettingsItem from "./SettingsItem";

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
        <Header
          iosBarStyle="light-content"
          backgroundColor="#3f51b5"
          androidStatusBarColor="#3f51b5"
          Left
          hasTabs
        >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Ustawienia</Title>
          </Body>
          <Right />
        </Header>
        {this.state.student ? (
          <Segment>
            <Button
              first
              active={this.state.student}
              onPress={() => this.setState({ student: true })}
            >
              <Text>student</Text>
            </Button>
            <Button
              last
              active={!this.state.student}
              onPress={() => this.setState({ student: false })}
            >
              <Text>prowadzący</Text>
            </Button>
          </Segment>
        ) : (
          <Text />
        )}
        <Content>
          {this.state.student ? (
            <Form>
              <Separator>
                <Text>Wybór grupy:</Text>
              </Separator>

              <Item stackedLabel>
                <Label>
                  <Text>Wydział:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="WZIM" value="key0" />
                  <Item label="Leśny" value="key1" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text>Kierunek:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="Informatyka" value="key0" />
                  <Item label="To i Owo" value="key1" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text>Stopień:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="inż" value="key0" />
                  <Item label="mgr" value="key1" />
                  <Item label="doc" value="key2" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text>Semestr:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="1" value="key0" />
                  <Item label="2" value="key1" />
                  <Item label="3" value="key2" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text>Tryb:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="stacjonarny" value="key0" />
                  <Item label="zębaty" value="key1" />
                  <Item label="B" value="key2" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text>Grupa:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="1" value="key0" />
                  <Item label="4" value="key1" />
                  <Item label="B" value="key2" />
                </Picker>
              </Item>

              <Separator>
                <Text>Inne:</Text>
              </Separator>

              <ListItem>
                <Left>
                  <Text>Szybka grupy:</Text>
                </Left>
                <Body />
                <Switch
                  value={this.state.fast}
                  onValueChange={() =>
                    this.setState({ fast: !this.state.fast })
                  }
                />
              </ListItem>
            </Form>
          ) : (
            <Form>
              <ListItem icon>
                <Left>
                  <Text note>Tryb prowadzącego:</Text>
                </Left>
                <Body />
                <Right>
                  <Switch
                    value={!this.state.student}
                    onValueChange={() =>
                      this.setState({ student: !this.state.student })
                    }
                  />
                </Right>
              </ListItem>

              <Separator>
                <Text>Wybór grupy:</Text>
              </Separator>

              <Item stackedLabel>
                <Label>
                  <Text note>Wydział:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="WZIM" value="key0" />
                  <Item label="Leśny" value="key1" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text note>Kierunek:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="Informatyka" value="key0" />
                  <Item label="To i Owo" value="key1" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text note>Stopień:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="inż" value="key0" />
                  <Item label="mgr" value="key1" />
                  <Item label="doc" value="key2" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text note>Semestr:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="1" value="key0" />
                  <Item label="2" value="key1" />
                  <Item label="3" value="key2" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text note>Tryb:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="stacjonarny" value="key0" />
                  <Item label="zębaty" value="key1" />
                  <Item label="B" value="key2" />
                </Picker>
              </Item>

              <Item stackedLabel>
                <Label>
                  <Text note>Grupa:</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}
                  style={{ alignSelf: "stretch" }}
                >
                  <Item label="1" value="key0" />
                  <Item label="4" value="key1" />
                  <Item label="B" value="key2" />
                </Picker>
              </Item>

              <Separator>
                <Text>Inne:</Text>
              </Separator>

              <ListItem>
                <Left>
                  <Text note>Szybka zmiana prowadzącego:</Text>
                </Left>
                <Body />
                <Switch
                  value={this.state.fast}
                  onValueChange={() =>
                    this.setState({ fast: !this.state.fast })
                  }
                />
              </ListItem>
            </Form>

            //   <ListItem icon>
            //     <Left />
            //     <Text>Kto?</Text>
            //     <Body />
            //     <Right>
            //       <Picker mode="dropdown" selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)}>
            //         <Item label="Adek" value="key0" />
            //         <Item label="ktoś inny" value="key1" />
            //       </Picker>
            //     </Right>
            //   </ListItem>
            // </List>
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
