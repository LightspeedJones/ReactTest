import * as React from 'react';
import {View} from '../components/Themed';
import Styles from '../constants/Styles';
import { Todo } from '../app/TaskActions';

export default function TodoListScreen() {
  return (
    <View style={Styles.container}>
      <Todo/>
    </View>
  );
}
