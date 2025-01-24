import { Route, Routes } from 'react-router-dom'
import ExcelPage from './Excel'
import { useEffect } from 'react'
import axios from 'axios'
import XLSX from 'xlsx';


export function ContactsPage() {
  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
console.log(token);

    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    // جلب بيانات المستخدم من الـ API
    axios.get('http://localhost:1337/admin/users/me', {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, '')}`, // إضافة التوكن إلى رأس الطلب
      },
    })
    .then(res => {
      console.log(res.data); // عرض البيانات في الكونسول
      // setUserData(res.data); // حفظ البيانات في الحالة
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });

    let a = axios.get('http://localhost:1337/content-manager/collection-types/api::contact.contact?page=1&pageSize=10&sort=firstname%3AASC', {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, '')}`, // إضافة التوكن إلى رأس الطلب
      },
    }).then(res => {
      // console.log(res.data.results);
      
      // const worksheet = XLSX.utils.json_to_sheet(res.data.results);

      // // إنشاء مصنف (Workbook) وإضافة الورقة إليه
      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // // حفظ الملف كـ Excel
      // XLSX.writeFile(workbook, 'output.xlsx');
    })
  }, [])
  
  return (
    <div className='mt-40 bg-red-500 app'>
      Conatc 

      <Routes>
          <Route path="/excel" element={<ExcelPage />} />          
        </Routes>
    </div>
  )
}
