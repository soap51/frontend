export   const emailIsValid = (value: string) => {
    return /\S+@\S+\.\S+/.test(value)
  }