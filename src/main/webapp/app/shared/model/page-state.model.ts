export class PageState {
  constructor(
    public isAccionesVisible?: boolean | null,
    public isSendReviewVisible?: boolean | null,
    public isPreview?: boolean | null,
    public isFormioVisible?: boolean | null,
    public isAssignReviewerVisible?: boolean | null,
    public isAcceptReviewVisible?: boolean | null,
    public isComentariosVisible?: boolean | null,
    public isWelcomeMessageVisible?: boolean | null,
    public isWelcomeRevisorMessageVisible?: boolean | null,
    public isWelcomeOperadorMessageVisible?: boolean | null,
    public isAddComentariosVisible?: boolean | null,
    public isPersonaFormVisible?: boolean | null,
    public isDocumentosFormVisible?: boolean | null,
    public isVuejsComponentVisible?: boolean | null,
    public isHtmlComponentVisible?: boolean | null,
    public isOtrasRevisionesVisible?: boolean | null,
  ) {}
}

export class PageStateFactory {
  static getDefault() {
    const page = new PageState();
    page.isAccionesVisible = false;
    page.isSendReviewVisible = false;
    page.isFormioVisible = false;
    page.isAssignReviewerVisible = false;
    page.isAcceptReviewVisible = false;
    page.isComentariosVisible = false;
    page.isWelcomeMessageVisible = false;
    page.isWelcomeRevisorMessageVisible = false;
    page.isWelcomeOperadorMessageVisible = false;
    page.isAddComentariosVisible = false;
    page.isPersonaFormVisible = false;
    page.isDocumentosFormVisible = false;
    page.isVuejsComponentVisible = false;
    page.isHtmlComponentVisible = false;
    page.isOtrasRevisionesVisible = false;
    return page;
  }

  static showAccionesComponent() {
    const page = PageStateFactory.getDefault();
    page.isAccionesVisible = true;
    return page;
  }

  static showFormComponente() {
    const page = PageStateFactory.getDefault();
    page.isFormioVisible = true;
    return page;
  }
  static showSendReviewComponent() {
    const page = PageStateFactory.getDefault();
    page.isSendReviewVisible = true;
    return page;
  }

  static showAssignReviewerComponent() {
    const page = PageStateFactory.getDefault();
    page.isAssignReviewerVisible = true;
    return page;
  }
  static showAcceptReviewComponent() {
    const page = PageStateFactory.getDefault();
    page.isAcceptReviewVisible = true;
    return page;
  }

  static showComentariosComponent() {
    const page = PageStateFactory.getDefault();
    page.isComentariosVisible = true;
    return page;
  }

  static showAddComentariosComponent() {
    const page = PageStateFactory.getDefault();
    page.isAddComentariosVisible = true;
    return page;
  }
  static showPersonaComponent() {
    const page = PageStateFactory.getDefault();
    page.isPersonaFormVisible = true;
    return page;
  }
  static showDocumentosComponent() {
    const page = PageStateFactory.getDefault();
    page.isDocumentosFormVisible = true;
    return page;
  }
  static showWelcomeFormComponent() {
    const page = PageStateFactory.getDefault();
    page.isWelcomeMessageVisible = true;
    return page;
  }
  static showWelcomeRevisorFormComponent() {
    const page = PageStateFactory.getDefault();
    page.isWelcomeRevisorMessageVisible = true;
    return page;
  }
  static showWelcomeOperadorFormComponent() {
    const page = PageStateFactory.getDefault();
    page.isWelcomeOperadorMessageVisible = true;
    return page;
  }
  static showVuejsFormComponent() {
    const page = PageStateFactory.getDefault();
    page.isVuejsComponentVisible = true;
    return page;
  }
  static showHtmlFormComponent() {
    const page = PageStateFactory.getDefault();
    page.isHtmlComponentVisible = true;
    return page;
  }
  static showOtrasRevisionesFormComponent() {
    const page = PageStateFactory.getDefault();
    page.isOtrasRevisionesVisible = true;
    return page;
  }
}
