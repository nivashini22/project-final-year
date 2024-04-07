

export const isAuthenticated = () => {
    try {
        let user = sessionStorage.getItem('user');
        if (!user) return false;
        return true;
      } catch (err) {
        return false;
      }
}

export const isPrisoner = () => {
  try {
      let user = sessionStorage.getItem('user');
      if (!user) return false;
      if (user && user.type === 'PRISONER') return true;
      return false;
    } catch (err) {
      return false;
    }
}

export const isLawyer = () => {
  try {
      let user = sessionStorage.getItem('user');
      if (!user) return false;
      if (user && user.type === 'LAWYER') return true;
      return false;
    } catch (err) {
      return false;
    }
}

export const isCounselor = () => {
  try {
      let user = sessionStorage.getItem('user');
      if (!user) return false;
      if (user && user.type === 'COUNSELOR') return true;
      return false;
    } catch (err) {
      return false;
    }
}

export const isSuperAdmin = () => {
    try {
        let user = sessionStorage.getItem('user');
        if (!user) return false;
        user = JSON.parse(user);
        if (user && user.type === 'ADMIN') return true;
        return false;
      } catch (err) {
        return false;
      }
}