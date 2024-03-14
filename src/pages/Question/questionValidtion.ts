import { QuestionType } from "./Question";

const validateRequired = (value: string) => !!value.length;

export function validateQuestion(data: QuestionType) {
  return {
    technology: !validateRequired(data.technology)
      ? 'Technology Name is Required'
      : '',
    questionText: !validateRequired(data.questionText)
      ? 'Question text is Required'
      : '',
    options: optionValidation(data.options),
    correctOption: correctOptionValidation(data.correctOption, data.options),
  };
}

function correctOptionValidation(
  correctOption: string,
  options: string[] | string
) {
  if (!correctOption || correctOption === '') {
    return `Correct Option is Required`;
  }

  const optionsValidationResponse = optionValidation(options);

  if (optionsValidationResponse !== '') {
    return optionsValidationResponse;
  }

  if (typeof options === 'string') {
    options = convertOptionStringToArray(options);

    return options.includes(correctOption.trim())
      ? ''
      : 'This text is not included in options';
  }

  return '';
}

function optionValidation(options: string[] | string) {
  console.log({ options });
  if (!options || options === '') {
    return `Options is Required`;
  }

  if (typeof options === 'string') {
    options = convertOptionStringToArray(options);

    if (!options?.length) {
      return 'Enter valid options string';
    }
  }

  return '';
}

export function convertOptionsArrayToString(optionsArray: string[]) {
  return optionsArray?.join(', ');
}

export function convertOptionStringToArray(optionsString: string) {
  return optionsString
    ?.split(',')
    .map((option) => option.trim())
    .filter((option) => !!option);
}
