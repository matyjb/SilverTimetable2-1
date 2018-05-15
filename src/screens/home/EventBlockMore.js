import React, { Component } from "react";
import { Container, Text, H3, Content, Badge, Icon, Button } from "native-base";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPinned, setPinRoom } from "../../actions";

class EventBlockMore extends Component {
  lowercaseFirstLetter(text) {
    return text.charAt(0).toLowerCase() + text.slice(1);
  }

  render() {
    const event = this.props.event;
    const { startTime, 
      endTime } = event;
    var lecturers = [];
    event.lecturers.forEach((lecturer,index) => {
      if(lecturer !== ''){
        lecturers.push(
          <Badge key={index} style={{marginVertical: 8, backgroundColor: '#D3D3D3'}}>
            <Text style={{color: 'black'}}>{lecturer}</Text>
          </Badge>
        );
      }
    });
    var room = '';
    if(event.building !== null){
      room = "Budynek " + event.building;
    }
    if(event.room !== ''){
      room += ", ";
      if (event.room.substring(0, 2) === "Au" || event.room.substring(0, 2) === "au") {
        room += this.lowercaseFirstLetter(event.room);
      } else {
        room += "sala " + event.room;
      }
    }

    if(this.props.event){
      return (
        <Container style={{backgroundColor: 'white'}}>
          <Content style={{margin: 10}}>
            <H3>{event.name}</H3>

            <Text note>
              {(event.isFaculty ? "(F) " : "") + event.type + " "}
              {startTime.format("HH:mm ")}
                    - {endTime.format("HH:mm")}
            </Text>

            {this.props.lecturerMode 
              ? 
              <React.Fragment>
                <Text note>{event.fieldOfStudy} rok {event.year} {event.degree}</Text>
                {(event.groups !== null && event.groups.length > 1) 
                  ? 
                  <Text note>grupy: {event.groups.join(", ")}</Text>
                  : 
                  <Text note>grupa: {event.specialization || event.group} </Text> }
              </React.Fragment>
              : 
              <React.Fragment>
                {lecturers}
              </React.Fragment>
            }
            {room !== '' &&
                    <View>
                      {event.room !== '' &&
                        <Button light style={{margin: 2, width: '100%'}} 
                          onPress={() => {
                            this.props.setPinned(true);
                            this.props.setPinRoom(event.room);
                            this.props.navigation.navigate("FloorPage");
                          }}>
                          <Icon ios='md-map' android="md-map">
                            <Text>   {room}</Text>
                          </Icon>
                        </Button>
                      }
                    </View>
                      
            }
          </Content>
        </Container>
      );
    } else {
      return (
        <Container style={{backgroundColor: 'white'}}/>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setPinned: (value) => dispatch(setPinned(value)),
    setPinRoom: (value) => dispatch(setPinRoom(value)),
  };
};

EventBlockMore.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  event: PropTypes.object,
  lecturerMode: PropTypes.bool,
  setPinned: PropTypes.func,
  setPinRoom: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(EventBlockMore);

