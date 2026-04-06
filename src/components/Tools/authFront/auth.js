
const API = import.meta.env.VITE_API_URL;
let isRefreshing = false;
let refreshPromise = null;

export const isAuthenticated = async (onTokenRefreshed) => {
  const token = localStorage.getItem("token");

  if (!token) {

    const refreshed = await tryRefresh(onTokenRefreshed); 
    return refreshed;
  }


  const response = await fetch(`${API}/api/auth/validate`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) return true;


  if (response.status === 403) {

    const refreshed = await tryRefresh(onTokenRefreshed);
    return refreshed;
  }

  return false;
};


export async function tryRefresh(onTokenRefreshed) {

  if(isRefreshing) return refreshPromise;

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const refreshResponse = await fetch(`${API}/api/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshResponse.ok) throw new Error("Refresh Failed");

      const data = await refreshResponse.json();

      console.log("refreshToken", data)

      localStorage.setItem("token", data.accessToken)
      if (onTokenRefreshed) onTokenRefreshed(data.accessToken);

      return true;

    } catch (err) {
      localStorage.removeItem("token");
      return false;
    } finally{
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise
  
}
// logout frontedn requesting logout from the backend and then exporting it 
export async function logout(){
  localStorage.removeItem("token")
  await fetch(`${API}/api/logout`, {
  method: "POST",
  credentials: "include",
});

// localStorage.removeItem("token");
}
