export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password'
  },
  pricing: '/pricing',
  options: '/options',
  resume: {
    upload: '/resume/upload',
    enter: '/resume/enter',
    end: '/resume/end',
    checkout: '/resume/checkout'
  },
  dashboard: {
    overview: '/dashboard',
    orders: '/dashboard/orders',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    // resume: '/dashboard/resume',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
