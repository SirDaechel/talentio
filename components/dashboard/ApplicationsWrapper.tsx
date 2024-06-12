"use client";

import { useState } from "react";
import ApplicationsTable from "./ApplicationsTable";
import TableUtitlity from "./TableUtitlity";
import Pagination from "../Pagination";

type ApplicationsWrapperProps = {
  jobsDetails: Job[];
  page: number;
  totalPages: number | undefined;
  perPage: number;
};

const ApplicationsWrapper = ({
  jobsDetails,
  page,
  totalPages,
  perPage,
}: ApplicationsWrapperProps) => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState(jobsDetails);

  // Create an array based on the search input
  const filteredJobSearch = jobs?.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-6">
      <TableUtitlity
        query={query}
        setQuery={setQuery}
        title="Total applications:"
        filteredSearch={filteredJobSearch}
        perPage={perPage}
      />
      <ApplicationsTable jobs={filteredJobSearch} setJobs={setJobs} />
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};

export default ApplicationsWrapper;