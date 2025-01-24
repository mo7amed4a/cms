import { Route, Routes } from "react-router-dom";
import ExcelPage from "./Excel";
import { useEffect, useState } from "react"; // أضفنا useState هنا
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"; // استيراد مكتبة file-saver
import { Toaster, toast } from "react-hot-toast";
import "../../styles/tailwind.css";

export function App() {
  const [refresh, setRefresh] = useState(false); 
  const [contacts, setContacts] = useState([]); 
  const [contactsAll, setContactsAll] = useState([]); 
  const [services, setServices] = useState([]); 
  const [projects, setProjects] = useState([]); 

  const token = sessionStorage.getItem("jwtToken");
  if (!token) {
    console.error("No token found in sessionStorage");
    return;
  }

  useEffect(() => {
    axios
      .get(
        "/content-manager/collection-types/api::service.service?page=1&pageSize=10&sort=title%3AASC",
        {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
        }
      )
      .then((res) => {
        setServices(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    axios
      .get(
        "/content-manager/collection-types/api::project.project?page=1&pageSize=10&sort=id:DESC",
        {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
        }
      )
      .then((res) => {
        setProjects(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "/content-manager/collection-types/api::contact.contact?page=1&pageSize=10&sort=id:DESC",
        {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`, // إضافة التوكن إلى رأس الطلب
          },
        }
      )
      .then((res) => {
        const data = res.data.results.filter(
          (item: any) => item.read === false
        );
        setContacts(data);
        setContactsAll(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  }, [refresh]);

  const readAll = () => {
    axios
      .post("/api/contacts/read-all-data")
      .then((res) => {
        toast.success("done, all data is read");
        setRefresh(!refresh);
      })
      .catch((err) => {
        toast.error("error, some data is not read");
      });
  };

  const exportToExcel = (data: any) => {
    if (data.length === 0) {
      alert("No data to export!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "contacts_export.xlsx");
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen app space-y-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 bg-green-500 text-white rounded-lg space-y-4">
          <div className="flex items-center mb-1">
            <div className="text-4xl font-semibold">{contacts?.length}</div>
          </div>
          <div className="text-2xl font-medium">Contacts</div>
        </div>
        <div className="p-6 bg-blue-500 text-white rounded-lg space-y-4">
          <div className="flex items-center mb-1">
            <div className="text-4xl font-semibold">{services?.length}</div>
          </div>
          <div className="text-2xl font-medium">Services</div>
        </div>
        <div className="p-6 bg-yellow-500 text-white rounded-lg space-y-4">
          <div className="flex items-center mb-1">
            <div className="text-4xl font-semibold">{projects?.length}</div>
          </div>
          <div className="text-2xl font-medium">Projects</div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Contacts Page</h1>
        <div className="flex items-center gap-4">
          <button
            disabled={contacts.length === 0}
            onClick={() => readAll()}
            className="bg-green-500 text-white px-4 py-2 rounded-xl mb-6 hover:bg-green-600 disabled:bg-gray-300"
          >
            Read All
          </button>
          <button
            disabled={contacts.length === 0}
            onClick={() => exportToExcel(contacts)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl mb-6 hover:bg-blue-600 disabled:bg-gray-300"
          >
            Export to Excel
          </button>
          <button
            onClick={() => exportToExcel(contactsAll)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl mb-6 hover:bg-blue-600"
          >
            Export All to Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="md:min-w-full bg-white !shadow-2xl rounded-xl overflow-hidde">
          <thead className="border-b">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left  font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left  font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left  font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left  font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left  font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left  font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left  font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact: any) => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-900 flex gap-2 items-center">
                  <span className="bg-green-500 size-3 p-1 inline-block rounded-full"></span>
                  <span>{contact.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                  {contact.firstname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                  {contact.lastname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                  {contact.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                  {contact.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                  {contact.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                  {contact.subject}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Routes>
        <Route path="/excel" element={<ExcelPage />} />
      </Routes>
    </div>
  );
}
