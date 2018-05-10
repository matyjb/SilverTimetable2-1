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
import { View, Image, Platform } from "react-native";
import styles from "./style";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeConfigurationOption, changeFilter, setFiltersOK, setDay } from "../../actions";
import TimetableServices from "../../timetable/TimetableServices";

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

  componentWillReceiveProps(props) {
    TimetableServices.WriteConfigurationFile(props.configuration);

    if (!props.filters.group && props.configuration.filters.mode) {
      props.changeFilter("group", props.selectListsValues.group[0]);
    }
  }

  componentWillMount() {
    { Platform.OS !== "ios" && 
        this.setState({
          department: this.props.filters.department,
          fieldOfStudy: this.props.filters.fieldOfStudy,
          degree: this.props.filters.degree,
          mode: this.props.filters.mode,
          semester: this.props.filters.semester,
          group: this.props.filters.group,
          academicYear: this.props.filters.academicYear,
          lecturer: this.props.filters.lecturer
        });
    }
  }

  render() {
    const lecturers = this.props.selectListsValues.lecturer.filter((v) => v !== "" && v !== " ");
    try {
      lecturers.sort((a, b) => a.split(" ")[1].localeCompare(b.split(" ")[1], "pl", { sensitivity: "base" }));
    } catch (e) {
      lecturers.sort();
    }

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
            <Text style={{width: "150%"}}><Title>Ustawienia</Title></Text>
          </Body>
          <Right />
        </Header>

        {!this.props.filtersOK ?

          <Content contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.viewStyle}>
              <Image source={require("./../../../assets/img/unknown.png")} style={styles.imgStyle} resizeMode="contain"/>
              <Text  style={styles.textStyle}>Aby zobaczyć plan proszę spersonalizować ustawienia</Text>
              <Button style={styles.btnStyle} onPress={() => this.props.setFiltersOK(true)}>
                <Text>Ustaw filtry planu</Text>
              </Button>
            </View>
          </Content>
     
          :

          <Content>
            <Text note style={styles.filterTextStyle}>Filtrowanie</Text>
            <ListItem style={styles.listItemStyle}>
              <Left>
                <Icon name="md-school" style={styles.iconStyle}/>
              </Left>
              <Text>Tryb prowadzącego</Text>
              <Body/>
              <Switch
                value={this.props.configuration.lecturerMode}
                onValueChange={(newValue) => {
                  this.props.changeConfigurationOption("lecturerMode", newValue);
                  this.props.setDay(null);
                }}
              />
            </ListItem>



            { this.props.configuration.lecturerMode ?
      
        
              <Form style={styles.formStyle}> 
                <Item stackedLabel>
                  <Label>
                    <Text note>Prowadzący</Text>
                  </Label>
                  {Platform.OS === "ios" ?
                    <Picker
                      iosHeader="Wybierz"
                      headerBackButtonText="Powrót"
                      mode="dropdown"
                      selectedValue={this.props.filters.lecturer}
                      onValueChange={(newValue) => this.props.changeFilter("lecturer", newValue)} 
                      style={styles.pickerStyle}
                    >
                      { lecturers.map( value => (<Picker.Item key={value} label={value} value={value} />) ) }
                    </Picker>
                    :
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.lecturer}
                      onValueChange={(newValue) => {
                        this.setState({lecturer: newValue});
                        this.props.changeFilter("lecturer", newValue);
                      }} 
                      style={styles.pickerStyle}
                    >
                      <Picker.Item value={null} label="Wybierz" key=""/>
                      { lecturers.map( value => (<Picker.Item key={value} label={value} value={value} />) ) }
                    </Picker>
                  }
                </Item>
              </Form>
      
              :
      
            
              <Form style={styles.formStyle}>
                <Item stackedLabel>
                  <Label>
                    <Text note>Rok akademicki</Text>
                  </Label>
                  {Platform.OS === "ios" ?
                    <Picker
                      iosHeader="Wybierz"
                      headerBackButtonText="Powrót"
                      mode="dropdown"
                      selectedValue={this.props.filters.academicYear}
                      onValueChange={(newValue) => {this.props.changeFilter("academicYear", newValue); }}
                      style={styles.pickerStyle}
                    >
                      {this.props.selectListsValues.academicYear.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                    :
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.academicYear}
                      onValueChange={(newValue) => {
                        this.setState({academicYear: newValue});
                        this.props.changeFilter("academicYear", newValue); }}
                      style={styles.pickerStyle}
                    >
                      <Picker.Item value={null} label="Wybierz rok" key="" />
                      {this.props.selectListsValues.academicYear.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                  }
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Wydział</Text>
                  </Label>
                  {Platform.OS === "ios" ?
                    <Picker
                      iosHeader="Wybierz"
                      headerBackButtonText="Powrót"
                      mode="dropdown"
                      selectedValue={this.props.filters.department}
                      onValueChange={(newValue) => this.props.changeFilter("department", newValue)}
                      style={styles.pickerStyle}
                    >
                      {this.props.selectListsValues.department.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                    :
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.department}
                      onValueChange={(newValue) => {
                        this.setState({department: newValue});
                        this.props.changeFilter("department", newValue);}}
                      style={styles.pickerStyle}
                    >
                      <Picker.Item value={null} label="Wybierz wydział" key=""/>
                      {this.props.selectListsValues.department.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                  }
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Kierunek</Text>
                  </Label>
                  {Platform.OS === "ios" ?
                    <Picker
                      iosHeader="Wybierz"
                      headerBackButtonText="Powrót"
                      mode="dropdown"
                      selectedValue={this.props.filters.fieldOfStudy}
                      onValueChange={(newValue) => this.props.changeFilter("fieldOfStudy", newValue)}
                      style={styles.pickerStyle}
                    >
                      {this.props.selectListsValues.fieldOfStudy.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                    :
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.fieldOfStudy}
                      onValueChange={(newValue) => {
                        this.setState({fieldOfStudy: newValue});
                        this.props.changeFilter("fieldOfStudy", newValue);}}
                      style={styles.pickerStyle}
                    >
                      <Picker.Item value={null} label="Wybierz kierunek" key=""/>
                      {this.props.selectListsValues.fieldOfStudy.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                  }
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Stopień</Text>
                  </Label>
                  {Platform.OS === "ios" ?
                    <Picker
                      iosHeader="Wybierz"
                      headerBackButtonText="Powrót"
                      mode="dropdown"
                      selectedValue={this.props.filters.degree}
                      onValueChange={(newValue) => this.props.changeFilter("degree", newValue)}
                      style={styles.pickerStyle}
                    >
                      {this.props.selectListsValues.degree.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                    :
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.degree}
                      onValueChange={(newValue) => {
                        this.setState({degree: newValue});
                        this.props.changeFilter("degree", newValue);}}
                      style={styles.pickerStyle}
                    >
                      <Picker.Item value={null} label="Wybierz stopień" key=""/>
                      {this.props.selectListsValues.degree.map( value => (<Picker.Item key={value} label={value} value={value} />) ) }
                    </Picker>
                  }
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Semestr</Text>
                  </Label>
                  {Platform.OS === "ios" ?
                    <Picker
                      iosHeader="Wybierz"
                      headerBackButtonText="Powrót"
                      mode="dropdown"
                      selectedValue={this.props.filters.semester}
                      onValueChange={(newValue) => this.props.changeFilter("semester", newValue)}
                      style={styles.pickerStyle}
                    >
                      {this.props.selectListsValues.semester.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                    :
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.semester}
                      onValueChange={(newValue) => {
                        this.setState({semester: newValue});
                        this.props.changeFilter("semester", newValue);}}
                      style={styles.pickerStyle}
                    >
                      <Picker.Item value={null} label="Wybierz semestr" key=""/>
                      {this.props.selectListsValues.semester.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                  }
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Tryb</Text>
                  </Label>
                  {Platform.OS === "ios" ?
                    <Picker
                      iosHeader="Wybierz"
                      headerBackButtonText="Powrót"
                      mode="dropdown"
                      selectedValue={this.props.filters.mode}
                      onValueChange={(newValue) => {
                        this.props.changeFilter("mode", newValue);
                        this.props.setDay(null);
                      }}
                      style={styles.pickerStyle}
                    >
                      {this.props.selectListsValues.mode.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                    :
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.mode}
                      onValueChange={(newValue) => {
                        this.setState({mode: newValue});
                        this.props.changeFilter("mode", newValue);
                        this.props.setDay(null);
                      }}
                      style={styles.pickerStyle}
                    >
                      <Picker.Item value={null} label="Wybierz tryb" key=""/>
                      {this.props.selectListsValues.mode.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                  }
                </Item>

                <Item stackedLabel>
                  <Label>
                    <Text note>Grupa</Text>
                  </Label>
                  {Platform.OS === "ios" ?
                    <Picker
                      iosHeader="Wybierz"
                      headerBackButtonText="Powrót"
                      mode="dropdown"
                      selectedValue={this.props.filters.group}
                      onValueChange={(newValue) => this.props.changeFilter("group", newValue)}
                      style={styles.pickerStyle}
                    >
                      {this.props.selectListsValues.group.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                    :
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.group}
                      onValueChange={(newValue) => {
                        this.setState({group: newValue});
                        this.props.changeFilter("group", newValue);}}
                      style={styles.pickerStyle}
                    >
                      <Picker.Item value={null} label="Wybierz grupę" key=""/>
                      {this.props.selectListsValues.group.map( value => (<Picker.Item key={value} label={value} value={value} />) )}
                    </Picker>
                  }
                </Item>
           
                <Text note style={styles.filterTextStyle}>Inne</Text>
                <ListItem style={styles.listItemStyle}>
                  <Left>
                    <Icon name="md-swap" style={styles.iconStyle}/>
                  </Left>
                  <Text>Szybka zmiana grupy</Text>
                  <Body/>
                  <Switch
                    value={this.props.configuration.allowQuickGroupChange}
                    onValueChange={
                      (newValue) => this.props.changeConfigurationOption("allowQuickGroupChange", newValue)
                    }
                  />
                </ListItem>
              </Form>
            }
        
          </Content>
        }
          
      </Container>
    );
  }
}


const getAvailableOptions = (optionName, filterKeys, data, filters) => {
  if (!data) {
    return [];
  }

  const resultsSet = new Set();
  if (optionName !== "lecturers") {
    data
      .events
      .filter((event) => filterKeys
        .every((key) => event[key] === filters[key]))
      .forEach((event) => resultsSet.add(optionName === "group"
        ? event.specialization || event.group.toString()
        : event[optionName]));
  } else {
    data
      .events
      .forEach((event) =>
        event.lecturers.forEach(
          (lecturer) =>
            resultsSet.add(lecturer),
        ),
      );
  }

  return [...resultsSet];
};

const getSelectListsValues = (data, filters) => {
  return {
    academicYear: getAvailableOptions("academicYear", [], data, filters),
    department: getAvailableOptions("department", ["academicYear"], data, filters),
    fieldOfStudy: getAvailableOptions("fieldOfStudy", ["department", "academicYear"], data, filters),
    degree: getAvailableOptions("degree", ["department", "fieldOfStudy", "academicYear"], data, filters),
    semester: getAvailableOptions("semester", ["department", "fieldOfStudy", "degree", "academicYear"],
      data, filters),
    mode: getAvailableOptions("mode", ["department", "fieldOfStudy", "degree", "academicYear", "semester"],
      data, filters),
    group: getAvailableOptions("group",
      ["department", "fieldOfStudy", "degree", "mode", "semester", "academicYear"], data, filters),
    lecturer: getAvailableOptions("lecturers", [], data, filters),
  };
};

const mapStateToProps = (state) => {
  return {
    timetable: state.timetable.data,
    filters: state.configuration.filters,
    configuration: state.configuration,
    selectListsValues: getSelectListsValues(state.timetable.data, state.configuration.filters),
    filtersOK: state.filtersOK,
    selectedDay: state.selectedDay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeConfigurationOption: (name, value) => dispatch(changeConfigurationOption(name, value)),
    changeFilter: (name, value) => dispatch(changeFilter(name, value)),
    setFiltersOK: (value) => dispatch(setFiltersOK(value)),
    setDay: (value) => dispatch(setDay(value))
  };
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  configuration: PropTypes.object,
  selectListsValues: PropTypes.object,
  filters: PropTypes.object,
  changeConfigurationOption: PropTypes.func,
  setFiltersOK: PropTypes.func,
  filtersOK: PropTypes.bool,
  changeFilter: PropTypes.func,
  setDay: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
