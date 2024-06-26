import CompaniesList from "./CompaniesList";

type RecommendedCompaniesProps = {
  companies: Company[] | undefined;
};

const RecommendedCompanies = ({ companies }: RecommendedCompaniesProps) => {
  return (
    <section className="w-full px-16 mt-16 m:px-4">
      <div className="flex flex-col items-start gap-1 mb-10">
        <h1 className="text-3xl font-bold">
          Recommended <span className="text-primary">Companies</span>
        </h1>
        <p className="text-sm text-gray-500">
          Based on your profile, company preference and recent activity
        </p>
      </div>
      <CompaniesList type="recommended" companies={companies} />
    </section>
  );
};

export default RecommendedCompanies;
