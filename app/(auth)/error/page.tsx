import AuthError from "@/components/AuthError";

export async function generateMetadata() {
  return {
    title: "Something Went Wrong",
    description: "Something went wrong",
  };
}

const page = () => {
  return <AuthError />;
};

export default page;
