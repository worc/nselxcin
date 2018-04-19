import DataType from 'sequelize';
import Model from '../sequelize';

import Lesson from './Lesson';

const Workbook = Model.define(
  'Workbook',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataType.STRING,
    },
    subtitle: {
      type: DataType.STRING
    },
    authors: {
      type: DataType.STRING
    },
    edition: {
      type: DataType.STRING
    },
    version: {
      type: DataType.STRING
    }
  }
);

Workbook.hasMany(Lesson);

export default Workbook;
