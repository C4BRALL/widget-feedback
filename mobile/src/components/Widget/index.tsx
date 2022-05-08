import React, { useRef, useState } from 'react';
import { LogBox } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../Options';
import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestart() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={34}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent
            ?
            <Success
              onSendAnother={handleRestart}
            />
            :
            <>
              {
                feedbackType ?
                  <Form
                    onFeedbackCanceled={handleRestart}
                    onFeedbackSent={() => setFeedbackSent(true)}
                    feedbackType={feedbackType}
                  />
                  :
                  <Options
                    onFeedbackTypeChange={setFeedbackType}
                  />
              }
            </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
