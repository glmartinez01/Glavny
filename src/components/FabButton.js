import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableWithoutFeedback,Animated } from 'react-native';
import { sub } from 'react-native-reanimated';
import Icon from "react-native-vector-icons/FontAwesome";

export default class FabButton extends Component {

    animation = new Animated.Value(0);

    toggleMenu = () =>{
        const toValue = this.open ? 0 : 1;

        Animated.spring(this.animation,{
            toValue,
            friction:5,
            useNativeDriver:false
        }).start();

        this.open = !this.open;
    }

    render(){

        const rotation = {
            transform:[
                {rotate:this.animation.interpolate({
                    inputRange:[0,1],
                    outputRange:["0deg","90deg"]
                })}
            ]
        }

        const add = {
            transform:[
                {scale:this.animation},
                {
                    translateY:this.animation.interpolate({
                        inputRange:[0,1],
                        outputRange:[0,-70]
                    })
                }
            ]
        }

        const del = {
            transform:[
                {scale:this.animation},
                {
                    translateY:this.animation.interpolate({
                        inputRange:[0,1],
                        outputRange:[0,-140]
                    })
                }
            ]
        }
    
        return (
            <View style={[styles.container,this.props.style]}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button,styles.submenu,del]}>
                        <Icon name="trash" size={24} color="#fff"/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.props.addRecipe}>
                    <Animated.View style={[styles.button,styles.submenu,add]}>
                        <Icon name="plus" size={24} color="#fff"/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={[styles.button,styles.menu,rotation]}>
                        <Icon name="bars" size={24} color="#fff"/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        position:'absolute'
    },
    button:{
        position:'absolute',
        borderRadius:30,
        width:60,
        height:60,
        justifyContent:'center',
        alignItems:'center'
    },
    menu:{
        backgroundColor:"#fabd05",
    },
    submenu:{
        width:48,
        height:48,
        borderRadius:24,
        backgroundColor:"#fabd05"
    }
})