import React, { Component } from 'react';
import { Container,Card, CardItem, Text, Body, Content } from 'native-base';
import PropTypes from 'prop-types';

export default class EventBlock extends Component {

    render(){
        return (
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <Text>
                                {this.props.event.name}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        );
    };
}

EventBlock.propTypes = {
    event: PropTypes.object,
    order: PropTypes.number,
    lecturerMode: PropTypes.bool,
  };
