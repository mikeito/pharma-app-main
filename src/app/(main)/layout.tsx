import { redirect } from "next/navigation";
import { validateRequest } from "src/auth";
import { AuthProvider } from "src/provider/AuthProvider";
import PrivateRoute from "src/provider/PrivateRoute";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();


  return (
    <AuthProvider>
      {/* <PrivateRoute> */}
        <div >
          {children}
        </div>
      {/* </PrivateRoute> */}
    </AuthProvider>
  );
}
