import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const validateInput = (operation) => {
    if (isNaN(num1) || (operation !== '√' && isNaN(num2))) {
      Alert.alert("Invalid Input", "Please enter valid numbers.");
      return false;
    }
    if (num1 === '' || (operation !== '√' && num2 === '')) {
      Alert.alert("Incomplete Input", "Please enter the required numbers.");
      return false;
    }
    return true;
  };

  const handleOperation = (operation) => {
    if (!validateInput(operation)) return;

    let res;
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    switch (operation) {
      case '+':
        res = number1 + number2;
        break;
      case '-':
        res = number1 - number2;
        break;
      case '*':
        res = number1 * number2;
        break;
      case '/':
        if (number2 === 0) {
          Alert.alert("Math Error", "Division by zero is not allowed.");
          return;
        }
        res = number1 / number2;
        break;
      case '^':
        res = Math.pow(number1, number2);
        break;
      case '√':
        if (number1 < 0) {
          Alert.alert("Math Error", "Square root of a negative number is not allowed.");
          return;
        }
        res = Math.sqrt(number1);
        break;
      default:
        res = "Error";
    }

    setResult(res.toString());
  };

  const clearFields = () => {
    setNum1('');
    setNum2('');
    setResult('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
      <TextInput
        style={styles.inputNumber}
        placeholder="Enter first number"
        keyboardType="numeric"
        onChangeText={setNum1}
        value={num1}
      />
      <TextInput
        style={styles.inputNumber}
        placeholder="Enter second number"
        keyboardType="numeric"
        onChangeText={setNum2}
        value={num2}
        editable={num2 !== '√'}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('^')}>
          <Text style={styles.buttonText}>^</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('√')}>
          <Text style={styles.buttonText}>√</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.theClearButton} onPress={clearFields}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#92a48b",
  },
  inputNumber: {
    width: "80%",
    height: 50,
    borderColor: "#92a48b",
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    marginVertical: 1,
  },
  button: {
    backgroundColor: "#92a48b",
    padding: 15,
    margin: 5,
    borderRadius: 8,
    width: 70,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 26,
    color: "#fff",
  },
  theClearButton: {
    backgroundColor: "#ff6347",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  clearButtonText: {
    fontSize: 20,
    color: "#fff",
  },
  resultText: {
    fontSize: 25,
    marginTop: 20,
    color: "#333",
  },
});
