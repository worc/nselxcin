import DataType from 'sequelize';
import Model from '../sequelize';

import LessonPhraseOrder from './LessonPhraseOrder';

const Phrase = Model.define(
  'Phrase',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true
    },
    salish: {
      type: DataType.STRING,
    },
    english: {
      type: DataType.STRING
    },
    audioUrl: {
      type: DataType.STRING
    },
  }
);

Phrase.belongsToMany(LessonPhraseOrder);

export default Phrase;
