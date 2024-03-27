import { TechnologyType } from './Technology';

const validateRequired = (value: string) => !!value.length;

const numberValidation = (value: string | number, text: string) => {
  if (!value) {
    return `${text} is Required`;
  }

  value = Number(value);

  if (isNaN(value)) {
    return 'Enter valid Positive Integer value';
  }

  if (value <= 0) {
    return 'Enter valid Positive Integer value';
  }
  return '';
};

const cutOffValidation = (
  cutOff: string | number,
  noOfQuestion: string | number
) => {
  const noOfQuestionValidationResponse = numberValidation(
    noOfQuestion,
    'No. of Question'
  );
  const cutOffValidationResponse = numberValidation(cutOff, 'Cut Off');

  if (cutOffValidationResponse !== '') {
    return cutOffValidationResponse;
  }

  if (noOfQuestionValidationResponse !== '') {
    return 'Please check total question field';
  }

  if (Number(cutOff) > Number(noOfQuestion)) {
    return 'Cut off should be less than total question';
  }

  return '';
};

export function validateTechnology(data: TechnologyType) {
  return {
    name: !validateRequired(data.name) ? 'Technology Name is Required' : '',
    noOfQuestion: numberValidation(data.noOfQuestion, 'No. of Question'),
    duration: numberValidation(data.duration, 'Duration'),
    cutOff: cutOffValidation(data.cutOff, data.noOfQuestion),
  };
}
