export default interface UserAuth {
    id?: number;
    name?: string;
    username?: string;
    password?: string;
    email?: string;
    level?: string;
    focus?: string;
    weight?: string;
    enabled?: boolean;
    authorities?: { authority: string }[];
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
  }
  