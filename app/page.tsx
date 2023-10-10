"use client";

import Card from "@/components/Card";
import Navigator from "@/components/Navigator";
import certificates from "@/data/certificates.json";
import { ESEARCH_QUERY } from "@/enums";
import { tabs } from "@/shared";
import type { ICertificateInfo, INavigationTab } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [certs, setCerts] = useState<ICertificateInfo[]>(certificates);

  useEffect(() => {
    const queryType = searchParams.get(ESEARCH_QUERY.TYPE);
    if (queryType === undefined || queryType === null) {
      setCerts(certificates);
    } else {
      const tab = tabs.find(
        (tab: INavigationTab) => `${tab.name}` === queryType
      );
      if (tab) {
        setCerts(
          certificates.filter(
            (cert: ICertificateInfo) => cert.typeId === tab.id
          )
        );
      }
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Navigator />
      <div className="flex min-h-screen flex-col items-center justify-between">
        {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
      </div> */}

        <ul className="grid gap-3 p-2 text-center sm:grid-cols-2 md:grid-cols-3 lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          {certs.map((certificate: ICertificateInfo, idx: number) => (
            <li
              className="group h-[18.5rem] rounded-xl border-b bg-white p-2 transition-colors hover:shadow-lg hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
              key={idx}
            >
              <Card cert={certificate} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
