export const SNS_PLATFORMS = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  REDDIT: 'reddit',
} as const;

export const MOCK_SNS_LIST = [
  {
    sns_id: '1',
    sns_name: SNS_PLATFORMS.TWITTER,
    api_config: { api_key: '', api_secret: '', access_token: '' },
  },
  {
    sns_id: '2',
    sns_name: SNS_PLATFORMS.FACEBOOK,
    api_config: { api_key: '', api_secret: '', access_token: '' },
  },
  {
    sns_id: '3',
    sns_name: SNS_PLATFORMS.REDDIT,
    api_config: { api_key: '', api_secret: '', access_token: '' },
  },
];