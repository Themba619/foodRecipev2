import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from 'react-native';

const Onboarding = ({navigation}) => {
    return(
        <View style={styles.container}>
            <View style={styles.box1Container}>
                <Image 
                    style={styles.img}
                    source={require('../../assets/Onboarding.jpeg')}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.box2Container}>
                <Text style={styles.txt1}>Start Cooking</Text>
                <View style={styles.txt2Container}>
                    <Text style={styles.txt2}>Lets join our community</Text>
                    <Text style={styles.txt4}>to cook better food!</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.txt3}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box1Container: {
        flex: 3
    },
    box2Container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        position: 'relative',
        bottom: 50
    },
    txt1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    txt2Container: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    txt2: {
        color: 'grey',
        width: 220,
        fontSize: 18,
        position: 'relative',
        left: 5,
    },
    txt4: {
        color: 'grey',
        fontSize: 18,
        position: 'relative',
        right: 5,
    },
    btn: {
        width: '70%',
        backgroundColor: '#1FCC79',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80,
        borderRadius: 32,
        height: 60,
    },
    txt3:{
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Onboarding;