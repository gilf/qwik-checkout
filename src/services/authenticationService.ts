import { users, type User } from "~/data/usersDB";
import { action$, type Cookie, zod$ } from "@builder.io/qwik-city";
import * as z from "zod";

export const useLogin = action$(
  ({ username, password, redirectUrl }, { redirect, cookie }) => {
    const user = users.get(username as string);
    if (user) {
      if (user.password === password) {
        updateAuthCookie(cookie, user);
        throw redirect(308, redirectUrl);
      }
    }
  },
  zod$({
    username: z.string(),
    password: z.string(),
    redirectUrl: z.string(),
  })
);

export function updateAuthCookie(cookie: Cookie, user: User | string) {
  cookie.set("authUser", user, { secure: true, path: "/" });
}
