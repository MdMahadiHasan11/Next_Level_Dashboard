import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function DashboardCMSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your CMSFullForm dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1F1F23] p-6 rounded-lg border border-gray-200 dark:border-[#2F2F33]">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            1,234
          </p>
        </div>

        <div className="bg-white dark:bg-[#1F1F23] p-6 rounded-lg border border-gray-200 dark:border-[#2F2F33]">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Orders
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            567
          </p>
        </div>

        <div className="bg-white dark:bg-[#1F1F23] p-6 rounded-lg border border-gray-200 dark:border-[#2F2F33]">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Revenue
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            $12,345
          </p>
        </div>

        <div className="bg-white dark:bg-[#1F1F23] p-6 rounded-lg border border-gray-200 dark:border-[#2F2F33]">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Active Projects
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            12
          </p>
        </div>
      </div>
    </div>
  );
}
