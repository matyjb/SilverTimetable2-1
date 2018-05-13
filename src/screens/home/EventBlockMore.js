import React, { Component } from "react";
import { Container, Text, H1, Content, Badge, Icon, Button } from "native-base";
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

        if(this.props.event !== null){
        return (
            <Container style={{backgroundColor: 'white'}}>
                <Content style={{margin: 10}}>
                    <H1>{event.name}</H1>

                    <Text note>
                    {(event.isFaculty ? "(F) " : "") + event.type + " "}
                    {startTime.format("HH:mm ")}
                    - {endTime.format("HH:mm")}
                    </Text>

                    {this.props.lecturerMode 
                    ? 
                    <React.Fragment>
                        <Text note>{'\n'}{event.fieldOfStudy} rok {event.year} {event.degree}{'\n'}</Text>
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
                        <Icon ios='ios-map' android="md-map">
                            <Text>   {room}</Text>
                        </Icon>
                        {event.building == 34 && event.room !== '' &&
                        <Button light style={{margin: 4, width: '100%'}} 
                            onPress={()=>{
                                this.props.setPinned(true);
                                this.props.setPinRoom(event.room);
                                this.props.navigation.navigate("FloorPage");
                        }}>
                            <Text>Pokaż na schemacie</Text>
                        </Button>
                        }
                    </View>
                    }
                </Content>
            </Container>
        );}else{
            return (
                <Container style={{backgroundColor: 'white'}}/>
            );
        }
    }
}
const mapStateToProps = (state) => {
    return {

    };
  };

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
  setPinned: PropTypes.func,
  setPinRoom: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventBlockMore);

