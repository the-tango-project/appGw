import { de } from '@faker-js/faker';
import { useI18n } from 'vue-i18n';

export const useCoreProps = () => {
  const coreProps = {
    id: {
      type: String,
      default: () => {
        return Math.floor(Math.random() * Date.now());
      },
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
    popover: {
      type: String,
      default: '',
    },
    //Validation
    required: {
      type: Boolean,
      default: false,
    },
    requiredMessage: {
      type: String,
      default: () => {
        return useI18n().t('entity.validation.required');
      },
    },
    min: {
      type: Number,
      default: null,
    },
    minMessage: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: null,
    },
    maxMessage: {
      type: String,
      default: null,
    },
    regex: {
      type: String,
      default: null,
    },
    regexMessage: {
      type: String,
      default: null,
    },
    valid: {
      type: Boolean,
      default: false,
    },
  };
  return {
    coreProps,
  };
};
