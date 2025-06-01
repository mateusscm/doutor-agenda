import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>
        {session?.user?.name
          ? `Bem-vindo, ${session.user.name}!`
          : "Você não está logado."}
      </h2>
      <Image
        src={session?.user?.image as string}
        alt="User Avatar"
        width={100}
        height={100}
      />
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
