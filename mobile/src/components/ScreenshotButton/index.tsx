import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props {
  screenshot: string | null;
  onTakeShot: () => void;
  onRemoveShot: () => void;
  isLoading: boolean;
}

export function ScreenshotButton({ screenshot, onTakeShot, onRemoveShot, isLoading }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveShot : onTakeShot}
    >
      {
        isLoading
          ?
          <ActivityIndicator
            color={theme.colors.text_on_brand_color}
          />
          :
          <>
            {
              screenshot
                ?
                <View>
                  <Image
                    source={{ uri: screenshot }}
                    style={styles.image}
                  />
                  <Trash
                    size={22}
                    color={theme.colors.text_secondary}
                    weight='fill'
                    style={styles.removeIcon}
                  />

                </View>
                :
                <Camera
                  size={24}
                  color={theme.colors.text_secondary}
                  weight='bold'
                />
            }
          </>
      }

    </TouchableOpacity>
  );
}