import React, { Component } from "react";
import { Image, Dimensions, View, ScrollView} from "react-native";
import { Header, Right, Left, Body, Button, Icon, Title, Container, Content } from "native-base";
import PictureOfFloor from "./../../../assets/img/floor.png";

import styles from "./style";

export default class FloorPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Schemat piętra</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <ScrollView>
                        <Image style={styles.canvas} source={PictureOfFloor} resizeMode="stretch" />
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

