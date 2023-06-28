import { StyleSheet } from 'react-native';

import React, { useState, useEffect } from 'react';
import { View, Button, TextInput } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { API } from 'aws-amplify';

function PaymentScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
        /*
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      */
      const response = await API.post('cronusfitrest', '/checkout', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('response: ' + JSON.stringify(response))

      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Cronusfit",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: false,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
    
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }
      };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);

    
    return (
      <View>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </View>
    );
  }

/*
const PaymentScreen = () => {
    const { confirmPayment } = useStripe();
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvc, setCvc] = useState('');
  
    const handlePayment = async () => {
        console.log('handle Payment')
      const paymentMethod = await confirmPayment({
        type: 'Card',
        billingDetails: {
          // Fill in with relevant billing details
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '+1234567890',
        },
      });
      
      consolelog(paymentMethod)
      
      // Handle the payment result
    };
  
    return (
        <View style={styles.container}>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 10,
            }}
            onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
            }}
            onFocus={(focusedField) => {
            console.log('focusField', focusedField);
            }}
          />
          <Button onPress={handlePayment} title="Pay" />
        </View>
      );
  };
  */

export default PaymentScreen;



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    input: {
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    smallInput: {
      flex: 1,
      marginRight: 10,
    },
    button: {
      width: '100%',
      height: 40,
      backgroundColor: '#007AFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });