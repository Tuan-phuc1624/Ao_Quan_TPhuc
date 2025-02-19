import React, { useState } from "react";
import axios from "axios";
import OrderTable from "./OrderTable";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState(storedUser || {});
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Trạng thái tải ảnh

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3002/customer/${userInfo._id}`,
        userInfo
      );
      console.log(response.data);
      toast.success("Thông tin đã được cập nhật!");

      // Cập nhật lại localStorage với thông tin mới
      localStorage.setItem("user", JSON.stringify(userInfo));

      setIsEditing(false); // Tắt chế độ chỉnh sửa
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      toast.error("Cập nhật thất bại!");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!userInfo) {
    return <div>Không có dữ liệu người dùng.</div>;
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kenny06");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmklmvxkr/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const response = await res.json();
      const imageUrl = response.url;

      // Cập nhật ảnh trong state của userInfo
      setUserInfo((prev) => ({ ...prev, image: imageUrl }));

      // Gửi yêu cầu cập nhật đến MongoDB
      await axios.put(`http://localhost:3002/customer/${userInfo._id}`, {
        ...userInfo,
        image: imageUrl,
      });

      toast.success("Ảnh đã được tải lên và cập nhật thành công!");

      // Cập nhật lại localStorage với thông tin mới
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userInfo, avatar: imageUrl })
      );
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      toast.error("Upload ảnh thất bại!");
    } finally {
      setIsUploading(false); // Tắt trạng thái chờ
    }
  };

  return (
    <>
      <div className="container mx-auto px-20 py-10">
        <div className="flex justify-between items-center mb-6">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="text-gray-600">
            <ol className="flex space-x-2">
              <li>
                <a href="/" className="text-blue-600 hover:text-blue-800">
                  TRANG CHỦ /{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  THÔNG TIN TÀI KHOẢN
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex flex-wrap -mx-4">
          {/* Left Side (Profile Picture) */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-10">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src={
                  userInfo.image ||
                  "https://bootdey.com/img/Content/avatar/avatar7.png"
                }
                alt="User"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Tài khoản: {userInfo.name}
              </h3>
            </div>
          </div>

          {/* Right Side (User Info) */}
          <div className="w-full md:w-2/3 px-4 text-[19px]">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4 p-6">
                <div className="flex">
                  <h6 className="font-semibold text-gray-700 w-72">Tên: </h6>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                      className="w-full text-gray-700 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                  ) : (
                    <p className="text-gray-500">{userInfo.name}</p>
                  )}
                </div>

                <div className="flex">
                  <h6 className="font-semibold text-gray-700 w-72">Email: </h6>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                      className="w-full text-gray-700 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                  ) : (
                    <p className="text-gray-500">{userInfo.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-20 py-10">
        <OrderTable />
      </div>
    </>
  );
};

export default UserProfile;
