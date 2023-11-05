import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native';
import VideoPicker from '../components/VideoPicker';
import ImagePickerComponent from '../components/ImagePicker';
import ImageDescriptionInput from '../components/ImageDescription';

const PostContent2 = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);

  const handleAddInput = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const handleInputChange = (index, type, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][type] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = () => {
    console.log(ingredients);
    // Add your logic for submitting the form data here
  };

  return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.cancelBtm} onPress={() => navigation.navigate('BottomTabNavigator')}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.videoTitle} placeholder="Title"/>


        <View style={styles.serves}>
          <Image source={require('../../assets/servespeople.jpg')} style={styles.icons}/>
          <Text style={styles.sevesTitle}>Serves</Text>
          <TextInput style={styles.servesNum} placeholder="01"/>
        </View>

        <View style={styles.serves}>
          <Image source={require('../../assets/servespeople.jpg')} style={styles.icons}/>
          <Text style={styles.sevesTitle}>Cook time</Text>
          <TextInput style={styles.cookNum} placeholder="45 min"/>
        </View>

        <ImageDescriptionInput setDescription={setDescription} />

        <Text style={styles.ingridientsHeading}>Ingridients</Text>

        {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingridientsContainer}>
          <TextInput
            style={styles.ingridientInput}
            placeholder={`Ingredient ${index + 1}`}
            value={ingredient.name}
            onChangeText={(text) => handleInputChange(index, 'name', text)}
          />
          <TextInput
            style={styles.ingridientSize}
            placeholder="01"
            value={ingredient.quantity}
            onChangeText={(text) => handleInputChange(index, 'quantity', text)}
          />
          <TextInput
            style={styles.ingridientSize}
            placeholder="Kg"
            value={ingredient.unit}
            onChangeText={(text) => handleInputChange(index, 'unit', text)}
          />
        </View>
      ))}

      <TouchableOpacity onPress={handleAddInput} style={styles.addIngridient}>
        <Text style={{color: 'white', textAlign: 'center'}}>Add Ingredient</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
        <ImagePickerComponent setImage={setImage} />

        <VideoPicker/>

        <View>
          <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.postText} onPress={handleSubmit}>Save My Recipe</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 10
  },

  headerContainer:{
    flexDirection: 'row',
    marginBottom: 30
  },

  cancelBtm:{
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    position: 'relative',
    top: 25
  },
  btnText:{
    color: 'white'
  },

  // pageNo:{
  //   flex: 1,
  //   alignItems: 'right',
  //   textAlign: 'right',
  //   fontWeight: 'bold',
  //   fontSize: 20,
  //   color: 'darkgreen'
  // },

  // video:{
  //   alignItems: 'center',
  //   textalign: 'center',
  //   height: 200,
  //   width: 300,
  //   borderRadius: 20
  // },

  // videoContainer:{
  //   alignItems: 'center',
  //   textalign: 'center',
  // },

  videoTitle:{
    marginTop: 20,
    borderColor: 'orange',
    borderWidth: 3,
    padding: 10,
    borderRadius: 10,
    color: 'grey',
    marginBottom: 20
  },

  serves:{
    flexDirection: 'row',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    alignItems: 'center'
  },

  icons:{
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 10
  },

  sevesTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 19
  },
  servesNum:{
    color: 'grey',
    marginLeft: 40,
    width: 75,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    textAlign: 'center'
  },

  cookNum:{
    color: 'grey',
    width: 75,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginLeft: 5
  },

  ingridientsHeading:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10
  },

  ingridientsContainer:{
    flexDirection: 'row',
    marginLeft: 30
  },

  ingridientInput:{
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    width: 150,
    color: 'grey',
    marginBottom: 10

  },

  ingridientSize:{
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    width: 50,
    marginLeft: 20,
    color: 'grey',
    marginBottom: 10
  },

  postBtn:{
    backgroundColor: 'green',
    borderRadius: 7,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20
  },

  postText:{
    color: 'white',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 15
  },
  addIngridient:{
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginLeft: 90,
    marginBottom:20
  }

})

export default PostContent2;
