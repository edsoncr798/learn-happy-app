
export default function isUserRegistered(): boolean{
  const user = localStorage.getItem("user");
  return !!user;
}