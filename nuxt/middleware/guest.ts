export default defineNuxtRouteMiddleware(async (to, _from) => {
  const router = useRouter();
  const user = useDirectusUser();
  if (user.value) {
    console.log(user.value);

    router.push("/");
  }
});
