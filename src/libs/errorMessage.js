 export const errorMessage = error => {
    switch (error) {
      case 'AccessDenied':
        return 'Access denied! Please try again later.';
      case 'OAuthCallbackError':
        return 'Google sign in failed! Please try again later.';
      default:
        return 'Something went wrong! Please try again later.';
    }
  };