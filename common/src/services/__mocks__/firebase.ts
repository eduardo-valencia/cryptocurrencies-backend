export const tokens = {
  valid: 'valid',
  invalid: 'invalid',
}

class Auth {
  verifyIdToken = (token: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (token === tokens.valid) {
        return resolve()
      }
      return reject()
    })
  }
}

class Admin {
  static auth(): Auth {
    return new Auth()
  }
}

export default Admin
