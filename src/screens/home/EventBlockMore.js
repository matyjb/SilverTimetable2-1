import React, { Component } from "react";
import { Container, Button, Text, Badge, Icon, Left } from "native-base";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPinned, setPinRoom } from "../../actions";
const { width, height } = Dimensions.get("screen");

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
        let initials = "";
        const chars = lecturer.split("");
        chars.forEach((char) => {
          if(char === char.toUpperCase() && char !== '-') {
            initials = initials + char.trim();
          }
        });
        lecturers.push(
          <Badge key={index} style={{backgroundColor: "#e6e6e6", paddingLeft: 0, marginTop: width*0.025, borderRadius: width*0.091}}>
            <Left style={{alignSelf:"flex-start"}}><Badge style={{backgroundColor: "#8c8c8c", paddingLeft: 0, paddingRight: 0, borderRadius: width*0.091}}><Text style={{fontSize: height*0.023, width: width*0.097}}>{initials}</Text>
            </Badge></Left><Text style={{color: "black", marginLeft: width*0.11, marginRight: width*0.037, paddingBottom: width*0.01, fontSize: height*0.023}}>{lecturer}</Text>
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
        <Container style={{backgroundColor: "white", padding: width*0.037}}>
          <Text style={{fontSize: height*0.029}}>{event.name}</Text>

          <Text note style={{fontSize: height*0.023}}>
            {(event.isFaculty ? "(F) " : "") + event.type + " "}
            {startTime.format("HH:mm ")}
                    - {endTime.format("HH:mm")}
          </Text>

          {this.props.lecturerMode 
            ? 
            <React.Fragment>
              <Text note style={{fontSize: height*0.023}}>{event.fieldOfStudy} rok {event.year} {event.degree}</Text>
              {(event.groups !== null && event.groups.length > 1) 
                ? 
                <Text note style={{fontSize:height*0.023}}>grupy: {event.groups.join(", ")}</Text>
                : 
                <Text note style={{fontSize: height*0.023}}>grupa: {event.specialization || event.group} </Text> }
            </React.Fragment>
            : 
            <React.Fragment>
              {lecturers}
            </React.Fragment>
          }
          {room !== '' &&
                    <React.Fragment>
                      {event.room !== '' &&
                        <Button light style={{width: "100%", marginVertical: height*0.025}}
                          onPress={() => {
                            this.props.setPinned(true);
                            this.props.setPinRoom(event.room);
                            this.props.navigation.navigate("FloorPage");
                          }}>
                          <Icon style={{color: "black", fontSize: height*0.029 }} ios='md-map' android="md-map">
                            <Text style={{fontSize: height*0.029}}>    {room}</Text>
                          </Icon>
                        </Button>
                      }
                    </React.Fragment>
                      
          }
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

