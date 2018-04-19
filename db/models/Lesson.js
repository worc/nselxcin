import DataType from 'sequelize';
import Model from '../sequelize';

import Workbook from './Workbook';
import PhraseList from './PhraseList';

const Lesson = Model.define(
  'Lesson',
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

Lesson.belongsTo(Workbook);
Lesson.hasMany(PhraseList);

export default Lesson;
