import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import successImg from '../../assets/success.png';

import { styles } from './styles';
import { Copyright } from '../Copyright';

interface Props {
  onSendAnother: () => void;
}

export function Success({onSendAnother}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={successImg}
        style={styles.image}
      />

      <Text
        style={styles.title}
      >
        Agradecemos o feedback!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onSendAnother}
      >
        <Text
          style={styles.buttonTitle}
        >
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}