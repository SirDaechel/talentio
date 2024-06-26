import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostJobForm from "../../_components/PostJobForm";
import { getCompanyByUserId } from "@/database/actions/company.actions";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Post job - ${session?.user.name}`,
    description: "Create a new job",
  };
}

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "individual")
    redirect("/individual/dashboard");

  const company = await getCompanyByUserId(session?.user.id as string);

  return (
    <section className="px-8 mb-6 m:px-4 xl:px-4">
      <PostJobForm type="create" company={company} />
    </section>
  );
};

export default page;
