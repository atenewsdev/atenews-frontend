export const testDisplayName = (displayName) => /^.{1,50}$/.test(displayName);
export const testUsername = (username) => /^[a-zA-Z0-9_]{1,15}$/.test(username);
export const testBio = (bio) => /^.{0,160}$/.test(bio);
export const testEmail = (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
