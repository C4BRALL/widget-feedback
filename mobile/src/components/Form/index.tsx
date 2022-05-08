import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { api } from '../../services/api';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';

import { styles } from './styles';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [isSending, setIsSending] = useState(false);
  const [isTaking, setIsTaking] = useState(false);
  const [comment, setComment] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const feedbackInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    setIsTaking(true);

    captureScreen({
      format: 'png',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error));

    setIsTaking(false);

  }

  async function handleSendFeedback() {
    if (isSending) {
      return;
    }
    setIsSending(true);
    const canvasBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${canvasBase64}`,
        comment,
      });

      onFeedbackSent();

    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={() => setScreenshot(null)}
          screenshot={screenshot}
          isLoading={isTaking}
        />

        <Button
          onPress={handleSendFeedback}
          isLoading={isSending}
        />
      </View>
    </View>
  );
}