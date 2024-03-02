import { View, Text, StyleSheet } from 'react-native';

const MainTest = () => {
    return (
        <View style={styles.container}>
            <Text>Main Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainTest;