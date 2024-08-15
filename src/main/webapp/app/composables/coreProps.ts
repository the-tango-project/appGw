import { de } from '@faker-js/faker';
import { useI18n } from 'vue-i18n';

export const useCoreProps = () => {
  const coreProps = {
    id: {
      type: String,
      default: () => {
        return Math.floor(Math.random() * Date.now()) + '';
      },
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
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
      default: null,
    },
    tooltip: {
      type: String,
      default: null,
    },
    popover: {
      type: String,
      default: null,
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
      type: [Number, String],
      default: null,
    },
    minMessage: {
      type: String,
      default: '',
    },
    max: {
      type: [Number, String],
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
      default: null,
    },
  };
  return {
    coreProps,
  };
};
