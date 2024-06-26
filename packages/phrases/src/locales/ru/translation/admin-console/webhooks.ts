const webhooks = {
  page_title: 'Вебхуки',
  title: 'Вебхуки',
  subtitle:
    'Создайте вебхуки, чтобы легко получать обновления в реальном времени относительно определенных событий.',
  create: 'Создать вебхук',
  schemas: {
    /** UNTRANSLATED */
    interaction: 'User interaction',
    /** UNTRANSLATED */
    user: 'User',
    /** UNTRANSLATED */
    organization: 'Organization',
    /** UNTRANSLATED */
    role: 'Role',
    /** UNTRANSLATED */
    scope: 'Permission',
    /** UNTRANSLATED */
    organization_role: 'Organization role',
    /** UNTRANSLATED */
    organization_scope: 'Organization permission',
  },
  table: {
    name: 'Имя',
    events: 'События',
    success_rate: 'Коэффициент успешности (за 24ч)',
    requests: 'Запросы (за 24ч)',
  },
  placeholder: {
    title: 'Вебхук',
    description:
      'Создайте вебхук для получения обновлений в реальном времени через POST-запросы на URL-адрес вашей конечной точки. Будьте в курсе событий и мгновенно реагируйте на события, такие как "Создание учетной записи", "Вход" и "Сброс пароля".',
    create_webhook: 'Создать вебхук',
  },
  create_form: {
    title: 'Создать вебхук',
    subtitle:
      'Добавьте вебхук, чтобы отправлять запросы POST на URL-адрес конечной точки с деталями любых событий пользователей.',
    events: 'События',
    events_description:
      'Выберите события-триггеры, при которых Logto будет отправлять запросы POST.',
    name: 'Имя',
    name_placeholder: 'Введите имя вебхука',
    endpoint_url: 'URL-адрес конечной точки',
    endpoint_url_placeholder: 'https://ваш.url.адрес.вебхука',
    endpoint_url_tip:
      'Введите URL вашей конечной точки, на который будет отправлено тело вебхука, когда произойдет событие.',
    create_webhook: 'Создать вебхук',
    missing_event_error: 'Вы должны выбрать как минимум одно событие.',
  },
  webhook_created: 'Вебхук {{name}} был успешно создан.',
};

export default Object.freeze(webhooks);
