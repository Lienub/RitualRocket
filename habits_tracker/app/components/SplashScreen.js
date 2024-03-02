import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Loading of assets
        const loadAssets = async () => {
          // Simulating asset loading for 3 seconds (the duration of the animation)
          await new Promise(resolve => setTimeout(resolve, 3800));

          /* 
            PUT HERE THE ASSETS THAT HAVE TO BE LOADED
          */


          setAssetsLoaded(true);
        };
    
        loadAssets();
      }, []);

    useEffect(() => {
        if (!assetsLoaded) {
          return;
        }

        const animate = () => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            navigation.replace('MainTest');
          });
        };
        animate();
      }, [assetsLoaded]);
  
    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <LottieView
          source={require('../assets/splashscreen.json')} // Replace 'your-animation.json' with the path to your Lottie JSON file
          autoPlay
          loop={false} // Set to true if you want the animation to loop
          style={styles.animation}
        />
      </Animated.View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#404040',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: "100%",
        height: "100%",
    },
  });
  
  export default SplashScreen;
  