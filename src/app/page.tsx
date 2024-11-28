"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Company {
  id: string;
  name: string;
  emtak_codes: string[];
  address: string;
  email: string;
  phone: string;
}

const HomePage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchCompanies = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(db, "companies"));
          const companyList: Company[] = [];
          querySnapshot.forEach((doc) => {
            companyList.push({ id: doc.id, ...doc.data() } as Company);
          });
          setCompanies(companyList);
        } catch (error) {
          console.error("Error fetching companies:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCompanies();
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ettevõtete tabel</h1>
      {loading ? (
        <p>Andmed laaditakse...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Registrikood</th>
              <th className="border px-4 py-2">Nimi</th>
              <th className="border px-4 py-2">EMTAK koodid</th>
              <th className="border px-4 py-2">Aadress</th>
              <th className="border px-4 py-2">E-post</th>
              <th className="border px-4 py-2">Telefon</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="border px-4 py-2">{company.id}</td>
                <td className="border px-4 py-2">{company.name}</td>
                <td className="border px-4 py-2">{company.emtak_codes?.join(", ")}</td>
                <td className="border px-4 py-2">{company.address}</td>
                <td className="border px-4 py-2">{company.email}</td>
                <td className="border px-4 py-2">{company.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomePage;
