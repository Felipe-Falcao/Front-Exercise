interface ReceivedData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface ResponseData {
  data: {
    user: User;
    token: string;
  }
}

export default function signIn({ email, password }: ReceivedData): Promise<ResponseData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          user: {
            id: 'id_user',
            name: 'name_user',
            avatar_url: 'avatar_user',
            email: 'mail_user',
          },
          token: 'psm2jb4_ias¨@'
        }
      });
    }, 1000);
  });
}
