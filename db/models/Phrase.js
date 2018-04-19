import DataType from 'sequelize';
import Model from '../sequelize';

import PhraseList from './PhraseList';

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

Phrase.belongsToMany(PhraseList);

export default Phrase;
