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
  ListItem,
  Picker,
  Switch,
  Form,
  Label
} from "native-base";
import { View, Image } from "react-native";
import styles from "./style";
import PropTypes from "prop-types";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      prowadzacy: false,
      errorWrongFilters: true,
    };
  }

  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }

  render() {
    if(this.state.errorWrongFilters){
      return (
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              >
                <Icon name="md-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Ustawienia</Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.viewStyle}>
              <Image source={require("./../../../assets/img/unknown.png")} style={styles.imgStyle} resizeMode="contain"/>
              <Text  style={styles.textStyle}>Aby zobaczyć plan proszę spersonalizować ustawienia</Text>
              <Button style={styles.btnStyle} onPress={() => this.setState({errorWrongFilters: false})}>
                <Text>Ustaw filtry planu</Text>
              </Button>
            </View>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              >
                <Icon name="md-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Ustawienia</Title>
            </Body>
            <Right />
          </Header>
          {!this.state.prowadzacy ? (
            <Content>
              <Text note style={styles.filterTextStyle}>Filtrowanie</Text>
              <ListItem style={styles.listItemStyle}>
                <Left>
                  <Icon name="md-school" style={styles.iconStyle}/>
                </Left>
                <Text>Tryb prowadzącego</Text>
                <Body/>
                <Switch
                  value={this.state.prowadzacy}
                  onValueChange={() =>
                    this.setState({ prowadzacy: !this.state.prowadzacy })
                  }
                />
              </ListItem>
              <Form style={styles.formStyle}>
                <Item stackedLabel>
                  <Label>
                    <Text note>Rok akademicki</Text>
                  </Label>
                  <Picker
                    iosHeader="Wybierz"
                    headerBackButtonText="Powrót"
                    mode="dropdown"
                    selectedValue="0"
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Item label="2016/2017" value="0" />
                    <Item label="2017/2018" value="1" />
                  </Picker>
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Wydział</Text>
                  </Label>
                  <Picker
                    iosHeader="Wybierz"
                    headerBackButtonText="Powrót"
                    mode="dropdown"
                    selectedValue="0"
                    onValueChange={this.onValueChange.bind(this)}
                    style={styles.pickerStyle}
                  >
                    <Item label="Leśny" value="0" key="0 o" />
                    <Item label="B" value="2" key="2"/>
                  </Picker>
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Kierunek</Text>
                  </Label>
                  <Picker
                    iosHeader="Wybierz"
                    headerBackButtonText="Powrót"
                    mode="dropdown"
                    selectedValue="0"
                    onValueChange={this.onValueChange.bind(this)}
                    style={styles.pickerStyle}
                  >
                    <Item label="Informatyka" value="0" key="0"/>
                    <Item label="To i Owo" value="1" key="1"/>
                  </Picker>
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Stopień</Text>
                  </Label>
                  <Picker
                    iosHeader="Wybierz"
                    headerBackButtonText="Powrót"
                    mode="dropdown"
                    selectedValue="0"
                    onValueChange={this.onValueChange.bind(this)}
                    style={styles.pickerStyle}
                  >
                    <Item label="inż" value="0" key="0"/>
                    <Item label="mgr" value="1" key="1"/>
                    <Item label="doc" value="2" key="2"/>
                  </Picker>
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Semestr</Text>
                  </Label>
                  <Picker
                    iosHeader="Wybierz"
                    headerBackButtonText="Powrót"
                    mode="dropdown"
                    selectedValue="0"
                    onValueChange={this.onValueChange.bind(this)}
                    style={styles.pickerStyle}
                  >
                    <Item label="1" value="0" key="0"/>
                    <Item label="2" value="1" key="1"/>
                    <Item label="3" value="2" key="2"/>
                  </Picker>
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Tryb</Text>
                  </Label>
                  <Picker
                    iosHeader="Wybierz"
                    headerBackButtonText="Powrót"
                    mode="dropdown"
                    selectedValue="0"
                    onValueChange={this.onValueChange.bind(this)}
                    style={styles.pickerStyle}
                  >
                    <Item label="stacjonarny" value="0" />
                    <Item label="zębaty" value="1" />
                    <Item label="B" value="2" />
                  </Picker>
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Grupa</Text>
                  </Label>
                  <Picker
                    iosHeader="Wybierz"
                    headerBackButtonText="Powrót"
                    mode="dropdown"
                    selectedValue="0"
                    onValueChange={this.onValueChange.bind(this)}
                    style={styles.pickerStyle}
                  >
                    <Item label="1" value="0" key="0"/>
                    <Item label="4" value="1" key="1"/>
                    <Item label="B" value="2" key="2"/>
                  </Picker>
                </Item>
              </Form>
              <Text note style={styles.filterTextStyle}>Inne</Text>
              <ListItem style={styles.listItemStyle}>
                <Left>
                  <Icon name="md-swap" style={styles.iconStyle}/>
                </Left>
                <Text>Szybka zmiana grupy</Text>
                <Body/>
                <Switch
                  value={this.state.fast}
                  onValueChange={() =>
                    this.setState({ fast: !this.state.fast })
                  }
                />
              </ListItem>
            </Content>
          ) : (
            <Content>
              <Text note style={styles.filterTextStyle}>Filtrowanie</Text>
              <ListItem style={styles.listItemStyle}>
                <Left>
                  <Icon name="md-school" style={styles.iconStyle}/>
                </Left>
                <Text>Tryb prowadzącego</Text>
                <Body/>
                <Switch
                  value={this.state.prowadzacy}
                  onValueChange={() =>
                    this.setState({ prowadzacy: !this.state.prowadzacy })
                  }
                />
              </ListItem>
              <Form style={styles.formStyle}> 
                <Item stackedLabel>
                  <Label>
                    <Text note>Prowadzący</Text>
                  </Label>
                  <Picker
                    iosHeader="Wybierz"
                    headerBackButtonText="Powrót"
                    mode="dropdown"
                    selectedValue="0" 
                    onValueChange={this.onValueChange.bind(this)} 
                    style={styles.pickerStyle}
                  >
                    <Item label="Jan Pieszy" value="0" key="0"/>
                    <Item label="Sylwia Ogórek" value="1" key="1"/>
                  </Picker>
                </Item>
              </Form>
            </Content>
          )}
        </Container>
      );
    }
  }
}

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default Settings;
