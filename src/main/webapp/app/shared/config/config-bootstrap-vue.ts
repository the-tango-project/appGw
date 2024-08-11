import {
  BForm,
  BFormInput,
  BFormCheckbox,
  BFormGroup,
  BProgress,
  BProgressBar,
  BPagination,
  BButton,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BNavItem,
  BNavItemDropdown,
  BCollapse,
  BBadge,
  BDropdown,
  BDropdownItem,
  BLink,
  BAlert,
  BModal,
  VBModal,
  BFormDatepicker,
  BInputGroup,
  BInputGroupPrepend,
  ToastPlugin,
  BFormFile,
  BFormCheckboxGroup,
  BFormSelect,
  BFormSelectOption,
  BFormRadioGroup,
  BFormRadio,
  BFormTag,
  BMedia,
  BInputGroupAppend,
  BInputGroupText,
  BSidebar,
  VBToggle,
  BCard,
  BCardGroup,
  BCardImg,
  BCardBody,
  BCardHeader,
  BCardTitle,
  BCardSubTitle,
  BCardFooter,
  BEmbed,
  BRow,
  BCol,
  BBreadcrumb,
  BTable,
  BTableSimple,
  BThead,
  BTbody,
  BTr,
  BTh,
  BTd,
  BJumbotron,
  BImg,
  BContainer,
  VBHover,
  BOverlay,
  BIcon,
  BDropdownItemButton,
  BDropdownDivider,
  BDropdownGroup,
  BDropdownForm,
  BNav,
  BTab,
  BTabs,
  BCardText,
  BootstrapVueIcons,
  BAvatar,
  BAvatarGroup,
  BButtonGroup,
  BFormTextarea,
  BSpinner,
  BFormSpinbutton,
  BFormTags,
  BFormText,
  BFormInvalidFeedback,
  BSkeleton,
  BSkeletonIcon,
  BSkeletonImg,
  BSkeletonTable,
  BSkeletonWrapper,
  BListGroup,
  BListGroupItem,
} from 'bootstrap-vue';

export function initBootstrapVue(vue) {
  vue.use(ToastPlugin);
  vue.use(BootstrapVueIcons);

  vue.component('b-badge', BBadge);
  vue.component('b-dropdown', BDropdown);
  vue.component('b-dropdown-item', BDropdownItem);
  vue.component('b-link', BLink);
  vue.component('b-alert', BAlert);
  vue.component('b-button', BButton);
  vue.component('b-navbar', BNavbar);
  vue.component('b-navbar-nav', BNavbarNav);
  vue.component('b-navbar-brand', BNavbarBrand);
  vue.component('b-navbar-toggle', BNavbarToggle);
  vue.component('b-pagination', BPagination);
  vue.component('b-progress', BProgress);
  vue.component('b-progress-bar', BProgressBar);
  vue.component('b-form', BForm);
  vue.component('b-form-input', BFormInput);
  vue.component('b-form-group', BFormGroup);
  vue.component('b-form-checkbox', BFormCheckbox);
  vue.component('b-collapse', BCollapse);
  vue.component('b-nav-item', BNavItem);
  vue.component('b-nav-item-dropdown', BNavItemDropdown);
  vue.component('b-modal', BModal);
  vue.directive('b-modal', VBModal);
  vue.component('b-form-datepicker', BFormDatepicker);
  vue.component('b-input-group', BInputGroup);
  vue.component('b-input-group-prepend', BInputGroupPrepend);
  vue.component('b-form-checkbox-group', BFormCheckboxGroup);
  vue.component('b-form-radio-group', BFormRadioGroup);
  vue.component('b-form-radio', BFormRadio);
  vue.component('b-form-select', BFormSelect);
  vue.component('b-form-tag', BFormTag);
  vue.component('b-form-select-option', BFormSelectOption);
  vue.component('b-form-file', BFormFile);
  vue.component('b-breadcrumb', BBreadcrumb);
  vue.component('b-form-spinbutton', BFormSpinbutton);
  vue.component('b-input-group-append', BInputGroupAppend);
  vue.component('b-input-group-text', BInputGroupText);
  vue.component('b-sidebar', BSidebar);
  vue.component('b-nav', BNav);
  vue.component('b-tab', BTab);
  vue.component('b-tabs', BTabs);
  vue.component('b-card', BCard);
  vue.component('b-card-text', BCardText);
  vue.component('b-card-group', BCardGroup);
  vue.component('b-card-img', BCardImg);
  vue.component('b-card-body', BCardBody);
  vue.component('b-card-header', BCardHeader);
  vue.component('b-card-title', BCardTitle);
  vue.component('b-card-subtitle', BCardSubTitle);
  vue.component('b-card-footer', BCardFooter);
  vue.component('b-avatar', BAvatar);
  vue.component('b-avatar-group', BAvatarGroup);
  vue.component('b-dropdown-item-button', BDropdownItemButton);
  vue.component('b-dropdown-divider', BDropdownDivider);
  vue.component('b-dropdown-group', BDropdownGroup);
  vue.component('b-dropdown-form', BDropdownForm);
  vue.component('b-button-group', BButtonGroup);
  vue.component('b-form-textarea', BFormTextarea);
  vue.component('b-spinner', BSpinner);
  vue.component('b-form-tags', BFormTags);
  vue.directive('b-toggle', VBToggle);
  vue.component('b-row', BRow);
  vue.component('b-col', BCol);
  vue.component('b-table', BTable);
  vue.component('b-jumbotron', BJumbotron);
  vue.component('b-img', BImg);
  vue.component('b-container', BContainer);
  vue.directive('b-hover', VBHover);
  vue.component('b-icon', BIcon);
  vue.component('b-overlay', BOverlay);
  vue.component('b-skeleton', BSkeleton);
  vue.component('b-skeleton-icon', BSkeletonIcon);
  vue.component('b-skeleton-img', BSkeletonImg);
  vue.component('b-skeleton-table', BSkeletonTable);
  vue.component('b-skeleton-wrapper', BSkeletonWrapper);
  vue.component('b-list-group', BListGroup);
  vue.component('b-list-group-item', BListGroupItem);
  vue.component('b-table-simple', BTableSimple);
  vue.component('b-thead', BThead);
  vue.component('b-tbody', BTbody);
  vue.component('b-tr', BTr);
  vue.component('b-th', BTh);
  vue.component('b-td', BTd);
  vue.component('b-media', BMedia);
  vue.component('b-embed', BEmbed);
  vue.component('b-form-text', BFormText);
  vue.component('b-form-invalid-feedback', BFormInvalidFeedback);
}
