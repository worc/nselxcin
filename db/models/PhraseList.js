import DataType from 'sequelize';
import Model from '../sequelize';

import Lesson from './Lesson';
import Phrase from './Phrase';

const LessonPhraseOrder = Model.define(
  'LessonPhraseOrder',
  {
    viewOrder: {
      type: DataType.INTEGER,
      defaultValue: 0
    }
  }
);

LessonPhraseOrder.hasOne(Lesson);
LessonPhraseOrder.hasOne(Phrase);

export default LessonPhraseOrder;
